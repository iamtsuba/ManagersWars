import { supabase } from '../lib/supabase.js'

export async function renderRankings(container, { state, navigate, toast }) {
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: rankings } = await supabase
    .from('users')
    .select('id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level')
    .order('trophies_top1', { ascending: false })
    .limit(100)

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${rankings && rankings.length > 0 ? rankings.map((u, i) => `
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${u.id === state.profile.id ? 'border:2px solid var(--yellow)' : ''}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${i+1}</div>
            <div style="flex:1">
              <div style="font-weight:700">${u.pseudo}</div>
              <div style="font-size:11px;color:var(--gray-600)">${u.club_name}</div>
            </div>
            <div style="text-align:right;font-size:12px">
              <div>🥇${u.trophies_top1} 🥈${u.trophies_top2} 🥉${u.trophies_top3}</div>
              <div style="color:var(--gray-600)">${u.wins} V</div>
            </div>
          </div>
        `).join('') : '<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun manager.</div>'}
      </div>
    </div>
  </div>
  `
}
