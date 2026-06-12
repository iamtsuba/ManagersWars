import { supabase } from '../lib/supabase.js'

const BOOSTERS = [
  { id:'players_std',  img: import.meta.env.BASE_URL+'icons/booster-players.png',     name:'Players',       sub:'5 cartes joueurs',  cost:5000,  costLabel:'5 000 crédits', cardCount:5, type:'player' },
  { id:'players_pub',  img: import.meta.env.BASE_URL+'icons/booster-silver.png',       name:'Players (pub)', sub:'3 cartes joueurs',  cost:0,     costLabel:'1 pub',         cardCount:3, type:'player' },
  { id:'game_changer', img: import.meta.env.BASE_URL+'icons/booster-gamechanger.png',  name:'Game Changer',  sub:'3 cartes spéciales',cost:10000, costLabel:'10 000 crédits',cardCount:3, type:'game_changer' },
  { id:'formation',    img: import.meta.env.BASE_URL+'icons/booster-formation.png',    name:'Formation',     sub:'1 carte formation', cost:10000, costLabel:'10 000 crédits',cardCount:1, type:'formation' },
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
  return `${supabaseUrl}/storage/v1/object/public/assets/tetes/${key}.png`
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
          const isPlayerBooster = b.id === 'players_std' || b.id === 'players_pub'
          return `<div class="booster-card ${!canAfford ? 'disabled' : ''}" data-booster="${b.id}" style="position:relative">
            ${isPlayerBooster ? `<button class="booster-info-btn" data-info="${b.id}"
              style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;
              background:rgba(0,0,0,0.15);border:none;cursor:pointer;font-size:11px;font-weight:700;
              color:var(--gray-600);display:flex;align-items:center;justify-content:center;z-index:2"
              onclick="event.stopPropagation()">ℹ</button>` : ''}
            <div class="icon"><img src="${b.img}" alt="${b.name}" style="height:64px;width:auto;display:block;margin:0 auto"></div>
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

  // Icône ℹ probabilités sur les boosters Players
  container.querySelectorAll('.booster-info-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      showBoosterOdds()
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

// ── Probabilités d'obtention (GDD boosters) ──────────────
// 90% Normal note 1-5 | 8% Normal note 6-10 | 1.5% Pépite/Papyte | 0.5% Légende
function rollRarity() {
  const r = Math.random() * 100
  if (r < 0.5)  return 'legende'
  if (r < 2.0)  return 'special'      // pépite ou papyte
  if (r < 10.0) return 'normal_high'  // normal note 6-10
  return 'normal_low'                  // normal note 1-5
}

function maxNote(p) {
  return Math.max(Number(p.note_g)||0, Number(p.note_d)||0, Number(p.note_m)||0, Number(p.note_a)||0)
}

function pickPlayer(pool, targetRarity) {
  let candidates
  switch(targetRarity) {
    case 'legende':
      candidates = pool.filter(p => p.rarity === 'legende')
      if (!candidates.length) candidates = pool.filter(p => p.rarity === 'pepite' || p.rarity === 'papyte')
      if (!candidates.length) candidates = pool.filter(p => maxNote(p) >= 6)
      break
    case 'special':
      candidates = pool.filter(p => p.rarity === 'pepite' || p.rarity === 'papyte')
      if (!candidates.length) candidates = pool.filter(p => maxNote(p) >= 6)
      break
    case 'normal_high':
      candidates = pool.filter(p => p.rarity === 'normal' && maxNote(p) >= 6)
      if (!candidates.length) candidates = pool.filter(p => maxNote(p) >= 6)
      break
    default: // normal_low
      candidates = pool.filter(p => p.rarity === 'normal' && maxNote(p) >= 1 && maxNote(p) <= 5)
      if (!candidates.length) candidates = pool.filter(p => p.rarity === 'normal')
      break
  }
  if (!candidates.length) candidates = pool
  return candidates[Math.floor(Math.random() * candidates.length)]
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

  const gks    = players.filter(p => p.job === 'GK')
  const nonGks = players.filter(p => p.job !== 'GK')
  const needGK = !profile.first_booster_opened && gks.length > 0
  const selected = []

  for (let i = 0; i < count; i++) {
    // 1ère carte du 1er booster = GK obligatoire
    const pool = (i === 0 && needGK) ? gks : (i === 0 ? nonGks : players)
    const rarity = rollRarity()
    const player = pickPlayer(pool, rarity)
    if (player) selected.push(player)
  }

  if (needGK) {
    await supabase.from('users').update({ first_booster_opened: true }).eq('id', profile.id)
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
        position:fixed;inset:0;background:#0a1628;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        z-index:3000;overflow:hidden;
      }
      .pack-visual {
        width:180px;height:280px;border-radius:16px;
        background:transparent;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        filter:drop-shadow(0 0 30px rgba(212,160,23,0.5));cursor:pointer;
        animation:packFloat 2s ease-in-out infinite;
      }
      .pack-visual img { width:auto; height:100%; max-width:100%; object-fit:contain; }
      @keyframes packFloat {
        0%,100% { transform:translateY(0) rotate(-1deg); }
        50%      { transform:translateY(-8px) rotate(1deg); }
      }
      .pack-visual.shaking { animation:packShake 0.4s ease-in-out; }
      @keyframes packShake {
        0%,100%{transform:rotate(0)} 20%{transform:rotate(-8deg) scale(1.05)}
        40%{transform:rotate(8deg) scale(1.08)} 60%{transform:rotate(-5deg)}
        80%{transform:rotate(5deg)}
      }
      .pack-open { animation:packOpen 0.6s ease-out forwards !important; }
      @keyframes packOpen {
        0%{transform:scale(1);opacity:1} 50%{transform:scale(1.3) rotate(5deg);opacity:.8}
        100%{transform:scale(0) rotate(20deg);opacity:0}
      }
      /* Carte révélation - une seule carte centrée */
      .single-card-reveal {
        animation:cardReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
      }
      @keyframes cardReveal {
        from{opacity:0;transform:scale(0.5) rotateY(90deg)}
        to{opacity:1;transform:scale(1) rotateY(0deg)}
      }
      .legend-glow {
        box-shadow:0 0 30px 10px #7a28b8, 0 0 60px 20px rgba(122,40,184,0.5) !important;
        animation:legendPulse 0.8s ease-in-out infinite alternate;
      }
      @keyframes legendPulse {
        from{box-shadow:0 0 20px 5px #7a28b8}
        to{box-shadow:0 0 50px 20px #7a28b8,0 0 80px 30px rgba(122,40,184,0.4)}
      }
      /* Récapitulatif final */
      .recap-grid {
        display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
        max-width:600px;padding:16px;overflow-y:auto;max-height:70vh;
      }
      .recap-card { animation:recapAppear 0.3s ease both; }
      @keyframes recapAppear { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
    </style>

    <!-- Phase 1 : booster -->
    <div id="pack-phase" style="display:flex;flex-direction:column;align-items:center;gap:16px">
      <div style="font-size:14px;color:rgba(255,255,255,0.7)">
        ${booster.name} · ${cards.length} carte${cards.length>1?'s':''}
      </div>
      <div class="pack-visual" id="pack-visual"><img src="${booster.img}" alt="${booster.name}"></div>
      <div style="font-size:13px;color:rgba(255,255,255,0.5)">Appuie pour ouvrir</div>
    </div>

    <!-- Phase 2 : révélation une par une -->
    <div id="reveal-phase" style="display:none;flex-direction:column;align-items:center;gap:16px;width:100%;padding:0 20px">
      <div id="card-counter" style="font-size:13px;color:rgba(255,255,255,0.5)"></div>
      <div id="single-card-slot" style="position:relative"></div>
      <div id="card-tap-hint" style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:4px">Appuie pour continuer →</div>
    </div>

    <!-- Phase 3 : récapitulatif -->
    <div id="recap-phase" style="display:none;flex-direction:column;align-items:center;gap:0;width:100%">
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin:12px 0 4px">
        ${cards.length} carte${cards.length>1?'s obtenues':'obtenue'} !
      </div>
      <div class="recap-grid" id="recap-grid"></div>
      <div style="display:flex;gap:10px;padding:0 16px 20px;width:100%;max-width:400px">
        <button class="btn btn-primary" id="reveal-collection" style="flex:1">Voir ma collection</button>
        <button class="btn btn-ghost" id="reveal-more" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Boosters</button>
      </div>
    </div>

    <!-- Canvas pour feu d'artifice -->
    <canvas id="fireworks-canvas" style="position:fixed;inset:0;pointer-events:none;z-index:3001"></canvas>
  `

  document.body.appendChild(overlay)

  // ── Phase 1 : ouverture du booster ───────────────────
  let packClicked = false
  document.getElementById('pack-visual').addEventListener('click', () => {
    if (packClicked) return
    packClicked = true
    const packEl = document.getElementById('pack-visual')
    packEl.classList.add('shaking')
    setTimeout(() => {
      packEl.classList.add('pack-open')
      setTimeout(() => {
        document.getElementById('pack-phase').style.display = 'none'
        startCardReveal(0)
      }, 600)
    }, 500)
  })

  // ── Phase 2 : révélation carte par carte ─────────────
  let currentIdx = 0

  function startCardReveal(idx) {
    currentIdx = idx
    const revealPhase = document.getElementById('reveal-phase')
    revealPhase.style.display = 'flex'
    showCard(idx)
  }

  function showCard(idx) {
    const card    = cards[idx]
    const counter = document.getElementById('card-counter')
    const slot    = document.getElementById('single-card-slot')
    const hint    = document.getElementById('card-tap-hint')

    if (counter) counter.textContent = `Carte ${idx+1} / ${cards.length}`
    if (hint) hint.textContent = idx < cards.length-1 ? 'Appuie pour continuer →' : 'Appuie pour voir toutes tes cartes'

    // Construire la carte
    const cardHtml = buildCardFace(card)
    const isLegend = card.card_type === 'player' && card.player?.rarity === 'legende'

    // Wrapper cliquable
    slot.innerHTML = `
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;${isLegend?'filter:drop-shadow(0 0 20px #7a28b8)':''}">
        ${cardHtml}
      </div>`

    if (isLegend) {
      // Lancer le feu d'artifice
      launchFireworks()
    }

    // Clic pour passer à la suivante
    const wrap = document.getElementById('current-card-wrap')
    let tapped = false
    wrap.addEventListener('click', () => {
      if (tapped) return
      tapped = true
      const next = idx + 1
      if (next < cards.length) {
        // Sortie + entrée de la carte suivante
        wrap.style.transition = 'all 0.25s ease'
        wrap.style.transform = 'translateX(-120%) rotate(-15deg)'
        wrap.style.opacity = '0'
        setTimeout(() => showCard(next), 250)
      } else {
        // Toutes les cartes vues → récapitulatif
        showRecap()
      }
    })
  }

  // ── Phase 3 : récapitulatif ────────────────────────────
  function showRecap() {
    stopFireworks()
    document.getElementById('reveal-phase').style.display = 'none'
    const recapPhase = document.getElementById('recap-phase')
    recapPhase.style.display = 'flex'

    const grid = document.getElementById('recap-grid')
    grid.innerHTML = cards.map((card, i) => `
      <div class="recap-card" style="--i:${i};animation-delay:${i*0.07}s">
        ${buildCardFace(card)}
      </div>`).join('')
  }

  // ── Feu d'artifice ────────────────────────────────────
  let fwInterval = null

  function launchFireworks() {
    const canvas = document.getElementById('fireworks-canvas')
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const particles = []

    function spawnBurst() {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.6
      const colors = ['#7a28b8','#ff4081','#D4A017','#00e676','#fff','#e040fb','#40c4ff']
      const color  = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 / 60) * i
        const speed = 2 + Math.random() * 5
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 2 + Math.random() * 3,
        })
      }
    }

    spawnBurst()
    fwInterval = setInterval(spawnBurst, 600)

    function animate() {
      if (!document.getElementById('fireworks-canvas')) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x  += p.vx
        p.y  += p.vy + 0.08   // gravité légère
        p.vy *= 0.98
        p.alpha -= 0.018
        if (p.alpha <= 0) { particles.splice(i, 1); continue }
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (fwInterval !== null || particles.length > 0) requestAnimationFrame(animate)
    }
    animate()
  }

  function stopFireworks() {
    if (fwInterval !== null) { clearInterval(fwInterval); fwInterval = null }
    const canvas = document.getElementById('fireworks-canvas')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  // ── Boutons fin ───────────────────────────────────────
  document.getElementById('reveal-collection').addEventListener('click', () => {
    stopFireworks(); overlay.remove(); navigate('collection')
  })
  document.getElementById('reveal-more').addEventListener('click', () => {
    stopFireworks(); overlay.remove(); navigate('boosters')
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
      <div style="position:relative;height:72px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
        <div style="position:absolute;top:14px;width:100%;height:26px;background:${jobColor}"></div>
        <svg width="50" height="48" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${jobColor}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${note||0}</text>
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

// ── Popup probabilités d'obtention ───────────────────────
function showBoosterOdds() {
  const overlay = document.createElement('div')
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
    align-items:center;justify-content:center;z-index:4000;padding:16px`
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:20px;max-width:340px;width:100%;
      box-shadow:0 8px 40px rgba(0,0,0,0.3)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:700;margin:0">📦 Chances d'obtention</h3>
        <button id="odds-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#666">✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f5f5f5">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#ccc;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Normal (note 1–5)</div>
              <div style="font-size:11px;color:#888">Carte commune</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#333">90%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f0f8ff">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#4a90d9;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Normal (note 6–10)</div>
              <div style="font-size:11px;color:#888">Carte commune haute</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#4a90d9">8%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#fff8e1">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#D4A017;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Pépite / Papyte</div>
              <div style="font-size:11px;color:#888">Carte rare</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#D4A017">1.5%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f5eeff">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#7a28b8;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Légende</div>
              <div style="font-size:11px;color:#888">Carte ultra-rare</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#7a28b8">0.5%</div>
        </div>

      </div>
      <div style="margin-top:14px;padding:10px;background:#f9f9f9;border-radius:8px;font-size:11px;color:#888;text-align:center">
        Les probabilités s'appliquent à chaque carte individuellement.<br>
        Le 1er booster contient toujours un Gardien.
      </div>
    </div>
  `
  document.body.appendChild(overlay)
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove() })
  document.getElementById('odds-close').addEventListener('click', () => overlay.remove())
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
