import { supabase } from '../../lib/supabase.js'

export async function pageUsers(container, { toast }) {
  const { data, error } = await supabase
    .from('users')
    .select('id,pseudo,club_name,credits,level,wins,draws,losses,trophies_top1,trophies_top2,trophies_top3,is_admin,created_at')
    .order('created_at', { ascending: false })

  if (error) { container.innerHTML = `<p style="color:red">${error.message}</p>`; return }

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <input id="search-users" placeholder="🔍 Rechercher un manager…" style="width:260px">
      <span style="font-size:13px;color:var(--gray-600)">${(data||[]).length} manager(s)</span>
    </div>
    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pseudo</th><th>Club</th><th>Crédits</th><th>Niv.</th>
              <th>V/N/D</th><th>TOP1/2/3</th><th>Admin</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="users-tbody"></tbody>
        </table>
      </div>
    </div>
  `

  const users = data || []
  renderRows(users)
  document.getElementById('search-users').addEventListener('input', e => {
    const q = e.target.value.toLowerCase()
    renderRows(users.filter(u => u.pseudo.toLowerCase().includes(q) || u.club_name?.toLowerCase().includes(q)))
  })

  function renderRows(list) {
    document.getElementById('users-tbody').innerHTML = list.map(u => `
      <tr>
        <td><b>${u.pseudo}</b></td>
        <td style="font-size:12px">${u.club_name || '—'}</td>
        <td style="font-size:12px">${(u.credits||0).toLocaleString('fr')} cr.</td>
        <td><b>${u.level}</b></td>
        <td style="font-size:12px">${u.wins}/${u.draws}/${u.losses}</td>
        <td style="font-size:12px">🥇${u.trophies_top1} 🥈${u.trophies_top2} 🥉${u.trophies_top3}</td>
        <td>
          ${u.is_admin
            ? '<span style="color:#1A6B3C;font-weight:700;font-size:12px">✅ Admin</span>'
            : '<span style="color:#aaa;font-size:12px">Manager</span>'}
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-toggle-admin="${u.id}" data-is-admin="${u.is_admin}">
            ${u.is_admin ? '🔒 Retirer admin' : '🔓 Rendre admin'}
          </button>
        </td>
      </tr>
    `).join('')

    document.querySelectorAll('[data-toggle-admin]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const newVal = btn.dataset.isAdmin === 'true' ? false : true
        const label = newVal ? 'rendre admin' : 'retirer le rôle admin'
        if (!confirm(`Voulez-vous ${label} de ce Manager ?`)) return
        const { error } = await supabase
          .from('users').update({ is_admin: newVal }).eq('id', btn.dataset.toggleAdmin)
        if (error) toast(error.message, 'error')
        else { toast(`Rôle mis à jour ✅`, 'success'); pageUsers(container, { toast }) }
      })
    })
  }
}
