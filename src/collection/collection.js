import { supabase } from '../lib/supabase.js'
import { GC_DEFS } from '../match/game-logic.js'
import { FORMATION_LINKS } from '../match/formation-links.js'

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
  return `${url}/storage/v1/object/public/assets/tetes/${key}.png`
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
      <!-- Zone étoiles : bandeau fixe + étoile principale dedans + petite étoile dessous -->
      <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
        <!-- Bandeau de couleur fixe (toujours au même endroit) -->
        <div style="position:absolute;top:16px;width:100%;height:28px;background:${jobColor}"></div>
        <!-- Étoile principale centrée sur le bandeau, contour blanc -->
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="${jobColor}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${note1}</text>
        </svg>
        <!-- Petite étoile poste secondaire, toujours en dessous du bandeau -->
        ${note2 !== null ? `
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${job2Color}" stroke="white" stroke-width="1.5"/>
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

// ── Rendu d'une carte joueur MANQUANTE (grisée, non possédée) ──
function renderMissingCard(p) {
  const job = p.job || 'ATT'
  const note1 = getNote(p, job)
  const country = COUNTRY_NAMES[p.country_code] || p.country_code || ''

  return `
  <div style="
    width:140px;border-radius:12px;padding:6px;
    background:#ccc;flex-shrink:0;position:relative;filter:grayscale(1);opacity:0.45
  ">
    <div style="background:#e8e8e8;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
      <div style="padding:5px 6px 2px;text-align:center">
        <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#888">${p.firstname}</div>
        <div style="font-size:14px;font-weight:900;color:#444;font-family:Arial Black,Arial;line-height:1.1">${(p.surname_encoded||'').toUpperCase()}</div>
      </div>
      <div style="position:relative;height:80px;background:#e8e8e8;display:flex;flex-direction:column;align-items:center">
        <div style="position:absolute;top:16px;width:100%;height:28px;background:#999"></div>
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="#999" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${note1}</text>
        </svg>
      </div>
      <div style="height:106px;overflow:hidden;background:#ddd;display:flex;align-items:center;justify-content:center;font-size:36px;color:#aaa">👤</div>
      <div style="background:#e8e8e8;padding:3px 6px;display:flex;align-items:center;justify-content:center;min-height:26px">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#999">${country}</div>
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

  // Tous les joueurs actifs (pour le mode "Voir tout")
  const { data: allPlayers } = await supabase
    .from('players')
    .select(`id, firstname, surname_encoded, country_code, club_id, job, job2,
      note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length,
      clubs(encoded_name, logo_url)`)
    .eq('is_active', true)

  const playerCards = (cards||[]).filter(c => c.card_type === 'player' && c.player)
  const gcCards     = (cards||[]).filter(c => c.card_type === 'game_changer')
  const formCards   = (cards||[]).filter(c => c.card_type === 'formation')

  const ALL_FORMATIONS = Object.keys(FORMATION_LINKS)
  const ALL_GC_TYPES   = Object.keys(GC_DEFS)

  // Compter les doublons par player_id
  const countByPlayer = {}
  playerCards.forEach(c => {
    const pid = c.player.id
    countByPlayer[pid] = (countByPlayer[pid] || 0) + 1
  })

  const ownedPlayerIds  = new Set(Object.keys(countByPlayer).map(id => String(id)))
  const ownedFormations = new Set(formCards.map(c => c.formation))
  const ownedGcTypes    = new Set(gcCards.map(c => c.gc_type))

  let activeTab    = 'player'   // 'player' | 'formation' | 'gc'
  let activeFilter = 'Tous'
  let searchQ      = ''
  let showAll      = false

  // Trier les cartes joueurs : GK → DEF → MIL → ATT
  function sortedCards() {
    return [...playerCards].sort((a, b) => {
      const iA = JOB_ORDER.indexOf(a.player.job)
      const iB = JOB_ORDER.indexOf(b.player.job)
      if (iA !== iB) return iA - iB
      return (a.player.surname_encoded||'').localeCompare(b.player.surname_encoded||'')
    })
  }

  function sortedAllPlayers() {
    return [...(allPlayers||[])].sort((a, b) => {
      const iA = JOB_ORDER.indexOf(a.job)
      const iB = JOB_ORDER.indexOf(b.job)
      if (iA !== iB) return iA - iB
      return (a.surname_encoded||'').localeCompare(b.surname_encoded||'')
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

  function filteredAllPlayers() {
    return sortedAllPlayers().filter(p => {
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

    <!-- Onglets -->
    <div style="display:flex;border-bottom:1px solid var(--gray-200);background:#fff">
      <button class="col-tab-btn" data-tab="player" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${activeTab==='player'?'var(--green)':'transparent'};
        color:${activeTab==='player'?'var(--green)':'var(--gray-600)'}">Joueurs</button>
      <button class="col-tab-btn" data-tab="formation" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${activeTab==='formation'?'var(--green)':'transparent'};
        color:${activeTab==='formation'?'var(--green)':'var(--gray-600)'}">Formations</button>
      <button class="col-tab-btn" data-tab="gc" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${activeTab==='gc'?'var(--green)':'transparent'};
        color:${activeTab==='gc'?'var(--green)':'var(--gray-600)'}">Game Changer</button>
    </div>

    <!-- Filtres -->
    <div id="col-filters" style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px"></div>

    <!-- Grille cartes -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`

  // ── Rendu de la barre de filtres (dépend de l'onglet) ───
  function renderFilters() {
    const bar = document.getElementById('col-filters')
    if (!bar) return

    if (activeTab === 'player') {
      bar.innerHTML = `
        <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px" value="${searchQ}">
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;align-items:center">
          ${JOB_FILTERS.map(f => `
            <button class="filter-btn" data-job="${f}"
              style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
                border:1.5px solid ${f===activeFilter?'var(--green)':'var(--gray-200)'};
                background:${f===activeFilter?'var(--green)':'#fff'};
                color:${f===activeFilter?'#fff':'var(--gray-600)'}">
              ${f}
            </button>`).join('')}
          <button id="show-all-btn"
            style="flex-shrink:0;margin-left:auto;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${showAll?'var(--yellow)':'var(--gray-200)'};
              background:${showAll?'var(--yellow)':'#fff'};
              color:${showAll?'#fff':'var(--gray-600)'}">
            ${showAll ? '✓ Tout afficher' : 'Voir tout'}
          </button>
        </div>`

      document.getElementById('col-search').addEventListener('input', e => {
        searchQ = e.target.value.toLowerCase()
        renderCards()
      })
      container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.dataset.job
          renderFilters()
          renderCards()
        })
      })
      document.getElementById('show-all-btn').addEventListener('click', () => {
        showAll = !showAll
        renderFilters()
        renderCards()
      })
    } else {
      // Formations / Game Changer : juste le toggle "Voir tout"
      bar.innerHTML = `
        <div style="display:flex;justify-content:flex-end">
          <button id="show-all-btn"
            style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${showAll?'var(--yellow)':'var(--gray-200)'};
              background:${showAll?'var(--yellow)':'#fff'};
              color:${showAll?'#fff':'var(--gray-600)'}">
            ${showAll ? '✓ Tout afficher' : 'Voir tout'}
          </button>
        </div>`
      document.getElementById('show-all-btn').addEventListener('click', () => {
        showAll = !showAll
        renderFilters()
        renderCards()
      })
    }
  }

  // ── Rendu des cartes selon l'onglet actif ───────────────
  function renderCards() {
    const grid = document.getElementById('col-grid')
    if (!grid) return

    if (activeTab === 'player') {
      renderPlayerGrid(grid)
    } else if (activeTab === 'formation') {
      renderFormationGrid(grid)
    } else {
      renderGCGrid(grid)
    }
  }

  function renderPlayerGrid(grid) {
    if (showAll) {
      const list = filteredAllPlayers()
      if (!list.length) {
        grid.innerHTML = '<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucun joueur.</div>'
        return
      }
      grid.innerHTML = list.map(p => {
        const owned = ownedPlayerIds.has(String(p.id))
        if (owned) {
          const card  = playerCards.find(c => c.player.id === p.id)
          const count = countByPlayer[p.id] || 1
          const badge = count > 1
            ? `<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${count}</div>`
            : ''
          const forSale = playerCards.filter(c => c.player.id === p.id && c.is_for_sale).length
          const saleBadge = forSale > 0
            ? `<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>`
            : ''
          return renderCard(card, badge + saleBadge)
        }
        return renderMissingCard(p)
      }).join('')
    } else {
      const list = filteredCards()
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
    }

    grid.querySelectorAll('[data-card-id]').forEach(el => {
      el.addEventListener('click', () => {
        const card = playerCards.find(c => c.id === el.dataset.cardId)
        if (card) openCardDetail(card, playerCards, countByPlayer, ctx)
      })
    })
  }

  function renderFormationGrid(grid) {
    const formationsToShow = showAll ? ALL_FORMATIONS : [...ownedFormations]

    if (!formationsToShow.length) {
      grid.innerHTML = '<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Formation.<br><small>Ouvre un booster Formation !</small></div>'
      return
    }

    grid.innerHTML = formationsToShow.map(formation => {
      const owned = ownedFormations.has(formation)
      if (owned) {
        const card  = formCards.find(c => c.formation === formation)
        const count = formCards.filter(c => c.formation === formation).length
        const badge = count > 1
          ? `<div style="position:absolute;top:4px;right:4px;background:#0a3d1e;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${count}</div>`
          : ''
        return `
          <div data-form-id="${card.id}" style="
            position:relative;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            ${badge}
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${formation}</div>
          </div>`
      }
      return `
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:100px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;align-items:flex-start;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">🏟️</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
          <div style="font-weight:900;font-size:18px">${formation}</div>
        </div>`
    }).join('')

    grid.querySelectorAll('[data-form-id]').forEach(el => {
      el.addEventListener('click', () => {
        const card = formCards.find(c => c.id === el.dataset.formId)
        if (card) openFormationModal(card, formCards, ctx, openModal)
      })
    })
  }

  function renderGCGrid(grid) {
    const typesToShow = showAll ? ALL_GC_TYPES : [...ownedGcTypes]

    if (!typesToShow.length) {
      grid.innerHTML = '<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Game Changer.<br><small>Ouvre un booster Game Changer !</small></div>'
      return
    }

    grid.innerHTML = typesToShow.map(type => {
      const owned = ownedGcTypes.has(type)
      const gc = GC_DEFS[type] || { icon:'⚡', desc:'' }
      if (owned) {
        const card  = gcCards.find(c => c.gc_type === type)
        const count = gcCards.filter(c => c.gc_type === type).length
        const badge = count > 1
          ? `<div style="position:absolute;top:4px;right:4px;background:#3d0a7a;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${count}</div>`
          : ''
        return `
          <div data-gc-id="${card.id}" data-gc-type="${type}" style="
            position:relative;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            ${badge}
            <div style="font-size:28px">${gc.icon}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${type}</div>
          </div>`
      }
      return `
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:120px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">${gc.icon}</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
          <div style="font-weight:700;font-size:13px">${type}</div>
        </div>`
    }).join('')

    grid.querySelectorAll('[data-gc-id]').forEach(el => {
      el.addEventListener('click', () => openGCModal(el.dataset.gcType, openModal))
    })
  }

  // ── Onglets ──────────────────────────────────────────────
  container.querySelectorAll('.col-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab
      activeFilter = 'Tous'
      searchQ = ''
      showAll = false
      container.querySelectorAll('.col-tab-btn').forEach(b => {
        const a = b.dataset.tab === activeTab
        b.style.borderBottomColor = a ? 'var(--green)' : 'transparent'
        b.style.color = a ? 'var(--green)' : 'var(--gray-600)'
      })
      renderFilters()
      renderCards()
    })
  })

  renderFilters()
  renderCards()
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
const FORMATION_DIRECT_SELL_PRICE = 1000

function openFormationModal(card, allFormationCards, ctx, openModal) {
  const { state, toast, closeModal, navigate, refreshProfile } = ctx
  const formation = card.formation
  const STRUCTS = {
    '4-4-2': { GK:1, DEF:4, MIL:4, ATT:2 },
    '4-3-3': { GK:1, DEF:4, MIL:3, ATT:3 },
    '3-4-3': { GK:1, DEF:3, MIL:4, ATT:3 },
    '3-5-2': { GK:1, DEF:3, MIL:5, ATT:2 },
    '5-3-2': { GK:1, DEF:5, MIL:3, ATT:2 },
  }
  const JC = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }
  const struct = STRUCTS[formation] || STRUCTS['4-4-2']
  const LINES = ['ATT','MIL','DEF','GK']

  // Pour N joueurs, retourner les indices de colonne (0=G, 1=C, 2=D)
  // Positions X par ligne : retourne un tableau de X pour N joueurs, centré dans W
  // 2 joueurs → côte à côte au centre, pas aux extrêmes
  function getXPositions(n, W) {
    const R = 20    // rayon cercle
    const GAP = 14  // espace mini entre cercles
    const STEP = R * 2 + GAP  // 54px entre centres
    const totalWidth = (n - 1) * STEP
    const startX = (W - totalWidth) / 2
    return Array.from({ length: n }, (_, i) => startX + i * STEP)
  }

  // Colonnes logiques (0=G, 1=C, 2=D) pour les liens verticaux
  function getCols(n) {
    if (n === 1) return [1]
    if (n === 2) return [0, 2]
    if (n === 3) return [0, 1, 2]
    if (n === 4) return [0, 1, 1, 2]
    if (n === 5) return [0, 1, 1, 1, 2]
    return [1]
  }

  function renderGrid() {
    const W = 290, ROW_H = 72, MARGIN_Y = 24
    const H = LINES.length * ROW_H + MARGIN_Y * 2
    const rowY = LINES.map((_, i) => MARGIN_Y + i * ROW_H + ROW_H / 2)

    // Calculer les positions X réelles de chaque joueur par ligne
    const lineXs = {}
    LINES.forEach(role => {
      lineXs[role] = getXPositions(struct[role], W)
    })

    // Pour les liens verticaux : mapper colonne logique → X réelle
    // On prend les positions de chaque colonne (0=premier, 1=milieu, 2=dernier)
    // et on cherche si la colonne logique existe dans les deux lignes adjacentes
    function getColX(role, logicalCol) {
      const n = struct[role]
      const cols = getCols(n)
      const xs = lineXs[role]
      // Trouver le premier joueur ayant cette colonne logique
      const idx = cols.indexOf(logicalCol)
      return idx >= 0 ? xs[idx] : null
    }

    let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`

    // ── Liens HORIZONTAUX (joueurs adjacents sur la même ligne) ──
    LINES.forEach((role, li) => {
      const xs = lineXs[role]
      for (let i = 0; i < xs.length - 1; i++) {
        const x1 = xs[i] + 20, x2 = xs[i+1] - 20
        const y  = rowY[li]
        svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`
        svg += `<text x="${(x1+x2)/2}" y="${y-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`
      }
    })

    // ── Liens VERTICAUX (même colonne logique, lignes adjacentes) ──
    for (let logCol = 0; logCol < 3; logCol++) {
      for (let li = 0; li < LINES.length - 1; li++) {
        const role1 = LINES[li], role2 = LINES[li+1]
        const x1 = getColX(role1, logCol)
        const x2 = getColX(role2, logCol)
        if (x1 !== null && x2 !== null) {
          // Lien vertical centré entre les deux X (peuvent différer si ligne a plus/moins de joueurs)
          const mx = (x1 + x2) / 2
          svg += `<line x1="${x1}" y1="${rowY[li]+20}" x2="${x2}" y2="${rowY[li+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`
          svg += `<text x="${mx+6}" y="${(rowY[li]+rowY[li+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`
        }
      }
    }

    // ── Cercles de joueurs ──
    LINES.forEach((role, li) => {
      const n     = struct[role]
      const xs    = lineXs[role]
      const cols  = getCols(n)
      const color = JC[role]
      const cy    = rowY[li]

      // Regrouper les joueurs par colonne logique pour afficher ×N si besoin
      const colGroups = {}
      cols.forEach((logCol, i) => {
        if (!colGroups[logCol]) colGroups[logCol] = { xs: [], indices: [] }
        colGroups[logCol].xs.push(xs[i])
        colGroups[logCol].indices.push(i)
      })

      Object.entries(colGroups).forEach(([logCol, group]) => {
        const cnt = group.xs.length
        if (cnt > 1) {
          // Plusieurs joueurs dans la même colonne logique → afficher au centre avec ×N
          const cx = group.xs.reduce((a,b)=>a+b,0) / cnt
          svg += `<circle cx="${cx}" cy="${cy}" r="20" fill="${color}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`
          svg += `<text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${role}</text>`
          svg += `<text x="${cx}" y="${cy+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${cnt}</text>`
        } else {
          const cx = group.xs[0]
          const slotNum = group.indices[0] + 1
          svg += `<circle cx="${cx}" cy="${cy}" r="20" fill="${color}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`
          svg += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${role}</text>`
          svg += `<text x="${cx}" y="${cy+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${role}${slotNum}</text>`
        }
      })
    })

    svg += '</svg>'
    return svg
  }

  // Cartes de cette même formation (pour vente directe / compteur)
  const sameFormationCards = allFormationCards.filter(c => c.formation === formation)
  const count = sameFormationCards.length
  const canMarket = !card.is_for_sale

  openModal(`Formation ${formation}`,
    `<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${renderGrid()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>

    <!-- Vente directe -->
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:14px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">💰 Vente directe</div>
      <div style="background:#f9f9f9;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--gray-600)">Prix fixe carte Formation</div>
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${FORMATION_DIRECT_SELL_PRICE.toLocaleString('fr')} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${count-1} carte${count-1>1?'s':''}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-form-btn" ${count <= 0 ? 'disabled' : ''}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${canMarket ? `
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price-form" min="1" placeholder="Prix en crédits" value="${FORMATION_DIRECT_SELL_PRICE}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-form-btn">Mettre en vente</button>
      </div>
    </div>` : ''}
    ${card.is_for_sale ? `
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(card.sale_price||0).toLocaleString('fr')} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-form-btn">Retirer</button>
    </div>` : ''}`,
    `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`
  )

  // Vente directe
  document.getElementById('direct-sell-form-btn')?.addEventListener('click', async () => {
    if (!confirm(`Vendre 1 carte Formation ${formation} pour ${FORMATION_DIRECT_SELL_PRICE.toLocaleString('fr')} crédits ? Cette action est irréversible.`)) return

    const cardToSell = sameFormationCards.find(c => !c.is_for_sale) || sameFormationCards[0]
    if (!cardToSell) { toast('Aucune carte à vendre', 'error'); return }

    const { error } = await supabase.from('cards').delete().eq('id', cardToSell.id)
    if (error) { toast(error.message, 'error'); return }

    await supabase.from('users')
      .update({ credits: (state.profile.credits||0) + FORMATION_DIRECT_SELL_PRICE })
      .eq('id', state.profile.id)

    await refreshProfile()
    toast(`+${FORMATION_DIRECT_SELL_PRICE.toLocaleString('fr')} crédits ! Carte vendue.`, 'success')
    closeModal()
    navigate('collection')
  })

  // Marché
  document.getElementById('market-sell-form-btn')?.addEventListener('click', async () => {
    const price = parseInt(document.getElementById('sell-price-form').value)
    if (!price || price < 1) { toast('Prix invalide', 'error'); return }

    await supabase.from('cards').update({ is_for_sale: true, sale_price: price }).eq('id', card.id)
    await supabase.from('market_listings').insert({ seller_id: state.profile.id, card_id: card.id, price })

    toast('Carte mise en vente sur le marché !', 'success')
    closeModal()
    navigate('collection')
  })

  // Retirer du marché
  document.getElementById('cancel-sell-form-btn')?.addEventListener('click', async () => {
    await supabase.from('cards').update({ is_for_sale: false, sale_price: null }).eq('id', card.id)
    await supabase.from('market_listings').update({ status:'cancelled' }).eq('card_id', card.id).eq('status','active')
    toast('Annonce retirée', 'success')
    closeModal()
    navigate('collection')
  })
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
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${jobColor}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${jobColor}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${note1}</text>
            </svg>
            ${note2 !== null ? `
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${job2Color}" stroke="white" stroke-width="1.5"/>
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
