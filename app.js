/**
 * Manager Wars — SPA Router
 * Gère l'état global, navigation, et le flow complet du jeu
 * Basé uniquement sur le GDD v1.0
 */
import { supabase } from './lib/supabase.js'
import { renderAuth } from './auth/auth.js'
import { renderSetup } from './auth/setup.js'
import { renderHome } from './home/home.js'
import { renderCollection } from './collection/collection.js'
import { renderDecks } from './decks/decks.js'
import { renderBoosters } from './boosters/boosters.js'
import { renderMatch } from './match/match.js'
import { renderMarket } from './market/market.js'
import { renderRankings } from './rankings/rankings.js'

// ── État global ──────────────────────────────────────────
export const state = {
  user:    null,   // auth.user Supabase
  profile: null,   // ligne table users
  page:    'home',
  params:  {},
}

// ── Contexte global ──────────────────────────────────────
export const ctx = {
  navigate:        null,
  toast:           null,
  openModal:       null,
  closeModal:      null,
  refreshProfile:  null,
  state,
}

// ── Toast helper ──────────────────────────────────────────
export function toast(msg, type = 'info', duration = 3000) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.className = `show ${type}`
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.className = '' }, duration)
}

// ── Modal helpers ─────────────────────────────────────────
export function openModal(title, bodyHTML, footerHTML = '') {
  document.getElementById('modal-title').textContent = title
  document.getElementById('modal-body').innerHTML   = bodyHTML
  document.getElementById('modal-footer').innerHTML = footerHTML
  document.getElementById('modal-overlay').classList.remove('hidden')
}
export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden')
}

// ── Navigation ────────────────────────────────────────────
export function navigate(page, params = {}) {
  state.page   = page
  state.params = params
  render()
}

// ── Refresh profil ────────────────────────────────────────
export async function refreshProfile() {
  if (!state.user) return
  const { data } = await supabase
    .from('users').select('*').eq('id', state.user.id).single()
  if (data) state.profile = data
}

// ── Render principal ──────────────────────────────────────
async function render() {
  const container = document.getElementById('app')

  // Mettre à jour la nav
  if (document.querySelector('.bottom-nav')) {
    document.querySelectorAll('.bottom-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === state.page)
    })
  }
  const credEl = document.getElementById('nav-credits')
  if (credEl && state.profile) {
    credEl.textContent = `💰 ${(state.profile.credits||0).toLocaleString('fr')}`
  }

  const context = { state, navigate, toast, openModal, closeModal, refreshProfile }

  switch (state.page) {
    case 'home':       await renderHome(container, context);       break
    case 'collection': await renderCollection(container, context); break
    case 'decks':      await renderDecks(container, context);      break
    case 'boosters':   await renderBoosters(container, context);   break
    case 'match':      await renderMatch(container, context);      break
    case 'market':     await renderMarket(container, context);     break
    case 'rankings':   await renderRankings(container, context);   break
    default:           await renderHome(container, context);
  }
}

// ── Render app shell (layout persistant) ──────────────────
function renderAppShell() {
  const app = document.getElementById('app')
  const p = state.profile
  if (!p) return

  const parts = (p.club_name || 'MW').split(' ').filter(Boolean)
  const ini = parts.length >= 2 ? (parts[0][0]+parts[1][0]).toUpperCase() : (p.club_name||'MW').slice(0,2).toUpperCase()

  app.innerHTML = `
    <nav class="top-nav">
      <div class="logo" id="nav-logo">⚽ MW</div>
      <div id="nav-credits" class="credits">💰 ${(p.credits||0).toLocaleString('fr')}</div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <span class="icon">🏠</span>
        <span>Accueil</span>
      </a>
      <a href="#" data-page="collection">
        <span class="icon">🃏</span>
        <span>Cartes</span>
      </a>
      <a href="#" data-page="decks">
        <span class="icon">📋</span>
        <span>Decks</span>
      </a>
      <a href="#" data-page="boosters">
        <span class="icon">📦</span>
        <span>Boosters</span>
      </a>
      <a href="#" data-page="market">
        <span class="icon">🛒</span>
        <span>Marché</span>
      </a>
    </nav>
  `

  // Navigation
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      navigate(a.dataset.page)
    })
  })

  document.getElementById('nav-logo').addEventListener('click', () => navigate('home'))
  document.getElementById('nav-credits').addEventListener('click', () => navigate('boosters'))
}

// ── Bootstrap initial ─────────────────────────────────────
async function init() {
  // Fermer modal
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })
  document.getElementById('modal-close').addEventListener('click', closeModal)

  // Vérifier session Supabase
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    hideLoader()
    renderAuth(document.getElementById('app'), { navigate, toast })
    return
  }

  state.user = session.user
  await refreshProfile()

  hideLoader()

  // Pas de profil → setup
  if (!state.profile) {
    renderSetup(document.getElementById('app'), { state, navigate, toast, refreshProfile })
    return
  }

  // Injecter le layout
  document.getElementById('app').style.display = 'flex'
  document.getElementById('app').style.flexDirection = 'column'
  renderAppShell()

  // Redéfinir render pour utiliser page-content
  const origRender = render
  window._render = async function() {
    const container = document.getElementById('page-content')
    if (!container) return

    // Mettre à jour la nav
    document.querySelectorAll('.bottom-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === state.page)
    })
    const credEl = document.getElementById('nav-credits')
    if (credEl && state.profile) {
      credEl.textContent = `💰 ${(state.profile.credits||0).toLocaleString('fr')}`
    }

    const context = { state, navigate, toast, openModal, closeModal, refreshProfile }
    switch (state.page) {
      case 'home':       await renderHome(container, context);       break
      case 'collection': await renderCollection(container, context); break
      case 'decks':      await renderDecks(container, context);      break
      case 'boosters':   await renderBoosters(container, context);   break
      case 'match':      await renderMatch(container, context);      break
      case 'market':     await renderMarket(container, context);     break
      case 'rankings':   await renderRankings(container, context);   break
      default:           await renderHome(container, context);
    }
  }

  // Override navigate pour utiliser page-content
  globalThis.mwNavigate = function(page, params = {}) {
    state.page   = page
    state.params = params
    window._render()
  }

  // Rendre la première page
  window._render()

  // Écouter les changements d'auth
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT') {
      state.user = null
      state.profile = null
      document.getElementById('app').innerHTML = ''
      hideLoader(); showLoader()
      renderAuth(document.getElementById('app'), { navigate, toast })
      hideLoader()
    }
  })
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
function showLoader() { /* noop */ }

init()
