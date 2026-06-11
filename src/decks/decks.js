import { supabase } from '../lib/supabase.js'

const FORMATIONS = {
  '4-4-2': { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-3-3': { GK:1, DEF:4, MIL:3, ATT:3 },
  '3-4-3': { GK:1, DEF:3, MIL:4, ATT:3 },
  '3-5-2': { GK:1, DEF:3, MIL:5, ATT:2 },
  '5-3-2': { GK:1, DEF:5, MIL:3, ATT:2 },
}
const JOB_COLORS = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }

function getPortrait(p) {
  const url = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : ''
  if (!url || !p?.skin || !p?.hair) return null
  const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
  return `${url}/storage/v1/object/public/assets/tetes/${key}.jpg`
}

export async function renderDecks(container, ctx) {
  const { state, navigate, toast } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: decks } = await supabase
    .from('decks').select('id,name,formation_card_id,is_active')
    .eq('owner_id', state.profile.id).order('created_at', { ascending: false })

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${decks?.length || 0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${decks?.length > 0 ? decks.map(d => `
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${d.name}
                ${d.is_active ? '<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>' : ''}
              </div>
            </div>
            <div style="display:flex;gap:6px">
              ${!d.is_active ? `<button class="btn btn-ghost btn-sm" data-activate="${d.id}">Activer</button>` : ''}
              <button class="btn btn-primary btn-sm" data-edit="${d.id}">✏️ Éditer</button>
            </div>
          </div>`).join('')
        : '<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>`

  document.getElementById('new-deck-btn').addEventListener('click', async () => {
    const name = prompt('Nom du deck :', `Deck ${(decks?.length||0)+1}`)
    if (!name) return
    const { data, error } = await supabase.from('decks')
      .insert({ owner_id: state.profile.id, name, is_active: !decks?.length })
      .select().single()
    if (error) { toast(error.message, 'error'); return }
    toast('Deck créé !', 'success')
    openDeckBuilder(data.id, container, ctx)
  })

  container.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openDeckBuilder(btn.dataset.edit, container, ctx))
  })

  container.querySelectorAll('[data-activate]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await supabase.from('decks').update({ is_active: false }).eq('owner_id', state.profile.id)
      await supabase.from('decks').update({ is_active: true }).eq('id', btn.dataset.activate)
      toast('Deck activé !', 'success')
      renderDecks(container, ctx)
    })
  })
}

// ── Deck Builder ──────────────────────────────────────────
async function openDeckBuilder(deckId, container, ctx) {
  const { state, toast } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: deck } = await supabase.from('decks').select('*').eq('id', deckId).single()

  const { data: cards } = await supabase
    .from('cards')
    .select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`)
    .eq('owner_id', state.profile.id)

  const playerCards    = (cards||[]).filter(c => c.card_type === 'player' && c.player)
  const formationCards = (cards||[]).filter(c => c.card_type === 'formation')

  // Formations disponibles dans la collection
  const availableFormations = formationCards.map(c => c.formation).filter(Boolean)

  const { data: deckSlots } = await supabase
    .from('deck_cards').select('card_id, position, is_starter, slot_order').eq('deck_id', deckId)

  // Formation par défaut : utiliser une disponible ou la première dispo
  let defaultFormation = deck.formation || '4-4-2'
  if (availableFormations.length > 0 && !availableFormations.includes(defaultFormation)) {
    defaultFormation = availableFormations[0]
  }

  const builder = {
    deckId, name: deck.name,
    formation: defaultFormation,
    formationCardId: deck.formation_card_id,
    slots: {},    // position → cardId (titulaires)
    subs: [],     // [ cardId, cardId, ... ] max 5
    playerCards, formationCards, availableFormations,
  }

  ;(deckSlots||[]).forEach(dc => {
    if (dc.is_starter) builder.slots[dc.position] = dc.card_id
    else if (!builder.subs.includes(dc.card_id)) builder.subs.push(dc.card_id)
  })

  renderBuilder(container, builder, ctx)
}

function renderBuilder(container, builder, ctx) {
  const { navigate } = ctx
  const struct    = FORMATIONS[builder.formation]
  const positions = buildPositions(builder.formation)
  const filled    = positions.filter(p => builder.slots[p]).length

  // Formations disponibles uniquement (Petit 1)
  const formationOptions = builder.availableFormations.length > 0
    ? builder.availableFormations
    : Object.keys(FORMATIONS) // fallback si aucune carte formation

  // Calcul des remplaçants avec données joueurs
  const subPlayers = builder.subs.map(id => builder.playerCards.find(c => c.id === id)).filter(Boolean)
  const allUsed    = [...Object.values(builder.slots), ...builder.subs]

  container.innerHTML = `
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${builder.name}</h2>
        <p>${filled}/11 titulaires · ${builder.subs.length}/5 remplaçants</p>
      </div>
    </div>

    <!-- Formation (uniquement les cartes possédées) -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px;margin-bottom:4px;display:block">Formation ${builder.availableFormations.length === 0 ? '(aucune carte — toutes disponibles)' : ''}</label>
      <select id="formation-select" style="width:100%;padding:7px;border-radius:6px;border:1.5px solid var(--gray-200)">
        ${formationOptions.map(f => `<option value="${f}" ${f===builder.formation?'selected':''}>${f}</option>`).join('')}
      </select>
    </div>

    <!-- Terrain -->
    <div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);padding:16px;min-height:280px">
      <div id="deck-field"></div>
    </div>

    <!-- Remplaçants (Petit 4) -->
    <div style="padding:12px 16px;background:#fff;border-top:1px solid var(--gray-200)">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--gray-600)">REMPLAÇANTS (${builder.subs.length}/5)</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="subs-list">
        ${subPlayers.map(c => {
          const p = c.player
          return `<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${JOB_COLORS[p.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${p.job}</span>
            ${p.firstname} ${p.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${c.id}">✕</button>
          </div>`
        }).join('')}
        ${builder.subs.length < 5 ? `<button class="btn btn-ghost btn-sm" id="add-sub-btn">+ Remplaçant</button>` : ''}
      </div>
    </div>

    <!-- Sauvegarder -->
    <div class="page-body">
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${filled < 11 ? 'disabled' : ''}>
        ${filled < 11 ? `Placez encore ${11-filled} joueur(s)` : '💾 Enregistrer le deck'}
      </button>
    </div>
  </div>`

  renderDeckField(container, builder, positions, ctx)

  document.getElementById('builder-back').addEventListener('click', () => navigate('decks'))

  document.getElementById('formation-select').addEventListener('change', e => {
    builder.formation = e.target.value
    // Réinitialiser les slots hors nouvelles positions
    const newPositions = buildPositions(builder.formation)
    const clean = {}
    newPositions.forEach(p => { if (builder.slots[p]) clean[p] = builder.slots[p] })
    builder.slots = clean
    renderBuilder(container, builder, ctx)
  })

  document.getElementById('save-deck').addEventListener('click', () => saveDeck(builder, ctx))

  // Retirer un remplaçant
  container.querySelectorAll('[data-remove-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      builder.subs = builder.subs.filter(id => id !== btn.dataset.removeSub)
      renderBuilder(container, builder, ctx)
    })
  })

  // Ajouter un remplaçant
  document.getElementById('add-sub-btn')?.addEventListener('click', () => {
    openSubSelector(builder, container, ctx)
  })
}

function renderDeckField(container, builder, positions, ctx) {
  const field = document.getElementById('deck-field')
  if (!field) return

  const lines = [
    positions.filter(p => p.startsWith('ATT')),
    positions.filter(p => p.startsWith('MIL')),
    positions.filter(p => p.startsWith('DEF')),
    positions.filter(p => p.startsWith('GK')),
  ]

  field.innerHTML = lines.map(line => `
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:10px">
      ${line.map(pos => {
        const cardId = builder.slots[pos]
        const card   = cardId ? builder.playerCards.find(c => c.id === cardId) : null
        const role   = pos.replace(/\d+/, '')
        const color  = JOB_COLORS[role]

        if (card) {
          const p    = card.player
          const note = role==='GK'?p.note_g : role==='DEF'?p.note_d : role==='MIL'?p.note_m : p.note_a
          const portrait = getPortrait(p)
          return `<div class="formation-slot filled" data-pos="${pos}"
            style="border-color:${color};background:${color};cursor:pointer;position:relative;width:60px;height:60px">
            ${portrait
              ? `<img src="${portrait}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.7">`
              : ''}
            <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008">${note}</div>
            <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.surname_encoded}</div>
          </div>`
        }
        return `<div class="formation-slot" data-pos="${pos}"
          style="border-color:rgba(255,255,255,0.4);cursor:pointer;width:60px;height:60px">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${role}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
        </div>`
      }).join('')}
    </div>`).join('')

  field.querySelectorAll('.formation-slot').forEach(el => {
    el.addEventListener('click', () => openPlayerSelector(el.dataset.pos, builder, container, ctx))
  })
}

// ── Sélecteur de joueur (Petit 2 + 3) ────────────────────
function openPlayerSelector(position, builder, container, ctx) {
  const { openModal, closeModal } = ctx
  const role = position.replace(/\d+/, '')

  // Petit 3 : exclure les joueurs déjà placés ailleurs
  const usedElsewhere = Object.entries(builder.slots)
    .filter(([pos, id]) => pos !== position && id)
    .map(([,id]) => id)
  const usedAsSub = builder.subs

  const eligible = builder.playerCards.filter(c => {
    const p = c.player
    return (p.job === role || p.job2 === role) &&
           !usedElsewhere.includes(c.id) &&
           !usedAsSub.includes(c.id)
  })

  eligible.sort((a, b) => {
    const fn = r => r==='GK'?p.note_g : r==='DEF'?p.note_d : r==='MIL'?p.note_m : p.note_a
    const nA = role==='GK'?a.player.note_g : role==='DEF'?a.player.note_d : role==='MIL'?a.player.note_m : a.player.note_a
    const nB = role==='GK'?b.player.note_g : role==='DEF'?b.player.note_d : role==='MIL'?b.player.note_m : b.player.note_a
    return nB - nA
  })

  // Petit 2 : afficher photo, nom prénom, club, pays, note
  openModal(`Choisir ${role} — ${position}`,
    `<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${builder.slots[position] ? `
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>` : ''}
      ${eligible.length > 0 ? eligible.map(c => {
        const p = c.player
        const note = role==='GK'?p.note_g : role==='DEF'?p.note_d : role==='MIL'?p.note_m : p.note_a
        const portrait = getPortrait(p)
        const rarColor = {normal:'#ccc',pepite:'#D4A017',papyte:'#909090',legende:'#7a28b8'}[p.rarity]
        return `<div class="player-option" data-card-id="${c.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${JOB_COLORS[role]}">
            ${portrait
              ? `<img src="${portrait}" style="width:100%;height:100%;object-fit:cover">`
              : `<div style="width:100%;height:100%;background:${JOB_COLORS[role]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${role}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${p.firstname} ${p.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${p.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${p.country_code}">
              ${p.clubs?.logo_url
                ? `<img src="${p.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`
                : `<span style="font-size:10px;color:var(--gray-600)">${p.clubs?.encoded_name||'—'}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${p.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${JOB_COLORS[role]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${rarColor};flex-shrink:0">
            ${note}
          </div>
        </div>`
      }).join('') : '<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,
    `<button class="btn btn-ghost" id="close-selector">Fermer</button>`
  )

  document.getElementById('close-selector')?.addEventListener('click', closeModal)

  document.getElementById('remove-player')?.addEventListener('click', () => {
    delete builder.slots[position]
    closeModal()
    renderBuilder(container, builder, ctx)
  })

  document.querySelectorAll('.player-option').forEach(el => {
    el.addEventListener('click', () => {
      builder.slots[position] = el.dataset.cardId
      closeModal()
      renderBuilder(container, builder, ctx)
    })
  })
}

// ── Sélecteur remplaçant ──────────────────────────────────
function openSubSelector(builder, container, ctx) {
  const { openModal, closeModal } = ctx
  const usedAll = [...Object.values(builder.slots).filter(Boolean), ...builder.subs]

  const available = builder.playerCards.filter(c => !usedAll.includes(c.id))

  openModal('Ajouter un remplaçant',
    `<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${available.length > 0 ? available.map(c => {
        const p = c.player
        const portrait = getPortrait(p)
        const mainNote = p.job==='GK'?p.note_g : p.job==='DEF'?p.note_d : p.job==='MIL'?p.note_m : p.note_a
        return `<div class="player-option" data-card-id="${c.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${JOB_COLORS[p.job]}">
            ${portrait ? `<img src="${portrait}" style="width:100%;height:100%;object-fit:cover">` : ''}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.job} · ${p.country_code} · ${p.clubs?.encoded_name||'—'}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${JOB_COLORS[p.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${mainNote}
          </div>
        </div>`
      }).join('') : '<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,
    `<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>`
  )

  document.getElementById('close-sub-selector')?.addEventListener('click', closeModal)
  document.querySelectorAll('.player-option').forEach(el => {
    el.addEventListener('click', () => {
      builder.subs.push(el.dataset.cardId)
      closeModal()
      renderBuilder(container, builder, ctx)
    })
  })
}

// ── Sauvegarde ────────────────────────────────────────────
async function saveDeck(builder, ctx) {
  const { state, toast, navigate } = ctx

  const matchingFormation = builder.formationCards.find(c => c.formation === builder.formation)
  const formationCardId   = matchingFormation?.id || builder.formationCardId

  await supabase.from('decks').update({
    formation: builder.formation,
    formation_card_id: formationCardId || null
  }).eq('id', builder.deckId)

  await supabase.from('deck_cards').delete().eq('deck_id', builder.deckId)

  const inserts = []
  Object.entries(builder.slots).forEach(([pos, cardId], idx) => {
    inserts.push({ deck_id: builder.deckId, card_id: cardId, position: pos, is_starter: true, slot_order: idx })
  })
  builder.subs.forEach((cardId, idx) => {
    inserts.push({ deck_id: builder.deckId, card_id: cardId, position: `SUB${idx+1}`, is_starter: false, slot_order: 100+idx })
  })

  if (inserts.length > 0) {
    const { error } = await supabase.from('deck_cards').insert(inserts)
    if (error) { toast(error.message, 'error'); return }
  }

  toast('Deck enregistré ✅', 'success')
  navigate('decks')
}

function buildPositions(formation) {
  const struct = FORMATIONS[formation] || FORMATIONS['4-4-2']
  const positions = ['GK1']
  for (let i = 1; i <= struct.DEF; i++) positions.push(`DEF${i}`)
  for (let i = 1; i <= struct.MIL; i++) positions.push(`MIL${i}`)
  for (let i = 1; i <= struct.ATT; i++) positions.push(`ATT${i}`)
  return positions
}
