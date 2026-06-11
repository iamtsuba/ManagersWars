import { supabase } from '../../lib/supabase.js'
import { encodeVowels } from '../../components/card.js'

const RARITY_LABELS = { normal:'Normal', pepite:'Pépite', papyte:'Papyte', legende:'Légende' }
const RARITY_COLORS = { normal:'#aaa', pepite:'#D4A017', papyte:'#909090', legende:'#7a28b8' }

export async function pagePlayers(container, helpers) {
  await loadPlayers(container, helpers)
}

async function loadPlayers(container, helpers) {
  const { toast, openModal, closeModal } = helpers

  const [{ data: players, error }, { data: clubs }] = await Promise.all([
    supabase.from('players').select(`*, clubs(encoded_name,logo_url)`).order('surname_encoded'),
    supabase.from('clubs').select('id,encoded_name').order('encoded_name')
  ])

  if (error) { container.innerHTML = `<p style="color:red">${error.message}</p>`; return }

  const clubsMap = {}
  ;(clubs || []).forEach(c => { clubsMap[c.id] = c.encoded_name })

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input id="search-players" placeholder="🔍 Nom, prénom…" style="width:220px">
        <select id="filter-rarity" style="width:130px">
          <option value="">Toutes raretés</option>
          ${Object.entries(RARITY_LABELS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
        <select id="filter-job" style="width:120px">
          <option value="">Tous postes</option>
          <option value="GK">GK</option><option value="DEF">DEF</option>
          <option value="MIL">MIL</option><option value="ATT">ATT</option>
        </select>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-size:13px;color:var(--gray-600);align-self:center" id="count-label">${players.length} joueur(s)</span>
        <button class="btn btn-primary" id="add-player-btn">+ Nouveau joueur</button>
      </div>
    </div>

    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Pays</th>
              <th>Club</th>
              <th>Poste</th>
              <th>Notes G/D/M/A</th>
              <th>Rareté</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="players-tbody"></tbody>
        </table>
      </div>
    </div>
  `

  renderRows(players)

  function renderRows(list) {
    document.getElementById('count-label').textContent = `${list.length} joueur(s)`
    document.getElementById('players-tbody').innerHTML = list.map(p => `
      <tr>
        <td>
          <div style="font-weight:600">${p.firstname} ${p.surname_encoded}</div>
          <div style="font-size:11px;color:var(--gray-600)">${p.firstname} ${p.surname_real}</div>
        </td>
        <td>
          <img src="https://flagsapi.com/${p.country_code}/flat/32.png" alt="${p.country_code}" style="height:16px;vertical-align:middle"> ${p.country_code}
        </td>
        <td style="font-size:12px">${p.clubs?.encoded_name || '—'}</td>
        <td>
          <span style="font-weight:700;color:${p.job==='ATT'?'#1A6B3C':p.job==='MIL'?'#D4A017':p.job==='DEF'?'#bb2020':'#111'}">
            ${p.job}
          </span>
          ${p.job2 ? `<span style="font-size:11px;color:#aaa"> / ${p.job2}</span>` : ''}
        </td>
        <td style="font-size:12px;font-family:monospace">
          ${p.note_g} / ${p.note_d} / ${p.note_m} / ${p.note_a}
        </td>
        <td>
          <span style="background:${RARITY_COLORS[p.rarity]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
            ${RARITY_LABELS[p.rarity] || p.rarity}
          </span>
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${p.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${p.id}">🗑️</button>
        </td>
      </tr>
    `).join('')

    document.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = players.find(x => x.id === btn.dataset.edit)
        openPlayerModal(p, clubs || [], { toast, openModal, closeModal,
          reload: () => loadPlayers(container, helpers) })
      })
    })
    document.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Supprimer ce joueur ? Les cartes associées resteront en jeu.')) return
        const { error } = await supabase.from('players').delete().eq('id', btn.dataset.del)
        if (error) toast(error.message, 'error')
        else { toast('Joueur supprimé', 'success'); loadPlayers(container, helpers) }
      })
    })
  }

  // Filtres
  function applyFilters() {
    const q   = document.getElementById('search-players').value.toLowerCase()
    const rar = document.getElementById('filter-rarity').value
    const job = document.getElementById('filter-job').value
    renderRows(players.filter(p =>
      (!q   || `${p.firstname} ${p.surname_encoded} ${p.surname_real}`.toLowerCase().includes(q)) &&
      (!rar || p.rarity === rar) &&
      (!job || p.job === job)
    ))
  }
  document.getElementById('search-players').addEventListener('input', applyFilters)
  document.getElementById('filter-rarity').addEventListener('change', applyFilters)
  document.getElementById('filter-job').addEventListener('change', applyFilters)

  document.getElementById('add-player-btn').addEventListener('click', () => {
    openPlayerModal(null, clubs || [], { toast, openModal, closeModal,
      reload: () => loadPlayers(container, helpers) })
  })
}

function openPlayerModal(player, clubs, { toast, openModal, closeModal, reload }) {
  const isEdit = !!player
  const clubOpts = `<option value="">— Club —</option>` +
    clubs.map(c => `<option value="${c.id}" ${player?.club_id===c.id?'selected':''}>${c.encoded_name}</option>`).join('')

  openModal(
    isEdit ? `Modifier ${player.firstname} ${player.surname_encoded}` : 'Nouveau joueur',
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div><label>Prénom</label><input id="pm-fn" value="${player?.firstname||''}"></div>
      <div>
        <label>Nom réel</label>
        <div style="display:flex;gap:4px">
          <input id="pm-real" value="${player?.surname_real||''}" style="flex:1">
          <button class="btn btn-ghost btn-sm" id="pm-encode-btn" title="Encoder">↻</button>
        </div>
      </div>
      <div><label>Nom encodé</label><input id="pm-enc" value="${player?.surname_encoded||''}"></div>
      <div><label>Pays (ISO)</label>
        <select id="pm-country">
          ${['MA','FR','AR','PT','BR','ES','DE','GB','IT','CM','SN','NG','DK','NL','BE','CI','AL','HR','RS','TR']
            .map(c => `<option value="${c}" ${player?.country_code===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <div><label>Club</label><select id="pm-club">${clubOpts}</select></div>
      <div><label>Poste principal</label>
        <select id="pm-job">
          ${['GK','DEF','MIL','ATT'].map(j => `<option value="${j}" ${player?.job===j?'selected':''}>${j}</option>`).join('')}
        </select>
      </div>
      <div><label>Poste 2</label>
        <select id="pm-job2">
          <option value="">Aucun</option>
          ${['GK','DEF','MIL','ATT'].map(j => `<option value="${j}" ${player?.job2===j?'selected':''}>${j}</option>`).join('')}
        </select>
      </div>
      <div><label>Rareté</label>
        <select id="pm-rarity">
          ${['normal','pepite','papyte','legende'].map(r => `<option value="${r}" ${player?.rarity===r?'selected':''}>${r}</option>`).join('')}
        </select>
      </div>
      <div><label>Note GK</label><input id="pm-g" type="number" min="0" max="10" value="${player?.note_g||0}"></div>
      <div><label>Note DEF</label><input id="pm-d" type="number" min="0" max="10" value="${player?.note_d||0}"></div>
      <div><label>Note MIL</label><input id="pm-m" type="number" min="0" max="10" value="${player?.note_m||0}"></div>
      <div><label>Note ATT</label><input id="pm-a" type="number" min="0" max="10" value="${player?.note_a||0}"></div>
      <div><label>Note min</label><input id="pm-nmin" type="number" min="0" max="10" value="${player?.note_min||''}"></div>
      <div><label>Note max</label><input id="pm-nmax" type="number" min="0" max="10" value="${player?.note_max||''}"></div>
      <div><label>Peau</label>
        <select id="pm-skin">
          ${['blanc','metisse','typ','noir'].map(s => `<option value="${s}" ${player?.skin===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div><label>Cheveux</label>
        <select id="pm-hair">
          ${['blond','marron','noir','chauve'].map(h => `<option value="${h}" ${player?.hair===h?'selected':''}>${h}</option>`).join('')}
        </select>
      </div>
      <div><label>Longueur</label>
        <select id="pm-hlen">
          ${['rase','court','milong','long'].map(l => `<option value="${l}" ${player?.hair_length===l?'selected':''}>${l}</option>`).join('')}
        </select>
      </div>
      <div><label>Prix vente (crédits)</label><input id="pm-price" type="number" min="0" value="${player?.sell_price||0}"></div>
    </div>`,
    `<button class="btn btn-ghost" id="pm-cancel">Annuler</button>
     <button class="btn btn-primary" id="pm-save">${isEdit ? 'Enregistrer' : 'Créer'}</button>`
  )

  document.getElementById('pm-cancel').addEventListener('click', closeModal)
  document.getElementById('pm-encode-btn').addEventListener('click', () => {
    document.getElementById('pm-enc').value = encodeVowels(document.getElementById('pm-real').value)
  })

  document.getElementById('pm-save').addEventListener('click', async () => {
    const payload = {
      firstname:       document.getElementById('pm-fn').value.trim(),
      surname_real:    document.getElementById('pm-real').value.trim(),
      surname_encoded: document.getElementById('pm-enc').value.trim(),
      country_code:    document.getElementById('pm-country').value,
      club_id:         document.getElementById('pm-club').value || null,
      job:             document.getElementById('pm-job').value,
      job2:            document.getElementById('pm-job2').value || null,
      rarity:          document.getElementById('pm-rarity').value,
      note_g:          parseInt(document.getElementById('pm-g').value) || 0,
      note_d:          parseInt(document.getElementById('pm-d').value) || 0,
      note_m:          parseInt(document.getElementById('pm-m').value) || 0,
      note_a:          parseInt(document.getElementById('pm-a').value) || 0,
      note_min:        parseInt(document.getElementById('pm-nmin').value) || null,
      note_max:        parseInt(document.getElementById('pm-nmax').value) || null,
      skin:            document.getElementById('pm-skin').value,
      hair:            document.getElementById('pm-hair').value,
      hair_length:     document.getElementById('pm-hlen').value,
      sell_price:      parseInt(document.getElementById('pm-price').value) || 0,
    }
    if (!payload.firstname || !payload.surname_real || !payload.surname_encoded) {
      toast('Remplissez les champs obligatoires', 'error'); return
    }
    const { error } = isEdit
      ? await supabase.from('players').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', player.id)
      : await supabase.from('players').insert(payload)
    if (error) { toast(error.message, 'error'); return }
    toast(isEdit ? 'Joueur modifié ✅' : 'Joueur créé ✅', 'success')
    closeModal(); reload()
  })
}
