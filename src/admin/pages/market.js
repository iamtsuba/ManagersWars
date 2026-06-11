import { supabase } from '../../lib/supabase.js'

export async function pageMarket(container, { toast }) {
  const { data, error } = await supabase
    .from('market_listings')
    .select(`
      id, price, status, listed_at, sold_at,
      seller:users!seller_id(pseudo),
      buyer:users!buyer_id(pseudo),
      card:cards(
        card_type,
        player:players(firstname, surname_encoded, rarity, job)
      )
    `)
    .order('listed_at', { ascending: false })
    .limit(100)

  if (error) { container.innerHTML = `<p style="color:red">${error.message}</p>`; return }
  const listings = data || []
  const active   = listings.filter(l => l.status === 'active').length
  const sold     = listings.filter(l => l.status === 'sold').length

  container.innerHTML = `
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#1A6B3C">${active}</div>
        <div style="font-size:11px;color:#666">Annonces actives</div>
      </div>
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#D4A017">${sold}</div>
        <div style="font-size:11px;color:#666">Vendues</div>
      </div>
    </div>
    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Carte</th><th>Vendeur</th><th>Acheteur</th>
              <th>Prix</th><th>Statut</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${listings.map(l => {
              const p = l.card?.player
              const name = p ? `${p.firstname} ${p.surname_encoded}` : l.card?.card_type || '—'
              const statusColor = { active:'#1A6B3C', sold:'#D4A017', cancelled:'#aaa' }
              return `<tr>
                <td><b>${name}</b>${p ? `<div style="font-size:10px;color:#999">${p.rarity} · ${p.job}</div>` : ''}</td>
                <td style="font-size:12px">${l.seller?.pseudo || '—'}</td>
                <td style="font-size:12px">${l.buyer?.pseudo || '—'}</td>
                <td style="font-size:13px;font-weight:600">${(l.price||0).toLocaleString('fr')} cr.</td>
                <td>
                  <span style="background:${statusColor[l.status]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
                    ${l.status.toUpperCase()}
                  </span>
                </td>
                <td style="font-size:11px;color:#aaa">${new Date(l.listed_at).toLocaleDateString('fr')}</td>
                <td>
                  ${l.status === 'active' ? `<button class="btn btn-danger btn-sm" data-cancel="${l.id}">Annuler</button>` : ''}
                </td>
              </tr>`
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `

  document.querySelectorAll('[data-cancel]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Annuler cette annonce ?')) return
      const { error } = await supabase
        .from('market_listings').update({ status: 'cancelled' }).eq('id', btn.dataset.cancel)
      if (error) toast(error.message, 'error')
      else { toast('Annonce annulée', 'success'); pageMarket(container, { toast }) }
    })
  })
}
