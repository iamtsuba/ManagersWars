import { supabase } from '../lib/supabase.js'
import { renderCardHTML } from '../components/card.js'

const BOOSTERS = [
  { id:'players_std', icon:'⚽', name:'Players', sub:'5 cartes', cost:5000, costLabel:'5 000 crédits', cardCount:5, type:'player' },
  { id:'players_pub', icon:'📺', name:'Players (pub)', sub:'3 cartes', cost:0, costLabel:'1 pub', cardCount:3, type:'player' },
  { id:'game_changer', icon:'⚡', name:'Game Changer', sub:'3 cartes', cost:10000, costLabel:'10 000 crédits', cardCount:3, type:'game_changer' },
  { id:'formation', icon:'🏟️', name:'Formation', sub:'1 carte', cost:10000, costLabel:'10 000 crédits', cardCount:1, type:'formation' },
]

export async function renderBoosters(container, { state, navigate, toast }) {
  const credits = state.profile?.credits || 0

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${credits.toLocaleString('fr')} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${BOOSTERS.map(b => {
          const canAfford = credits >= b.cost || b.cost === 0
          return `<div class="booster-card ${!canAfford ? 'disabled' : ''}" data-booster="${b.id}">
            <div class="icon">${b.icon}</div>
            <div class="name">${b.name}</div>
            <div class="desc">${b.sub}</div>
            <div class="cost">${b.costLabel}</div>
            ${!canAfford ? `<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>` : ''}
          </div>`
        }).join('')}
      </div>

      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:16px">
        <b>📌 Rappel boosters</b><br>
        • Le 1er booster Players contient toujours un Gardien.<br>
        • Game Helper disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>
  `

  container.querySelectorAll('.booster-card:not(.disabled)').forEach(el => {
    el.addEventListener('click', async () => {
      const booster = BOOSTERS.find(b => b.id === el.dataset.booster)
      if (!booster) return
      await openBooster(booster, { state, toast, container })
    })
  })
}

async function openBooster(booster, { state, toast, container }) {
  if (booster.cost > 0 && state.profile.credits < booster.cost) {
    toast('Crédits insuffisants', 'error'); return
  }

  // Simulation pub
  if (booster.id === 'players_pub') {
    const ok = await showAdSimulation()
    if (!ok) return
  }

  const btn = container.querySelector(`[data-booster="${booster.id}"]`)
  if (btn) { btn.style.opacity = '0.5'; btn.style.pointerEvents = 'none' }

  try {
    let newCards = []
    if (booster.type === 'player') {
      newCards = await openPlayersBooster(state.profile, booster.cardCount, booster.cost)
    } else if (booster.type === 'game_changer') {
      newCards = await openGCBooster(state.profile, booster.cardCount, booster.cost)
    } else if (booster.type === 'formation') {
      newCards = await openFormationBooster(state.profile, booster.cost)
    }

    // Rafraîchir le profil après déduction crédits
    const { data } = await supabase.from('users').select('*').eq('id', state.profile.id).single()
    if (data) state.profile = data

    showRevealScreen(newCards, booster, navigate)

  } catch (err) {
    toast(err.message, 'error')
    if (btn) { btn.style.opacity = ''; btn.style.pointerEvents = '' }
  }
}

async function openPlayersBooster(profile, count, cost) {
  if (cost > 0) {
    const { error } = await supabase
      .from('users').update({ credits: profile.credits - cost }).eq('id', profile.id)
    if (error) throw error
  }

  const { data: players } = await supabase
    .from('players').select('id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price').eq('is_active', true)

  if (!players || players.length === 0) throw new Error('Pas de joueurs disponibles')

  const gks = players.filter(p => p.job === 'GK')
  const nonGks = players.filter(p => p.job !== 'GK')
  let selected = []

  if (!profile.first_booster_opened && gks.length > 0) {
    selected.push(gks[Math.floor(Math.random() * gks.length)])
    selected.push(...shuffle([...nonGks]).slice(0, count - 1))
    await supabase.from('users').update({ first_booster_opened: true }).eq('id', profile.id)
  } else {
    selected = shuffle([...players]).slice(0, count)
  }

  const inserts = selected.map(p => ({ owner_id: profile.id, player_id: p.id, card_type: 'player' }))
  const { data: created } = await supabase.from('cards').insert(inserts).select()
  return selected.map((p, i) => ({ ...created[i], player: p }))
}

async function openGCBooster(profile, count, cost) {
  const { error } = await supabase
    .from('users').update({ credits: profile.credits - cost }).eq('id', profile.id)
  if (error) throw error
  const gcTypes = ['Ressusciter', 'Double attaque', 'Bouclier', 'Vol de note', 'Gel', 'Remplacement+']
  const selected = []
  for (let i = 0; i < count; i++) {
    selected.push(gcTypes[Math.floor(Math.random() * gcTypes.length)])
  }
  const inserts = selected.map(type => ({ owner_id: profile.id, card_type: 'game_changer', gc_type: type }))
  const { data: created } = await supabase.from('cards').insert(inserts).select()
  return created
}

async function openFormationBooster(profile, cost) {
  const { error } = await supabase
    .from('users').update({ credits: profile.credits - cost }).eq('id', profile.id)
  if (error) throw error
  const formations = ['4-4-2','4-3-3','3-4-3','3-5-2','5-3-2']
  const formation = formations[Math.floor(Math.random() * formations.length)]
  const { data: created } = await supabase
    .from('cards').insert({ owner_id: profile.id, card_type: 'formation', formation }).select()
  return created
}

function showRevealScreen(cards, booster, navigate) {
  const overlay = document.createElement('div')
  overlay.className = 'booster-reveal'
  overlay.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;color:#fff">
      <div style="font-size:36px">${booster.icon}</div>
      <div style="font-weight:900;font-size:20px;margin-top:4px">${booster.name}</div>
      <div style="color:rgba(255,255,255,0.6);font-size:13px">+${cards.length} carte${cards.length>1?'s':''}</div>
    </div>

    <div class="reveal-cards">
      ${cards.map((card, i) => {
        if (card.card_type === 'player' && card.player) {
          const p = card.player
          const pData = { ...p, club_encoded_name: p.clubs?.encoded_name }
          let portraitUrl = null
          if (p.skin && p.hair) {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
            if (supabaseUrl) {
              const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
              portraitUrl = `${supabaseUrl}/storage/v1/object/public/assets/tetes/${key}.jpg`
            }
          }
          return `<div class="reveal-card" style="--i:${i}">${renderCardHTML(pData, { portraitUrl, showNotes: true })}</div>`
        }
        if (card.card_type === 'game_changer') {
          return `<div class="reveal-card" style="--i:${i}"><div class="gc-card">
            <div class="gc-icon">⚡</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${card.gc_type}</div>
          </div></div>`
        }
        if (card.card_type === 'formation') {
          return `<div class="reveal-card" style="--i:${i}"><div style="background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;padding:20px;text-align:center;color:#fff;min-width:130px">
            <div style="font-size:32px;margin-bottom:8px">🏟️</div>
            <div style="font-size:22px;font-weight:900">${card.formation}</div>
          </div></div>`
        }
        return ''
      }).join('')}
    </div>

    <div style="margin-top:28px;display:flex;gap:10px;color:#fff">
      <button class="btn btn-primary" id="reveal-close">Voir ma collection</button>
    </div>
  `

  document.body.appendChild(overlay)
  document.getElementById('reveal-close').addEventListener('click', () => {
    overlay.remove()
    navigate('collection')
  })
}

function showAdSimulation() {
  return new Promise(resolve => {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position:fixed;inset:0;background:#000;display:flex;flex-direction:column;
      align-items:center;justify-content:center;z-index:3000;color:#fff;gap:16px
    `
    let seconds = 5
    overlay.innerHTML = `
      <div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:32px;font-weight:900" id="ad-countdown">5</div>
    `
    document.body.appendChild(overlay)
    const int = setInterval(() => {
      seconds--
      document.getElementById('ad-countdown').textContent = seconds
      if (seconds <= 0) {
        clearInterval(int)
        overlay.remove()
        resolve(true)
      }
    }, 1000)
  })
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
