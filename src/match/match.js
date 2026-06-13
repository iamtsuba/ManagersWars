import { supabase } from '../lib/supabase.js'
import {
  GC_DEFS, getNoteForRole, getColsForCount, calcAttack, calcDefense,
  calcMidfieldDuel, resolveDuel, aiSelectPlayers, getRewards
} from './game-logic.js'
import { FORMATION_LINKS, FORMATION_POSITIONS, linkColor } from './formation-links.js'

const FORMATIONS = {
  '4-3-3 (3)': { GK:1, DEF:4, MIL:3, ATT:3 },
  '5-3-2':     { GK:1, DEF:5, MIL:3, ATT:2 },
  '4-3-3 (4)': { GK:1, DEF:4, MIL:3, ATT:3 },
  '4-3-2-1':   { GK:1, DEF:4, MIL:3, ATT:3 },
  '4-3-3 (2)': { GK:1, DEF:4, MIL:3, ATT:3 },
  '4-3-3':     { GK:1, DEF:4, MIL:3, ATT:3 },
  '4-3-3 (5)': { GK:1, DEF:4, MIL:3, ATT:3 },
  '5-2-2-1':   { GK:1, DEF:5, MIL:2, ATT:3 },
  '4-3-1-2':   { GK:1, DEF:4, MIL:4, ATT:2 },
  '5-2-1-2':   { GK:1, DEF:5, MIL:3, ATT:2 },
  '4-5-1 (2)': { GK:1, DEF:4, MIL:5, ATT:1 },
  '4-5-1':     { GK:1, DEF:4, MIL:5, ATT:1 },
  '4-4-2':     { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-4-2 (2)': { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-4-1-1':   { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-1-2-1-2':     { GK:1, DEF:4, MIL:4, ATT:2 },
  '3-4-1-2':       { GK:1, DEF:3, MIL:5, ATT:2 },
  '3-4-2-1':       { GK:1, DEF:3, MIL:4, ATT:3 },
  '3-5-2':         { GK:1, DEF:3, MIL:5, ATT:2 },
  '4-1-4-1':       { GK:1, DEF:4, MIL:5, ATT:1 },
  '4-2-2-2':       { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-2-3-1':       { GK:1, DEF:4, MIL:5, ATT:1 },
  '4-2-3-1 (2)':   { GK:1, DEF:4, MIL:5, ATT:1 },
  '3-4-3':         { GK:1, DEF:3, MIL:4, ATT:3 },
  '4-1-2-1-2 (2)': { GK:1, DEF:4, MIL:4, ATT:2 },
}
const JOB_COLORS = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }

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

function getPortrait(p) {
  const url = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : ''
  if (!url || !p?.skin || !p?.hair) return null
  const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
  return `${url}/storage/v1/object/public/assets/tetes/${key}.png`
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
    skin: p.skin, hair: p.hair, hair_length: p.hair_length,
    boost: 0,
    used: false,
    _line: null, _col: null,
  }
}

function getColsForLine(n) {
  if (n===1) return [1]
  if (n===2) return [0,2]
  if (n===3) return [0,1,2]
  if (n===4) return [0,1,1,2]
  if (n===5) return [0,1,1,1,2]
  return [1]
}

// ── Tirage du Boost ───────────────────────────────────────
function rollBoost() {
  const r = Math.random() * 100
  if (r < 0.1)  return 4   // 0.1%
  if (r < 5.0)  return 3   // 4.9%
  if (r < 20.0) return 2   // 15%
  return 1                  // 80%
}

// ── Construction d'équipe ─────────────────────────────────
function buildTeam(starters, formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const pool   = [...starters]
  for (const role of ['GK','DEF','MIL','ATT']) {
    const linePlayers = []
    for (let i = 0; i < struct[role]; i++) {
      let idx = pool.findIndex(p => p.job === role)
      if (idx === -1) idx = pool.findIndex(p => p.job2 === role)
      if (idx === -1) idx = 0
      if (pool[idx]) {
        const p = { ...pool[idx], _line: role }
        linePlayers.push(p)
        pool.splice(idx, 1)
      }
    }
    const cols = getColsForLine(linePlayers.length)
    linePlayers.forEach((p, i) => { p._col = cols[i] })
    lines[role] = linePlayers
  }
  return lines
}

async function generateAITeam(formation, difficulty) {
  const { data: players } = await supabase
    .from('players')
    .select('id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length')
    .eq('is_active', true).limit(60)

  if (!players || players.length < 11) return generateFakeAITeam(formation)

  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const pool   = [...players]

  for (const role of ['GK','DEF','MIL','ATT']) {
    const candidates = pool.filter(p => p.job === role)
    const others     = pool.filter(p => p.job !== role)
    const sorted     = [...candidates, ...others]
    const linePlayers = []
    for (let i = 0; i < struct[role]; i++) {
      const p = sorted[i] || pool[i]
      if (p) linePlayers.push({
        cardId:'ai-'+p.id+'-'+i, id:p.id,
        firstname:p.firstname, name:p.surname_encoded,
        country_code:p.country_code, club_id:p.club_id,
        job:p.job, job2:p.job2,
        note_g:Number(p.note_g)||0, note_d:Number(p.note_d)||0,
        note_m:Number(p.note_m)||0, note_a:Number(p.note_a)||0,
        rarity:p.rarity, skin:p.skin, hair:p.hair, hair_length:p.hair_length,
        boost:0, used:false, _line:role,
      })
    }
    const cols = getColsForLine(linePlayers.length)
    linePlayers.forEach((p,i) => { p._col = cols[i] })
    lines[role] = linePlayers
  }
  return lines
}

function generateFakeAITeam(formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const lines  = { GK:[], DEF:[], MIL:[], ATT:[] }
  const NAMES  = ['ROBOT','CYBER','NEXUS','ALGO','PIXEL','BYTE','LOGIC','TURBO','CORE','VOLT','FLUX']
  let n = 0
  for (const role of ['GK','DEF','MIL','ATT']) {
    const linePlayers = []
    for (let i = 0; i < struct[role]; i++) {
      const note = 3 + Math.floor(Math.random() * 5)
      linePlayers.push({
        cardId:'fake-'+n, id:'fake-'+n,
        firstname:'IA', name:NAMES[n%NAMES.length],
        country_code:'XX', club_id:null,
        job:role, job2:null,
        note_g:role==='GK'?note:2, note_d:role==='DEF'?note:2,
        note_m:role==='MIL'?note:2, note_a:role==='ATT'?note:2,
        rarity:'normal', boost:0, used:false, _line:role,
      })
      n++
    }
    const cols = getColsForLine(linePlayers.length)
    linePlayers.forEach((p,i) => { p._col = cols[i] })
    lines[role] = linePlayers
  }
  return lines
}

// ── ENTRY POINT ───────────────────────────────────────────
export async function renderMatch(container, ctx) {
  const { state, navigate, toast } = ctx
  const params = state.params || {}
  container.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const matchMode  = params.matchMode || 'vs_ai_easy'
  const difficulty = matchMode.replace('vs_ai_','')
  const mode       = matchMode

  // Si pas encore de deck sélectionné → écran de sélection
  if (!params.deckId) {
    return renderDeckSelect(container, ctx, matchMode)
  }

  const deckId = params.deckId

  // Charger le deck
  const { data: deckCards } = await supabase
    .from('deck_cards')
    .select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`)
    .eq('deck_id', deckId).order('slot_order')

  const starters = (deckCards||[]).filter(dc => dc.is_starter && dc.card?.player).map(dc => playerFromCard(dc.card))
  const subsRaw  = (deckCards||[]).filter(dc => !dc.is_starter && dc.card?.player).map(dc => playerFromCard(dc.card))

  if (starters.length < 11) {
    showMsg(container, '⚠️', `Deck incomplet (${starters.length}/11).`, 'Compléter', () => navigate('decks'))
    return
  }

  const formationCard = (deckCards||[]).find(dc => dc.card?.card_type === 'formation')
  const formation     = formationCard?.card?.formation || '4-4-2'

  const { data: gcCards } = await supabase
    .from('cards').select('id,gc_type')
    .eq('owner_id', state.profile.id).eq('card_type','game_changer')

  const homeTeam = buildTeam(starters, formation)
  const aiTeam   = await generateAITeam(formation, difficulty)

  const { data: match } = await supabase.from('matches').insert({
    home_id: state.profile.id, away_id:null, mode,
    home_deck_id: deckId, status:'in_progress',
  }).select().single()

  const game = {
    matchId: match?.id, mode, difficulty, formation,
    homeTeam, aiTeam,
    homeSubs: subsRaw,
    subsUsed: 0, maxSubs: Math.min(subsRaw.length, 3),
    homeScore:0, aiScore:0,
    gcCards: gcCards||[], usedGc:[],
    boostCard: null,    // { value: N } si gagné
    boostUsed: false,
    phase:'midfield',
    attacker:null, round:0,
    selected:[], pendingAttack:null,
    log:[], modifiers:{ home:{}, ai:{} },
    clubName: state.profile.club_name || 'Vous',
  }

  // Démarrer avec animation duel milieu
  showMidfieldAnimation(container, game, ctx)
}

// ── SÉLECTION DU DECK ─────────────────────────────────────
async function renderDeckSelect(container, ctx, matchMode) {
  const { state, navigate } = ctx

  const { data: decks } = await supabase
    .from('decks').select('id,name,is_active,formation_card_id')
    .eq('owner_id', state.profile.id).order('created_at', { ascending:false })

  if (!decks || decks.length === 0) {
    showMsg(container, '📋', 'Aucun deck. Crée un deck avant de jouer !', 'Créer un deck', () => navigate('decks'))
    return
  }

  container.innerHTML = `
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px">
    <div style="text-align:center;margin-bottom:24px;color:#fff">
      <div style="font-size:14px;opacity:.6;text-transform:uppercase;letter-spacing:1px">Match vs IA — ${matchMode.replace('vs_ai_','').toUpperCase()}</div>
      <div style="font-size:22px;font-weight:900;margin-top:6px">Choisis ton deck</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px">
      ${decks.map(d => `
        <div class="deck-select-card" data-deck-id="${d.id}" style="
          background:rgba(255,255,255,0.08);border:2px solid ${d.is_active?'var(--yellow)':'rgba(255,255,255,0.2)'};
          border-radius:12px;padding:16px;cursor:pointer;transition:all .15s;color:#fff">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:700;font-size:15px">${d.name}</div>
              <div style="font-size:11px;opacity:.6;margin-top:2px">${d.is_active?'Deck actif':'—'}</div>
            </div>
            <div style="font-size:24px">→</div>
          </div>
        </div>`).join('')}
    </div>
    <button class="btn btn-ghost" id="cancel-deck-select" style="margin-top:20px;color:rgba(255,255,255,0.5);border-color:rgba(255,255,255,0.2)">Annuler</button>
  </div>`

  container.querySelectorAll('.deck-select-card').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.14)')
    el.addEventListener('mouseleave', () => el.style.background = 'rgba(255,255,255,0.08)')
    el.addEventListener('click', () => {
      ctx.navigate('match', { matchMode, deckId: el.dataset.deckId })
    })
  })
  document.getElementById('cancel-deck-select')?.addEventListener('click', () => navigate('home'))
}

// ── ANIMATION DUEL MILIEU ─────────────────────────────────
function showMidfieldAnimation(container, game, ctx) {
  const homeMils = game.homeTeam.MIL || []
  const aiMils   = game.aiTeam.MIL   || []

  function milScore(mils) {
    return mils.reduce((s,p) => s + getNoteForRole(p,'MIL'), 0)
  }
  function milLinks(mils) {
    let bonus = 0
    for (let i = 0; i < mils.length-1; i++) {
      const c = linkColor(mils[i], mils[i+1])
      if (c !== '#333') bonus++
    }
    return bonus
  }

  const homeTotal = milScore(homeMils) + milLinks(homeMils)
  const aiTotal   = milScore(aiMils)   + milLinks(aiMils)
  const homeWins  = homeTotal >= aiTotal

  function renderMilRow(mils, label, color) {
    return `<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${label}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${mils.map((p, i) => {
          const portrait = getPortrait(p)
          const lc = i < mils.length-1 ? linkColor(p, mils[i+1]) : null
          return `
          <div style="width:52px;height:52px;border-radius:8px;background:${color};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${portrait?`<img src="${portrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:''}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${getNoteForRole(p,'MIL')}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</div>
          </div>
          ${lc ? `<div style="width:12px;height:4px;border-radius:2px;background:${lc};flex-shrink:0;opacity:${lc==='#333'?0.3:0.9}"></div>` : ''}
          `
        }).join('')}
      </div>
    </div>`
  }

  container.innerHTML = `
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:20px;padding:20px">
    <div style="text-align:center;color:#fff">
      <div style="font-size:12px;opacity:.5;letter-spacing:1px">DUEL DU MILIEU DE TERRAIN</div>
    </div>

    ${renderMilRow(homeMils, game.clubName.toUpperCase(), '#D4A017')}

    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div id="score-home" style="font-size:42px;font-weight:900;color:#D4A017;transition:all 0.5s">${homeTotal}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4)">VS</div>
      <div id="score-ai" style="font-size:42px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.5s">${aiTotal}</div>
    </div>

    ${renderMilRow(aiMils, 'IA', '#bb2020')}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff">
      <div style="font-size:18px;font-weight:900"></div>
    </div>
  </div>`

  // Animation : la note gagnante grossit
  setTimeout(() => {
    const elHome = document.getElementById('score-home')
    const elAi   = document.getElementById('score-ai')
    const elRes  = document.getElementById('midfield-result')
    if (elHome && elAi) {
      if (homeWins) {
        elHome.style.fontSize = '72px'
        elHome.style.color = '#fff'
        elAi.style.opacity = '0.3'
      } else {
        elAi.style.fontSize = '72px'
        elAi.style.color = '#fff'
        elHome.style.opacity = '0.3'
      }
    }
    if (elRes) {
      const boostValue = rollBoost()
      elRes.style.opacity = '1'
      const winner = homeWins ? game.clubName : 'IA'
      elRes.innerHTML = `
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${winner} remporte le milieu !
        </div>
        ${homeWins ? `
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${boostValue}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>` : ''}
      `
      if (homeWins) game.boostCard = { value: boostValue }
    }

    game.attacker = homeWins ? 'home' : 'ai'
    game.log.push({ text:`Duel milieu : ${game.clubName} ${homeTotal} – ${aiTotal} IA → ${homeWins ? game.clubName : 'IA'} attaque en premier`, type:'info' })

    setTimeout(() => {
      game.phase = game.attacker === 'home' ? 'attack' : 'ai-attack'
      renderGame(container, game, ctx)
      if (game.attacker === 'ai') setTimeout(() => aiTurn(container, game, ctx), 1000)
    }, 2800)
  }, 1200)
}

// ── TERRAIN DU MATCH (SVG pur avec liens formation) ──────
function buildTeamSVG(team, formation, phase, selectedIds, W=310, H=310) {
  const FPOS   = FORMATION_POSITIONS[formation] || {}
  const FLINKS = FORMATION_LINKS[formation]     || []
  const R      = 26

  // Construire slots map positionnel : pos → player
  const slots = {}
  const LINES = ['ATT','MIL','DEF','GK']
  for (const role of LINES) {
    const players = team[role] || []
    players.forEach((p, i) => { slots[`${role}${i+1}`] = p })
  }

  function px(pos) {
    const p = FPOS[pos]; return p ? { x:p.x*W, y:p.y*H } : null
  }

  let svg = ''

  // 1. Liens
  for (const [posA, posB] of FLINKS) {
    const a = px(posA), b = px(posB)
    if (!a || !b) continue
    const pA = slots[posA], pB = slots[posB]
    const lc = linkColor(pA, pB)
    const op = lc === '#ff3333' ? 0.25 : 0.9
    const fw = lc !== '#ff3333' ? `filter="url(#glow${lc.replace('#','').slice(0,6)})"` : ''
    svg += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
      stroke="${lc}" stroke-width="3.5" stroke-linecap="round" opacity="${op}" ${fw}/>`
  }

  // 2. Joueurs
  for (const [pos, p] of Object.entries(slots)) {
    const c = px(pos)
    if (!c) continue
    const role = pos.replace(/[0-9]/g,'')
    const JC   = {GK:'#111',DEF:'#bb2020',MIL:'#D4A017',ATT:'#1A6B3C'}
    const bg   = JC[role] || '#555'

    const selectable = (phase==='attack' && ['MIL','ATT'].includes(role) && !p.used)
                    || (phase==='defense' && ['GK','DEF','MIL'].includes(role) && !p.used)
    const isSelected = selectedIds.includes(p.cardId)

    let note
    if      (phase==='attack')  note = role==='MIL'?Number(p.note_m)||0 : Number(p.note_a)||0
    else if (phase==='defense') note = role==='GK'?Number(p.note_g)||0 : role==='MIL'?Number(p.note_m)||0 : Number(p.note_d)||0
    else                        note = Number(role==='GK'?p.note_g : role==='DEF'?p.note_d : role==='MIL'?p.note_m : p.note_a)||0
    note = (note + (p.boost||0))

    const borderColor = isSelected ? '#FFD700' : selectable ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'
    const borderWidth = isSelected ? 3 : 2
    const fillOpacity = p.used ? 0.25 : 1

    const portrait = getPortrait(p)

    if (portrait) {
      svg += `<defs><clipPath id="mc-${pos}"><circle cx="${c.x}" cy="${c.y}" r="${R}"/></clipPath></defs>`
    }

    svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="${bg}" opacity="${fillOpacity}"
      stroke="${borderColor}" stroke-width="${borderWidth}"/>`

    if (portrait && !p.used) {
      svg += `<image href="${portrait}" x="${c.x-R}" y="${c.y-R}" width="${R*2}" height="${R*2}"
        clip-path="url(#mc-${pos})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`
      svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="${bg}" opacity="0.35"
        stroke="${borderColor}" stroke-width="${borderWidth}"/>`
    }

    if (p.boost) {
      svg += `<rect x="${c.x+R-10}" y="${c.y-R}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${c.x+R-3}" y="${c.y-R+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${p.boost}</text>`
    }

    svg += `<text x="${c.x}" y="${c.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${p.used?'#555':'white'}" font-family="Arial Black,Arial">${p.used?'–':note}</text>
    <text x="${c.x}" y="${c.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${p.used?0.3:0.8})"
      font-family="Arial">${(p.name||'').slice(0,8)}</text>`

    if (selectable) {
      svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${isSelected?'selected':''}" data-card-id="${p.cardId}" data-role="${role}"
        style="cursor:pointer"/>`
    }
  }

  const glowDefs = `<defs>
    <filter id="glow00ff88"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glowFFD700"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;max-width:360px;margin:0 auto">
    ${glowDefs}${svg}
  </svg>`
}

function renderTeam(team, formation, phase, selectedIds) {
  return `<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${buildTeamSVG(team, formation, phase, selectedIds)}
  </div>`
}


// ── RENDU PRINCIPAL DU MATCH ──────────────────────────────
function renderGame(container, game, ctx) {
  const phaseLabel = {
    'attack':    '⚔️ Choisissez vos attaquants',
    'defense':   '🛡️ Choisissez vos défenseurs',
    'ai-attack': '🤖 L\'IA attaque...',
    'ai-defense':'🤖 L\'IA défend...',
    'finished':  '🏁 Match terminé',
  }[game.phase] || ''

  const selectedIds = game.selected.map(s => s.cardId)

  // Remplaçants disponibles (non encore utilisés comme remplacement)
  const usedSubIds = game.usedSubIds || []
  const availSubs  = game.homeSubs.filter(s => !usedSubIds.includes(s.cardId))

  // Joueurs grisés (utilisés) dans l'équipe
  const grayedPlayers = Object.values(game.homeTeam).flat().filter(p => p.used)

  container.innerHTML = `
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">${game.clubName} vs IA (${game.difficulty.toUpperCase()})</div>
        <div class="match-score">${game.homeScore} – ${game.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${phaseLabel}</div>

    <!-- Terrain -->
    <div class="match-field" id="match-field" style="position:relative">
      ${renderTeam(game.homeTeam, game.formation, game.phase, selectedIds)}
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${game.gcCards.filter(gc=>!game.usedGc.includes(gc.id)).map(gc=>`
        <div class="gc-mini" data-gc-id="${gc.id}" data-gc-type="${gc.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${GC_DEFS[gc.gc_type]?.icon||'⚡'}</div>
          <div style="font-size:7px;color:#fff;font-weight:600">${gc.gc_type}</div>
        </div>`).join('')}

      <!-- Boost -->
      ${game.boostCard && !game.boostUsed ? `
        <div id="boost-card" style="flex-shrink:0;background:linear-gradient(135deg,#4a9fc4,#87CEEB);
          border:2px solid #87CEEB;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">⚡</div>
          <div style="font-size:9px;color:#000;font-weight:900">BOOST +${game.boostCard.value}</div>
          <div style="font-size:6px;color:rgba(0,0,0,0.7)">1 joueur</div>
        </div>` : ''}

      <!-- Remplacements -->
      ${grayedPlayers.length > 0 && availSubs.length > 0 && game.subsUsed < game.maxSubs ? `
        <div id="sub-btn" style="flex-shrink:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);
          border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">🔄</div>
          <div style="font-size:7px;color:#fff">Remplaçant</div>
          <div style="font-size:6px;color:rgba(255,255,255,0.5)">(${game.subsUsed}/${game.maxSubs})</div>
        </div>` : ''}
    </div>

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${game.log.slice(-6).map(e=>`<div class="log-entry ${e.type==='goal'?'log-goal':''}">${e.text}</div>`).join('')}
    </div>
  </div>`

  // Events
  document.getElementById('match-quit')?.addEventListener('click', () => {
    if (confirm('Abandonner le match ?')) ctx.navigate('home')
  })
  document.getElementById('view-ai')?.addEventListener('click', () => showAITeam(game, ctx))

  renderMatchActions(container, game, ctx)

  container.querySelectorAll('.match-slot-hit').forEach(el => {
    el.addEventListener('click', () => toggleSelect(el, game, container, ctx))
  })

  container.querySelectorAll('.gc-mini').forEach(el => {
    el.addEventListener('click', () => useGameChanger(el.dataset.gcId, el.dataset.gcType, container, game, ctx))
  })

  document.getElementById('boost-card')?.addEventListener('click', () => {
    useBoost(container, game, ctx)
  })

  document.getElementById('sub-btn')?.addEventListener('click', () => {
    openSubstitution(container, game, ctx)
  })

  const log = document.getElementById('match-log')
  if (log) log.scrollTop = log.scrollHeight
}

// ── ACTIONS ───────────────────────────────────────────────
function renderMatchActions(container, game, ctx) {
  const actions = document.getElementById('match-actions')
  if (!actions) return

  if (game.phase === 'attack') {
    const calc = game.selected.length > 0 ? calcAttack(game.selected.map(s=>({...s,_line:s._role})), game.modifiers.home) : null
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${calc
          ? `ATT : <b style="color:var(--yellow);font-size:20px">${calc.total}</b>
             <span style="font-size:11px;opacity:.7">(${calc.base}${calc.links?` +${calc.links} liens`:''}${game.modifiers.home.doubleAttack?' ×2':''})</span>`
          : '<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${!calc?'disabled':''}>Attaquer →</button>`
    document.getElementById('confirm-attack')?.addEventListener('click', () => confirmAttack(container, game, ctx))

  } else if (game.phase === 'defense') {
    const calc = game.selected.length > 0 ? calcDefense(game.selected.map(s=>({...s,_line:s._role})), game.modifiers.home) : null
    actions.innerHTML = `
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${game.pendingAttack?.total||0}</b></div>
        ${calc
          ? `DEF : <b style="color:var(--yellow);font-size:20px">${calc.total}</b>`
          : '<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${!calc?'disabled':''}>Défendre →</button>`
    document.getElementById('confirm-defense')?.addEventListener('click', () => confirmDefense(container, game, ctx))

  } else if (game.phase === 'finished') {
    actions.innerHTML = `<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>`
    document.getElementById('end-match')?.addEventListener('click', () => ctx.navigate('home'))
  } else {
    actions.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`
  }
}

// ── SÉLECTION ─────────────────────────────────────────────
function toggleSelect(el, game, container, ctx) {
  const cardId = el.dataset.cardId
  const role   = el.dataset.role
  const existing = game.selected.findIndex(s => s.cardId === cardId)
  if (existing !== -1) {
    game.selected.splice(existing, 1)
  } else {
    if (game.selected.length >= 3) { ctx.toast('Maximum 3 joueurs', 'error'); return }
    const player = (game.homeTeam[role]||[]).find(p => p.cardId === cardId)
    if (player) game.selected.push({ ...player, _role: role, _line: role })
  }
  renderGame(container, game, ctx)
}

// ── ATTAQUE ───────────────────────────────────────────────
function confirmAttack(container, game, ctx) {
  const selected = game.selected.map(s=>({...s,_line:s._role}))
  const calc = calcAttack(selected, game.modifiers.home)
  game.pendingAttack = { ...calc, players:[...game.selected], side:'home' }
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

// ── DÉFENSE ───────────────────────────────────────────────
function confirmDefense(container, game, ctx) {
  const selected = game.selected.map(s=>({...s,_line:s._role}))
  const calc = calcDefense(selected, game.modifiers.home)
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

// ── IA ────────────────────────────────────────────────────
function aiTurn(container, game, ctx) {
  const allAi = [...(game.aiTeam.MIL||[]),...(game.aiTeam.ATT||[])]
  const selected = aiSelectPlayers(allAi, 'attack', game.difficulty)
  if (!selected.length) { checkEnd(container, game, ctx); return }
  const calc = calcAttack(selected, game.modifiers.ai)
  game.pendingAttack = { ...calc, players:selected, side:'ai' }
  selected.forEach(s => { s.used = true })
  game.log.push({ text:`IA attaque : ${calc.total}`, type:'info' })
  game.modifiers.ai = {}
  game.phase = 'defense'
  renderGame(container, game, ctx)
}

function aiDefend(container, game, ctx) {
  const allAi = [...(game.aiTeam.GK||[]),...(game.aiTeam.DEF||[]),...(game.aiTeam.MIL||[])]
  const selected = aiSelectPlayers(allAi, 'defense', game.difficulty)
  const defVal = selected.length > 0 ? calcDefense(selected, game.modifiers.ai).total : 0
  selected.forEach(s => { s.used = true })
  const result = resolveDuel(game.pendingAttack.total, defVal, game.modifiers.ai)
  if (result.shielded) {
    game.log.push({ text:`🛡️ Bouclier IA !`, type:'info' })
  } else if (result.goal) {
    game.homeScore++
    game.log.push({ text:`⚽ BUT ! (${game.pendingAttack.total} > ${defVal})`, type:'goal' })
  } else {
    game.log.push({ text:`🧤 IA défend (${defVal} ≥ ${game.pendingAttack.total})`, type:'info' })
  }
  game.modifiers.ai = {}
  game.pendingAttack = null
  nextTurn(container, game, ctx, 'ai-attack')
}

// ── TOURS ─────────────────────────────────────────────────
function nextTurn(container, game, ctx, next) {
  game.round++
  if (isMatchOver(game)) { finishMatch(container, game, ctx); return }
  if (next === 'home-attack') {
    const homeAtt = [...(game.homeTeam.MIL||[]),...(game.homeTeam.ATT||[])].filter(p=>!p.used)
    if (!homeAtt.length) {
      const homeDef = [...(game.homeTeam.GK||[]),...(game.homeTeam.DEF||[]),...(game.homeTeam.MIL||[])].filter(p=>!p.used)
      if (!homeDef.length) { finishMatch(container, game, ctx); return }
      game.phase = 'ai-attack'
      renderGame(container, game, ctx)
      setTimeout(() => aiTurn(container, game, ctx), 800)
      return
    }
    game.phase = 'attack'
    renderGame(container, game, ctx)
  } else {
    const aiAtt = [...(game.aiTeam.MIL||[]),...(game.aiTeam.ATT||[])].filter(p=>!p.used)
    if (!aiAtt.length) { checkEnd(container, game, ctx); return }
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

// ── BOOST ─────────────────────────────────────────────────
function useBoost(container, game, ctx) {
  const allPlayers = Object.values(game.homeTeam).flat().filter(p => !p.used)
  if (!allPlayers.length) { ctx.toast('Aucun joueur actif à booster', 'error'); return }

  ctx.openModal('⚡ Utiliser le Boost',
    `<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${game.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${allPlayers.map(p => `
        <div class="player-boost-opt" data-card-id="${p.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${JOB_COLORS[p.job]||'#888'};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${getNoteForRole(p,p._line||p.job)}</div>
          <div style="flex:1"><b>${p.firstname} ${p.name}</b><div style="font-size:11px;color:#888">${p._line||p.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${game.boostCard.value}</div>
        </div>`).join('')}
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`
  )

  document.querySelectorAll('.player-boost-opt').forEach(el => {
    el.addEventListener('click', () => {
      const cardId = el.dataset.cardId
      for (const role of ['GK','DEF','MIL','ATT']) {
        const p = (game.homeTeam[role]||[]).find(pp => pp.cardId === cardId)
        if (p) {
          p.boost = (p.boost||0) + game.boostCard.value
          game.log.push({ text:`⚡ Boost +${game.boostCard.value} appliqué à ${p.name}`, type:'info' })
          break
        }
      }
      game.boostUsed = true
      ctx.closeModal()
      renderGame(container, game, ctx)
    })
  })
}

// ── REMPLACEMENT ──────────────────────────────────────────
function openSubstitution(container, game, ctx) {
  if (!game.usedSubIds) game.usedSubIds = []
  const grayedPlayers = Object.values(game.homeTeam).flat().filter(p => p.used)
  const availSubs     = game.homeSubs.filter(s => !game.usedSubIds.includes(s.cardId))

  if (!grayedPlayers.length) { ctx.toast('Aucun joueur grisé', 'info'); return }
  if (!availSubs.length)      { ctx.toast('Aucun remplaçant disponible', 'info'); return }
  if (game.subsUsed >= game.maxSubs) { ctx.toast(`Maximum ${game.maxSubs} remplacements`, 'error'); return }

  ctx.openModal('🔄 Remplacement',
    `<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${grayedPlayers.map(p => `
        <div class="grayed-opt" data-card-id="${p.cardId}" data-role="${p._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${JOB_COLORS[p.job]||'#888'};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${p._line}</div>
          <div><b>${p.firstname} ${p.name}</b></div>
        </div>`).join('')}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${availSubs.map(s => `
        <div class="sub-opt" data-card-id="${s.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${JOB_COLORS[s.job]||'#888'};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s.job}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join('')}
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`
  )

  let selectedGrayed = null
  let selectedSub    = null

  document.querySelectorAll('.grayed-opt').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.grayed-opt').forEach(e => e.style.borderColor='#eee')
      el.style.borderColor = '#c0392b'
      selectedGrayed = { cardId: el.dataset.cardId, role: el.dataset.role }
      tryConfirmSub()
    })
  })

  document.querySelectorAll('.sub-opt').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.sub-opt').forEach(e => e.style.borderColor='var(--green)')
      el.style.borderColor = '#D4A017'
      selectedSub = el.dataset.cardId
      tryConfirmSub()
    })
  })

  function tryConfirmSub() {
    if (!selectedGrayed || !selectedSub) return
    const role = selectedGrayed.role
    const team = game.homeTeam[role] || []
    const idx  = team.findIndex(p => p.cardId === selectedGrayed.cardId)
    const subPlayer = game.homeSubs.find(s => s.cardId === selectedSub)
    if (idx !== -1 && subPlayer) {
      subPlayer._line = role
      subPlayer._col  = team[idx]._col
      subPlayer.used  = false
      team.splice(idx, 1, subPlayer)
      game.usedSubIds = [...(game.usedSubIds||[]), selectedSub]
      game.subsUsed++
      game.log.push({ text:`🔄 Remplacement : ${subPlayer.firstname} ${subPlayer.name} entre`, type:'info' })
    }
    ctx.closeModal()
    renderGame(container, game, ctx)
  }
}

// ── GAME CHANGER ──────────────────────────────────────────
function useGameChanger(gcId, gcType, container, game, ctx) {
  if (game.usedGc.includes(gcId)) return
  game.usedGc.push(gcId)
  switch (gcType) {
    case 'Double attaque': game.modifiers.home.doubleAttack=true; game.log.push({text:'⚡ Double attaque !',type:'info'}); break
    case 'Bouclier': game.modifiers.home.shield=true; game.log.push({text:'🛡️ Bouclier !',type:'info'}); break
    case 'Ressusciter': {
      let revived=false
      for (const r of ['ATT','MIL','DEF','GK']) {
        const p=(game.homeTeam[r]||[]).find(pp=>pp.used)
        if(p){p.used=false;revived=true;break}
      }
      game.log.push({text:revived?'💫 Joueur ressuscité !':'💫 Aucun joueur à ressusciter',type:'info'})
      break
    }
    case 'Vol de note': game.modifiers.ai.stolenNote=(game.modifiers.ai.stolenNote||0)+1; game.log.push({text:'🎯 -1 à la prochaine IA',type:'info'}); break
    case 'Gel': {
      const ai=[...(game.aiTeam.ATT||[]),...(game.aiTeam.MIL||[])].filter(p=>!p.used)
      if(ai.length){const b=ai.sort((a,b2)=>getNoteForRole(b2,'ATT')-getNoteForRole(a,'ATT'))[0];b.used=true;game.log.push({text:`❄️ ${b.name} (IA) gelé !`,type:'info'})}
      break
    }
    case 'Remplacement+': game.maxSubs++; game.log.push({text:'🔄 +1 remplacement',type:'info'}); break
  }
  supabase.from('cards').delete().eq('id',gcId).then(()=>{})
  renderGame(container, game, ctx)
}

// ── FIN DE MATCH ──────────────────────────────────────────
async function finishMatch(container, game, ctx) {
  game.phase = 'finished'
  const { state } = ctx
  const isWin  = game.homeScore > game.aiScore
  const isDraw = game.homeScore === game.aiScore
  const result  = isWin?'victoire':isDraw?'nul':'defaite'
  const rewards = getRewards(game.mode, result)

  if (game.matchId) {
    await supabase.from('matches').update({
      status:'finished', home_score:game.homeScore, away_score:game.aiScore,
      winner_id: isWin?state.profile.id:null,
      home_credits_reward:rewards, played_at:new Date().toISOString(),
    }).eq('id', game.matchId)
  }

  const updates = { credits:(state.profile.credits||0)+rewards, matches_played:(state.profile.matches_played||0)+1 }
  if (isWin) updates.wins=(state.profile.wins||0)+1
  else if (isDraw) updates.draws=(state.profile.draws||0)+1
  else updates.losses=(state.profile.losses||0)+1

  await supabase.from('users').update(updates).eq('id', state.profile.id)
  await ctx.refreshProfile()

  const overlay = document.createElement('div')
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000'
  overlay.innerHTML=`
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
  document.getElementById('res-home')?.addEventListener('click',()=>{overlay.remove();ctx.navigate('home')})
  document.getElementById('res-replay')?.addEventListener('click',()=>{overlay.remove();ctx.navigate('match',{matchMode:game.mode})})
}

function showAITeam(game, ctx) {
  ctx.openModal('Équipe adverse (IA)',
    `<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${buildTeamSVG(game.aiTeam, game.formation, null, [], 300, 300)}
    </div>`,
    `<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )
}
