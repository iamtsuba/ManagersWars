import { supabase } from '../../lib/supabase.js'
import { encodeVowels } from '../../components/card.js'

let clubs = []

export async function pageClubs(container, { toast, openModal, closeModal }) {
  await loadClubs(container, { toast, openModal, closeModal })
}

async function loadClubs(container, helpers) {
  const { data, error } = await supabase
    .from('clubs').select('*').order('encoded_name')
  if (error) { container.innerHTML = `<p style="color:red">${error.message}</p>`; return }
  clubs = data || []
  renderClubs(container, helpers)
}

function renderClubs(container, { toast, openModal, closeModal }) {
  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <div>
        <input id="search-clubs" placeholder="🔍 Rechercher un club…" style="width:280px">
      </div>
      <button class="btn btn-primary" id="add-club-btn">+ Nouveau club</button>
    </div>

    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom encodé</th>
              <th>Nom réel</th>
              <th>Pays</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="clubs-tbody"></tbody>
        </table>
      </div>
    </div>
  `

  renderRows(clubs)

  document.getElementById('search-clubs').addEventListener('input', e => {
    const q = e.target.value.toLowerCase()
    renderRows(clubs.filter(c =>
      c.encoded_name.toLowerCase().includes(q) ||
      c.real_name.toLowerCase().includes(q)
    ))
  })

  document.getElementById('add-club-btn').addEventListener('click', () => {
    openClubModal(null, { toast, openModal, closeModal, reload: () => loadClubs(container, { toast, openModal, closeModal }) })
  })

  function renderRows(list) {
    document.getElementById('clubs-tbody').innerHTML = list.map(c => `
      <tr>
        <td>
          ${c.logo_url
            ? `<img src="${c.logo_url}" style="width:32px;height:32px;object-fit:contain;border-radius:4px">`
            : `<div style="width:32px;height:32px;background:#1a3a7a;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${c.encoded_name.slice(0,3)}</div>`}
        </td>
        <td><b>${c.encoded_name}</b></td>
        <td style="color:var(--gray-600);font-size:13px">${c.real_name}</td>
        <td><img src="https://flagsapi.com/${c.country_code}/flat/32.png" alt="${c.country_code}" style="height:18px;vertical-align:middle"> ${c.country_code}</td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${c.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${c.id}">🗑️</button>
        </td>
      </tr>
    `).join('')

    // Événements
    document.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const club = clubs.find(c => c.id === btn.dataset.edit)
        openClubModal(club, { toast, openModal, closeModal, reload: () => loadClubs(container, { toast, openModal, closeModal }) })
      })
    })
    document.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Supprimer ce club ?')) return
        const { error } = await supabase.from('clubs').delete().eq('id', btn.dataset.del)
        if (error) toast(error.message, 'error')
        else { toast('Club supprimé', 'success'); loadClubs(container, { toast, openModal, closeModal }) }
      })
    })
  }
}

function openClubModal(club, { toast, openModal, closeModal, reload }) {
  const isEdit = !!club
  openModal(
    isEdit ? 'Modifier le club' : 'Nouveau club',
    `<div style="display:flex;flex-direction:column;gap:12px">
      <div>
        <label>Nom réel (ex: Paris Saint-Germain)</label>
        <input id="m-real" value="${club?.real_name || ''}">
      </div>
      <div>
        <label>Nom encodé (ex: PARIS FC) — auto-calculé ou personnalisé</label>
        <input id="m-encoded" value="${club?.encoded_name || ''}" placeholder="Ville + FC">
        <button class="btn btn-ghost btn-sm" id="auto-encode" style="margin-top:4px">↻ Auto-encoder</button>
      </div>
      <div>
        <label>Code pays (ISO 2 lettres, ex: FR)</label>
        <input id="m-country" value="${club?.country_code || ''}" maxlength="2" style="text-transform:uppercase">
      </div>
      <div>
        <label>Logo (URL Supabase Storage ou upload)</label>
        <input id="m-logo" value="${club?.logo_url || ''}" placeholder="https://...">
        <div style="font-size:11px;color:var(--gray-600);margin-top:2px">
          Uploader d'abord dans Supabase Storage > assets/clubs/ puis coller l'URL publique
        </div>
      </div>
      ${club?.logo_url ? `<div><img src="${club.logo_url}" style="max-height:60px"></div>` : ''}
    </div>`,
    `<button class="btn btn-ghost" id="m-cancel">Annuler</button>
     <button class="btn btn-primary" id="m-save">${isEdit ? 'Enregistrer' : 'Créer'}</button>`
  )

  document.getElementById('m-cancel').addEventListener('click', closeModal)
  document.getElementById('auto-encode').addEventListener('click', () => {
    const real = document.getElementById('m-real').value
    // Extraire la ville et ajouter FC
    const city = real.split(' ')[0] || real
    document.getElementById('m-encoded').value = city.toUpperCase() + ' FC'
  })
  document.getElementById('m-real').addEventListener('input', () => {
    // Proposer encodage auto
    const real = document.getElementById('m-real').value
    if (!document.getElementById('m-encoded').value) {
      const city = real.split(' ')[0] || real
      document.getElementById('m-encoded').value = city.toUpperCase() + ' FC'
    }
  })

  document.getElementById('m-save').addEventListener('click', async () => {
    const payload = {
      real_name:    document.getElementById('m-real').value.trim(),
      encoded_name: document.getElementById('m-encoded').value.trim().toUpperCase(),
      country_code: document.getElementById('m-country').value.trim().toUpperCase(),
      logo_url:     document.getElementById('m-logo').value.trim() || null,
    }
    if (!payload.real_name || !payload.encoded_name || !payload.country_code) {
      toast('Remplissez tous les champs obligatoires', 'error'); return
    }
    const { error } = isEdit
      ? await supabase.from('clubs').update(payload).eq('id', club.id)
      : await supabase.from('clubs').insert(payload)
    if (error) { toast(error.message, 'error'); return }
    toast(isEdit ? 'Club modifié' : 'Club créé', 'success')
    closeModal(); reload()
  })
}
