import { supabase } from '../lib/supabase.js'

/**
 * Setup — Création profil Manager (GDD §2.2)
 * Pseudo unique, nom club unique, logo 2 couleurs
 * Récompenses : 5 boosters Players (4c, 1er avec GK), 1 Formation, 1 GC (3c), 10k crédits
 */
export function renderSetup(container, { state, navigate, toast, refreshProfile }) {
  let step = 1
  let clubColor1 = '#1A6B3C'
  let clubColor2 = '#D4A017'

  container.innerHTML = `
  <div class="setup-screen">
    <div class="setup-box">
      <div style="text-align:center;margin-bottom:8px">
        <div style="font-size:36px">⚽</div>
        <h2 style="font-weight:900;font-size:20px">Création de ton profil</h2>
        <p style="font-size:13px;color:var(--gray-600)">Étape <span id="step-num">1</span> sur 3</p>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="progress-fill" style="width:33%"></div></div>

      <!-- Étape 1 : Pseudo -->
      <div class="setup-step active" id="step-1">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Choisis ton pseudo</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:16px">Ce nom sera affiché à tous les autres Managers.</p>
        <div class="form-group">
          <label>Pseudo unique</label>
          <input type="text" id="setup-pseudo" placeholder="Ex: BallonDor29" maxlength="20">
          <div style="font-size:11px;color:var(--gray-600);margin-top:4px">Entre 3 et 20 caractères</div>
        </div>
        <div id="step1-error" class="form-error"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:12px" id="step1-next">Suivant →</button>
      </div>

      <!-- Étape 2 : Club -->
      <div class="setup-step" id="step-2">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Crée ton club</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:16px">Le nom de ton équipe, unique dans tout le jeu.</p>
        <div class="form-group">
          <label>Nom du club</label>
          <input type="text" id="setup-club" placeholder="Ex: Les Invincibles" maxlength="30">
        </div>
        <div id="step2-error" class="form-error"></div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-ghost" id="step2-back" style="flex:1">← Retour</button>
          <button class="btn btn-primary" id="step2-next" style="flex:2">Suivant →</button>
        </div>
      </div>

      <!-- Étape 3 : Logo couleurs -->
      <div class="setup-step" id="step-3">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:4px">Design ton logo</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:12px">Choisis les couleurs de ton club.</p>

        <div class="club-logo-preview" id="logo-preview" style="background:${clubColor2};border-color:${clubColor1}">
          <span id="logo-initials" style="color:${clubColor1}">MW</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch1" style="background:${clubColor1};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur du contour</label>
              <input type="color" id="color1" value="${clubColor1}" style="width:100%;height:36px;padding:2px;border-radius:6px">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch2" style="background:${clubColor2};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${clubColor2}" style="width:100%;height:36px;padding:2px;border-radius:6px">
            </div>
          </div>
        </div>

        <div id="step3-error" class="form-error" style="margin-top:8px"></div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-ghost" id="step3-back" style="flex:1">← Retour</button>
          <button class="btn btn-primary" id="step3-finish" style="flex:2">🚀 Créer mon profil !</button>
        </div>
      </div>
    </div>
  </div>
  `

  function updateLogo() {
    const preview = document.getElementById('logo-preview')
    const initials = document.getElementById('logo-initials')
    const club = document.getElementById('setup-club')?.value || 'MW'
    const parts = club.trim().split(' ').filter(Boolean)
    const ini = parts.length >= 2 ? (parts[0][0]+parts[1][0]).toUpperCase() : club.slice(0,2).toUpperCase()
    if (preview) {
      preview.style.background  = clubColor2
      preview.style.borderColor = clubColor1
    }
    if (initials) {
      initials.textContent = ini
      initials.style.color = clubColor1
    }
  }

  // Color pickers
  document.getElementById('color1').addEventListener('input', e => {
    clubColor1 = e.target.value
    document.getElementById('swatch1').style.background = clubColor1
    updateLogo()
  })
  document.getElementById('color2').addEventListener('input', e => {
    clubColor2 = e.target.value
    document.getElementById('swatch2').style.background = clubColor2
    updateLogo()
  })

  function goStep(n) {
    document.querySelectorAll('.setup-step').forEach(el => el.classList.remove('active'))
    document.getElementById(`step-${n}`).classList.add('active')
    document.getElementById('step-num').textContent = n
    document.getElementById('progress-fill').style.width = `${Math.round(n/3*100)}%`
    step = n
    if (n === 3) updateLogo()
  }

  // Étape 1
  document.getElementById('step1-next').addEventListener('click', async () => {
    const pseudo = document.getElementById('setup-pseudo').value.trim()
    const errEl  = document.getElementById('step1-error')
    errEl.textContent = ''
    if (pseudo.length < 3) { errEl.textContent = 'Pseudo trop court (min. 3 caractères).'; return }

    const { data: existing } = await supabase
      .from('users').select('id').eq('pseudo', pseudo).maybeSingle()
    if (existing) { errEl.textContent = 'Ce pseudo est déjà pris.'; return }
    goStep(2)
  })

  // Étape 2
  document.getElementById('step2-back').addEventListener('click', () => goStep(1))
  document.getElementById('step2-next').addEventListener('click', async () => {
    const club  = document.getElementById('setup-club').value.trim()
    const errEl = document.getElementById('step2-error')
    errEl.textContent = ''
    if (club.length < 2) { errEl.textContent = 'Nom trop court (min. 2 caractères).'; return }

    const { data: existing } = await supabase
      .from('users').select('id').eq('club_name', club).maybeSingle()
    if (existing) { errEl.textContent = 'Ce nom de club est déjà pris.'; return }
    goStep(3)
  })

  // Étape 3
  document.getElementById('step3-back').addEventListener('click', () => goStep(2))
  document.getElementById('step3-finish').addEventListener('click', async () => {
    const pseudo = document.getElementById('setup-pseudo').value.trim()
    const club   = document.getElementById('setup-club').value.trim()
    const errEl  = document.getElementById('step3-error')
    const btn    = document.getElementById('step3-finish')
    errEl.textContent = ''
    btn.disabled = true; btn.textContent = 'Création en cours…'

    try {
      // 1. Créer le profil utilisateur
      const { error: profileErr } = await supabase.from('users').insert({
        id:          state.user.id,
        pseudo,
        club_name:   club,
        club_color1: clubColor1,
        club_color2: clubColor2,
        credits:     10000,
      })
      if (profileErr) throw profileErr

      // 2. Distribuer les récompenses de démarrage
      await distributeStarterRewards(state.user.id)

      await refreshProfile()
      toast(`Bienvenue ${pseudo} ! Tes récompenses de démarrage sont prêtes.`, 'success', 5000)
      window.location.reload()

    } catch (err) {
      errEl.textContent = err.message
      btn.disabled = false; btn.textContent = '🚀 Créer mon profil !'
    }
  })
}

async function distributeStarterRewards(userId) {
  // Récupérer des joueurs aléatoires
  const { data: allPlayers } = await supabase
    .from('players')
    .select('id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price')
    .eq('is_active', true)

  if (!allPlayers || allPlayers.length === 0) return // Pas de joueurs en BDD

  const players     = allPlayers
  const gks         = players.filter(p => p.job === 'GK')
  const nonGks      = players.filter(p => p.job !== 'GK')

  const cardsToInsert = []

  // 5 boosters Players (4 cartes chacun)
  for (let b = 0; b < 5; b++) {
    let boosterPlayers = []
    if (b === 0 && gks.length > 0) {
      // 1er booster : GK obligatoire
      const gk = gks[Math.floor(Math.random() * gks.length)]
      boosterPlayers.push(gk)
      const rest = shuffle([...nonGks]).slice(0, 3)
      boosterPlayers.push(...rest)
    } else {
      boosterPlayers = shuffle([...players]).slice(0, 4)
    }
    boosterPlayers.forEach(p => {
      cardsToInsert.push({ owner_id: userId, player_id: p.id, card_type: 'player' })
    })
  }

  // 3 cartes Game Changer
  const gcTypes = ['Ressusciter', 'Double attaque', 'Bouclier']
  gcTypes.forEach(type => {
    cardsToInsert.push({ owner_id: userId, card_type: 'game_changer', gc_type: type })
  })

  // 1 carte Formation aléatoire
  const formations = ['4-4-2','4-3-3','3-4-3','3-5-2','5-3-2']
  cardsToInsert.push({
    owner_id: userId, card_type: 'formation',
    formation: formations[Math.floor(Math.random() * formations.length)]
  })

  if (cardsToInsert.length > 0) {
    await supabase.from('cards').insert(cardsToInsert)
  }

  // Marquer le premier booster comme ouvert
  await supabase.from('users')
    .update({ first_booster_opened: true })
    .eq('id', userId)
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
