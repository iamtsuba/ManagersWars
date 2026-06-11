/**
 * Manager Wars — SPA Router
 * Architecture corrigée :
 * - Un seul point d'entrée navigate() qui injecte toujours dans #page-content
 * - renderAppShell() construit le layout une seule fois
 * - Les navs ne sont jamais écrasées
 */
import { supabase } from './lib/supabase.js'
import { renderAuth }       from './auth/auth.js'
import { renderSetup }      from './auth/setup.js'
import { renderHome }       from './home/home.js'
import { renderCollection } from './collection/collection.js'
import { renderDecks }      from './decks/decks.js'
import { renderBoosters }   from './boosters/boosters.js'
import { renderMatch }      from './match/match.js'
import { renderMarket }     from './market/market.js'
import { renderRankings }   from './rankings/rankings.js'

// ── État global ───────────────────────────────────────────
export const state = {
  user:    null,
  profile: null,
  page:    'home',
  params:  {},
}

// ── Helpers globaux ───────────────────────────────────────
export function toast(msg, type = 'info', duration = 3000) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.className = `show ${type}`
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.className = '' }, duration)
}

export function openModal(title, bodyHTML, footerHTML = '') {
  document.getElementById('modal-title').textContent = title
  document.getElementById('modal-body').innerHTML    = bodyHTML
  document.getElementById('modal-footer').innerHTML  = footerHTML
  document.getElementById('modal-overlay').classList.remove('hidden')
}

export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden')
}

export async function refreshProfile() {
  if (!state.user) return
  const { data } = await supabase
    .from('users').select('*').eq('id', state.user.id).single()
  if (data) state.profile = data
}

// ── Navigate — UN SEUL point d'entrée ─────────────────────
// Injecte toujours dans #page-content (jamais dans #app)
export function navigate(page, params = {}) {
  state.page   = page
  state.params = params
  renderPage()
}

// ── Render une page dans #page-content ───────────────────
async function renderPage() {
  const container = document.getElementById('page-content')
  if (!container) return

  // Mettre à jour bottom-nav
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === state.page)
  })

  // Mettre à jour les crédits
  const credEl = document.getElementById('nav-credits')
  if (credEl && state.profile) {
    credEl.textContent = `💰 ${(state.profile.credits || 0).toLocaleString('fr')}`
  }

  const ctx = { state, navigate, toast, openModal, closeModal, refreshProfile }

  container.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">⚽</div>'

  switch (state.page) {
    case 'home':       await renderHome(container, ctx);       break
    case 'collection': await renderCollection(container, ctx); break
    case 'decks':      await renderDecks(container, ctx);      break
    case 'boosters':   await renderBoosters(container, ctx);   break
    case 'match':      await renderMatch(container, ctx);      break
    case 'market':     await renderMarket(container, ctx);     break
    case 'rankings':   await renderRankings(container, ctx);   break
    default:           await renderHome(container, ctx);
  }
}

// ── App Shell — construit UNE SEULE FOIS ─────────────────
function renderAppShell() {
  const app = document.getElementById('app')
  const p   = state.profile

  const parts = (p.club_name || 'MW').split(' ').filter(Boolean)
  const ini   = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : (p.club_name || 'MW').slice(0, 2).toUpperCase()

  // Structure fixe — jamais réécrite lors de la navigation
  app.innerHTML = `
    <nav class="top-nav">
      <div class="logo" id="nav-logo">⚽ MW</div>
      <div id="nav-credits" class="credits">💰 ${(p.credits || 0).toLocaleString('fr')}</div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <span class="icon">🏠</span><span>Accueil</span>
      </a>
      <a href="#" data-page="collection">
        <span class="icon">🃏</span><span>Cartes</span>
      </a>
      <a href="#" data-page="decks">
        <span class="icon">📋</span><span>Decks</span>
      </a>
      <a href="#" data-page="boosters">
        <span class="icon">📦</span><span>Boosters</span>
      </a>
      <a href="#" data-page="market">
        <span class="icon">🛒</span><span>Marché</span>
      </a>
    </nav>
  `

  // Attacher les événements de navigation UNE SEULE FOIS
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      navigate(a.dataset.page)
    })
  })

  document.getElementById('nav-logo').addEventListener('click', () => navigate('home'))
  document.getElementById('nav-credits').addEventListener('click', () => navigate('boosters'))
}

// ── Bootstrap ─────────────────────────────────────────────
async function init() {
  // Modal
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })
  document.getElementById('modal-close').addEventListener('click', closeModal)

  // Session Supabase
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    hideLoader()
    renderAuth(document.getElementById('app'), { navigate: navigateToAuth, toast })
    return
  }

  state.user = session.user
  await refreshProfile()
  hideLoader()

  // Pas de profil → setup (première connexion)
  if (!state.profile) {
    renderSetup(document.getElementById('app'), { state, navigate: navigateAfterSetup, toast, refreshProfile })
    return
  }

  // Vérifier si les récompenses de démarrage n'ont pas été distribuées
  // (cas d'un compte créé directement via Supabase sans passer par le setup)
  if (!state.profile.first_booster_opened) {
    await distributeStarterRewardsIfNeeded(state.user.id)
    await refreshProfile()
  }

  launchApp()

  // Auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT') {
      state.user    = null
      state.profile = null
      document.getElementById('app').innerHTML = ''
      renderAuth(document.getElementById('app'), { navigate: navigateToAuth, toast })
    }
  })
}

function launchApp() {
  document.getElementById('app').style.cssText = 'display:flex;flex-direction:column'
  renderAppShell()
  renderPage()
}

// Navigate utilisé avant que le shell soit monté (auth/setup)
function navigateToAuth() {
  window.location.reload()
}

// Appelé depuis setup.js après création du profil
async function navigateAfterSetup() {
  await refreshProfile()
  launchApp()
}

// ── Récompenses de démarrage (si manquantes) ──────────────
async function distributeStarterRewardsIfNeeded(userId) {
  const { data: existingCards } = await supabase
    .from('cards').select('id').eq('owner_id', userId).limit(1)

  // Si l'utilisateur a déjà des cartes, ne rien faire
  if (existingCards && existingCards.length > 0) return

  const { data: allPlayers } = await supabase
    .from('players').select('id,job').eq('is_active', true)

  if (!allPlayers || allPlayers.length === 0) return

  const gks    = allPlayers.filter(p => p.job === 'GK')
  const nonGks = allPlayers.filter(p => p.job !== 'GK')
  const cards  = []

  // 5 boosters Players (4 cartes chacun, 1er avec GK)
  for (let b = 0; b < 5; b++) {
    let pool = []
    if (b === 0 && gks.length > 0) {
      pool.push(gks[Math.floor(Math.random() * gks.length)])
      pool.push(...shuffle([...nonGks]).slice(0, 3))
    } else {
      pool = shuffle([...allPlayers]).slice(0, 4)
    }
    pool.forEach(p => cards.push({ owner_id: userId, player_id: p.id, card_type: 'player' }))
  }

  // 3 Game Changers
  ;['Ressusciter', 'Double attaque', 'Bouclier'].forEach(type => {
    cards.push({ owner_id: userId, card_type: 'game_changer', gc_type: type })
  })

  // 1 Formation
  const formations = ['4-4-2','4-3-3','3-4-3','3-5-2','5-3-2']
  cards.push({
    owner_id: userId, card_type: 'formation',
    formation: formations[Math.floor(Math.random() * formations.length)]
  })

  await supabase.from('cards').insert(cards)
  await supabase.from('users')
    .update({ first_booster_opened: true })
    .eq('id', userId)

  toast('🎁 Tes récompenses de démarrage ont été ajoutées !', 'success', 5000)
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function hideLoader() {
  const l = document.getElementById('app-loader')
  if (l) {
    l.style.opacity = '0'
    l.style.transition = 'opacity 0.3s'
    setTimeout(() => l.style.display = 'none', 300)
  }
  document.getElementById('app').style.display = 'flex'
}

init()
