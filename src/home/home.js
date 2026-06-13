import { supabase } from '../lib/supabase.js'

export async function renderHome(container, { state, navigate, toast }) {
  const p = state.profile
  if (!p) return

  // Stats récentes
  const { data: recentMatches } = await supabase
    .from('matches')
    .select('id,home_score,away_score,status,mode,winner_id,created_at')
    .or(`home_id.eq.${p.id},away_id.eq.${p.id}`)
    .eq('status','finished')
    .order('created_at', { ascending: false })
    .limit(3)

  container.innerHTML = `
  <div class="page">
    <div class="page-body">

      <!-- Bandeau pseudo (couleurs du club) -->
      <div class="hero hero-compact" style="background:${p.club_color1};border:2px solid ${p.club_color2}">
        <button class="nav-rankings-btn" id="nav-rankings" title="Classement">
          <img src="${import.meta.env.BASE_URL}icons/badge-trophy.png" alt="Classement">
        </button>
        <div class="info">
          <h3 style="margin:0">${p.pseudo}</h3>
          <div class="level">Niveau ${p.level} · ${p.club_name}</div>
        </div>
        <div class="hero-compact-spacer"></div>
      </div>

      <!-- Ranked (bouton) -->
      <div class="ranked-banner play-card" data-action="ranked">
        <img src="${import.meta.env.BASE_URL}icons/badge-ranked.png" alt="" class="play-icon">
        <img src="${import.meta.env.BASE_URL}icons/badge-ranked-txt.png" alt="Ranked" class="play-text-overlay">
      </div>

      <!-- Jeu : 4 tuiles -->
      <div class="play-grid">
        <div class="play-card" data-action="match-ai">
          <img src="${import.meta.env.BASE_URL}icons/badge-ai.png" alt="" class="play-icon">
          <img src="${import.meta.env.BASE_URL}icons/badge-ai-txt.png" alt="Match IA" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="match-random">
          <img src="${import.meta.env.BASE_URL}icons/badge-random.png" alt="" class="play-icon">
          <img src="${import.meta.env.BASE_URL}icons/badge-random-txt.png" alt="Match Random" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="match-friend">
          <img src="${import.meta.env.BASE_URL}icons/badge-vs.png" alt="" class="play-icon">
          <img src="${import.meta.env.BASE_URL}icons/badge-vs-txt.png" alt="Match Friend" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="mini-league">
          <img src="${import.meta.env.BASE_URL}icons/badge-league.png" alt="" class="play-icon">
          <img src="${import.meta.env.BASE_URL}icons/badge-league-txt.png" alt="Mini League" class="play-text-overlay">
        </div>
      </div>

      <!-- Derniers matchs -->
      ${recentMatches && recentMatches.length > 0 ? `
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${recentMatches.map(m => {
            const isWin  = m.winner_id === p.id
            const isDraw = m.home_score === m.away_score
            const result = isDraw ? 'N' : isWin ? 'V' : 'D'
            const color  = isDraw ? '#888' : isWin ? '#1A6B3C' : '#c0392b'
            const label  = {vs_ai_easy:'IA Facile',vs_ai_medium:'IA Moyen',vs_ai_hard:'IA Difficile',vs_ai_club:'IA Club',friend_challenge:'Défi ami',championship:'Championnat'}[m.mode] || m.mode
            const date = new Date(m.created_at)
            const dateStr = date.toLocaleDateString('fr', {month:'short', day:'numeric'})
            return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${label}</div>
                <div style="font-size:11px;color:var(--gray-600)">${dateStr}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${m.home_score} - ${m.away_score}</span>
                <span style="background:${color};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${result}</span>
              </div>
            </div>`
          }).join('')}
        </div>
      </div>` : ''}

      <!-- Logout -->
      <div style="text-align:center;padding:12px 0;display:flex;flex-direction:column;gap:8px;align-items:center">
        <button class="btn btn-ghost btn-sm" id="logout-btn" style="color:var(--gray-600)">Déconnexion</button>
        ${p.is_admin ? `
        <a href="/admin.html" class="btn btn-sm" id="admin-editor-btn"
          style="background:var(--yellow);color:#111;font-weight:700;border:none;text-decoration:none;display:inline-block;padding:6px 16px;border-radius:8px">
          ⚙️ Admin Editor
        </a>` : ''}
      </div>

    </div>
  </div>
  `

  // Navigation
  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      navigate(el.dataset.nav)
    })
  })

  document.getElementById('nav-rankings')?.addEventListener('click', () => navigate('rankings'))

  // Actions jeu
  container.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      // Effet visuel : +20% luminosité au clic
      el.classList.add('tapped')
      setTimeout(() => el.classList.remove('tapped'), 200)

      const action = el.dataset.action
      if (action === 'match-ai') { showDifficultyPicker(navigate); return }
      // Tous les autres modes : bientôt disponible
      toast('Bientôt disponible', 'info')
    })
  })

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.reload()
  })
}

// Sélecteur de difficulté IA (GDD §3.1)
function showDifficultyPicker(navigate) {
  const levels = [
    { mode:'vs_ai_easy',   label:'Facile',    sub:'Gain 500 cr.',  icon:'🟢' },
    { mode:'vs_ai_medium', label:'Moyen',     sub:'Gain 1 000 cr.', icon:'🟡' },
    { mode:'vs_ai_hard',   label:'Difficile', sub:'Gain 1 500 cr.', icon:'🟠' },
    { mode:'vs_ai_club',   label:'Club',      sub:'Gain 2 500 cr.', icon:'🔴' },
  ]
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  overlay.style.zIndex = '2000'
  overlay.innerHTML = `
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${levels.map(l => `
            <div class="action-card" data-mode="${l.mode}" style="cursor:pointer">
              <div class="icon">${l.icon}</div>
              <div class="label">${l.label}</div>
              <div class="sub">${l.sub}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `
  document.body.appendChild(overlay)
  const cleanup = () => overlay.remove()
  document.getElementById('diff-cancel').addEventListener('click', cleanup)
  overlay.addEventListener('click', e => { if (e.target === overlay) cleanup() })
  overlay.querySelectorAll('[data-mode]').forEach(el => {
    el.addEventListener('click', () => {
      cleanup()
      navigate('match', { matchMode: el.dataset.mode })
    })
  })
}
