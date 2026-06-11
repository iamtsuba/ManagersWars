import { supabase } from '../lib/supabase.js'
import { renderCardHTML } from '../components/card.js'

const FORMATIONS = {
  '4-4-2': { GK:1, DEF:4, MIL:4, ATT:2 },
  '4-3-3': { GK:1, DEF:4, MIL:3, ATT:3 },
  '3-4-3': { GK:1, DEF:3, MIL:4, ATT:3 },
  '3-5-2': { GK:1, DEF:3, MIL:5, ATT:2 },
  '5-3-2': { GK:1, DEF:5, MIL:3, ATT:2 },
}

const JOB_COLORS = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }

export async function renderDecks(container, ctx) {
  const { state, navigate, toast } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: decks } = await supabase
    .from('decks')
    .select('id,name,formation_card_id,is_active')
    .eq('owner_id', state.profile.id)
    .order('created_at', { ascending: false })

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${decks?.length || 0} deck(s) · Un deck = 11 titulaires + remplaçants</p>
    </div>

    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${decks && decks.length > 0 ? decks.map(d => `
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${d.name} ${d.is_active ? '<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>' : ''}</div>
              <div style="font-size:11px;color:var(--gray-600)">Formation : ${d.formation_card_id ? 'définie' : 'à configurer'}</div>
            </div>
            <button class="btn btn-primary btn-sm" data-edit="${d.id}">✏️ Éditer</button>
          </div>
        `).join('') : '<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier deck !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>
  `

  document.getElementById('new-deck-btn').addEventListener('click', async () => {
    const name = prompt('Nom du deck :', `Deck ${(decks?.length||0)+1}`)
    if (!name) return
    const { data, error } = await supabase.from('decks')
      .insert({ owner_id: state.profile.id, name, is_active: !decks || decks.length === 0 })
      .select().single()
    if (error) { toast(error.message, 'error'); return }
    toast('Deck créé !', 'success')
    openDeckBuilder(data.id, container, ctx)
  })

  container.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openDeckBuilder(btn.dataset.edit, container, ctx))
  })
}

// ── Deck Builder visuel ───────────────────────────────────
async function openDeckBuilder(deckId, container, ctx) {
  const { state, toast, navigate } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du deck...</div>'

  // Charger le deck
  const { data: deck } = await supabase.from('decks').select('*').eq('id', deckId).single()

  // Charger les cartes joueur du Manager
  const { data: cards } = await supabase
    .from('cards')
    .select('id, card_type, formation, player:players(id,firstname,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,clubs(encoded_name,logo_url))')
    .eq('owner_id', state.profile.id)

  const playerCards = (cards||[]).filter(c => c.card_type === 'player' && c.player)
  const formationCards = (cards||[]).filter(c => c.card_type === 'formation')

  // Charger les positions actuelles du deck
  const { data: deckCards } = await supabase
    .from('deck_cards')
    .select('card_id, position, is_starter, slot_order')
    .eq('deck_id', deckId)

  // État du builder
  const builder = {
    deckId,
    name: deck.name,
    formation: deck.formation || '4-4-2',
    formationCardId: deck.formation_card_id,
    slots: {},      // position → cardId
    playerCards,
    formationCards,
  }

  // Restaurer les slots existants
  ;(deckCards || []).forEach(dc => {
    builder.slots[dc.position] = dc.card_id
  })

  renderBuilder(container, builder, ctx)
}

function renderBuilder(container, builder, ctx) {
  const { toast, navigate } = ctx
  const struct = FORMATIONS[builder.formation]

  // Générer les positions
  const positions = []
  positions.push('GK1')
  for (let i = 1; i <= struct.DEF; i++) positions.push(`DEF${i}`)
  for (let i = 1; i <= struct.MIL; i++) positions.push(`MIL${i}`)
  for (let i = 1; i <= struct.ATT; i++) positions.push(`ATT${i}`)

  const filledCount = positions.filter(p => builder.slots[p]).length

  container.innerHTML = `
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${builder.name}</h2>
        <p>${filledCount}/11 titulaires placés</p>
      </div>
    </div>

    <!-- Sélecteur formation -->
    <div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px">Formation</label>
      <select id="formation-select">
        ${Object.keys(FORMATIONS).map(f => `<option value="${f}" ${f===builder.formation?'selected':''}>${f}</option>`).join('')}
      </select>
    </div>

    <!-- Terrain -->
    <div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);padding:20px 16px;min-height:340px">
      <div class="deck-grid" id="deck-field"></div>
    </div>

    <!-- Actions -->
    <div class="page-body">
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${filledCount < 11 ? 'disabled' : ''}>
        ${filledCount < 11 ? `Placez encore ${11-filledCount} joueur(s)` : '💾 Enregistrer le deck'}
      </button>
    </div>
  </div>
  `

  renderDeckField(container, builder, positions, struct, ctx)

  document.getElementById('builder-back').addEventListener('click', () => navigate('decks'))

  document.getElementById('formation-select').addEventListener('change', e => {
    builder.formation = e.target.value
    // Réinitialiser les slots qui n'existent plus
    const newStruct = FORMATIONS[builder.formation]
    const newPositions = ['GK1']
    for (let i = 1; i <= newStruct.DEF; i++) newPositions.push(`DEF${i}`)
    for (let i = 1; i <= newStruct.MIL; i++) newPositions.push(`MIL${i}`)
    for (let i = 1; i <= newStruct.ATT; i++) newPositions.push(`ATT${i}`)
    const cleanSlots = {}
    newPositions.forEach(p => { if (builder.slots[p]) cleanSlots[p] = builder.slots[p] })
    builder.slots = cleanSlots
    renderBuilder(container, builder, ctx)
  })

  document.getElementById('save-deck').addEventListener('click', () => saveDeck(builder, ctx))
}

function renderDeckField(container, builder, positions, struct, ctx) {
  const field = document.getElementById('deck-field')
  if (!field) return

  // Organiser par ligne (ATT en haut, GK en bas)
  const lines = [
    positions.filter(p => p.startsWith('ATT')),
    positions.filter(p => p.startsWith('MIL')),
    positions.filter(p => p.startsWith('DEF')),
    positions.filter(p => p.startsWith('GK')),
  ]

  field.innerHTML = lines.map(line => `
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:12px">
      ${line.map(pos => {
        const cardId = builder.slots[pos]
        const card = cardId ? builder.playerCards.find(c => c.id === cardId) : null
        const role = pos.replace(/\d+/, '')
        const color = JOB_COLORS[role]
        if (card) {
          const p = card.player
          const note = role === 'GK' ? p.note_g : role === 'DEF' ? p.note_d : role === 'MIL' ? p.note_m : p.note_a
          return `<div class="formation-slot filled" data-pos="${pos}" style="border-color:${color};background:${color}">
            <div style="font-size:14px;font-weight:900;color:#fff">${note}</div>
            <div style="font-size:7px;color:#fff;max-width:52px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.surname_encoded}</div>
          </div>`
        }
        return `<div class="formation-slot" data-pos="${pos}" style="border-color:rgba(255,255,255,0.4)">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${role}</div>
          <div style="font-size:16px;color:rgba(255,255,255,0.5)">+</div>
        </div>`
      }).join('')}
    </div>
  `).join('')

  // Click sur slot → ouvrir sélecteur de joueur
  field.querySelectorAll('.formation-slot').forEach(el => {
    el.addEventListener('click', () => {
      openPlayerSelector(el.dataset.pos, builder, container, ctx, positions, struct)
    })
  })
}

function openPlayerSelector(position, builder, container, ctx, positions, struct) {
  const { openModal, closeModal, toast } = ctx
  const role = position.replace(/\d+/, '')

  // Joueurs éligibles (poste principal ou secondaire correspondant), non déjà placés
  const usedCardIds = Object.values(builder.slots).filter(id => id !== builder.slots[position])
  const eligible = builder.playerCards.filter(c => {
    const p = c.player
    const matchRole = p.job === role || p.job2 === role
    const notUsed = !usedCardIds.includes(c.id)
    return matchRole && notUsed
  })

  // Trier par note du poste
  eligible.sort((a, b) => {
    const noteA = role === 'GK' ? a.player.note_g : role === 'DEF' ? a.player.note_d : role === 'MIL' ? a.player.note_m : a.player.note_a
    const noteB = role === 'GK' ? b.player.note_g : role === 'DEF' ? b.player.note_d : role === 'MIL' ? b.player.note_m : b.player.note_a
    return noteB - noteA
  })

  openModal(`Choisir un ${role} (${position})`,
    `<div style="max-height:50vh;overflow-y:auto">
      ${builder.slots[position] ? `<button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:10px">Retirer le joueur actuel</button>` : ''}
      ${eligible.length > 0 ? `<div style="display:flex;flex-direction:column;gap:6px">
        ${eligible.map(c => {
          const p = c.player
          const note = role === 'GK' ? p.note_g : role === 'DEF' ? p.note_d : role === 'MIL' ? p.note_m : p.note_a
          const rarColor = { normal:'#ccc', pepite:'#D4A017', papyte:'#909090', legende:'#7a28b8' }[p.rarity]
          return `<div class="player-option" data-card-id="${c.id}" style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
            <div style="width:32px;height:32px;border-radius:6px;background:${JOB_COLORS[role]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;border:2px solid ${rarColor}">${note}</div>
            <div style="flex:1">
              <div style="font-weight:600;font-size:13px">${p.firstname} ${p.surname_encoded}</div>
              <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${p.clubs?.encoded_name || '—'} · ${p.rarity}</div>
            </div>
          </div>`
        }).join('')}
      </div>` : '<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur éligible pour ce poste.<br><small>Ouvre des boosters pour en obtenir !</small></div>'}
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )

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

async function saveDeck(builder, ctx) {
  const { state, toast, navigate } = ctx

  // Trouver une carte formation correspondante
  let formationCardId = builder.formationCardId
  const matchingFormation = builder.formationCards.find(c => c.formation === builder.formation)
  if (matchingFormation) formationCardId = matchingFormation.id

  // Mettre à jour le deck
  await supabase.from('decks')
    .update({ formation: builder.formation, formation_card_id: formationCardId })
    .eq('id', builder.deckId)

  // Supprimer les anciennes positions
  await supabase.from('deck_cards').delete().eq('deck_id', builder.deckId)

  // Insérer les nouvelles
  const inserts = Object.entries(builder.slots).map(([pos, cardId], idx) => ({
    deck_id: builder.deckId,
    card_id: cardId,
    position: pos,
    is_starter: true,
    slot_order: idx,
  }))

  if (inserts.length > 0) {
    const { error } = await supabase.from('deck_cards').insert(inserts)
    if (error) { toast(error.message, 'error'); return }
  }

  toast('Deck enregistré ! ✅', 'success')
  navigate('decks')
}
