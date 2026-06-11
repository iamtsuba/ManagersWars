import { supabase } from '../lib/supabase.js'

const BOOSTERS = [
  { id:'players_std',  icon:'⚽', name:'Players',       sub:'5 cartes joueurs',  cost:5000,  costLabel:'5 000 crédits', cardCount:5, type:'player' },
  { id:'players_pub',  icon:'📺', name:'Players (pub)', sub:'3 cartes joueurs',  cost:0,     costLabel:'1 pub',         cardCount:3, type:'player' },
  { id:'game_changer', icon:'⚡', name:'Game Changer',  sub:'3 cartes spéciales',cost:10000, costLabel:'10 000 crédits',cardCount:3, type:'game_changer' },
  { id:'formation',    icon:'🏟️', name:'Formation',     sub:'1 carte formation', cost:10000, costLabel:'10 000 crédits',cardCount:1, type:'formation' },
]

const GC_DEFS = {
  'Ressusciter':    { icon:'💫', desc:'Réactive un joueur grisé.' },
  'Double attaque': { icon:'⚡', desc:'La prochaine attaque compte double.' },
  'Bouclier':       { icon:'🛡️', desc:'Annule le prochain but adverse.' },
  'Vol de note':    { icon:'🎯', desc:'-1 à la prochaine action IA.' },
  'Gel':            { icon:'❄️', desc:'Bloque le meilleur attaquant IA.' },
  'Remplacement+':  { icon:'🔄', desc:'+1 remplacement pour ce match.' },
}

function getPortrait(p) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  if (!supabaseUrl || !p?.skin || !p?.hair) return null
  const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
  return `${supabaseUrl}/storage/v1/object/public/assets/tetes/${key}.jpg`
}

const JOB_COLORS = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }
const RAR_COLORS = { normal:'#ccc', pepite:'#D4A017', papyte:'#909090', legende:'#7a28b8' }

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
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`

  container.querySelectorAll('.booster-card:not(.disabled)').forEach(el => {
    el.addEventListener('click', async () => {
      const booster = BOOSTERS.find(b => b.id === el.dataset.booster)
      if (!booster) return
      el.style.opacity = '0.5'; el.style.pointerEvents = 'none'
      try {
        await openBooster(booster, { state, toast, navigate, container })
      } catch(err) {
        toast(err.message, 'error')
        el.style.opacity = ''; el.style.pointerEvents = ''
      }
    })
  })
}

async function openBooster(booster, { state, toast, navigate, container }) {
  if (booster.cost > 0 && state.profile.credits < booster.cost) {
    toast('Crédits insuffisants', 'error'); return
  }

  if (booster.id === 'players_pub') {
    await showAdSimulation()
  }

  let newCards = []
  if (booster.type === 'player') {
    newCards = await openPlayersBooster(state.profile, booster.cardCount, booster.cost)
  } else if (booster.type === 'game_changer') {
    newCards = await openGCBooster(state.profile, booster.cardCount, booster.cost)
  } else if (booster.type === 'formation') {
    newCards = await openFormationBooster(state.profile, booster.cost)
  }

  const { data } = await supabase.from('users').select('*').eq('id', state.profile.id).single()
  if (data) state.profile = data

  // Lancer l'animation FIFA
  showBoosterAnimation(newCards, booster, navigate)
}

async function openPlayersBooster(profile, count, cost) {
  if (cost > 0) {
    const { error } = await supabase.from('users')
      .update({ credits: profile.credits - cost }).eq('id', profile.id)
    if (error) throw error
  }

  const { data: players } = await supabase
    .from('players')
    .select('id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)')
    .eq('is_active', true)

  if (!players?.length) throw new Error('Pas de joueurs en BDD — ajoutes-en via le panel admin !')

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

  const { data: created } = await supabase.from('cards')
    .insert(selected.map(p => ({ owner_id: profile.id, player_id: p.id, card_type: 'player' })))
    .select()
  return selected.map((p, i) => ({ ...created[i], player: p }))
}

async function openGCBooster(profile, count, cost) {
  const { error } = await supabase.from('users')
    .update({ credits: profile.credits - cost }).eq('id', profile.id)
  if (error) throw error

  const gcTypes = Object.keys(GC_DEFS)
  const selected = Array.from({length: count}, () => gcTypes[Math.floor(Math.random() * gcTypes.length)])
  const { data: created } = await supabase.from('cards')
    .insert(selected.map(type => ({ owner_id: profile.id, card_type: 'game_changer', gc_type: type })))
    .select()
  return created
}

async function openFormationBooster(profile, cost) {
  const { error } = await supabase.from('users')
    .update({ credits: profile.credits - cost }).eq('id', profile.id)
  if (error) throw error

  const formations = ['4-4-2','4-3-3','3-4-3','3-5-2','5-3-2']
  const formation  = formations[Math.floor(Math.random() * formations.length)]
  const { data: created } = await supabase.from('cards')
    .insert({ owner_id: profile.id, card_type: 'formation', formation }).select()
  return created
}

// ── Animation FIFA ─────────────────────────────────────────
// Phase 1 : booster qui tremble et s'ouvre
// Phase 2 : les cartes apparaissent une par une avec flip
function showBoosterAnimation(cards, booster, navigate) {
  const overlay = document.createElement('div')
  overlay.id = 'booster-anim-overlay'
  overlay.innerHTML = `
    <style>
      #booster-anim-overlay {
        position:fixed;inset:0;background:#0a1628;display:flex;flex-direction:column;
        align-items:center;justify-content:center;z-index:3000;overflow:hidden;
      }
      .pack-container { display:flex;flex-direction:column;align-items:center;gap:16px; }
      .pack-visual {
        width:160px;height:220px;border-radius:16px;
        background:linear-gradient(135deg,#1A6B3C,#D4A017,#1A6B3C);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        box-shadow:0 0 40px rgba(212,160,23,0.5);
        cursor:pointer;transition:transform 0.1s;font-size:64px;
        border:3px solid rgba(212,160,23,0.6);
        animation: packFloat 2s ease-in-out infinite;
      }
      @keyframes packFloat {
        0%,100% { transform:translateY(0) rotate(-1deg); }
        50%      { transform:translateY(-8px) rotate(1deg); }
      }
      .pack-visual.shaking {
        animation: packShake 0.4s ease-in-out;
      }
      @keyframes packShake {
        0%,100% { transform:rotate(0deg); }
        20%     { transform:rotate(-8deg) scale(1.05); }
        40%     { transform:rotate(8deg) scale(1.08); }
        60%     { transform:rotate(-5deg) scale(1.06); }
        80%     { transform:rotate(5deg) scale(1.04); }
      }
      .pack-open {
        animation: packOpen 0.6s ease-out forwards !important;
      }
      @keyframes packOpen {
        0%   { transform:scale(1); opacity:1; }
        50%  { transform:scale(1.3) rotate(5deg); opacity:0.8; }
        100% { transform:scale(0) rotate(20deg); opacity:0; }
      }
      .cards-reveal {
        display:none;flex-wrap:wrap;gap:10px;justify-content:center;
        max-width:600px;padding:16px;
      }
      .card-flip-wrapper {
        perspective:600px;
        cursor:pointer;
      }
      .card-flip-inner {
        width:140px;height:200px;position:relative;
        transform-style:preserve-3d;
        transition:transform 0.6s ease;
        transform:rotateY(180deg);
      }
      .card-flip-inner.revealed { transform:rotateY(0deg); }
      .card-face-back, .card-face-front {
        position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;
        display:flex;align-items:center;justify-content:center;
      }
      .card-face-back {
        background:linear-gradient(135deg,#1A6B3C,#0a3d1e);
        border:3px solid rgba(212,160,23,0.6);
        font-size:40px;
      }
      .card-face-front {
        backface-visibility:hidden;transform:rotateY(0deg);
        overflow:hidden;
      }
    </style>

    <!-- Phase 1 : booster -->
    <div class="pack-container" id="pack-phase">
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-bottom:8px">
        ${booster.name} · ${cards.length} carte${cards.length>1?'s':''}
      </div>
      <div class="pack-visual" id="pack-visual">${booster.icon}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:8px">Appuie pour ouvrir</div>
    </div>

    <!-- Phase 2 : cartes -->
    <div class="cards-reveal" id="cards-phase"></div>

    <!-- Boutons fin -->
    <div id="reveal-btns" style="display:none;margin-top:20px;gap:10px;flex-direction:column;align-items:center">
      <button class="btn btn-primary" id="reveal-collection" style="min-width:200px">
        Voir ma collection
      </button>
      <button class="btn btn-ghost" id="reveal-more" style="color:#fff;border-color:rgba(255,255,255,0.3);min-width:200px">
        Retour aux boosters
      </button>
    </div>
  `
  document.body.appendChild(overlay)

  // Click sur le booster → shake puis ouvrir
  let clicked = false
  const packEl = document.getElementById('pack-visual')
  packEl.addEventListener('click', () => {
    if (clicked) return
    clicked = true

    // Shake
    packEl.classList.add('shaking')
    setTimeout(() => {
      packEl.classList.remove('shaking')
      packEl.classList.add('pack-open')

      setTimeout(() => {
        document.getElementById('pack-phase').style.display = 'none'
        const cardsPhase = document.getElementById('cards-phase')
        cardsPhase.style.display = 'flex'

        // Générer les dos de cartes
        cardsPhase.innerHTML = cards.map((card, i) => `
          <div class="card-flip-wrapper" data-card-idx="${i}">
            <div class="card-flip-inner" id="card-flip-${i}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${buildCardFace(card)}</div>
            </div>
          </div>`).join('')

        // Révéler les cartes une par une automatiquement
        cards.forEach((_, i) => {
          setTimeout(() => {
            document.getElementById(`card-flip-${i}`)?.classList.add('revealed')
          }, i * 350 + 300)
        })

        // Afficher les boutons après toutes les révélations
        setTimeout(() => {
          document.getElementById('reveal-btns').style.display = 'flex'
        }, cards.length * 350 + 800)

        // Click sur une carte pour la retourner manuellement
        cardsPhase.querySelectorAll('.card-flip-wrapper').forEach(el => {
          el.addEventListener('click', () => {
            document.getElementById(`card-flip-${el.dataset.cardIdx}`)?.classList.add('revealed')
          })
        })

      }, 600)
    }, 500)
  })

  document.getElementById('reveal-collection')?.addEventListener('click', () => {
    overlay.remove(); navigate('collection')
  })
  document.getElementById('reveal-more')?.addEventListener('click', () => {
    overlay.remove(); navigate('boosters')
  })
}

function buildCardFace(card) {
  if (card.card_type === 'player' && card.player) {
    const p = card.player
    const job = p.job || 'ATT'
    const jobColor = JOB_COLORS[job] || '#1A6B3C'
    const rarColor = RAR_COLORS[p.rarity] || '#ccc'
    const note = job==='GK'?p.note_g : job==='DEF'?p.note_d : job==='MIL'?p.note_m : p.note_a
    const portrait = getPortrait(p)
    const countryName = { MA:'MAROC',FR:'FRANCE',AR:'ARGENTINE',PT:'PORTUGAL',BR:'BRESIL',ES:'ESPAGNE',DE:'ALLEMAGNE',GB:'ANGLETERRE',IT:'ITALIE',CM:'CAMEROUN',SN:'SENEGAL' }[p.country_code] || p.country_code

    return `<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${rarColor};overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:6px 6px 2px;text-align:center;background:#f2e8d2">
        <div style="font-size:8px;letter-spacing:1px;color:#666;text-transform:uppercase">${p.firstname}</div>
        <div style="font-size:13px;font-weight:900;color:#111;line-height:1.1;font-family:Arial Black,Arial">${(p.surname_encoded||'').toUpperCase()}</div>
      </div>
      <!-- Étoile + bande poste -->
      <div style="position:relative;height:58px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div style="position:absolute;width:100%;height:12px;background:${jobColor}"></div>
        <svg width="44" height="42" viewBox="0 0 52 50" style="position:relative;z-index:1">
          <polygon points="26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18" fill="${jobColor}" stroke="#0004" stroke-width="2"/>
          <text x="26" y="32" text-anchor="middle" font-size="15" font-weight="900" fill="white" font-family="Arial Black,Arial">${note||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${portrait
          ? `<img src="${portrait}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>`}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${p.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${countryName}</div>
        ${p.clubs?.logo_url
          ? `<img src="${p.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`
          : `<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(p.clubs?.encoded_name||'').slice(0,6)}</div>`}
      </div>
    </div>`
  }

  if (card.card_type === 'game_changer') {
    const gc = GC_DEFS[card.gc_type] || { icon:'⚡', desc:'' }
    return `<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${gc.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${card.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${gc.desc}</div>
    </div>`
  }

  if (card.card_type === 'formation') {
    return `<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${card.formation}</div>
    </div>`
  }
  return '<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'
}

function showAdSimulation() {
  return new Promise(resolve => {
    const el = document.createElement('div')
    el.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px'
    let s = 5
    el.innerHTML = `<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`
    document.body.appendChild(el)
    const t = setInterval(() => {
      s--
      const cd = document.getElementById('ad-cd')
      if (cd) cd.textContent = s
      if (s <= 0) { clearInterval(t); el.remove(); resolve(true) }
    }, 1000)
  })
}

function shuffle(arr) {
  for (let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]]
  }
  return arr
}
