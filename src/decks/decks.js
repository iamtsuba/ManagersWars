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
  return `${url}/storage/v1/object/public/assets/tetes/${key}.png`
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

  const LINES_ORDER = ['ATT','MIL','DEF','GK']
  const lineGroups  = LINES_ORDER.map(role => positions.filter(p => p.startsWith(role)))
  const struct      = FORMATIONS[builder.formation] || FORMATIONS['4-4-2']

  function getColsForLine(n) {
    if (n===1) return [1]
    if (n===2) return [0,2]
    if (n===3) return [0,1,2]
    if (n===4) return [0,1,1,2]
    if (n===5) return [0,1,1,1,2]
    return [1]
  }

  function slotPlayer(pos) {
    const id = builder.slots[pos]
    if (!id) return null
    return builder.playerCards.find(c => c.id === id)?.player || null
  }

  // Couleurs corrigées : vert flashy, noir → rouge
  function linkColor(pA, pB) {
    if (!pA || !pB) return '#cc2222'        // rouge si aucun lien
    const sc = pA.country_code && pB.country_code && pA.country_code === pB.country_code
    const sk = pA.club_id && pB.club_id && pA.club_id === pB.club_id
    if (sc && sk) return '#00e676'           // vert flashy : pays + club
    if (sc || sk)  return '#D4A017'          // jaune : pays OU club
    return '#cc2222'                         // rouge : aucun lien
  }

  function noteAt(p, role) {
    if (!p) return 0
    return Number(role==='GK'?p.note_g : role==='DEF'?p.note_d : role==='MIL'?p.note_m : p.note_a)||0
  }

  // Calcul stats MIL (note totale + bonus liens) pour badge en haut à droite
  const milLine = lineGroups.find(lg => lg[0]?.startsWith('MIL')) || []
  let milTotal = 0, milLinks = 0
  milLine.forEach(pos => { milTotal += noteAt(slotPlayer(pos), 'MIL') })
  for (let i = 0; i < milLine.length - 1; i++) {
    const c = linkColor(slotPlayer(milLine[i]), slotPlayer(milLine[i+1]))
    if (c !== '#cc2222') milLinks++
  }

  const SLOT_W = 60, SLOT_H = 60, LINK_W = 12

  field.innerHTML = `
    <div id="deck-terrain" style="position:relative;display:inline-block;width:100%">
      ${milLine.length > 0 ? `
        <div style="position:absolute;top:6px;right:8px;z-index:10;
          background:rgba(212,160,23,0.9);color:#000;border-radius:8px;
          padding:3px 8px;font-size:11px;font-weight:900;pointer-events:none">
          MIL ${milTotal}${milLinks>0?` +${milLinks}`:''} ⚡
        </div>` : ''}
      <div id="deck-rows" style="display:flex;flex-direction:column;gap:0;align-items:center;padding:28px 0 8px"></div>
      <svg id="deck-links-svg" style="position:absolute;inset:0;pointer-events:none;overflow:visible" width="100%" height="100%"></svg>
    </div>`

  const rowsEl = document.getElementById('deck-rows')

  // ── Lignes de joueurs (sans note de ligne sauf MIL) ────
  lineGroups.forEach((line, li) => {
    const role = line[0]?.replace(/\d+/,'') || 'ATT'
    const rowEl = document.createElement('div')
    rowEl.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:0;position:relative'
    rowEl.dataset.lineIdx = li

    line.forEach((pos, idx) => {
      const p       = slotPlayer(pos)
      const color   = JOB_COLORS[role]
      const note    = p ? noteAt(p, role) : null
      const portrait = p ? getPortrait(p) : null

      const slotEl = document.createElement('div')
      slotEl.className = p ? 'formation-slot filled' : 'formation-slot'
      slotEl.dataset.pos      = pos
      slotEl.dataset.lineIdx  = li
      slotEl.dataset.slotIdx  = idx
      slotEl.style.cssText = `border-color:${p?color:'rgba(255,255,255,0.4)'};background:${p?color:'transparent'};cursor:pointer;position:relative;width:${SLOT_W}px;height:${SLOT_H}px;flex-shrink:0;`

      if (p && portrait) {
        const img = document.createElement('img')
        img.src = portrait
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.75'
        slotEl.appendChild(img)
      }
      if (p) {
        slotEl.innerHTML += `
          <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008;line-height:1">${note}</div>
          <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px">${p.surname_encoded}</div>`
      } else {
        slotEl.innerHTML = `
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${role}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>`
      }
      rowEl.appendChild(slotEl)

      // Lien horizontal
      if (idx < line.length - 1) {
        const lc = linkColor(p, slotPlayer(line[idx+1]))
        const linkEl = document.createElement('div')
        linkEl.style.cssText = `width:${LINK_W}px;height:4px;border-radius:2px;background:${lc};flex-shrink:0;box-shadow:0 0 5px ${lc};opacity:0.9;`
        rowEl.appendChild(linkEl)
      }
    })

    rowsEl.appendChild(rowEl)
    // Spacer (pas de stats texte par ligne)
    const sp = document.createElement('div')
    sp.style.cssText = 'height:8px'
    rowsEl.appendChild(sp)
  })

  // ── Liens verticaux SVG ────────────────────────────────
  // Logique étendue : on cherche les adjacences de COLONNE entre lignes.
  // Une colonne logique d'une ligne peut être adjacente (±1) à une colonne de la ligne suivante.
  requestAnimationFrame(() => {
    const svg     = document.getElementById('deck-links-svg')
    const terrain = document.getElementById('deck-terrain')
    if (!svg || !terrain) return

    const terrainRect = terrain.getBoundingClientRect()
    svg.setAttribute('height', terrainRect.height)

    for (let li = 0; li < lineGroups.length - 1; li++) {
      const lineA = lineGroups[li]
      const lineB = lineGroups[li + 1]
      const roleA = lineA[0]?.replace(/\d+/,'') || 'ATT'
      const roleB = lineB[0]?.replace(/\d+/,'') || 'DEF'
      const colsA = getColsForLine(struct[roleA]||1)
      const colsB = getColsForLine(struct[roleB]||1)

      // Pour chaque paire (slotA, slotB) : lier si colonnes logiques adjacentes (|diff|<=1)
      // ET pas déjà liées (éviter doublons)
      const drawn = new Set()

      for (let ia = 0; ia < lineA.length; ia++) {
        for (let ib = 0; ib < lineB.length; ib++) {
          const colA = colsA[ia]
          const colB = colsB[ib]
          if (Math.abs(colA - colB) > 1) continue    // pas adjacents

          const key = `${ia}-${ib}`
          if (drawn.has(key)) continue
          drawn.add(key)

          const posA = lineA[ia]
          const posB = lineB[ib]
          const pA   = slotPlayer(posA)
          const pB   = slotPlayer(posB)
          const lc   = linkColor(pA, pB)

          const elA = field.querySelector(`[data-pos="${posA}"]`)
          const elB = field.querySelector(`[data-pos="${posB}"]`)
          if (!elA || !elB) continue

          const rA  = elA.getBoundingClientRect()
          const rB  = elB.getBoundingClientRect()
          const off = terrainRect

          const x1 = rA.left - off.left + rA.width  / 2
          const y1 = rA.top  - off.top  + rA.height
          const x2 = rB.left - off.left + rB.width  / 2
          const y2 = rB.top  - off.top

          const svgLine = document.createElementNS('http://www.w3.org/2000/svg','line')
          svgLine.setAttribute('x1', x1); svgLine.setAttribute('y1', y1)
          svgLine.setAttribute('x2', x2); svgLine.setAttribute('y2', y2)
          svgLine.setAttribute('stroke', lc)
          svgLine.setAttribute('stroke-width', '3')
          svgLine.setAttribute('stroke-linecap', 'round')
          svgLine.setAttribute('opacity', lc === '#cc2222' ? '0.35' : '0.85')
          if (lc !== '#cc2222') {
            svgLine.setAttribute('filter', `drop-shadow(0 0 3px ${lc})`)
          }
          svg.appendChild(svgLine)
        }
      }
    }
  })

  field.querySelectorAll('.formation-slot').forEach(el => {
    el.addEventListener('click', () => openPlayerSelector(el.dataset.pos, builder, container, ctx))
  })
}


// ── Sélecteur de joueur (Petit 2 + 3) ────────────────────
function openPlayerSelector(position, builder, container, ctx) {
  const { openModal, closeModal } = ctx
  const role = position.replace(/\d+/, '')

  // Exclure les joueurs déjà placés (par player_id pour éviter les doublons)
  const currentCardId = builder.slots[position]
  const currentCard = currentCardId ? builder.playerCards.find(c => c.id === currentCardId) : null
  const currentPlayerId = currentCard?.player?.id

  // Player IDs déjà utilisés ailleurs (titulaires + remplaçants), sauf le slot courant
  const usedPlayerIds = new Set()
  Object.entries(builder.slots).forEach(([pos, id]) => {
    if (pos === position || !id) return
    const c = builder.playerCards.find(c => c.id === id)
    if (c?.player?.id) usedPlayerIds.add(c.player.id)
  })
  builder.subs.forEach(id => {
    const c = builder.playerCards.find(c => c.id === id)
    if (c?.player?.id) usedPlayerIds.add(c.player.id)
  })

  // Dédupliquer par player_id (garder une seule carte par joueur dans la liste)
  const seenPlayerIds = new Set()
  const eligible = builder.playerCards.filter(c => {
    const p = c.player
    if (!(p.job === role || p.job2 === role)) return false
    if (usedPlayerIds.has(p.id)) return false
    if (seenPlayerIds.has(p.id)) return false
    seenPlayerIds.add(p.id)
    return true
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
  // Exclure par player_id (unicité stricte)
  const usedPlayerIds = new Set()
  Object.values(builder.slots).filter(Boolean).forEach(id => {
    const c = builder.playerCards.find(c => c.id === id)
    if (c?.player?.id) usedPlayerIds.add(c.player.id)
  })
  builder.subs.forEach(id => {
    const c = builder.playerCards.find(c => c.id === id)
    if (c?.player?.id) usedPlayerIds.add(c.player.id)
  })

  // Dédupliquer par player_id
  const seenSubIds = new Set()
  const available = builder.playerCards.filter(c => {
    if (usedPlayerIds.has(c.player?.id)) return false
    if (seenSubIds.has(c.player?.id)) return false
    seenSubIds.add(c.player?.id)
    return true
  })

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
