import { supabase } from '../lib/supabase.js'
import {
  GC_DEFS, getNoteForRole, getColsForCount, calcAttack, calcDefense,
  calcMidfieldDuel, resolveDuel, aiSelectPlayers, getRewards
} from './game-logic.js'

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
  container.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation...</div>'

  const matchMode  = params.matchMode || 'vs_ai_easy'
  const difficulty = matchMode.replace('vs_ai_', '')
  const mode       = matchMode

  // Deck actif
  const { data: decks } = await supabase
    .from('decks').select('id,name,formation_card_id')
    .eq('owner_id', state.profile.id).eq('is_active', true).limit(1)

  if (!decks || decks.length === 0) {
    showMsg(container, '📋', 'Aucun deck actif.', 'Créer un deck', () => navigate('decks'))
    return
  }

  const deck = decks[0]

  const { data: deckCards } = await supabase
    .from('deck_cards')
    .select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
          clubs(encoded_name, logo_url)))`)
    .eq('deck_id', deck.id).order('slot_order')

  const starters = (deckCards||[]).filter(dc => dc.is_starter && dc.card?.player)
  const subs     = (deckCards||[]).filter(dc => !dc.is_starter && dc.card?.player)

  if (starters.length < 11) {
    showMsg(container, '⚠️', `Deck incomplet (${starters.length}/11 titulaires).`, 'Compléter', () => navigate('decks'))
    return
  }

  const { data: gcCards } = await supabase
    .from('cards').select('id, gc_type')
    .eq('owner_id', state.profile.id).eq('card_type', 'game_changer')

  const formationCard = (deckCards||[]).find(dc => dc.card?.card_type === 'formation')
  const formation = formationCard?.card?.formation || '4-4-2'
  const homeTeam  = buildTeam(starters, formation)
  const aiTeam    = await generateAITeam(formation, difficulty)

  const { data: match } = await supabase.from('matches').insert({
    home_id: state.profile.id, away_id: null, mode, home_deck_id: deck.id, status: 'in_progress',
  }).select().single()

  const game = {
    matchId: match?.id, mode, difficulty, formation,
    homeTeam, aiTeam,
    homeSubs: subs.map(s => playerFromCard(s.card)),
    homeScore: 0, aiScore: 0,
    gcCards: gcCards || [], usedGc: [],
    phase: 'midfield',
    attacker: null, round: 0,
    selected: [], pendingAttack: null,
    log: [], modifiers: { home:{}, ai:{} },
    subsUsed: 0, maxSubs: 3,
  }

  startMatch(container, game, ctx)
}

// ── Helpers ───────────────────────────────────────────────
function showMsg(container, icon, msg, btnLabel, btnFn) {
  container.innerHTML = `<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${icon}</div>
      <p style="margin-bottom:16px">${msg}</p>
      <button class="btn btn-primary" id="msg-btn">${btnLabel}</button>
    </div>
  </div>`
  document.getElementById('msg-btn')?.addEventListener('click', btnFn)
}

function playerFromCard(card) {
  const p = card.player
  return {
    cardId: card.id,
    id: p.id,
    firstname: p.firstname,
    name: p.surname_encoded,
    country_code: p.country_code,
    club_id: p.club_id,
    job: p.job, job2: p.job2,
    note_g: Number(p.note_g)||0,
    note_d: Number(p.note_d)||0,
    note_m: Number(p.note_m)||0,
    note_a: Number(p.note_a)||0,
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
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const pool   = [...players]
  for (const role of ['GK','DEF','MIL','ATT']) {
    const linePlayers = []
    for (let i = 0; i < struct[role]; i++) {
      let idx = pool.findIndex(p => p.job === role)
      if (idx === -1) idx = pool.findIndex(p => p.job2 === role)
      if (idx === -1) idx = 0
      if (pool[idx]) {
        linePlayers.push({ ...pool[idx], _line: role })
        pool.splice(idx, 1)
      }
    }
    // Assigner les colonnes de grille
    const cols = getColsForCount(linePlayers.length)
    linePlayers.forEach((p, i) => { p._col = cols[i] })
    lines[role] = linePlayers
  }
  return lines
}

async function generateAITeam(formation, difficulty) {
  const { data: players } = await supabase
    .from('players')
    .select('id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity')
    .eq('is_active', true).limit(60)

  if (!players || players.length < 11) return generateFakeAITeam(formation)

  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const pool   = [...players]

  for (const role of ['GK','DEF','MIL','ATT']) {
    const candidates = pool.filter(p => p.job === role)
    const others     = pool.filter(p => p.job !== role)
    const sorted     = [...candidates, ...others]
    for (let i = 0; i < struct[role]; i++) {
      const p = sorted[i] || pool[i]
      if (p) lines[role].push({
        cardId: 'ai-'+p.id+'-'+i, id: p.id,
        firstname: p.firstname, name: p.surname_encoded,
        country_code: p.country_code, club_id: p.club_id,
        job: p.job, job2: p.job2,
        note_g: Number(p.note_g)||0, note_d: Number(p.note_d)||0,
        note_m: Number(p.note_m)||0, note_a: Number(p.note_a)||0,
        rarity: p.rarity, _line: role, used: false,
      })
    }
  }
  return lines
}

function generateFakeAITeam(formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const NAMES  = ['ROBOT','CYBER','NEXUS','ALGO','PIXEL','BYTE','LOGIC','TURBO','CORE','VOLT','FLUX']
  let n = 0
  for (const role of ['GK','DEF','MIL','ATT']) {
    for (let i = 0; i < struct[role]; i++) {
      const note = 3 + Math.floor(Math.random() * 5)
      lines[role].push({
        cardId:'fake-'+n, id:'fake-'+n,
        firstname:'IA', name: NAMES[n % NAMES.length],
        country_code:'XX', club_id: null,
        job: role, job2: null,
        note_g: role==='GK'?note:2, note_d: role==='DEF'?note:2,
        note_m: role==='MIL'?note:2, note_a: role==='ATT'?note:2,
        rarity:'normal', _line: role, used: false,
      })
      n++
    }
  }
  return lines
}

// ── Démarrage ─────────────────────────────────────────────
function startMatch(container, game, ctx) {
  const homeMid = game.homeTeam.MIL || []
  const aiMid   = game.aiTeam.MIL   || []
  const homeScore = calcMidfieldDuel(homeMid)
  const aiScore   = calcMidfieldDuel(aiMid)

  game.attacker = homeScore >= aiScore ? 'home' : 'ai'
  game.log.push({ text:`Duel milieu : Vous ${homeScore} - ${aiScore} IA → ${game.attacker==='home'?'Vous attaquez en 1er':'L\'IA attaque en 1er'}`, type:'info' })
  game.phase = game.attacker === 'home' ? 'attack' : 'ai-attack'
  renderGame(container, game, ctx)
  if (game.attacker === 'ai') setTimeout(() => aiTurn(container, game, ctx), 1200)
}

// ── Rendu du match ────────────────────────────────────────
function renderGame(container, game, ctx) {
  const phaseLabel = {
    'attack':    '⚔️ Choisissez vos attaquants',
    'defense':   '🛡️ Choisissez vos défenseurs',
    'ai-attack': '🤖 L\'IA attaque...',
    'ai-defense':'🤖 L\'IA défend...',
    'finished':  '🏁 Match terminé',
  }[game.phase] || ''

  container.innerHTML = `
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">VOUS vs IA (${game.difficulty.toUpperCase()})</div>
        <div class="match-score">${game.homeScore} – ${game.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${phaseLabel}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers -->
    ${(game.phase==='attack'||game.phase==='defense') && game.gcCards.filter(gc=>!game.usedGc.includes(gc.id)).length > 0 ? `
    <div style="padding:6px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">Game Changers</div>
      <div style="display:flex;gap:6px;overflow-x:auto">
        ${game.gcCards.filter(gc=>!game.usedGc.includes(gc.id)).map(gc=>`
          <div class="gc-mini" data-gc-id="${gc.id}" data-gc-type="${gc.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;text-align:center;min-width:80px">
            <div style="font-size:16px">${GC_DEFS[gc.gc_type]?.icon||'⚡'}</div>
            <div style="font-size:8px;color:#fff;font-weight:600">${gc.gc_type}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- Actions & calcul -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${game.log.slice(-6).map(e=>`<div class="log-entry ${e.type==='goal'?'log-goal':''}">${e.text}</div>`).join('')}
    </div>
  </div>`

  document.getElementById('match-quit')?.addEventListener('click', () => {
    if (confirm('Abandonner le match ?')) ctx.navigate('home')
  })
  document.getElementById('view-ai')?.addEventListener('click', () => showAITeam(game, ctx))

  renderField(container, game, ctx)
  renderActions(container, game, ctx)

  container.querySelectorAll('.gc-mini').forEach(el => {
    el.addEventListener('click', () => useGameChanger(el.dataset.gcId, el.dataset.gcType, container, game, ctx))
  })

  const log = document.getElementById('match-log')
  if (log) log.scrollTop = log.scrollHeight
}

// ── Terrain ───────────────────────────────────────────────
function renderField(container, game, ctx) {
  const field = document.getElementById('match-field')
  if (!field) return

  const isSelecting   = game.phase === 'attack' || game.phase === 'defense'
  const selectRoles   = game.phase === 'attack' ? ['MIL','ATT'] : ['GK','DEF','MIL']

  // Afficher toutes les notes selon la phase
  const displayRole   = game.phase === 'attack' ? 'ATT'
                      : game.phase === 'defense' ? null   // mixte : voir ci-dessous
                      : null

  const lines = ['ATT','MIL','DEF','GK']

  field.innerHTML = `<div class="match-grid">
    ${lines.map(role => {
      const players = game.homeTeam[role] || []
      if (!players.length) return ''
      return `<div class="match-row">
        ${players.map((p,idx) => {
          const selectable = isSelecting && selectRoles.includes(role) && !p.used
          const isSelected = game.selected.some(s => s.cardId === p.cardId)

          // Note affichée : toujours la note du rôle du SLOT (pas de la phase)
          // Mais en attaque on affiche note_a, en défense on affiche note_d/note_g
          let note
          if (game.phase === 'attack') {
            note = getNoteForRole(p, 'ATT')
          } else if (game.phase === 'defense') {
            note = (role === 'GK') ? getNoteForRole(p,'GK') : getNoteForRole(p,'DEF')
          } else {
            note = getNoteForRole(p, role)
          }

          return `<div class="match-slot ${selectable?'selectable':''} ${isSelected?'selected':''} ${p.used?'used':''}"
            data-card-id="${p.cardId}" data-role="${role}" data-idx="${idx}">
            <div class="slot-note" style="color:${p.used?'#666':'#fff'}">${p.used?'–':note}</div>
            <div class="slot-name">${p.name}</div>
          </div>`
        }).join('')}
      </div>`
    }).join('')}
  </div>`

  field.querySelectorAll('.match-slot.selectable').forEach(el => {
    el.addEventListener('click', () => toggleSelect(el, game, container, ctx))
  })
}

// ── Sélection joueurs ─────────────────────────────────────
function toggleSelect(el, game, container, ctx) {
  const cardId = el.dataset.cardId
  const role   = el.dataset.role
  const idx    = parseInt(el.dataset.idx)

  const existing = game.selected.findIndex(s => s.cardId === cardId)
  if (existing !== -1) {
    game.selected.splice(existing, 1)
  } else {
    if (game.selected.length >= 3) { ctx.toast('Maximum 3 joueurs', 'error'); return }
    const player = (game.homeTeam[role]||[]).find(p => p.cardId === cardId)
    if (player) game.selected.push({ ...player, _role: role, _line: role, _idx: idx })
  }

  renderField(container, game, ctx)
  renderActions(container, game, ctx)
}

// ── Actions ───────────────────────────────────────────────
function renderActions(container, game, ctx) {
  const actions = document.getElementById('match-actions')
  if (!actions) return

  if (game.phase === 'attack') {
    const calc = game.selected.length > 0 ? calcAttack(game.selected, game.modifiers.home) : null
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${calc
          ? `ATT : <b style="color:var(--yellow);font-size:20px">${calc.total}</b>
             <span style="font-size:11px;opacity:.7">(${calc.base}${calc.links?` +${calc.links} liens`:''})${game.modifiers.home.doubleAttack?' ×2':''}</span>`
          : '<span style="opacity:.5">Sélectionne 1-3 attaquants/milieux adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${!calc?'disabled':''}>
        Attaquer →
      </button>`
    document.getElementById('confirm-attack')?.addEventListener('click', () => confirmAttack(container, game, ctx))

  } else if (game.phase === 'defense') {
    const calc = game.selected.length > 0 ? calcDefense(game.selected.map(s=>({...s,_line:s._role})), game.modifiers.home) : null
    const aiNote = game.pendingAttack?.total || 0
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">L'IA attaque avec <b style="color:#ff6b6b">${aiNote}</b></div>
        ${calc
          ? `DEF : <b style="color:var(--yellow);font-size:20px">${calc.total}</b>
             <span style="font-size:11px;opacity:.7">(${calc.base}${calc.links?` +${calc.links} liens`:''})</span>`
          : '<span style="opacity:.5">Sélectionne 1-3 défenseurs/GK adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${!calc?'disabled':''}>
        Défendre →
      </button>`
    document.getElementById('confirm-defense')?.addEventListener('click', () => confirmDefense(container, game, ctx))

  } else if (game.phase === 'finished') {
    actions.innerHTML = `<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>`
    document.getElementById('end-match')?.addEventListener('click', () => ctx.navigate('home'))

  } else {
    actions.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,.5);padding:8px;font-size:13px">⏳ Tour de l'IA...</div>`
  }
}

// ── Attaque joueur ────────────────────────────────────────
function confirmAttack(container, game, ctx) {
  const calc = calcAttack(game.selected, game.modifiers.home)
  game.pendingAttack = { ...calc, players: [...game.selected], side: 'home' }
  game.selected.forEach(sel => {
    const p = (game.homeTeam[sel._role]||[]).find(pp => pp.cardId === sel.cardId)
    if (p) p.used = true
  })
  game.log.push({ text:`Vous attaquez : ${calc.total} (${game.selected.map(p=>p.name).join(', ')})`, type:'info' })
  game.selected = []
  game.modifiers.home = {}
  game.phase = 'ai-defense'
  renderGame(container, game, ctx)
  setTimeout(() => aiDefend(container, game, ctx), 1200)
}

// ── Défense joueur ────────────────────────────────────────
function confirmDefense(container, game, ctx) {
  const selWithLine = game.selected.map(s => ({...s, _line: s._role}))
  const calc = calcDefense(selWithLine, game.modifiers.home)
  game.selected.forEach(sel => {
    const p = (game.homeTeam[sel._role]||[]).find(pp => pp.cardId === sel.cardId)
    if (p) p.used = true
  })
  const result = resolveDuel(game.pendingAttack.total, calc.total, game.modifiers.home)
  if (result.shielded) {
    game.log.push({ text:`🛡️ Bouclier ! But annulé.`, type:'info' })
  } else if (result.goal) {
    game.aiScore++
    game.log.push({ text:`⚽ BUT IA ! (${game.pendingAttack.total} > ${calc.total})`, type:'goal' })
  } else {
    game.log.push({ text:`🧤 Défense ! (${calc.total} ≥ ${game.pendingAttack.total})`, type:'info' })
  }
  game.selected = []
  game.modifiers.home = {}
  game.pendingAttack = null
  nextTurn(container, game, ctx, 'home-attack')
}

// ── IA attaque ────────────────────────────────────────────
function aiTurn(container, game, ctx) {
  const allAi = [...(game.aiTeam.MIL||[]),...(game.aiTeam.ATT||[])]
  const selected = aiSelectPlayers(allAi, 'attack', game.difficulty)
  if (!selected.length) { checkEnd(container, game, ctx); return }

  const calc = calcAttack(selected, game.modifiers.ai)
  game.pendingAttack = { ...calc, players: selected, side: 'ai' }
  selected.forEach(s => { s.used = true })
  game.log.push({ text:`IA attaque : ${calc.total}`, type:'info' })
  game.modifiers.ai = {}
  game.phase = 'defense'
  renderGame(container, game, ctx)
}

// ── IA défend ─────────────────────────────────────────────
function aiDefend(container, game, ctx) {
  const allAi = [...(game.aiTeam.GK||[]),...(game.aiTeam.DEF||[]),...(game.aiTeam.MIL||[])]
  const selected = aiSelectPlayers(allAi, 'defense', game.difficulty)

  // Si aucun défenseur disponible → DEF = 0 (GDD Petit 4)
  const defVal = selected.length > 0 ? calcDefense(selected, game.modifiers.ai).total : 0
  selected.forEach(s => { s.used = true })

  const result = resolveDuel(game.pendingAttack.total, defVal, game.modifiers.ai)
  if (result.shielded) {
    game.log.push({ text:`🛡️ Bouclier IA ! But annulé.`, type:'info' })
  } else if (result.goal) {
    game.homeScore++
    game.log.push({ text:`⚽ BUT VOUS ! (${game.pendingAttack.total} > ${defVal})`, type:'goal' })
  } else {
    game.log.push({ text:`🧤 IA défend ! (${defVal} ≥ ${game.pendingAttack.total})`, type:'info' })
  }
  game.modifiers.ai = {}
  game.pendingAttack = null
  nextTurn(container, game, ctx, 'ai-attack')
}

// ── Tour suivant ──────────────────────────────────────────
function nextTurn(container, game, ctx, next) {
  game.round++
  if (isMatchOver(game)) { finishMatch(container, game, ctx); return }

  if (next === 'home-attack') {
    const homeAttackers = [...(game.homeTeam.MIL||[]),...(game.homeTeam.ATT||[])].filter(p=>!p.used)
    if (!homeAttackers.length) {
      // Vérifier si le joueur peut encore défendre
      const homeDefenders = [...(game.homeTeam.GK||[]),...(game.homeTeam.DEF||[]),...(game.homeTeam.MIL||[])].filter(p=>!p.used)
      if (!homeDefenders.length) { finishMatch(container, game, ctx); return }
      // L'IA attaque et le joueur défend
      game.phase = 'ai-attack'
      renderGame(container, game, ctx)
      setTimeout(() => aiTurn(container, game, ctx), 800)
      return
    }
    game.phase = 'attack'
    renderGame(container, game, ctx)
  } else {
    const aiAttackers = [...(game.aiTeam.MIL||[]),...(game.aiTeam.ATT||[])].filter(p=>!p.used)
    if (!aiAttackers.length) { checkEnd(container, game, ctx); return }
    game.phase = 'ai-attack'
    renderGame(container, game, ctx)
    setTimeout(() => aiTurn(container, game, ctx), 800)
  }
}

function isMatchOver(game) {
  const homeOK = ['MIL','ATT','GK','DEF'].some(r => (game.homeTeam[r]||[]).some(p=>!p.used))
  const aiOK   = ['MIL','ATT','GK','DEF'].some(r => (game.aiTeam[r]||[]).some(p=>!p.used))
  return !homeOK && !aiOK
}

function checkEnd(container, game, ctx) {
  if (isMatchOver(game)) finishMatch(container, game, ctx)
  else { game.phase = 'attack'; renderGame(container, game, ctx) }
}

// ── Game Changer ──────────────────────────────────────────
function useGameChanger(gcId, gcType, container, game, ctx) {
  if (game.usedGc.includes(gcId)) return
  game.usedGc.push(gcId)

  switch (gcType) {
    case 'Double attaque':
      game.modifiers.home.doubleAttack = true
      game.log.push({ text:`⚡ Double attaque !`, type:'info' })
      break
    case 'Bouclier':
      game.modifiers.home.shield = true
      game.log.push({ text:`🛡️ Bouclier actif !`, type:'info' })
      break
    case 'Ressusciter': {
      let revived = false
      for (const role of ['ATT','MIL','DEF','GK']) {
        const p = (game.homeTeam[role]||[]).find(pp => pp.used)
        if (p) { p.used = false; revived = true; break }
      }
      game.log.push({ text: revived ? `💫 Joueur ressuscité !` : `💫 Aucun joueur à ressusciter`, type:'info' })
      break
    }
    case 'Vol de note':
      game.modifiers.ai.stolenNote = (game.modifiers.ai.stolenNote||0) + 1
      game.log.push({ text:`🎯 -1 à la prochaine action IA`, type:'info' })
      break
    case 'Gel': {
      const aiPool = [...(game.aiTeam.ATT||[]),...(game.aiTeam.MIL||[])].filter(p=>!p.used)
      if (aiPool.length) {
        const best = aiPool.sort((a,b) => getNoteForRole(b,'ATT')-getNoteForRole(a,'ATT'))[0]
        best.used = true
        game.log.push({ text:`❄️ ${best.name} (IA) gelé !`, type:'info' })
      }
      break
    }
    case 'Remplacement+':
      game.maxSubs++
      game.log.push({ text:`🔄 +1 remplacement`, type:'info' })
      break
  }

  supabase.from('cards').delete().eq('id', gcId).then(() => {})
  renderGame(container, game, ctx)
}

// ── Fin de match ──────────────────────────────────────────
async function finishMatch(container, game, ctx) {
  game.phase = 'finished'
  const { state } = ctx
  const isWin  = game.homeScore > game.aiScore
  const isDraw = game.homeScore === game.aiScore
  const result  = isWin ? 'victoire' : isDraw ? 'nul' : 'defaite'
  const rewards = getRewards(game.mode, result)

  game.log.push({
    text: isWin ? `🏆 Victoire ! +${rewards} cr.` : isDraw ? `🤝 Nul. +${rewards} cr.` : `❌ Défaite. +${rewards} cr.`,
    type: 'goal'
  })

  if (game.matchId) {
    await supabase.from('matches').update({
      status:'finished', home_score:game.homeScore, away_score:game.aiScore,
      winner_id: isWin ? state.profile.id : null,
      home_credits_reward: rewards, played_at: new Date().toISOString(),
    }).eq('id', game.matchId)
  }

  const updates = { credits:(state.profile.credits||0)+rewards, matches_played:(state.profile.matches_played||0)+1 }
  if (isWin) updates.wins = (state.profile.wins||0)+1
  else if (isDraw) updates.draws = (state.profile.draws||0)+1
  else updates.losses = (state.profile.losses||0)+1

  await supabase.from('users').update(updates).eq('id', state.profile.id)
  await ctx.refreshProfile()

  renderGame(container, game, ctx) // Afficher le score final
  showResultScreen(container, game, { isWin, isDraw, rewards }, ctx)
}

function showResultScreen(container, game, { isWin, isDraw, rewards }, ctx) {
  const overlay = document.createElement('div')
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000`
  overlay.innerHTML = `
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${isWin?'🏆':isDraw?'🤝':'😔'}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${isWin?'Victoire !':isDraw?'Match nul':'Défaite'}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${game.homeScore} – ${game.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${rewards.toLocaleString('fr')} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`
  document.body.appendChild(overlay)
  document.getElementById('res-home')?.addEventListener('click', () => { overlay.remove(); ctx.navigate('home') })
  document.getElementById('res-replay')?.addEventListener('click', () => { overlay.remove(); ctx.navigate('match', { matchMode: game.mode }) })
}

function showAITeam(game, ctx) {
  const lines = ['ATT','MIL','DEF','GK']
  ctx.openModal('Équipe adverse (IA)',
    `<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${lines.map(role => {
        const players = game.aiTeam[role]||[]
        if (!players.length) return ''
        return `<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${players.map(p => {
            const note = getNoteForRole(p, role)
            return `<div class="match-slot ${p.used?'used':''}" style="cursor:default">
              <div class="slot-note">${p.used?'–':note}</div>
              <div class="slot-name">${p.name}</div>
            </div>`
          }).join('')}
        </div>`
      }).join('')}
    </div>`,
    `<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )
}
