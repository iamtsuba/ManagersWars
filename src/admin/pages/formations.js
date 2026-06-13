import { supabase } from '../../lib/supabase.js'
import {
  FORMATION_LINKS,
  FORMATION_POSITIONS,
  getCandidateLinks,
} from '../../match/formation-links.js'

const JC = { GK:'#111', DEF:'#bb2020', MIL:'#D4A017', ATT:'#1A6B3C' }

export async function pageFormations(container, { toast }) {
  const formations = Object.keys(FORMATION_LINKS)
  let currentFormation = formations[0]

  // Charger les overrides existants depuis Supabase
  const { data: overridesRows } = await supabase
    .from('formation_links_overrides')
    .select('formation, links')

  const overrides = {}
  ;(overridesRows || []).forEach(row => { overrides[row.formation] = row.links })

  // État courant des liens actifs pour la formation sélectionnée
  // (clé "POSA-POSB" triée alphabétiquement -> bool)
  let activeSet = new Set()

  function keyFor(a, b) {
    return [a, b].sort().join('-')
  }

  function loadActiveSet(formation) {
    const active = overrides[formation] || FORMATION_LINKS[formation] || []
    activeSet = new Set(active.map(([a, b]) => keyFor(a, b)))
  }

  loadActiveSet(currentFormation)

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:10px">
        <label style="font-weight:700;font-size:13px">Formation :</label>
        <select id="formation-select" style="padding:6px 10px;font-size:14px;border-radius:8px;border:1.5px solid #ccc">
          ${formations.map(f => `<option value="${f}" ${f===currentFormation?'selected':''}>${f}</option>`).join('')}
        </select>
        <button class="btn btn-ghost btn-sm" id="reset-btn">↺ Réinitialiser (défaut)</button>
      </div>
      <button class="btn btn-primary" id="save-btn">💾 Enregistrer les liens</button>
    </div>

    <div class="card-panel" style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
      <div style="flex-shrink:0">
        <div id="field-wrap" style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px"></div>
        <div style="margin-top:10px;font-size:12px;color:var(--gray-600);line-height:1.6">
          <div><span style="display:inline-block;width:18px;height:3px;background:#3b82f6;vertical-align:middle;margin-right:6px"></span> Lien actif (cliquer pour désactiver)</div>
          <div><span style="display:inline-block;width:18px;height:3px;background:#999;vertical-align:middle;margin-right:6px;opacity:0.5"></span> Lien inactif (cliquer pour activer)</div>
        </div>
      </div>
      <div style="flex:1;min-width:240px">
        <div style="font-weight:700;font-size:13px;margin-bottom:8px">Liens (${activeSet.size}/${'?'} actifs)</div>
        <div id="links-list" style="display:flex;flex-direction:column;gap:4px;max-height:520px;overflow-y:auto"></div>
      </div>
    </div>
  `

  function render() {
    const FPOS = FORMATION_POSITIONS[currentFormation] || {}
    const candidates = getCandidateLinks(currentFormation)
    const W = 320, H = 400, R = 22

    function px(pos) {
      const p = FPOS[pos]
      if (!p) return null
      return { x: p.x * W, y: p.y * H }
    }

    let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`

    // Liens (cliquables)
    candidates.forEach(([a, b], i) => {
      const pa = px(a), pb = px(b)
      if (!pa || !pb) return
      const k = keyFor(a, b)
      const active = activeSet.has(k)
      const color = active ? '#3b82f6' : '#999'
      const opacity = active ? 0.95 : 0.35
      const width = active ? 4 : 3
      // Zone cliquable invisible plus large + ligne visible
      svg += `<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}"
        stroke="transparent" stroke-width="14" class="link-hit" data-key="${k}" style="cursor:pointer"/>`
      svg += `<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}"
        stroke="${color}" stroke-width="${width}" stroke-dasharray="${active?'none':'4,3'}"
        opacity="${opacity}" pointer-events="none" data-line-key="${k}"/>`
    })

    // Postes
    for (const pos of Object.keys(FPOS)) {
      const c = px(pos)
      if (!c) continue
      const role = pos.replace(/\d+/, '')
      const color = JC[role] || '#555'
      svg += `<circle cx="${c.x}" cy="${c.y}" r="${R}" fill="${color}" stroke="rgba(255,255,255,0.7)" stroke-width="2" pointer-events="none"/>`
      svg += `<text x="${c.x}" y="${c.y+4}" text-anchor="middle" font-size="10" font-weight="900" fill="white" font-family="Arial Black,Arial" pointer-events="none">${pos}</text>`
    }

    svg += '</svg>'
    document.getElementById('field-wrap').innerHTML = svg

    // Liste textuelle des liens
    const listEl = document.getElementById('links-list')
    listEl.innerHTML = candidates.map(([a, b]) => {
      const k = keyFor(a, b)
      const active = activeSet.has(k)
      return `
        <button class="link-toggle" data-key="${k}" style="
          display:flex;justify-content:space-between;align-items:center;
          padding:6px 10px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;
          border:1.5px solid ${active?'#3b82f6':'#ddd'};
          background:${active?'#eaf2ff':'#fafafa'};
          color:${active?'#1d4ed8':'#888'}">
          <span>${a} ↔ ${b}</span>
          <span>${active?'● Actif':'○ Inactif'}</span>
        </button>`
    }).join('')

    // Compteur
    const counterEl = container.querySelector('div[style*="font-weight:700;font-size:13px;margin-bottom:8px"]')
    if (counterEl) counterEl.textContent = `Liens (${activeSet.size}/${candidates.length} actifs)`

    // Listeners toggle (SVG + liste)
    function toggle(k) {
      if (activeSet.has(k)) activeSet.delete(k)
      else activeSet.add(k)
      render()
    }
    container.querySelectorAll('.link-hit').forEach(el => {
      el.addEventListener('click', () => toggle(el.dataset.key))
    })
    container.querySelectorAll('.link-toggle').forEach(el => {
      el.addEventListener('click', () => toggle(el.dataset.key))
    })
  }

  render()

  // ── Changement de formation ──
  document.getElementById('formation-select').addEventListener('change', e => {
    currentFormation = e.target.value
    loadActiveSet(currentFormation)
    render()
  })

  // ── Réinitialiser aux valeurs par défaut (FORMATION_LINKS d'origine) ──
  document.getElementById('reset-btn').addEventListener('click', () => {
    const def = FORMATION_LINKS[currentFormation] || []
    activeSet = new Set(def.map(([a, b]) => keyFor(a, b)))
    render()
    toast('Liens réinitialisés aux valeurs par défaut (non sauvegardé)', 'info')
  })

  // ── Sauvegarde ──
  document.getElementById('save-btn').addEventListener('click', async () => {
    const candidates = getCandidateLinks(currentFormation)
    const links = candidates.filter(([a, b]) => activeSet.has(keyFor(a, b)))

    const { error } = await supabase
      .from('formation_links_overrides')
      .upsert({ formation: currentFormation, links, updated_at: new Date().toISOString() })

    if (error) { toast(error.message, 'error'); return }

    overrides[currentFormation] = links
    toast(`Liens enregistrés pour ${currentFormation} (${links.length} actifs)`, 'success')
  })
}
