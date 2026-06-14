import { supabase } from '../lib/supabase.js'
import {
  GC_DEFS, getNoteForRole, calcAttack, calcDefense,
  calcMidfieldDuel, resolveDuel, aiSelectPlayers, getRewards
} from './game-logic.js'
import { FORMATION_LINKS, FORMATION_POSITIONS, linkColor, getActiveLinks } from './formation-links.js'

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

function rollBoost() {
  const r = Math.random() * 100
  if (r < 0.1)  return 4
  if (r < 5.0)  return 3
  if (r < 20.0) return 2
  return 1
}

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

  if (!params.deckId) {
    return renderDeckSelect(container, ctx, matchMode)
  }

  const deckId = params.deckId

  // Charger formation depuis decks table EN PRIORITÉ
  const [{ data: deckMeta }, { data: deckCards }] = await Promise.all([
    supabase.from('decks').select('formation,name').eq('id', deckId).single(),
    supabase.from('deck_cards')
      .select(`position, is_starter, slot_order,
        card:cards(id, card_type, formation,
          player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
            note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
            clubs(encoded_name,logo_url)))`)
      .eq('deck_id', deckId).order('slot_order')
  ])

  const starters = (deckCards||[]).filter(dc => dc.is_starter && dc.card?.player).map(dc => playerFromCard(dc.card))
  const subsRaw  = (deckCards||[]).filter(dc => !dc.is_starter && dc.card?.player).map(dc => playerFromCard(dc.card))

  if (starters.length < 11) {
    showMsg(container, '⚠️', `Deck incomplet (${starters.length}/11).`, 'Compléter', () => navigate('decks'))
    return
  }

  // Formation : priorité decks.formation, puis formation card, puis défaut
  const formationCard = (deckCards||[]).find(dc => dc.card?.card_type === 'formation')
  const formation = deckMeta?.formation || formationCard?.card?.formation || '4-4-2'

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
    boostCard: null,
    boostUsed: false,
    phase:'midfield',
    attacker:null, round:0,
    selected:[], pendingAttack:null,
    log:[], modifiers:{ home:{}, ai:{} },
    clubName: state.profile.club_name || 'Vous',
  }

  showMidfieldAnimation(container, game, ctx)
}

// ── SÉLECTION DU DECK (refonte) ───────────────────────────
async function renderDeckSelect(container, ctx, matchMode) {
  const { state, navigate } = ctx
  container.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: decks } = await supabase
    .from('decks').select('id,name,is_active,formation')
    .eq('owner_id', state.profile.id).order('created_at', { ascending:false })

  if (!decks || decks.length === 0) {
    showMsg(container, '📋', 'Aucun deck. Crée un deck avant de jouer !', 'Créer un deck', () => navigate('decks'))
    return
  }

  const deckIds = decks.map(d => d.id)
  const { data: allDeckCards } = await supabase
    .from('deck_cards')
    .select(`deck_id, position, is_starter, slot_order,
      card:cards(id,card_type,formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length))`)
    .in('deck_id', deckIds)
    .order('slot_order')

  let currentIdx = 0

  function renderPreview() {
    const deck = decks[currentIdx]
    const cards = (allDeckCards||[]).filter(dc => dc.deck_id === deck.id)
    const starters = cards.filter(dc => dc.is_starter && dc.card?.player).map(dc => playerFromCard(dc.card))
    const formationCard = cards.find(dc => dc.card?.card_type === 'formation')
    const formation = deck.formation || formationCard?.card?.formation || '4-4-2'
    const team = starters.length >= 11 ? buildTeam(starters, formation) : null
    const complete = starters.length >= 11

    container.innerHTML = `
    <div id="deck-select-screen" style="display:flex;flex-direction:column;height:calc(100vh - 130px);overflow:hidden;background:#0a3d1e;color:#fff">

      <!-- Header -->
      <div style="padding:10px 16px;background:rgba(0,0,0,0.4);text-align:center;flex-shrink:0">
        <div style="font-size:10px;opacity:.6;letter-spacing:2px;text-transform:uppercase">Match vs IA — ${matchMode.replace('vs_ai_','').toUpperCase()}</div>
        <div style="font-size:17px;font-weight:900;margin-top:2px">Choisis ton deck</div>
      </div>

      <!-- Navigation deck -->
      <div style="display:flex;align-items:center;gap:8px;padding:8px;flex-shrink:0">
        <button id="prev-deck" style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,${currentIdx===0?'0.05':'0.15'});border:2px solid rgba(255,255,255,${currentIdx===0?'0.1':'0.3'});color:${currentIdx===0?'rgba(255,255,255,0.2)':'#fff'};font-size:20px;cursor:${currentIdx===0?'default':'pointer'};flex-shrink:0">◀</button>
        <div style="flex:1;text-align:center">
          <div style="font-size:19px;font-weight:900">${deck.name}</div>
          <div style="font-size:11px;opacity:.6;margin-top:2px">${formation} · ${starters.length}/11 ${deck.is_active?'· ⭐ Actif':''}</div>
        </div>
        <button id="next-deck" style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,${currentIdx===decks.length-1?'0.05':'0.15'});border:2px solid rgba(255,255,255,${currentIdx===decks.length-1?'0.1':'0.3'});color:${currentIdx===decks.length-1?'rgba(255,255,255,0.2)':'#fff'};font-size:20px;cursor:${currentIdx===decks.length-1?'default':'pointer'};flex-shrink:0">▶</button>
      </div>

      <!-- Terrain preview : contraindre la largeur du SVG pour contrôler hauteur+largeur -->
      <div id="deck-swipe-zone" style="flex:1;min-height:0;overflow:hidden;position:relative;touch-action:pan-y;display:flex;align-items:center;justify-content:center">
        ${team
          ? `<div style="width:min(88vw, calc(100vh - 430px));overflow:hidden;flex-shrink:0">${renderTeam(team, formation, null, [], 240, 240)}</div>`
          : `<div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:.4;flex-direction:column;gap:8px">
              <div style="font-size:32px">⚠️</div>
              <div>Deck incomplet (${starters.length}/11)</div>
             </div>`
        }
      </div>

      <!-- Indicateurs pagination -->
      ${decks.length > 1 ? `
      <div style="display:flex;justify-content:center;gap:6px;padding:4px;flex-shrink:0">
        ${decks.map((_,i)=>`<div style="width:7px;height:7px;border-radius:50%;background:${i===currentIdx?'#FFD700':'rgba(255,255,255,0.25)'}"></div>`).join('')}
      </div>` : ''}

      <!-- Boutons TOUJOURS VISIBLES -->
      <div style="padding:10px 14px 16px;flex-shrink:0;display:flex;flex-direction:column;gap:8px;background:rgba(0,0,0,0.2)">
        <button id="validate-deck" style="width:100%;padding:15px;border-radius:12px;border:none;
          background:${complete?'#1A6B3C':'rgba(255,255,255,0.08)'};
          color:${complete?'#fff':'rgba(255,255,255,0.3)'};font-size:16px;font-weight:900;cursor:${complete?'pointer':'default'}">
          ${complete?'✅ Valider ce deck':'⚠️ Deck incomplet'}
        </button>
        <button id="cancel-deck-select" style="width:100%;padding:11px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,.5);font-size:14px;cursor:pointer">
          Annuler
        </button>
      </div>
    </div>`

    document.getElementById('prev-deck')?.addEventListener('click', () => {
      if (currentIdx > 0) { currentIdx--; renderPreview() }
    })
    document.getElementById('next-deck')?.addEventListener('click', () => {
      if (currentIdx < decks.length-1) { currentIdx++; renderPreview() }
    })
    document.getElementById('validate-deck')?.addEventListener('click', () => {
      if (!complete) return
      ctx.navigate('match', { matchMode, deckId: deck.id })
    })
    document.getElementById('cancel-deck-select')?.addEventListener('click', () => navigate('home'))

    // Swipe tactile gauche/droite
    const swipeZone = document.getElementById('deck-swipe-zone')
    if (swipeZone) {
      let touchStartX = 0
      let touchStartY = 0
      swipeZone.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }, { passive: true })
      swipeZone.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX
        const dy = e.changedTouches[0].clientY - touchStartY
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return // trop petit ou scroll vertical
        if (dx < 0 && currentIdx < decks.length - 1) { currentIdx++; renderPreview() }
        else if (dx > 0 && currentIdx > 0) { currentIdx--; renderPreview() }
      }, { passive: true })
    }
  }

  renderPreview()
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
      if (c !== '#ff3333' && c !== '#cc2222') bonus++
    }
    return bonus
  }

  const homeTotal = milScore(homeMils) + milLinks(homeMils)
  const aiTotal   = milScore(aiMils)   + milLinks(aiMils)
  const homeWins  = homeTotal >= aiTotal

  function renderMilRow(mils, label, color) {
    return `<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:2px;margin-bottom:8px;text-transform:uppercase">${label}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${mils.map((p, i) => {
          const portrait = getPortrait(p)
          const lc = i < mils.length-1 ? linkColor(p, mils[i+1]) : null
          const hasLink = lc && lc !== '#ff3333' && lc !== '#cc2222'
          return `
          <div style="width:52px;height:52px;border-radius:8px;background:${color};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${portrait?`<img src="${portrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:''}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000;text-align:center;padding-top:4px">${getNoteForRole(p,'MIL')}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 2px">${p.name}</div>
          </div>
          ${lc ? `<div style="width:14px;height:4px;border-radius:2px;background:${lc};flex-shrink:0;opacity:${hasLink?0.9:0.3}"></div>` : ''}
          `
        }).join('')}
      </div>
      <div style="margin-top:6px;font-size:11px;color:rgba(255,255,255,0.5)">
        Score: ${milScore(mils)} + ${milLinks(mils)} liens = <b style="color:#fff">${milScore(mils)+milLinks(mils)}</b>
      </div>
    </div>`
  }

  container.innerHTML = `
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:24px;padding:24px;background:#0a3d1e">
    <div style="text-align:center;color:#fff">
      <div style="font-size:11px;opacity:.5;letter-spacing:2px;text-transform:uppercase">Duel du milieu de terrain</div>
    </div>

    ${renderMilRow(homeMils, game.clubName, '#D4A017')}

    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div id="score-home" style="font-size:48px;font-weight:900;color:#D4A017;transition:all 0.6s ease">${homeTotal}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4);letter-spacing:2px">VS</div>
      <div id="score-ai" style="font-size:48px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.6s ease">${aiTotal}</div>
    </div>

    ${renderMilRow(aiMils, 'IA', '#bb2020')}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff;max-width:320px"></div>
  </div>`

  setTimeout(() => {
    const elHome = document.getElementById('score-home')
    const elAi   = document.getElementById('score-ai')
    const elRes  = document.getElementById('midfield-result')
    if (elHome && elAi) {
      if (homeWins) {
        elHome.style.fontSize = '80px'; elHome.style.color = '#FFD700'
        elAi.style.opacity = '0.25'
      } else {
        elAi.style.fontSize = '80px'; elAi.style.color = '#ff6b6b'
        elHome.style.opacity = '0.25'
      }
    }
    if (elRes) {
      const boostValue = rollBoost()
      elRes.style.opacity = '1'
      const winner = homeWins ? game.clubName : 'IA'
      elRes.innerHTML = `
        <div style="font-size:20px;font-weight:900;margin-bottom:10px">
          ⚽ ${homeWins ? `${game.clubName} gagne le milieu de terrain et attaque !` : `L'IA gagne l'engagement et attaque !`}
        </div>
        ${homeWins ? `
        <div style="background:rgba(135,206,235,0.15);border:2px solid #87CEEB;border-radius:14px;padding:14px 24px;display:inline-block;margin-top:4px">
          <div style="font-size:10px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:32px;font-weight:900;color:#87CEEB">+${boostValue}</div>
          <div style="font-size:10px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>` : ''}
      `
      if (homeWins) game.boostCard = { value: boostValue }
    }

    game.attacker = homeWins ? 'home' : 'ai'
    game.log.push({
      type: 'duel',
      title: 'Milieu de Terrain',
      homePlayers: homeMils.map(p => ({ name:p.name, note:getNoteForRole(p,'MIL'), portrait:getPortrait(p), job:p.job })),
      aiPlayers:   aiMils.map(p   => ({ name:p.name, note:getNoteForRole(p,'MIL'), portrait:getPortrait(p), job:p.job })),
      homeTotal, aiTotal,
      text: `Duel milieu : ${game.clubName} ${homeTotal} – ${aiTotal} IA → ${homeWins ? game.clubName+' attaque' : 'IA attaque'}`,
    })

    setTimeout(() => {
      game.phase = game.attacker === 'home' ? 'attack' : 'ai-attack'
      renderGame(container, game, ctx)
      if (game.attacker === 'ai') setTimeout(() => aiTurn(container, game, ctx), 1000)
    }, 2800)
  }, 1200)
}

// ── TERRAIN SVG (liens : double ligne, pas de filter url) ─
function buildTeamSVG(team, formation, phase, selectedIds, W=310, H=310) {
  const FPOS   = FORMATION_POSITIONS[formation] || {}
  const FLINKS = getActiveLinks(formation) || FORMATION_LINKS[formation] || []
  const R      = 26

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

  // 1. Liens (double ligne, sans filter url pour éviter bug SPA Chrome)
  for (const [posA, posB] of FLINKS) {
    const a = px(posA), b = px(posB)
    if (!a || !b) continue
    const pA = slots[posA], pB = slots[posB]
    const lc = linkColor(pA, pB)
    const hasGlow = lc === '#00ff88' || lc === '#FFD700'
    if (hasGlow) {
      svg += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${lc}" stroke-width="10" stroke-linecap="round" opacity="0.22"/>`
      svg += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${lc}" stroke-width="3.5" stroke-linecap="round" opacity="0.95"/>`
    } else {
      svg += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${lc}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>`
    }
  }

  // 2. Joueurs
  for (const [pos, p] of Object.entries(slots)) {
    const c = px(pos)
    if (!c) continue
    const role = pos.replace(/[0-9]/g,'')
    const bg   = JOB_COLORS[role] || '#555'

    const selectable = (phase==='attack' && ['MIL','ATT'].includes(role) && !p.used)
                    || (phase==='defense' && ['GK','DEF','MIL'].includes(role) && !p.used)
    const isSelected = selectedIds.includes(p.cardId)

    let note
    if      (phase==='attack')  note = role==='MIL'?Number(p.note_m)||0 : Number(p.note_a)||0
    else if (phase==='defense') note = role==='GK'?Number(p.note_g)||0 : role==='MIL'?Number(p.note_m)||0 : Number(p.note_d)||0
    else                        note = Number(role==='GK'?p.note_g : role==='DEF'?p.note_d : role==='MIL'?p.note_m : p.note_a)||0
    note = note + (p.boost||0)

    const borderColor = isSelected ? '#FFD700' : selectable ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'
    const borderWidth = isSelected ? 3 : 2
    const fillOpacity = p.used ? 0.2 : 1

    const portrait = getPortrait(p)
    if (portrait) {
      svg += `<defs><clipPath id="mc-${pos}"><circle cx="${c.x}" cy="${c.y}" r="${R}"/></clipPath></defs>`
    }

    svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="${bg}" opacity="${fillOpacity}"
      stroke="${borderColor}" stroke-width="${borderWidth}"/>`

    if (portrait && !p.used) {
      svg += `<image href="${portrait}" x="${c.x-R}" y="${c.y-R}" width="${R*2}" height="${R*2}"
        clip-path="url(#mc-${pos})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`
      svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="${bg}" opacity="0.3"
        stroke="${borderColor}" stroke-width="${borderWidth}"/>`
    }

    if (p.boost) {
      svg += `<rect x="${c.x+R-10}" y="${c.y-R}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${c.x+R-3}" y="${c.y-R+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${p.boost}</text>`
    }

    svg += `<text x="${c.x}" y="${c.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${p.used?'rgba(255,255,255,0.2)':'white'}" font-family="Arial Black,Arial">${p.used?'–':note}</text>
    <text x="${c.x}" y="${c.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${p.used?0.2:0.8})"
      font-family="Arial">${(p.name||'').slice(0,8)}</text>`

    if (selectable) {
      svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${isSelected?'selected':''}" data-card-id="${p.cardId}" data-role="${role}"
        style="cursor:pointer"/>`
    }
  }

  const PAD = R + 4
  return `<svg viewBox="${-PAD} ${-PAD} ${W+PAD*2} ${H+PAD*2}" width="100%" style="display:block;width:100%;max-width:380px;margin:0 auto">
    ${svg}
  </svg>`
}

function renderTeam(team, formation, phase, selectedIds, W=300, H=300) {
  return `<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${buildTeamSVG(team, formation, phase, selectedIds, W, H)}
  </div>`
}


// ── RENDU MINI JOUEUR (zone action) ──────────────────────
function renderMiniPlayer(p, grayed=false) {
  const portrait = p.portrait || null
  const jobColor = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }[p.job] || '#555'
  return `
  <div style="text-align:center;flex-shrink:0;width:38px">
    <div style="width:38px;height:38px;border-radius:50%;background:${jobColor};position:relative;overflow:hidden;
      border:2px solid rgba(255,255,255,${grayed?'0.2':'0.5'});opacity:${grayed?0.4:1};margin:0 auto">
      ${portrait ? `<img src="${portrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : ''}
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.65);font-size:9px;color:#fff;font-weight:900;text-align:center;line-height:1.4">${p.note}</div>
    </div>
    <div style="font-size:7px;color:rgba(255,255,255,0.5);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${(p.name||'').slice(0,7)}</div>
  </div>`
}

function renderLogEntry(entry) {
  if (entry.type === 'duel') {
    const hw = entry.homeTotal >= entry.aiTotal
    return `
    <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:5px 6px;border:1px solid rgba(255,255,255,0.08)">
      <div style="text-align:center;font-size:9px;font-weight:700;letter-spacing:1px;color:rgba(255,255,255,0.5);margin-bottom:4px">${(entry.title||'DUEL').toUpperCase()}</div>
      <div style="display:flex;align-items:center;gap:3px">
        <!-- Joueurs domicile -->
        <div style="flex:1;display:flex;gap:2px;justify-content:flex-end;flex-wrap:wrap">
          ${(entry.homePlayers||[]).map(p=>renderMiniPlayer(p)).join('')}
        </div>
        <!-- Score -->
        <div style="text-align:center;padding:0 6px;flex-shrink:0">
          <div style="font-size:${hw?20:14}px;font-weight:900;color:${hw?'#FFD700':'rgba(255,255,255,0.4)'};line-height:1">${entry.homeTotal}</div>
          <div style="font-size:8px;color:rgba(255,255,255,0.3);margin:1px 0">VS</div>
          <div style="font-size:${!hw?20:14}px;font-weight:900;color:${!hw?'#ff6b6b':'rgba(255,255,255,0.4)'};line-height:1">${entry.aiTotal}</div>
        </div>
        <!-- Joueurs IA -->
        <div style="flex:1;display:flex;gap:2px;justify-content:flex-start;flex-wrap:wrap">
          ${(entry.aiPlayers||[]).map(p=>renderMiniPlayer(p)).join('')}
        </div>
      </div>
      ${entry.isGoal ? `<div style="text-align:center;font-size:11px;color:#FFD700;font-weight:900;margin-top:3px">${entry.homeScored?'⚽ BUT !':'⚽ BUT IA !'}</div>` : ''}
    </div>`
  }

  if (entry.type === 'sub') {
    const isHome = entry.subSide === 'home'
    return `
    <div style="display:flex;align-items:center;gap:4px;${isHome?'flex-direction:row-reverse':''};background:rgba(255,255,255,0.04);border-radius:8px;padding:5px 8px;border:1px solid rgba(255,255,255,0.07)">
      <div style="font-size:9px;color:rgba(255,255,255,0.4);flex-shrink:0">${isHome?game?.clubName||'Vous':'IA'}</div>
      ${renderMiniPlayer(entry.outPlayer||{}, true)}
      <div style="font-size:16px;flex-shrink:0">🔄</div>
      ${renderMiniPlayer(entry.inPlayer||{})}
    </div>`
  }

  // Info / goal simple
  return `<div style="font-size:11px;color:${entry.type==='goal'?'#FFD700':'rgba(255,255,255,0.65)'};font-weight:${entry.type==='goal'?700:400};padding:3px 2px">${entry.text||''}</div>`
}

// ── RENDU PRINCIPAL DU MATCH (layout mobile refonte) ──────
function renderGame(container, game, ctx) {
  const selectedIds = game.selected.map(s => s.cardId)
  const usedSubIds  = game.usedSubIds || []
  const availSubs   = game.homeSubs.filter(s => !usedSubIds.includes(s.cardId))
  const grayedPlayers = Object.values(game.homeTeam).flat().filter(p => p.used)
  const canSub = grayedPlayers.length > 0 && availSubs.length > 0 && game.subsUsed < game.maxSubs

  // Dernière action
  const lastLog  = game.log[game.log.length - 1]
  const isAITurn = game.phase === 'ai-attack' || game.phase === 'ai-defense'
  const isAttack = game.phase === 'attack'
  const isDefense = game.phase === 'defense'
  const isFinished = game.phase === 'finished'

  // GC disponibles
  const activeGCs = game.gcCards.filter(gc => !game.usedGc.includes(gc.id))
  const boostAvail = game.boostCard && !game.boostUsed

  container.innerHTML = `
  <style>
    @keyframes subSlideOut { from{transform:translateX(0);opacity:1} to{transform:translateX(-120%);opacity:0} }
    @keyframes subSlideIn  { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes subFadeIn   { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
    .sub-anim-out { animation: subSlideOut 0.45s ease forwards; }
    .sub-anim-in  { animation: subSlideIn 0.45s ease 0.35s forwards; opacity:0; }
    #match-history-panel {
      position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:500;
      display:flex;flex-direction:column;
      transform:translateY(100%);transition:transform 0.3s ease;
    }
    #match-history-panel.open { transform:translateY(0); }
  </style>

  <div class="match-screen" style="display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0a3d1e;position:relative">

    <!-- SCORE BAR -->
    <div style="display:flex;align-items:center;padding:8px 10px;background:rgba(0,0,0,0.5);gap:6px;flex-shrink:0">
      <button id="match-quit" style="width:34px;height:34px;border-radius:50%;background:rgba(220,50,50,0.7);border:none;color:#fff;font-size:16px;cursor:pointer;flex-shrink:0">✕</button>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px">
        <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${game.clubName}</span>
        <span style="font-size:26px;font-weight:900;color:#FFD700;letter-spacing:2px">${game.homeScore} – ${game.aiScore}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.5)">IA (${game.difficulty.toUpperCase()})</span>
      </div>
      <button id="view-ai" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);color:#fff;font-size:16px;cursor:pointer;flex-shrink:0">👁</button>
    </div>

    <!-- ZONE ACTIONS RICHES (3 derniers faits) -->
    <div id="last-action-zone" style="padding:5px 8px;background:rgba(0,0,0,0.3);flex-shrink:0;display:flex;flex-direction:column;gap:4px;max-height:${game.log.length===0?'36px':'160px'};overflow:hidden">
      ${game.log.length === 0
        ? `<span style="font-size:11px;color:rgba(255,255,255,0.3);padding:4px 2px">⏳ Match en cours...</span>`
        : game.log.slice(-3).reverse().map(e => renderLogEntry(e)).join('')
      }
    </div>

    <!-- BOUTON HISTORIQUE -->
    <button id="toggle-history" style="width:100%;padding:3px 10px;background:rgba(0,0,0,0.15);border:none;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.3);font-size:9px;cursor:pointer;letter-spacing:1px;flex-shrink:0;text-transform:uppercase">
      ▼  Historique complet (${game.log.length} actions)
    </button>

    <!-- ZONE CENTRALE : REMPLAÇANTS + TERRAIN -->
    <div style="display:flex;flex:1;min-height:0;overflow:hidden">

      <!-- Colonne remplaçants -->
      <div style="display:flex;flex-direction:column;gap:5px;padding:6px 3px;width:42px;align-items:center;overflow-y:auto;flex-shrink:0;background:rgba(0,0,0,0.15)">
        ${availSubs.length === 0
          ? `<div style="font-size:8px;color:rgba(255,255,255,0.25);text-align:center;margin-top:6px;line-height:1.4">Pas de<br>rempl.</div>`
          : availSubs.map(s => {
              const portrait = getPortrait(s)
              const jobColor = JOB_COLORS[s.job] || '#555'
              return `
              <div class="sub-btn-col" data-sub-id="${s.cardId}" title="${s.firstname} ${s.name}"
                style="width:34px;height:34px;border-radius:50%;background:${jobColor};border:2px solid rgba(255,255,255,0.4);cursor:pointer;position:relative;overflow:hidden;flex-shrink:0">
                ${portrait ? `<img src="${portrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.85">` : ''}
                <div style="position:absolute;bottom:0;left:0;right:0;font-size:6px;text-align:center;color:#fff;background:rgba(0,0,0,0.5);font-weight:700">${s.job}</div>
              </div>`
            }).join('')
        }
        ${canSub ? `
        <div id="sub-btn-main" style="margin-top:4px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.1);border:1.5px dashed rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:rgba(255,255,255,0.5)">🔄</div>
        ` : ''}
      </div>

      <!-- Terrain -->
      <div style="flex:1;overflow:hidden;min-width:0;display:flex;align-items:center;justify-content:center" id="match-field">
        <div style="width:min(calc(100vw - 50px), calc(100vh - 290px));overflow:hidden;flex-shrink:0">
          ${renderTeam(game.homeTeam, game.formation, game.phase, selectedIds, 280, 280)}
        </div>
      </div>
    </div>

    <!-- ZONE BAS : GC + BOUTON ACTION -->
    <div style="display:flex;align-items:flex-end;padding:6px 8px;background:rgba(0,0,0,0.35);gap:8px;flex-shrink:0;min-height:80px">

      <!-- Grille GC -->
      <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;align-content:start">
        ${activeGCs.map(gc => `
          <div class="gc-mini" data-gc-id="${gc.id}" data-gc-type="${gc.gc_type}"
            style="background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:7px;padding:3px 2px;cursor:pointer;text-align:center">
            <div style="font-size:16px">${GC_DEFS[gc.gc_type]?.icon||'⚡'}</div>
            <div style="font-size:6px;color:#fff;font-weight:600;line-height:1.2">${gc.gc_type.slice(0,8)}</div>
          </div>`).join('')}
        ${boostAvail ? `
          <div id="boost-card" style="background:linear-gradient(135deg,#4a9fc4,#87CEEB);border:2px solid #87CEEB;border-radius:7px;padding:3px 2px;cursor:pointer;text-align:center">
            <div style="font-size:16px">⚡</div>
            <div style="font-size:6px;color:#000;font-weight:900">+${game.boostCard.value}</div>
          </div>` : ''}
      </div>

      <!-- Bouton action principal -->
      <div style="flex-shrink:0">
        ${isFinished
          ? `<button id="btn-results" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#D4A017,#FFD700);border:3px solid #FFD700;color:#000;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center">🏁</button>`
          : isAITurn
          ? `<div style="width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,0.08);border:3px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.3);font-size:26px;display:flex;align-items:center;justify-content:center">⏳</div>`
          : isAttack
          ? `<button id="btn-action" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#c47a00,#FFD700);border:3px solid #FFD700;color:#fff;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(255,215,0,0.4)" ${game.selected.length===0?'disabled style="opacity:0.4;cursor:default"':''}>⚔️</button>`
          : isDefense
          ? `<button id="btn-action" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#1a4a8a,#3a7bd5);border:3px solid #87CEEB;color:#fff;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(135,206,235,0.4)" ${game.selected.length===0?'disabled style="opacity:0.4;cursor:default"':''}>🛡️</button>`
          : `<div style="width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,0.05);border:3px solid rgba(255,255,255,0.1)"></div>`
        }
        ${isAttack || isDefense ? `
        <div style="text-align:center;font-size:8px;color:rgba(255,255,255,0.4);margin-top:3px">
          ${game.selected.length}/3
        </div>` : ''}
      </div>
    </div>
  </div>

  <!-- PANNEAU HISTORIQUE (slide-up) -->
  <div id="match-history-panel">
    <div style="display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.1)">
      <div style="flex:1;font-size:14px;font-weight:700;color:#fff">📋 Historique du match</div>
      <button id="close-history" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:20px;cursor:pointer">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:6px">
      ${game.log.length === 0
        ? `<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3)">Aucune action pour l'instant</div>`
        : [...game.log].reverse().map((e,i) => `
          <div style="padding:8px 10px;border-radius:8px;background:${e.type==='goal'?'rgba(212,160,23,0.15)':'rgba(255,255,255,0.05)'};border-left:3px solid ${e.type==='goal'?'#FFD700':'rgba(255,255,255,0.15)'}">
            <span style="font-size:12px;color:${e.type==='goal'?'#FFD700':'rgba(255,255,255,0.8)'};font-weight:${e.type==='goal'?700:400}">${e.text}</span>
          </div>`).join('')
      }
    </div>
  </div>`

  // ── Events ────────────────────────────────────────────────
  document.getElementById('match-quit')?.addEventListener('click', () => {
    if (confirm('Abandonner ? Résultat : défaite 3-0')) {
      game.homeScore = 0; game.aiScore = 3
      finishMatch(container, game, ctx)
    }
  })
  document.getElementById('view-ai')?.addEventListener('click', () => showAITeam(game, ctx))

  document.getElementById('toggle-history')?.addEventListener('click', () => {
    document.getElementById('match-history-panel')?.classList.add('open')
  })
  document.getElementById('close-history')?.addEventListener('click', () => {
    document.getElementById('match-history-panel')?.classList.remove('open')
  })

  document.getElementById('btn-action')?.addEventListener('click', () => {
    if (game.selected.length === 0) return
    if (isAttack) confirmAttack(container, game, ctx)
    else if (isDefense) confirmDefense(container, game, ctx)
  })

  document.getElementById('btn-results')?.addEventListener('click', () => finishMatch(container, game, ctx))

  container.querySelectorAll('.match-slot-hit').forEach(el => {
    el.addEventListener('click', () => toggleSelect(el, game, container, ctx))
  })
  container.querySelectorAll('.gc-mini').forEach(el => {
    el.addEventListener('click', () => useGameChanger(el.dataset.gcId, el.dataset.gcType, container, game, ctx))
  })
  document.getElementById('boost-card')?.addEventListener('click', () => useBoost(container, game, ctx))

  // Subs : clic sur portrait dans colonne
  container.querySelectorAll('.sub-btn-col').forEach(el => {
    el.addEventListener('click', () => openSubstitution(container, game, ctx, el.dataset.subId))
  })
  document.getElementById('sub-btn-main')?.addEventListener('click', () => openSubstitution(container, game, ctx))
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
  game.log.push({ text:`⚔️ Vous attaquez : ${calc.total} (base ${calc.base}${calc.links?` +${calc.links} liens`:''}) — ${game.selected.map(p=>p.name).join(', ')}`, type:'info' })
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
  const duelEntryDef = {
    type: 'duel',
    title: 'Défense',
    aiPlayers:   (game.pendingAttack.players||[]).map(p => ({ name:p.name, note:p._line==='MIL'?p.note_m:p.note_a, portrait:getPortrait(p), job:p.job })),
    homePlayers: game.selected.map(s => { const pp = (game.homeTeam[s._role]||[]).find(x=>x.cardId===s.cardId)||s; return { name:pp.name, note:pp._line==='GK'?pp.note_g:pp._line==='MIL'?pp.note_m:pp.note_d, portrait:getPortrait(pp), job:pp.job } }),
    homeTotal: calc.total,
    aiTotal: game.pendingAttack.total,
    isGoal: false, homeScored: false,
    text: '',
  }
  if (result.shielded) {
    duelEntryDef.text = '🛡️ Bouclier ! But annulé.'
    game.log.push(duelEntryDef)
  } else if (result.goal) {
    game.aiScore++
    duelEntryDef.isGoal = true; duelEntryDef.homeScored = false
    duelEntryDef.text = `⚽ BUT IA ! (${game.pendingAttack.total} > ${calc.total})`
    game.log.push(duelEntryDef)
  } else {
    duelEntryDef.text = `🧤 Défense réussie ! (${calc.total} ≥ ${game.pendingAttack.total})`
    game.log.push(duelEntryDef)
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
  game.log.push({ text:`🤖 IA attaque : ${calc.total} (${selected.map(p=>p.name).join(', ')})`, type:'info' })
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
  const duelEntryAttack = {
    type: 'duel',
    title: 'Attaque',
    homePlayers: (game.pendingAttack.players||[]).map(p => ({ name:p.name, note:p._line==='MIL'?p.note_m:p.note_a, portrait:getPortrait(p), job:p.job })),
    aiPlayers:   selected.map(p => ({ name:p.name, note:p._line==='GK'?p.note_g:p._line==='MIL'?p.note_m:p.note_d, portrait:getPortrait(p), job:p.job })),
    homeTotal: game.pendingAttack.total,
    aiTotal: defVal,
    isGoal: false, homeScored: false,
    text: '',
  }
  if (result.shielded) {
    duelEntryAttack.text = '🛡️ Bouclier IA !'
    game.log.push(duelEntryAttack)
  } else if (result.goal) {
    game.homeScore++
    duelEntryAttack.isGoal = true; duelEntryAttack.homeScored = true
    duelEntryAttack.text = `⚽ BUT ! (${game.pendingAttack.total} > ${defVal})`
    game.log.push(duelEntryAttack)
  } else {
    duelEntryAttack.text = `🧤 IA défend (${defVal} ≥ ${game.pendingAttack.total})`
    game.log.push(duelEntryAttack)
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

// ── ANIMATION REMPLACEMENT ────────────────────────────────
function showSubAnimation(outPlayer, inPlayer, callback) {
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:800;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;
    animation:subFadeIn 0.2s ease;
  `
  const outPortrait  = getPortrait(outPlayer)
  const inPortrait   = getPortrait(inPlayer)
  const outColor     = JOB_COLORS[outPlayer.job] || '#555'
  const inColor      = JOB_COLORS[inPlayer.job]  || '#555'

  overlay.innerHTML = `
    <style>@keyframes subFadeIn{from{opacity:0}to{opacity:1}}</style>
    <div style="font-size:13px;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase">Remplacement</div>
    <div style="display:flex;align-items:center;gap:24px">
      <!-- Sortant -->
      <div class="sub-anim-out" style="text-align:center">
        <div style="width:72px;height:72px;border-radius:50%;background:${outColor};border:3px solid rgba(255,255,255,0.3);position:relative;overflow:hidden;opacity:0.5;margin:0 auto">
          ${outPortrait?`<img src="${outPortrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:''}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px">${outPlayer.firstname} ${outPlayer.name}</div>
        <div style="font-size:20px;margin-top:2px">❌</div>
      </div>

      <div style="font-size:36px">🔄</div>

      <!-- Entrant -->
      <div class="sub-anim-in" style="text-align:center">
        <div style="width:72px;height:72px;border-radius:50%;background:${inColor};border:3px solid #00ff88;position:relative;overflow:hidden;margin:0 auto">
          ${inPortrait?`<img src="${inPortrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:''}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-top:6px;font-weight:700">${inPlayer.firstname} ${inPlayer.name}</div>
        <div style="font-size:20px;margin-top:2px">✅</div>
      </div>
    </div>
  `
  document.body.appendChild(overlay)
  setTimeout(() => {
    overlay.remove()
    callback()
  }, 2000)
}

// ── REMPLACEMENT ──────────────────────────────────────────
function openSubstitution(container, game, ctx, preferredSubId = null) {
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
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid ${s.cardId===preferredSubId?'#D4A017':'var(--green)'};border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${JOB_COLORS[s.job]||'#888'};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s.job}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join('')}
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`
  )

  let selectedGrayed = null
  let selectedSub    = preferredSubId

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
    const outPlayer = team[idx]
    if (idx !== -1 && subPlayer) {
      subPlayer._line = role
      subPlayer._col  = team[idx]._col
      subPlayer.used  = false
      team.splice(idx, 1, subPlayer)
      game.usedSubIds = [...(game.usedSubIds||[]), selectedSub]
      game.subsUsed++
      game.log.push({
        type: 'sub',
        subSide: 'home',
        outPlayer: { name:outPlayer?.name||'', firstname:outPlayer?.firstname||'', note: getNoteForRole(outPlayer, role), portrait:getPortrait(outPlayer), job:outPlayer?.job||role },
        inPlayer:  { name:subPlayer.name, firstname:subPlayer.firstname, note: getNoteForRole(subPlayer, role), portrait:getPortrait(subPlayer), job:subPlayer.job },
        text: `🔄 ${subPlayer.firstname} ${subPlayer.name} remplace ${outPlayer?.firstname} ${outPlayer?.name}`,
      })
    }
    ctx.closeModal()
    // Animation remplacement
    if (outPlayer && subPlayer) {
      showSubAnimation(outPlayer, subPlayer, () => renderGame(container, game, ctx))
    } else {
      renderGame(container, game, ctx)
    }
  }
}

// ── GAME CHANGER ──────────────────────────────────────────
function useGameChanger(gcId, gcType, container, game, ctx) {
  if (game.usedGc.includes(gcId)) return
  game.usedGc.push(gcId)
  switch (gcType) {
    case 'Double attaque': game.modifiers.home.doubleAttack=true; game.log.push({text:'⚡ Double attaque activée !',type:'info'}); break
    case 'Bouclier': game.modifiers.home.shield=true; game.log.push({text:'🛡️ Bouclier activé !',type:'info'}); break
    case 'Ressusciter': {
      let revived=false
      for (const r of ['ATT','MIL','DEF','GK']) {
        const p=(game.homeTeam[r]||[]).find(pp=>pp.used)
        if(p){p.used=false;revived=true;break}
      }
      game.log.push({text:revived?'💫 Joueur ressuscité !':'💫 Aucun joueur à ressusciter',type:'info'})
      break
    }
    case 'Vol de note': game.modifiers.ai.stolenNote=(game.modifiers.ai.stolenNote||0)+1; game.log.push({text:'🎯 -1 à la prochaine attaque IA',type:'info'}); break
    case 'Gel': {
      const ai=[...(game.aiTeam.ATT||[]),...(game.aiTeam.MIL||[])].filter(p=>!p.used)
      if(ai.length){const b=ai.sort((a,b2)=>getNoteForRole(b2,'ATT')-getNoteForRole(a,'ATT'))[0];b.used=true;game.log.push({text:`❄️ ${b.name} (IA) gelé !`,type:'info'})}
      break
    }
    case 'Remplacement+': game.maxSubs++; game.log.push({text:'🔄 +1 remplacement débloqué',type:'info'}); break
  }
  supabase.from('cards').delete().eq('id',gcId).then(()=>{})
  renderGame(container, game, ctx)
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
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:2000'
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
