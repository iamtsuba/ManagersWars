import { supabase } from '../lib/supabase.js'
import {
  GC_DEFS, getNoteForRole, calcAttack, calcDefense,
  calcMidfieldDuel, resolveDuel, aiSelectPlayers, getRewards
} from './game-logic.js'

// Positions par formation (GDD §5) — lignes ordonnées pour l'adjacence
const FORMATIONS = {
  '4-4-2': { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-3-3': { GK:1, DEF:4, MIL:3, ATT:3 },
  '3-4-3': { GK:1, DEF:3, MIL:4, ATT:3 },
  '3-5-2': { GK:1, DEF:3, MIL:5, ATT:2 },
  '5-3-2': { GK:1, DEF:5, MIL:3, ATT:2 },
}

export async function renderMatch(container, ctx) {
  const { state, navigate, toast } = ctx
  const params = state.params || {}
  container.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation du match...</div>'

  // Difficulté depuis params (matchMode = 'vs_ai_easy' etc.)
  const matchMode = params.matchMode || 'vs_ai_easy'
  const difficulty = matchMode.replace('vs_ai_', '')  // easy | medium | hard | club
  const mode = matchMode

  // Charger le deck actif
  const { data: decks } = await supabase
    .from('decks')
    .select('id,name,formation_card_id,cards:formation_card_id(formation)')
    .eq('owner_id', state.profile.id).eq('is_active', true).limit(1)

  if (!decks || decks.length === 0) {
    container.innerHTML = `<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">📋</div>
        <p style="margin-bottom:16px">Tu n'as pas encore de deck actif.<br>Crée et active un deck pour jouer !</p>
        <button class="btn btn-primary" id="goto-decks-btn">Créer un deck</button>
      </div>
    </div>`
    document.getElementById('goto-decks-btn')?.addEventListener('click', () => navigate('decks'))
    return
  }

  const deck = decks[0]

  // Charger les cartes du deck avec données joueurs
  const { data: deckCards } = await supabase
    .from('deck_cards')
    .select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name)))`)
    .eq('deck_id', deck.id)
    .order('slot_order')

  const starters = (deckCards || []).filter(dc => dc.is_starter && dc.card?.player)
  const subs     = (deckCards || []).filter(dc => !dc.is_starter && dc.card?.player)

  if (starters.length < 11) {
    container.innerHTML = `<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <p style="margin-bottom:16px">Ton deck doit contenir 11 titulaires.<br>Actuellement : ${starters.length}/11</p>
        <button class="btn btn-primary" id="goto-decks-btn">Compléter mon deck</button>
      </div>
    </div>`
    document.getElementById('goto-decks-btn')?.addEventListener('click', () => navigate('decks'))
    return
  }

  // Charger Game Changers du joueur
  const { data: gcCards } = await supabase
    .from('cards')
    .select('id, gc_type')
    .eq('owner_id', state.profile.id)
    .eq('card_type', 'game_changer')

  // Détecter la formation
  const formationCard = (deckCards || []).find(dc => dc.card?.card_type === 'formation')
  const formation = formationCard?.card?.formation || deck.cards?.formation || '4-4-2'

  // Construire l'équipe du joueur
  const homeTeam = buildTeam(starters, formation)

  // Générer une équipe IA
  const aiTeam = await generateAITeam(formation, difficulty)

  // Créer le match en BDD
  const { data: match } = await supabase.from('matches').insert({
    home_id: state.profile.id,
    away_id: null,
    mode,
    home_deck_id: deck.id,
    status: 'in_progress',
  }).select().single()

  // État du jeu
  const game = {
    matchId: match?.id,
    mode,
    difficulty,
    formation,
    homeTeam,
    aiTeam,
    homeSubs: subs.map(s => playerFromCard(s.card)),
    homeScore: 0,
    aiScore: 0,
    gcCards: gcCards || [],
    usedGc: [],
    phase: 'midfield', // midfield | attack | defense | resolve | finished
    attacker: null,    // 'home' | 'ai'
    round: 0,
    selected: [],
    pendingAttack: null,
    log: [],
    modifiers: { home: {}, ai: {} },
    subsUsed: 0,
    maxSubs: 3,
  }

  startMatch(container, game, ctx)
}

// ── Construction d'équipe ─────────────────────────────────
function playerFromCard(card) {
  const p = card.player
  return {
    cardId: card.id,
    id: p.id,
    firstname: p.firstname,
    name: p.surname_encoded,
    country_code: p.country_code,
    club_id: p.club_id,
    job: p.job,
    job2: p.job2,
    note_g: p.note_g, note_d: p.note_d, note_m: p.note_m, note_a: p.note_a,
    rarity: p.rarity,
    used: false,
  }
}

function buildTeam(starters, formation) {
  const players = starters.map(dc => playerFromCard(dc.card))
  return assignToGrid(players, formation)
}

function assignToGrid(players, formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines = { GK:[], DEF:[], MIL:[], ATT:[] }
  // Répartir selon poste principal
  const pool = [...players]
  for (const role of ['GK','DEF','MIL','ATT']) {
    const needed = struct[role]
    for (let i = 0; i < needed; i++) {
      // Chercher un joueur dont le poste correspond
      let idx = pool.findIndex(p => p.job === role)
      if (idx === -1) idx = pool.findIndex(p => p.job2 === role)
      if (idx === -1) idx = 0 // fallback
      if (pool[idx]) {
        lines[role].push({ ...pool[idx], line: role })
        pool.splice(idx, 1)
      }
    }
  }
  return lines
}

async function generateAITeam(formation, difficulty) {
  // Récupérer des joueurs aléatoires de la BDD pour l'IA
  const { data: players } = await supabase
    .from('players')
    .select('id, firstname, surname_encoded, country_code, club_id, job, job2, note_g, note_d, note_m, note_a, rarity')
    .eq('is_active', true)
    .limit(60)

  if (!players || players.length < 11) {
    // Fallback : générer des joueurs fictifs
    return generateFakeAITeam(formation)
  }

  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines = { GK:[], DEF:[], MIL:[], ATT:[] }
  const pool = [...players]

  for (const role of ['GK','DEF','MIL','ATT']) {
    const candidates = pool.filter(p => p.job === role)
    const others = pool.filter(p => p.job !== role)
    const sorted = [...candidates, ...others]
    for (let i = 0; i < struct[role]; i++) {
      const p = sorted[i] || others[i] || pool[i]
      if (p) {
        lines[role].push({
          cardId: 'ai-' + p.id + '-' + i,
          id: p.id,
          firstname: p.firstname,
          name: p.surname_encoded,
          country_code: p.country_code,
          club_id: p.club_id,
          job: p.job, job2: p.job2,
          note_g: p.note_g, note_d: p.note_d, note_m: p.note_m, note_a: p.note_a,
          rarity: p.rarity,
          line: role, used: false,
        })
      }
    }
  }
  return lines
}

function generateFakeAITeam(formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines = { GK:[], DEF:[], MIL:[], ATT:[] }
  const names = ['ROBOT','CYBER','METAL','NEXUS','ALGO','PIXEL','CODEX','BYTE','LOGIC','TURBO','QUANTUM']
  let n = 0
  for (const role of ['GK','DEF','MIL','ATT']) {
    for (let i = 0; i < struct[role]; i++) {
      const note = 2 + Math.floor(Math.random() * 5)
      lines[role].push({
        cardId: 'fake-ai-' + n,
        id: 'fake-' + n,
        firstname: 'IA',
        name: names[n % names.length],
        country_code: 'XX', club_id: null,
        job: role, job2: null,
        note_g: role==='GK'?note:1, note_d: role==='DEF'?note:1,
        note_m: role==='MIL'?note:1, note_a: role==='ATT'?note:1,
        rarity: 'normal', line: role, used: false,
      })
      n++
    }
  }
  return lines
}

// ── Démarrage du match ────────────────────────────────────
function startMatch(container, game, ctx) {
  // Phase 4.1 : Duel du milieu
  const homeMidfielders = game.homeTeam.MIL || []
  const aiMidfielders = game.aiTeam.MIL || []
  const homeMidScore = calcMidfieldDuel(homeMidfielders)
  const aiMidScore = calcMidfieldDuel(aiMidfielders)

  game.attacker = homeMidScore >= aiMidScore ? 'home' : 'ai'
  game.log.push({
    text: `Duel du milieu : Vous ${homeMidScore} - ${aiMidScore} IA. ${game.attacker === 'home' ? 'Vous attaquez' : 'L\'IA attaque'} en premier.`,
    type: 'info'
  })

  game.phase = game.attacker === 'home' ? 'attack' : 'ai-attack'
  renderGame(container, game, ctx)

  // Si l'IA commence, jouer son tour
  if (game.attacker === 'ai') {
    setTimeout(() => aiTurn(container, game, ctx), 1200)
  }
}

// ── Rendu principal du match ──────────────────────────────
function renderGame(container, game, ctx) {
  const phaseLabels = {
    'attack': '⚔️ À vous d\'attaquer',
    'defense': '🛡️ À vous de défendre',
    'ai-attack': '🤖 L\'IA attaque...',
    'ai-defense': '🤖 L\'IA défend...',
    'finished': '🏁 Match terminé',
  }

  container.innerHTML = `
  <div class="match-screen">
    <div class="match-header">
      <div style="flex:1">
        <button class="btn-icon" id="match-quit" style="color:#fff">✕</button>
      </div>
      <div style="text-align:center;flex:2">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">VOUS vs IA (${game.difficulty})</div>
        <div class="match-score">${game.homeScore} - ${game.aiScore}</div>
      </div>
      <div style="flex:1;text-align:right">
        <button class="btn-icon" id="view-ai-team" style="color:#fff" title="Voir l'équipe adverse">👁️</button>
      </div>
    </div>

    <div class="match-phase">${phaseLabels[game.phase] || game.phase}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers disponibles -->
    ${(game.phase === 'attack' || game.phase === 'defense') && game.gcCards.length > 0 ? `
    <div style="padding:8px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:6px">Game Changers (cliquer pour utiliser)</div>
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px">
        ${game.gcCards.filter(gc => !game.usedGc.includes(gc.id)).map(gc => `
          <div class="gc-mini" data-gc-id="${gc.id}" data-gc-type="${gc.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;min-width:90px;text-align:center">
            <div style="font-size:18px">${GC_DEFS[gc.gc_type]?.icon || '⚡'}</div>
            <div style="font-size:9px;color:#fff;font-weight:600">${gc.gc_type}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${game.log.slice(-6).map(e => `<div class="log-entry ${e.type === 'goal' ? 'log-goal' : ''}">${e.text}</div>`).join('')}
    </div>
  </div>
  `

  document.getElementById('match-quit')?.addEventListener('click', () => {
    if (confirm('Quitter le match ? Il sera abandonné.')) ctx.navigate('home')
  })

  document.getElementById('view-ai-team')?.addEventListener('click', () => {
    showAITeam(game, ctx)
  })

  renderField(container, game, ctx)
  renderActions(container, game, ctx)

  // Game Changers
  container.querySelectorAll('.gc-mini').forEach(el => {
    el.addEventListener('click', () => {
      useGameChanger(el.dataset.gcId, el.dataset.gcType, container, game, ctx)
    })
  })

  // Log scroll
  const log = document.getElementById('match-log')
  if (log) log.scrollTop = log.scrollHeight
}

// ── Rendu du terrain ──────────────────────────────────────
function renderField(container, game, ctx) {
  const field = document.getElementById('match-field')
  if (!field) return

  const isSelecting = game.phase === 'attack' || game.phase === 'defense'
  const selectRoles = game.phase === 'attack'
    ? ['MIL','ATT']           // attaque : milieux et/ou attaquants
    : ['GK','DEF','MIL']      // défense : gardien, défenseurs, milieux

  const lines = ['ATT','MIL','DEF','GK'] // affichage du haut vers le bas

  field.innerHTML = `<div class="match-grid">
    ${lines.map(role => {
      const players = game.homeTeam[role] || []
      if (players.length === 0) return ''
      return `<div class="match-row">
        ${players.map((p, idx) => {
          const selectable = isSelecting && selectRoles.includes(role) && !p.used
          const isSelected = game.selected.some(s => s.cardId === p.cardId)
          const note = getNoteForRole(p, game.phase === 'attack' ? 'ATT' : game.phase === 'defense' ? 'DEF' : role)
          return `<div class="match-slot ${selectable ? 'selectable' : ''} ${isSelected ? 'selected' : ''} ${p.used ? 'used' : ''}"
            data-card-id="${p.cardId}" data-role="${role}" data-idx="${idx}">
            <div class="slot-note">${note}</div>
            <div class="slot-name">${p.name}</div>
          </div>`
        }).join('')}
      </div>`
    }).join('')}
  </div>`

  // Sélection de joueurs (adjacence GDD §5.1/5.3)
  field.querySelectorAll('.match-slot.selectable').forEach(el => {
    el.addEventListener('click', () => {
      toggleSelect(el, game, container, ctx)
    })
  })
}

// ── Sélection de joueurs adjacents ────────────────────────
function toggleSelect(el, game, container, ctx) {
  const cardId = el.dataset.cardId
  const role = el.dataset.role
  const idx = parseInt(el.dataset.idx)

  const existing = game.selected.findIndex(s => s.cardId === cardId)
  if (existing !== -1) {
    game.selected.splice(existing, 1)
  } else {
    if (game.selected.length >= 3) {
      ctx.toast('Maximum 3 joueurs (GDD §5.1)', 'error')
      return
    }
    const player = (game.homeTeam[role] || []).find(p => p.cardId === cardId)
    if (player) game.selected.push({ ...player, _role: role, _idx: idx })
  }

  // Re-render le terrain et les actions
  renderField(container, game, ctx)
  renderActions(container, game, ctx)
}

// ── Rendu des actions ─────────────────────────────────────
function renderActions(container, game, ctx) {
  const actions = document.getElementById('match-actions')
  if (!actions) return

  if (game.phase === 'attack') {
    const calc = calcAttack(game.selected, game.modifiers.home)
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:8px">
        ${game.selected.length > 0
          ? `Attaque : <b style="color:var(--yellow);font-size:18px">${calc.total}</b>
             <span style="font-size:11px;opacity:.7">(${calc.base} + ${calc.links} liens${game.modifiers.home.doubleAttack ? ' ×2' : ''})</span>`
          : '<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (milieux/attaquants)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${game.selected.length === 0 ? 'disabled' : ''}>
        Valider l'attaque →
      </button>
    `
    document.getElementById('confirm-attack')?.addEventListener('click', () => {
      confirmAttack(container, game, ctx)
    })
  } else if (game.phase === 'defense') {
    const calc = calcDefense(game.selected, game.modifiers.home)
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:4px">
        <div style="font-size:12px;opacity:.7">L'IA attaque avec <b style="color:#ff6b6b">${game.pendingAttack?.total || 0}</b></div>
        ${game.selected.length > 0
          ? `Défense : <b style="color:var(--yellow);font-size:18px">${calc.total}</b>
             <span style="font-size:11px;opacity:.7">(${calc.base} + ${calc.links} liens)</span>`
          : '<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (gardien/défenseurs/milieux)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${game.selected.length === 0 ? 'disabled' : ''}>
        Valider la défense →
      </button>
    `
    document.getElementById('confirm-defense')?.addEventListener('click', () => {
      confirmDefense(container, game, ctx)
    })
  } else if (game.phase === 'finished') {
    actions.innerHTML = `<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>`
    document.getElementById('end-match')?.addEventListener('click', () => {
      ctx.navigate('home')
    })
  } else {
    actions.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.5);padding:8px">⏳ Tour de l'IA...</div>`
  }
}

// ── Confirmation attaque joueur ───────────────────────────
function confirmAttack(container, game, ctx) {
  const calc = calcAttack(game.selected, game.modifiers.home)
  game.pendingAttack = { ...calc, players: [...game.selected], side: 'home' }

  // Marquer les joueurs comme utilisés (GDD §5.8)
  game.selected.forEach(sel => {
    const p = (game.homeTeam[sel._role] || []).find(pp => pp.cardId === sel.cardId)
    if (p) p.used = true
  })

  game.log.push({ text: `Vous attaquez avec ${calc.total} (${game.selected.map(p=>p.name).join(', ')})`, type: 'info' })
  game.selected = []
  game.modifiers.home = {}

  // L'IA défend
  game.phase = 'ai-defense'
  renderGame(container, game, ctx)
  setTimeout(() => aiDefend(container, game, ctx), 1200)
}

// ── Confirmation défense joueur ───────────────────────────
function confirmDefense(container, game, ctx) {
  const calc = calcDefense(game.selected, game.modifiers.home)

  // Marquer utilisés
  game.selected.forEach(sel => {
    const p = (game.homeTeam[sel._role] || []).find(pp => pp.cardId === sel.cardId)
    if (p) p.used = true
  })

  // Résolution
  const result = resolveDuel(game.pendingAttack.total, calc.total, game.modifiers.home)
  if (result.goal) {
    game.aiScore++
    game.log.push({ text: `⚽ BUT de l'IA ! (${game.pendingAttack.total} vs ${calc.total})`, type: 'goal' })
  } else if (result.shielded) {
    game.log.push({ text: `🛡️ Bouclier ! But annulé.`, type: 'info' })
  } else {
    game.log.push({ text: `🧤 Défense réussie ! (${calc.total} vs ${game.pendingAttack.total})`, type: 'info' })
  }

  game.selected = []
  game.modifiers.home = {}
  game.pendingAttack = null

  // Inversion des rôles (GDD §5.10)
  nextTurn(container, game, ctx, 'home-attack')
}

// ── Tour de l'IA (attaque) ────────────────────────────────
function aiTurn(container, game, ctx) {
  // L'IA attaque
  const allAi = [...(game.aiTeam.MIL||[]), ...(game.aiTeam.ATT||[])]
  const selected = aiSelectPlayers(allAi, 'attack', game.difficulty)

  if (selected.length === 0) {
    // Plus de cartes IA → fin probable
    checkEnd(container, game, ctx)
    return
  }

  const calc = calcAttack(selected, game.modifiers.ai)
  game.pendingAttack = { ...calc, players: selected, side: 'ai' }

  selected.forEach(s => { s.used = true })
  game.log.push({ text: `L'IA attaque avec ${calc.total}`, type: 'info' })
  game.modifiers.ai = {}

  // Au joueur de défendre
  game.phase = 'defense'
  renderGame(container, game, ctx)
}

// ── IA défend contre le joueur ────────────────────────────
function aiDefend(container, game, ctx) {
  const allAi = [...(game.aiTeam.GK||[]), ...(game.aiTeam.DEF||[]), ...(game.aiTeam.MIL||[])]
  const selected = aiSelectPlayers(allAi, 'defense', game.difficulty)

  const calc = calcDefense(selected, game.modifiers.ai)
  selected.forEach(s => { s.used = true })

  const result = resolveDuel(game.pendingAttack.total, calc.total, game.modifiers.ai)
  if (result.goal) {
    game.homeScore++
    game.log.push({ text: `⚽ BUT ! Vous marquez ! (${game.pendingAttack.total} vs ${calc.total})`, type: 'goal' })
  } else {
    game.log.push({ text: `🧤 L'IA défend (${calc.total} vs ${game.pendingAttack.total})`, type: 'info' })
  }

  game.modifiers.ai = {}
  game.pendingAttack = null

  // Inversion des rôles
  nextTurn(container, game, ctx, 'ai-attack')
}

// ── Passage au tour suivant ───────────────────────────────
function nextTurn(container, game, ctx, next) {
  game.round++

  // Vérifier fin de match
  if (isMatchOver(game)) {
    finishMatch(container, game, ctx)
    return
  }

  if (next === 'home-attack') {
    // Vérifier que le joueur a encore des cartes attaque
    const homeAttackers = [...(game.homeTeam.MIL||[]), ...(game.homeTeam.ATT||[])].filter(p => !p.used)
    if (homeAttackers.length === 0) {
      // L'IA continue d'attaquer
      game.phase = 'ai-attack'
      renderGame(container, game, ctx)
      setTimeout(() => aiTurn(container, game, ctx), 1000)
      return
    }
    game.phase = 'attack'
    renderGame(container, game, ctx)
  } else {
    // IA attaque
    const aiAttackers = [...(game.aiTeam.MIL||[]), ...(game.aiTeam.ATT||[])].filter(p => !p.used)
    if (aiAttackers.length === 0) {
      const homeAttackers = [...(game.homeTeam.MIL||[]), ...(game.homeTeam.ATT||[])].filter(p => !p.used)
      if (homeAttackers.length === 0) {
        finishMatch(container, game, ctx)
        return
      }
      game.phase = 'attack'
      renderGame(container, game, ctx)
      return
    }
    game.phase = 'ai-attack'
    renderGame(container, game, ctx)
    setTimeout(() => aiTurn(container, game, ctx), 1000)
  }
}

function isMatchOver(game) {
  const homeAvail = ['MIL','ATT'].some(r => (game.homeTeam[r]||[]).some(p => !p.used))
  const aiAvail = ['MIL','ATT'].some(r => (game.aiTeam[r]||[]).some(p => !p.used))
  return !homeAvail && !aiAvail
}

function checkEnd(container, game, ctx) {
  if (isMatchOver(game)) {
    finishMatch(container, game, ctx)
  } else {
    game.phase = 'attack'
    renderGame(container, game, ctx)
  }
}

// ── Game Changer (GDD §5.5) ───────────────────────────────
function useGameChanger(gcId, gcType, container, game, ctx) {
  if (game.usedGc.includes(gcId)) return

  game.usedGc.push(gcId)

  switch (gcType) {
    case 'Double attaque':
      game.modifiers.home.doubleAttack = true
      game.log.push({ text: `⚡ Double attaque activée !`, type: 'info' })
      break
    case 'Bouclier':
      game.modifiers.home.shield = true
      game.log.push({ text: `🛡️ Bouclier activé !`, type: 'info' })
      break
    case 'Ressusciter':
      // Réactiver un joueur grisé
      let revived = false
      for (const role of ['ATT','MIL','DEF','GK']) {
        const used = (game.homeTeam[role]||[]).find(p => p.used)
        if (used) { used.used = false; revived = true; break }
      }
      game.log.push({ text: revived ? `💫 Joueur ressuscité !` : `💫 Aucun joueur à ressusciter`, type: 'info' })
      break
    case 'Vol de note':
      game.modifiers.ai.stolenNote = (game.modifiers.ai.stolenNote || 0) + 1
      game.log.push({ text: `🎯 -1 à la prochaine action IA`, type: 'info' })
      break
    case 'Gel':
      // Geler le meilleur joueur IA
      const allAi = [...(game.aiTeam.ATT||[]), ...(game.aiTeam.MIL||[])].filter(p => !p.used)
      if (allAi.length > 0) {
        const best = allAi.sort((a,b) => getNoteForRole(b,'ATT') - getNoteForRole(a,'ATT'))[0]
        best.used = true
        game.log.push({ text: `❄️ ${best.name} (IA) gelé !`, type: 'info' })
      }
      break
    case 'Remplacement+':
      game.maxSubs++
      game.log.push({ text: `🔄 +1 remplacement disponible`, type: 'info' })
      break
  }

  // Supprimer la carte GC de la collection (usage unique définitif GDD §4.1)
  supabase.from('cards').delete().eq('id', gcId).then(() => {})

  renderGame(container, game, ctx)
}

// ── Fin de match ──────────────────────────────────────────
async function finishMatch(container, game, ctx) {
  game.phase = 'finished'
  const { state } = ctx

  const isWin = game.homeScore > game.aiScore
  const isDraw = game.homeScore === game.aiScore
  const result = isWin ? 'victoire' : isDraw ? 'nul' : 'defaite'
  const rewards = getRewards(game.mode, result)

  game.log.push({
    text: isWin ? `🏆 VICTOIRE ! +${rewards} crédits` : isDraw ? `🤝 Match nul. +${rewards} crédits` : `❌ Défaite. +${rewards} crédits`,
    type: 'goal'
  })

  // Sauvegarder en BDD
  if (game.matchId) {
    await supabase.from('matches').update({
      status: 'finished',
      home_score: game.homeScore,
      away_score: game.aiScore,
      winner_id: isWin ? state.profile.id : null,
      home_credits_reward: rewards,
      played_at: new Date().toISOString(),
    }).eq('id', game.matchId)
  }

  // Mettre à jour le profil
  const updates = {
    credits: (state.profile.credits || 0) + rewards,
    matches_played: (state.profile.matches_played || 0) + 1,
  }
  if (isWin) updates.wins = (state.profile.wins || 0) + 1
  else if (isDraw) updates.draws = (state.profile.draws || 0) + 1
  else updates.losses = (state.profile.losses || 0) + 1

  await supabase.from('users').update(updates).eq('id', state.profile.id)
  await ctx.refreshProfile()

  // Écran de fin
  showResultScreen(container, game, { isWin, isDraw, rewards }, ctx)
}

function showResultScreen(container, game, { isWin, isDraw, rewards }, ctx) {
  container.innerHTML = `
  <div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff;max-width:400px">
      <div style="font-size:72px;margin-bottom:16px">${isWin ? '🏆' : isDraw ? '🤝' : '😔'}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">
        ${isWin ? 'Victoire !' : isDraw ? 'Match nul' : 'Défaite'}
      </h2>
      <div style="font-size:42px;font-weight:900;margin:16px 0">${game.homeScore} - ${game.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:13px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${rewards.toLocaleString('fr')} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:24px">
        <button class="btn btn-ghost" id="result-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="result-replay" style="flex:1">Rejouer</button>
      </div>
    </div>
  </div>
  `
  document.getElementById('result-home')?.addEventListener('click', () => ctx.navigate('home'))
  document.getElementById('result-replay')?.addEventListener('click', () => ctx.navigate('match', { matchMode: game.mode }))
}

// ── Voir l'équipe adverse (GDD §4) ────────────────────────
function showAITeam(game, ctx) {
  const lines = ['ATT','MIL','DEF','GK']
  ctx.openModal('Équipe adverse (IA)',
    `<div class="match-grid" style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${lines.map(role => {
        const players = game.aiTeam[role] || []
        if (!players.length) return ''
        return `<div class="match-row" style="margin-bottom:6px">
          ${players.map(p => {
            const note = getNoteForRole(p, role)
            return `<div class="match-slot ${p.used ? 'used' : ''}" style="cursor:default">
              <div class="slot-note">${note}</div>
              <div class="slot-name">${p.name}</div>
            </div>`
          }).join('')}
        </div>`
      }).join('')}
    </div>
    <p style="font-size:11px;color:var(--gray-600);margin-top:8px;text-align:center">Remplaçants non affichés (GDD §4)</p>`,
    `<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )
}
