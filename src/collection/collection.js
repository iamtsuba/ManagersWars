import { supabase } from '../lib/supabase.js'
import { renderCardHTML } from '../components/card.js'
import { GC_DEFS } from '../match/game-logic.js'

const RARITY_COLORS = { normal:'#ccc', pepite:'#D4A017', papyte:'#909090', legende:'#7a28b8' }
const JOB_FILTERS = ['Tous','GK','DEF','MIL','ATT']

export async function renderCollection(container, ctx) {
  const { state, navigate, toast, openModal, closeModal } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: cards } = await supabase
    .from('cards')
    .select('id,card_type,current_note,gc_type,formation,is_for_sale,sale_price,player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url))')
    .eq('owner_id', state.profile.id)
    .order('acquired_at', { ascending: false })

  let activeFilter = 'Tous'
  let searchQ = ''

  const playerCards = (cards||[]).filter(c => c.card_type === 'player')
  const gcCards     = (cards||[]).filter(c => c.card_type === 'game_changer')
  const formCards   = (cards||[]).filter(c => c.card_type === 'formation')

  function filteredCards() {
    return playerCards.filter(c => {
      const p = c.player
      if (!p) return false
      const matchJob    = activeFilter === 'Tous' || p.job === activeFilter
      const matchSearch = !searchQ || `${p.firstname} ${p.surname_encoded}`.toLowerCase().includes(searchQ)
      return matchJob && matchSearch
    })
  }

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${playerCards.length} joueur(s) · ${gcCards.length} Game Changer · ${formCards.length} Formation</p>
    </div>

    ${gcCards.length > 0 || formCards.length > 0 ? `
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div class="section-title" style="margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
        ${gcCards.map(c => `
          <div class="gc-card" style="min-width:130px;flex-shrink:0">
            <div class="gc-icon">${GC_DEFS[c.gc_type]?.icon || '⚡'}</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${c.gc_type}</div>
            <div class="gc-desc">${GC_DEFS[c.gc_type]?.desc || ''}</div>
          </div>`).join('')}
        ${formCards.map(c => `
          <div style="background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:var(--radius-lg);border:2px solid #2a8f52;padding:12px;color:#fff;min-width:110px;flex-shrink:0">
            <div style="font-size:24px">🏟️</div>
            <div style="font-size:9px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content">FORMATION</div>
            <div style="font-weight:700;font-size:16px;margin-top:4px">${c.formation}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${JOB_FILTERS.map(f => `
          <button class="filter-btn" data-job="${f}" style="flex-shrink:0;padding:4px 12px;border-radius:20px;border:1.5px solid ${f===activeFilter?'var(--green)':'var(--gray-200)'};background:${f===activeFilter?'var(--green)':'#fff'};color:${f===activeFilter?'#fff':'var(--gray-600)'};font-size:12px;font-weight:600;cursor:pointer">${f}</button>`).join('')}
      </div>
    </div>

    <div class="page-body">
      <div class="cards-grid" id="col-grid"></div>
    </div>
  </div>
  `

  function renderCards() {
    const list = filteredCards()
    const grid = document.getElementById('col-grid')
    if (!grid) return
    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte trouvée.<br><small>Ouvre des boosters pour en obtenir !</small></div>'
      return
    }
    grid.innerHTML = list.map(card => {
      const p = card.player
      const pData = { ...p, current_note: card.current_note, club_encoded_name: p.clubs?.encoded_name }
      const portraitUrl = p.skin && p.hair ? getPortrait(p) : null
      const logoUrl = p.clubs?.logo_url || null
      return `<div class="card-item" data-card-id="${card.id}">
        ${renderCardHTML(pData, { portraitUrl, clubLogoUrl: logoUrl, showNotes: false })}
        ${card.is_for_sale ? `<div class="card-owned-badge" style="background:#D4A017">En vente</div>` : ''}
      </div>`
    }).join('')

    grid.querySelectorAll('.card-item').forEach(el => {
      el.addEventListener('click', () => {
        const card = playerCards.find(c => c.id === el.dataset.cardId)
        if (card) openCardDetail(card, container, ctx)
      })
    })
  }

  renderCards()

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.job
      container.querySelectorAll('.filter-btn').forEach(b => {
        const a = b.dataset.job === activeFilter
        b.style.background = a ? 'var(--green)' : '#fff'
        b.style.color = a ? '#fff' : 'var(--gray-600)'
        b.style.borderColor = a ? 'var(--green)' : 'var(--gray-200)'
      })
      renderCards()
    })
  })

  document.getElementById('col-search').addEventListener('input', e => {
    searchQ = e.target.value.toLowerCase()
    renderCards()
  })
}

function getPortrait(p) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  if (!supabaseUrl) return null
  const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
  return `${supabaseUrl}/storage/v1/object/public/assets/tetes/${key}.jpg`
}

// ── Détail carte + mise en vente (GDD §3.4) ───────────────
function openCardDetail(card, container, ctx) {
  const { state, toast, openModal, closeModal } = ctx
  const p = card.player
  const pData = { ...p, club_encoded_name: p.clubs?.encoded_name }
  const portraitUrl = getPortrait(p)
  const logoUrl = p.clubs?.logo_url || null

  // Règles de revente (GDD §3.4)
  const canSell = p.rarity !== 'legende' &&
    !(p.rarity === 'papyte' && p.note_min !== null && (card.current_note ?? 99) <= p.note_min)

  openModal(`${p.firstname} ${p.surname_encoded}`,
    `<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
      <div>${renderCardHTML(pData, { portraitUrl, clubLogoUrl: logoUrl, showNotes: true })}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:12px;color:var(--gray-600)">RARETÉ</div>
        <div style="font-weight:700;margin-bottom:8px;color:${RARITY_COLORS[p.rarity]}">${p.rarity.toUpperCase()}</div>
        <div style="font-size:12px;color:var(--gray-600)">POSTE</div>
        <div style="font-weight:700;margin-bottom:8px">${p.job}${p.job2 ? ' / '+p.job2 : ''}</div>
        <div style="font-size:12px;color:var(--gray-600)">PRIX DE BASE</div>
        <div style="font-weight:700">${(p.sell_price||0).toLocaleString('fr')} cr.</div>
        ${card.is_for_sale ? `<div style="color:#D4A017;font-weight:700;margin-top:8px">🏷️ En vente : ${(card.sale_price||0).toLocaleString('fr')} cr.</div>` : ''}
      </div>
    </div>
    ${!canSell ? `<div style="margin-top:12px;font-size:12px;color:var(--gray-600);text-align:center;padding:8px;background:#f5f5f5;border-radius:8px">${p.rarity === 'legende' ? '🔒 Les cartes Légende ne sont pas revendables (GDD §3.4)' : '🔒 Carte Papyte à note minimale : non vendable'}</div>` : ''}
    ${canSell && !card.is_for_sale ? `
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:12px">
      <label style="font-size:12px;font-weight:600;margin-bottom:6px;display:block">Mettre en vente sur le marché</label>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${p.sell_price||1000}">
        <button class="btn btn-yellow" id="sell-btn">Vendre</button>
      </div>
    </div>` : ''}
    ${card.is_for_sale ? `<div style="margin-top:12px"><button class="btn btn-ghost" id="cancel-sell-btn" style="width:100%">Retirer de la vente</button></div>` : ''}`,
    `<button class="btn btn-ghost" id="close-detail">Fermer</button>`
  )

  document.getElementById('close-detail')?.addEventListener('click', closeModal)

  document.getElementById('sell-btn')?.addEventListener('click', async () => {
    const price = parseInt(document.getElementById('sell-price').value)
    if (!price || price < 1) { toast('Prix invalide', 'error'); return }

    const { error } = await supabase.from('cards')
      .update({ is_for_sale: true, sale_price: price }).eq('id', card.id)
    if (error) { toast(error.message, 'error'); return }

    await supabase.from('market_listings').insert({
      seller_id: state.profile.id, card_id: card.id, price
    })
    toast('Carte mise en vente ! ✅', 'success')
    closeModal()
    ctx.navigate('collection')
  })

  document.getElementById('cancel-sell-btn')?.addEventListener('click', async () => {
    await supabase.from('cards').update({ is_for_sale: false, sale_price: null }).eq('id', card.id)
    await supabase.from('market_listings').update({ status: 'cancelled' }).eq('card_id', card.id).eq('status', 'active')
    toast('Annonce retirée', 'success')
    closeModal()
    ctx.navigate('collection')
  })
}
