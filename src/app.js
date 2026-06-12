/**
 * Manager Wars — SPA Router
 * Architecture : UN SEUL navigate() qui injecte toujours dans #page-content.
 * Le shell (top-nav + bottom-nav) est rendu une seule fois et jamais écrasé.
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

// ── Toast ─────────────────────────────────────────────────
export function toast(msg, type = 'info', duration = 3000) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.className = `show ${type}`
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.className = '' }, duration)
}

// ── Modal ─────────────────────────────────────────────────
export function openModal(title, bodyHTML, footerHTML = '') {
  document.getElementById('modal-title').textContent = title
  document.getElementById('modal-body').innerHTML   = bodyHTML
  document.getElementById('modal-footer').innerHTML = footerHTML
  document.getElementById('modal-overlay').classList.remove('hidden')
}
export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden')
}

// ── Refresh profil ────────────────────────────────────────
export async function refreshProfile() {
  if (!state.user) return
  const { data } = await supabase.from('users').select('*').eq('id', state.user.id).single()
  if (data) state.profile = data
}

// ── THÈME ─────────────────────────────────────────────────
const THEME_KEY = 'mw_theme'

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light' // par défaut : design du kit graphique
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  applyTheme(theme)
  // Persister côté serveur si profil connu
  if (state.profile?.id) {
    supabase.from('users').update({ theme }).eq('id', state.profile.id).then(() => {})
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

// ── NAVIGATE — point d'entrée unique ─────────────────────
export function navigate(page, params = {}) {
  state.page   = page
  state.params = params
  renderPage()
}

async function renderPage() {
  const container = document.getElementById('page-content')
  if (!container) return

  // Maj bottom-nav active
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === state.page)
  })

  // Maj crédits
  const credEl = document.getElementById('nav-credits')
  if (credEl && state.profile) {
    credEl.textContent = `💰 ${(state.profile.credits||0).toLocaleString('fr')}`
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

// ── APP SHELL — construit UNE SEULE FOIS ─────────────────
function renderAppShell() {
  const app = document.getElementById('app')
  const p   = state.profile
  if (!p) return

  const ICON = import.meta.env.BASE_URL + 'icons/'

  app.innerHTML = `
    <nav class="top-nav">
      <div class="logo" id="nav-logo">
        <img src="${ICON}logo-withname.png" alt="Manager Wars" style="height:48px;width:auto;display:block">
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div id="nav-credits" class="credits">💰 ${(p.credits||0).toLocaleString('fr')}</div>
        <button id="theme-toggle" class="theme-toggle-btn" title="Changer le thème">
          <span id="theme-icon"></span>
        </button>
      </div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <div class="nav-icon-wrap">
          <img src="${ICON}nav-home.png" alt="" class="nav-icon">
          <img src="${ICON}nav-home-txt.png" alt="Accueil" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="collection">
        <div class="nav-icon-wrap">
          <img src="${ICON}nav-collection.png" alt="" class="nav-icon">
          <img src="${ICON}nav-collection-txt.png" alt="Cartes" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="decks">
        <div class="nav-icon-wrap">
          <img src="${ICON}nav-decks.png" alt="" class="nav-icon">
          <img src="${ICON}nav-deck-txt.png" alt="Decks" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="boosters">
        <div class="nav-icon-wrap">
          <img src="${ICON}nav-boosters.png" alt="" class="nav-icon">
          <img src="${ICON}nav-boosters-txt.png" alt="Boosters" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="market">
        <div class="nav-icon-wrap">
          <img src="${ICON}nav-market.png" alt="" class="nav-icon">
          <img src="${ICON}nav-market-txt.png" alt="Marché" class="nav-label">
        </div>
      </a>
    </nav>
  `

  // Attacher les listeners UNE SEULE FOIS
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      navigate(a.dataset.page)
    })
  })
  document.getElementById('nav-logo').addEventListener('click', () => navigate('home'))
  document.getElementById('nav-credits').addEventListener('click', () => navigate('boosters'))

  // Toggle thème
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = getTheme()
    const next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
    updateThemeIcon(next)
  })
  updateThemeIcon(getTheme())
}

function updateThemeIcon(theme) {
  const el = document.getElementById('theme-icon')
  if (!el) return
  // dark = noir actuel -> icône proposant de passer au clair (soleil)
  // light = clair -> icône proposant de revenir au sombre (lune)
  el.textContent = theme === 'dark' ? '☀️' : '🌙'
}

// ── BOOTSTRAP ─────────────────────────────────────────────
async function init() {
  // Appliquer le thème sauvegardé avant tout rendu (évite le flash)
  applyTheme(getTheme())

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })
  document.getElementById('modal-close').addEventListener('click', closeModal)

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    hideLoader()
    renderAuth(document.getElementById('app'), { navigate: () => window.location.reload(), toast })
    return
  }

  state.user = session.user
  await refreshProfile()
  hideLoader()

  if (!state.profile) {
    renderSetup(document.getElementById('app'), { state, navigate: async () => { await refreshProfile(); launchApp() }, toast, refreshProfile })
    return
  }

  // Appliquer le thème sauvegardé en BDD si présent (prioritaire sur localStorage)
  if (state.profile.theme && state.profile.theme !== getTheme()) {
    localStorage.setItem(THEME_KEY, state.profile.theme)
    applyTheme(state.profile.theme)
  }

  launchApp()

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT') {
      state.user = null
      state.profile = null
      document.getElementById('app').innerHTML = ''
      renderAuth(document.getElementById('app'), { navigate: () => window.location.reload(), toast })
    }
  })
}

function launchApp() {
  const app = document.getElementById('app')
  app.style.display = 'flex'
  app.style.flexDirection = 'column'
  renderAppShell()
  renderPage()
}

function hideLoader() {
  const l = document.getElementById('app-loader')
  if (l) {
    l.style.opacity = '0'
    l.style.transition = 'opacity 0.3s'
    setTimeout(() => l.style.display = 'none', 300)
  }
}

init()
