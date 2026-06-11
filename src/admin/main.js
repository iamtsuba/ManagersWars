import { supabase } from '../lib/supabase.js'
import { pageDashboard }    from './pages/dashboard.js'
import { pagePlayers }      from './pages/players.js'
import { pageClubs }        from './pages/clubs.js'
import { pageCardBuilder }  from './pages/card-builder.js'
import { pageUsers }        from './pages/users.js'
import { pageMarket }       from './pages/market.js'
import { pageImportExport } from './pages/import-export.js'

// ── Toast helper ──────────────────────────────────────────
export function toast(msg, type = 'info') {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.className = `show ${type}`
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.className = '' }, 3000)
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
const PAGES = {
  dashboard:    { title: 'Dashboard',          fn: pageDashboard },
  players:      { title: 'Joueurs & Cartes',   fn: pagePlayers },
  clubs:        { title: 'Clubs',              fn: pageClubs },
  'card-builder':{ title: 'Card Builder',      fn: pageCardBuilder },
  users:        { title: 'Managers',           fn: pageUsers },
  market:       { title: 'Marché des transferts', fn: pageMarket },
  'import-export': { title: 'Import / Export CSV', fn: pageImportExport },
}

let currentPage = 'dashboard'
async function navigate(page) {
  currentPage = page
  document.querySelectorAll('.admin-sidebar nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page)
  })
  const info = PAGES[page] || PAGES.dashboard
  document.getElementById('page-title').textContent = info.title
  const content = document.getElementById('page-content')
  content.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">Chargement…</div>'
  try {
    await info.fn(content, { toast, openModal, closeModal, navigate })
  } catch (e) {
    content.innerHTML = `<div style="padding:40px;color:#c0392b">Erreur: ${e.message}</div>`
    console.error(e)
  }
}

// ── Auth ──────────────────────────────────────────────────
async function init() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    await checkAdminAndShow(session.user)
  }

  document.getElementById('auth-btn').addEventListener('click', async () => {
    const email    = document.getElementById('auth-email').value.trim()
    const password = document.getElementById('auth-password').value
    const errEl    = document.getElementById('auth-error')
    errEl.textContent = ''
    if (!email || !password) { errEl.textContent = 'Remplissez tous les champs.'; return }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { errEl.textContent = error.message; return }
    await checkAdminAndShow(data.user)
  })

  document.getElementById('auth-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('auth-btn').click()
  })

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    document.getElementById('auth-screen').style.display = 'flex'
    document.getElementById('admin-app').style.display = 'none'
  })

  document.getElementById('modal-close').addEventListener('click', closeModal)
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal()
  })

  document.querySelectorAll('.admin-sidebar nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      navigate(a.dataset.page)
    })
  })
}

async function checkAdminAndShow(user) {
  const { data: profile, error } = await supabase
    .from('users').select('*').eq('id', user.id).single()

  const errEl = document.getElementById('auth-error')
  if (error || !profile) {
    errEl.textContent = 'Profil introuvable.'
    return
  }
  if (!profile.is_admin) {
    errEl.textContent = 'Accès refusé. Vous n\'êtes pas administrateur.'
    await supabase.auth.signOut()
    return
  }

  document.getElementById('auth-screen').style.display = 'none'
  document.getElementById('admin-app').style.display = 'flex'
  document.getElementById('admin-user').textContent = `Admin: ${profile.pseudo}`
  navigate('dashboard')
}

init()
