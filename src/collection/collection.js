import { supabase } from '../lib/supabase.js'
import { GC_DEFS } from '../match/game-logic.js'

// ── Constantes ─────────────────────────────────────────────
const RAR_COLORS  = { normal:'#ccc', pepite:'#D4A017', papyte:'#909090', legende:'#7a28b8' }
const JOB_COLORS  = { GK:'#111111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }
const JOB_ORDER   = ['GK','DEF','MIL','ATT']
const JOB_FILTERS = ['Tous','GK','DEF','MIL','ATT']

// Prix de vente directe
const DIRECT_SELL_PRICE = { normal:1000, pepite:5000, papyte:5000, legende:10000 }

// Noms pays
const COUNTRY_NAMES = {
  MA:'MAROC', FR:'FRANCE', AR:'ARGENTINE', PT:'PORTUGAL', BR:'BRESIL',
  ES:'ESPAGNE', DE:'ALLEMAGNE', GB:'ANGLETERRE', IT:'ITALIE',
  CM:'CAMEROUN', SN:'SENEGAL', NG:'NIGERIA', DK:'DANEMARK',
  NL:'PAYS-BAS', BE:'BELGIQUE', CI:"CÔTE D'IVOIRE",
  AL:'ALBANIE', HR:'CROATIE', RS:'SERBIE', TR:'TURQUIE',
}

function getPortrait(p) {
  const url = import.meta.env.VITE_SUPABASE_URL
  if (!url || !p?.skin || !p?.hair) return null
  const key = p.hair === 'chauve' ? `${p.skin}-chauve-rase` : `${p.skin}-${p.hair}-${p.hair_length}`
  return `${url}/storage/v1/object/public/assets/tetes/${key}.jpg`
}

function getNote(p, job) {
  if (!p) return 0
  return Number(job==='GK'?p.note_g : job==='DEF'?p.note_d : job==='MIL'?p.note_m : p.note_a) || 0
}

// ── Rendu d'une carte joueur ──────────────────────────────
function renderCard(card, countBadge = '') {
  const p = card.player
  if (!p) return ''

  const job      = p.job || 'ATT'
  const jobColor = JOB_COLORS[job]
  const rarColor = RAR_COLORS[p.rarity] || '#ccc'
  const note1    = getNote(p, job)
  const note2    = p.job2 ? getNote(p, p.job2) : null
  const job2Color = p.job2 ? JOB_COLORS[p.job2] : null
  const portrait = getPortrait(p)
  const country  = COUNTRY_NAMES[p.country_code] || p.country_code || ''

  return `
  <div style="
    width:140px;border-radius:12px;padding:6px;
    background:${rarColor};cursor:pointer;flex-shrink:0;position:relative
  " data-card-id="${card.id}">
    ${countBadge}
    <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:5px 6px 2px;text-align:center">
        <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${p.firstname}</div>
        <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(p.surname_encoded||'').toUpperCase()}</div>
      </div>
      <!-- Étoiles + bande poste -->
      <div style="position:relative;height:70px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0">
        <div style="position:absolute;width:100%;height:13px;background:${jobColor}"></div>
        <!-- Étoile principale (z-index élevé pour être au premier plan) -->
        <svg width="52" height="50" viewBox="0 0 52 50" style="position:relative;z-index:2;display:block">
          <polygon points="26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18"
            fill="${jobColor}" stroke="#0005" stroke-width="2"/>
          <text x="26" y="32" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${note1}</text>
        </svg>
        ${note2 !== null ? `
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:relative;z-index:2;display:block;margin-top:-4px">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${job2Color}" stroke="#0004" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${note2}</text>
        </svg>` : ''}
      </div>
      <!-- Portrait -->
      <div style="height:106px;overflow:hidden;background:#b8d4f0;position:relative">
        ${portrait
          ? `<img src="${portrait}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
               onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be\'>👤</div>'">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be">👤</div>`}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:26px;gap:4px">
        <img src="https://flagsapi.com/${p.country_code}/flat/32.png"
          style="width:20px;height:14px;border-radius:2px;object-fit:cover;flex-shrink:0"
          onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555;flex:1;text-align:center">${country}</div>
        ${p.clubs?.logo_url
          ? `<img src="${p.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`
          : `<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(p.clubs?.encoded_name||'').slice(0,6)}</div>`}
      </div>
    </div>
  </div>`
}

// ── Page principale ────────────────────────────────────────
export async function renderCollection(container, ctx) {
  const { state, navigate, toast, openModal, closeModal } = ctx
  container.innerHTML = '<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>'

  const { data: cards } = await supabase
    .from('cards')
    .select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`)
    .eq('owner_id', state.profile.id)

  const playerCards = (cards||[]).filter(c => c.card_type === 'player' && c.player)
  const gcCards     = (cards||[]).filter(c => c.card_type === 'game_changer')
  const formCards   = (cards||[]).filter(c => c.card_type === 'formation')

  // Compter les doublons par player_id
  const countByPlayer = {}
  playerCards.forEach(c => {
    const pid = c.player.id
    countByPlayer[pid] = (countByPlayer[pid] || 0) + 1
  })

  let activeFilter = 'Tous'
  let searchQ = ''

  // Trier les cartes joueurs : GK → DEF → MIL → ATT
  function sortedCards() {
    return [...playerCards].sort((a, b) => {
      const iA = JOB_ORDER.indexOf(a.player.job)
      const iB = JOB_ORDER.indexOf(b.player.job)
      if (iA !== iB) return iA - iB
      return (a.player.surname_encoded||'').localeCompare(b.player.surname_encoded||'')
    })
  }

  function filteredCards() {
    return sortedCards().filter(c => {
      const p = c.player
      const matchJob    = activeFilter === 'Tous' || p.job === activeFilter
      const matchSearch = !searchQ || `${p.firstname} ${p.surname_encoded}`.toLowerCase().includes(searchQ)
      return matchJob && matchSearch
    })
  }

  container.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${playerCards.length} carte(s) joueur · ${gcCards.length} Game Changer · ${formCards.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${gcCards.length > 0 || formCards.length > 0 ? `
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${gcCards.map(c => `
          <div data-gc-id="${c.id}" data-gc-type="${c.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${GC_DEFS[c.gc_type]?.icon||'⚡'}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${c.gc_type}</div>
          </div>`).join('')}

        ${formCards.map(c => `
          <div data-form-id="${c.id}" data-formation="${c.formation}" style="
            background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${c.formation}</div>
          </div>`).join('')}

      </div>
    </div>` : ''}

    <!-- Filtres -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${JOB_FILTERS.map(f => `
          <button class="filter-btn" data-job="${f}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${f===activeFilter?'var(--green)':'var(--gray-200)'};
              background:${f===activeFilter?'var(--green)':'#fff'};
              color:${f===activeFilter?'#fff':'var(--gray-600)'}">
            ${f}
          </button>`).join('')}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`

  // ── Rendu des cartes ────────────────────────────────────
  function renderCards() {
    const list = filteredCards()
    const grid = document.getElementById('col-grid')
    if (!grid) return
    if (!list.length) {
      grid.innerHTML = '<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>'
      return
    }

    // Dédupliquer pour affichage : une seule carte par joueur avec badge
    const seen = {}
    const deduped = []
    list.forEach(card => {
      const pid = card.player.id
      if (!seen[pid]) {
        seen[pid] = true
        deduped.push(card)
      }
    })

    grid.innerHTML = deduped.map(card => {
      const count = countByPlayer[card.player.id] || 1
      const badge = count > 1
        ? `<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${count}</div>`
        : ''
      const forSale = playerCards.filter(c => c.player.id === card.player.id && c.is_for_sale).length
      const saleBadge = forSale > 0
        ? `<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>`
        : ''
      return renderCard(card, badge + saleBadge)
    }).join('')

    grid.querySelectorAll('[data-card-id]').forEach(el => {
      el.addEventListener('click', () => {
        const card = playerCards.find(c => c.id === el.dataset.cardId)
        if (card) openCardDetail(card, playerCards, countByPlayer, ctx)
      })
    })
  }

  renderCards()

  // Filtres
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.job
      container.querySelectorAll('.filter-btn').forEach(b => {
        const a = b.dataset.job === activeFilter
        b.style.background  = a ? 'var(--green)' : '#fff'
        b.style.color       = a ? '#fff' : 'var(--gray-600)'
        b.style.borderColor = a ? 'var(--green)' : 'var(--gray-200)'
      })
      renderCards()
    })
  })

  document.getElementById('col-search').addEventListener('input', e => {
    searchQ = e.target.value.toLowerCase()
    renderCards()
  })

  // ── Clic Game Changer ────────────────────────────────────
  container.querySelectorAll('[data-gc-id]').forEach(el => {
    el.addEventListener('click', () => openGCModal(el.dataset.gcType, openModal))
  })

  // ── Clic Formation ───────────────────────────────────────
  container.querySelectorAll('[data-form-id]').forEach(el => {
    el.addEventListener('click', () => openFormationModal(el.dataset.formation, openModal))
  })
}

// ── Modal Game Changer ────────────────────────────────────
function openGCModal(gcType, openModal) {
  const gc = GC_DEFS[gcType] || { icon:'⚡', desc:'Effet spécial.' }
  openModal('Game Changer',
    `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
      <div style="background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:16px;border:2px solid #9b59b6;
        padding:24px 32px;text-align:center;color:#fff;width:100%;max-width:280px">
        <div style="font-size:56px;margin-bottom:8px">${gc.icon}</div>
        <div style="font-size:9px;background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:10px;display:inline-block;letter-spacing:.5px;margin-bottom:8px">GAME CHANGER</div>
        <div style="font-size:22px;font-weight:900">${gcType}</div>
      </div>
      <div style="background:#f9f0ff;border-radius:10px;padding:14px 16px;width:100%">
        <div style="font-size:12px;font-weight:700;color:#7a28b8;margin-bottom:6px">EFFET</div>
        <div style="font-size:14px;color:#333">${gc.desc}</div>
      </div>
      <div style="background:#fff3cd;border-radius:10px;padding:10px 14px;width:100%">
        <div style="font-size:12px;color:#856404">⚠️ Cette carte est à <b>usage unique</b>. Une fois jouée en match, elle est définitivement supprimée de ta collection.</div>
      </div>
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )
}

// ── Modal Formation avec schéma visuel des liens ──────────
function openFormationModal(formation, openModal) {
  const STRUCTS = {
    '4-4-2': { GK:1, DEF:4, MIL:4, ATT:2 },
    '4-3-3': { GK:1, DEF:4, MIL:3, ATT:3 },
    '3-4-3': { GK:1, DEF:3, MIL:4, ATT:3 },
    '3-5-2': { GK:1, DEF:3, MIL:5, ATT:2 },
    '5-3-2': { GK:1, DEF:5, MIL:3, ATT:2 },
  }
  const JOB_C = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }
  const struct = STRUCTS[formation] || STRUCTS['4-4-2']

  function renderLine(role, count) {
    const color = JOB_C[role]
    const circles = []
    for (let i = 0; i < count; i++) {
      circles.push(`
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="width:36px;height:36px;border-radius:50%;background:${color};color:#fff;
            display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;
            border:2px solid rgba(255,255,255,0.4)">
            ${role}
          </div>
          ${count > 1 && i < count-1 ? `<div style="position:absolute;right:-12px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.4);font-size:10px">↔</div>` : ''}
        </div>`)
    }

    // Liens horizontaux entre joueurs adjacents
    const slots = Array.from({length:count}, (_,i) => i)
    const links = slots.slice(0,-1).map(() =>
      `<div style="flex:1;height:2px;background:rgba(255,255,255,0.2);border-radius:1px;margin-top:17px"></div>`
    )

    const row = []
    slots.forEach((_, i) => {
      row.push(`<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
        <div style="width:36px;height:36px;border-radius:50%;background:${color};color:#fff;
          display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;
          box-shadow:0 0 8px rgba(0,0,0,0.3)">
          ${role}
        </div>
        <div style="font-size:8px;color:rgba(255,255,255,0.5)">${role}${i+1}</div>
      </div>`)
      if (i < count-1) {
        row.push(`<div style="display:flex;align-items:center;padding-bottom:14px">
          <div style="width:20px;height:2px;background:rgba(255,255,255,0.3)"></div>
          <div style="font-size:8px;color:rgba(255,255,255,0.4);white-space:nowrap;padding:0 2px">lien</div>
          <div style="width:20px;height:2px;background:rgba(255,255,255,0.3)"></div>
        </div>`)
      }
    })

    return `<div style="display:flex;align-items:flex-start;justify-content:center;gap:0;margin-bottom:12px">
      ${row.join('')}
    </div>`
  }

  openModal(`Formation ${formation}`,
    `<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:20px;margin-bottom:16px">
      <div style="text-align:center;color:rgba(255,255,255,0.6);font-size:11px;margin-bottom:16px;letter-spacing:1px">SCHÉMA DES POSTES ET LIENS</div>
      ${renderLine('ATT', struct.ATT)}
      ${renderLine('MIL', struct.MIL)}
      ${renderLine('DEF', struct.DEF)}
      ${renderLine('GK',  struct.GK)}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:6px">📌 Système de liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (reliés par une ligne) qui partagent le même <b>pays</b> ou le même <b>club</b> donnent chacun <b>+1</b> à la note de l'action.
      </div>
    </div>`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )
}

// ── Détail carte joueur + vente directe ───────────────────
function openCardDetail(card, allPlayerCards, countByPlayer, ctx) {
  const { state, toast, openModal, closeModal, navigate, refreshProfile } = ctx
  const p = card.player

  // Toutes les cartes de ce joueur (pour vente directe)
  const samePlayerCards = allPlayerCards.filter(c => c.player.id === p.id)
  const count           = samePlayerCards.length

  // Prix de vente directe
  const directPrice = DIRECT_SELL_PRICE[p.rarity] || 1000

  // Règles revente marché : Légende non vendable
  const canMarket = p.rarity !== 'legende'

  const portrait = getPortrait(p)
  const note1    = getNote(p, p.job)
  const note2    = p.job2 ? getNote(p, p.job2) : null
  const jobColor  = JOB_COLORS[p.job] || '#1A6B3C'
  const job2Color = p.job2 ? JOB_COLORS[p.job2] : null
  const rarColor  = RAR_COLORS[p.rarity] || '#ccc'
  const country   = COUNTRY_NAMES[p.country_code] || p.country_code || ''

  openModal(`${p.firstname} ${p.surname_encoded}`,
    `<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${rarColor};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${p.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(p.surname_encoded||'').toUpperCase()}</div>
          </div>
          <div style="position:relative;height:72px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="position:absolute;width:100%;height:13px;background:${jobColor}"></div>
            <svg width="52" height="50" viewBox="0 0 52 50" style="position:relative;z-index:2;display:block">
              <polygon points="26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18" fill="${jobColor}" stroke="#0005" stroke-width="2"/>
              <text x="26" y="32" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${note1}</text>
            </svg>
            ${note2 !== null ? `
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:relative;z-index:2;display:block;margin-top:-4px">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${job2Color}" stroke="#0004" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${note2}</text>
            </svg>` : ''}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${portrait
              ? `<img src="${portrait}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be\'>👤</div>'">`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>`}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${p.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${country}</div>
            ${p.clubs?.logo_url
              ? `<img src="${p.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`
              : `<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(p.clubs?.encoded_name||'').slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${rarColor}">${p.rarity.toUpperCase()}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">POSTE</div>
          <div style="font-weight:700">${p.job}${p.job2?' / '+p.job2:''}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">NOTES</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px">
            <span>GK <b>${p.note_g||0}</b></span>
            <span>DEF <b>${p.note_d||0}</b></span>
            <span>MIL <b>${p.note_m||0}</b></span>
            <span>ATT <b>${p.note_a||0}</b></span>
          </div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">EN COLLECTION</div>
          <div style="font-weight:700;font-size:18px">×${count}</div>
        </div>
      </div>
    </div>

    <!-- Vente directe -->
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:14px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">💰 Vente directe</div>
      <div style="background:#f9f9f9;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--gray-600)">Prix fixe selon rareté</div>
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${directPrice.toLocaleString('fr')} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${count-1} carte${count-1>1?'s':''}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${count <= 0 ? 'disabled' : ''}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${canMarket && !card.is_for_sale ? `
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${(p.sell_price||5000)}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-btn">Mettre en vente</button>
      </div>
    </div>` : ''}
    ${card.is_for_sale ? `
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(card.sale_price||0).toLocaleString('fr')} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-btn">Retirer</button>
    </div>` : ''}`,
    `<button class="btn btn-ghost" id="close-detail">Fermer</button>`
  )

  // Fermer
  document.getElementById('close-detail')?.addEventListener('click', closeModal)

  // Vente directe
  document.getElementById('direct-sell-btn')?.addEventListener('click', async () => {
    if (!confirm(`Vendre 1 carte ${p.surname_encoded} pour ${directPrice.toLocaleString('fr')} crédits ? Cette action est irréversible.`)) return

    // Trouver UNE carte de ce joueur (pas forcément celle en vente)
    const cardToSell = samePlayerCards.find(c => !c.is_for_sale) || samePlayerCards[0]
    if (!cardToSell) { toast('Aucune carte à vendre', 'error'); return }

    const { error } = await supabase.from('cards').delete().eq('id', cardToSell.id)
    if (error) { toast(error.message, 'error'); return }

    await supabase.from('users')
      .update({ credits: (state.profile.credits||0) + directPrice })
      .eq('id', state.profile.id)

    await refreshProfile()
    toast(`+${directPrice.toLocaleString('fr')} crédits ! Carte vendue.`, 'success')
    closeModal()
    navigate('collection')
  })

  // Marché
  document.getElementById('market-sell-btn')?.addEventListener('click', async () => {
    const price = parseInt(document.getElementById('sell-price').value)
    if (!price || price < 1) { toast('Prix invalide', 'error'); return }

    await supabase.from('cards').update({ is_for_sale: true, sale_price: price }).eq('id', card.id)
    await supabase.from('market_listings').insert({ seller_id: state.profile.id, card_id: card.id, price })

    toast('Carte mise en vente sur le marché !', 'success')
    closeModal()
    navigate('collection')
  })

  // Retirer du marché
  document.getElementById('cancel-sell-btn')?.addEventListener('click', async () => {
    await supabase.from('cards').update({ is_for_sale: false, sale_price: null }).eq('id', card.id)
    await supabase.from('market_listings').update({ status:'cancelled' }).eq('card_id', card.id).eq('status','active')
    toast('Annonce retirée', 'success')
    closeModal()
    navigate('collection')
  })
}
