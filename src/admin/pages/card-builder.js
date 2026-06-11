import { supabase, getPortraitUrl, getClubLogoUrl } from '../../lib/supabase.js'
import { renderCardHTML, encodeVowels, JOB_COLORS, RARITY_BORDERS } from '../../components/card.js'

const SKINS     = ['blanc','metisse','typ','noir']
const HAIRS     = ['blond','marron','noir','chauve']
const LENGTHS   = ['rase','court','milong','long']
const RARITIES  = ['normal','pepite','papyte','legende']
const JOBS      = ['GK','DEF','MIL','ATT']
const COUNTRIES = [
  ['MA','Maroc'],['FR','France'],['AR','Argentine'],['PT','Portugal'],['BR','Brésil'],
  ['ES','Espagne'],['DE','Allemagne'],['GB','Angleterre'],['IT','Italie'],
  ['CM','Cameroun'],['SN','Sénégal'],['NG','Nigéria'],['DK','Danemark'],
  ['NL','Pays-Bas'],['BE','Belgique'],['CI',"Côte d'Ivoire"],['AL','Albanie'],
  ['HR','Croatie'],['RS','Serbie'],['TR','Turquie'],['MW','Malawi'],
]

export async function pageCardBuilder(container, { toast }) {
  // Charger les clubs pour le sélecteur
  const { data: clubs } = await supabase.from('clubs').select('id,encoded_name,logo_url').order('encoded_name')

  container.innerHTML = buildUI(clubs || [])
  attachEvents(container, clubs || [], toast)
  updatePreview()
}

// ── Encodage voyelles GDD §4.5 ──────────────────────────
function encodeVowelsUI() {
  const raw = document.getElementById('cb-surname-real')?.value || ''
  const encoded = encodeVowels(raw)
  const el = document.getElementById('cb-surname-enc')
  if (el) { el.value = encoded }
}

// ── Mise à jour de la preview carte ─────────────────────
function updatePreview() {
  const get = id => document.getElementById(id)?.value || ''
  const player = {
    firstname:       get('cb-firstname'),
    surname_encoded: get('cb-surname-enc') || encodeVowels(get('cb-surname-real')),
    country_code:    get('cb-country'),
    club_encoded_name: document.getElementById('cb-club')?.selectedOptions[0]?.text || '',
    job:             get('cb-job'),
    job2:            get('cb-job2') || null,
    note_g:          parseInt(get('cb-note-g')) || 0,
    note_d:          parseInt(get('cb-note-d')) || 0,
    note_m:          parseInt(get('cb-note-m')) || 0,
    note_a:          parseInt(get('cb-note-a')) || 0,
    rarity:          get('cb-rarity'),
    skin:            get('cb-skin'),
    hair:            get('cb-hair'),
    hair_length:     get('cb-hair-length'),
  }

  // Portrait depuis Supabase Storage
  const portraitUrl = getPortraitUrl(player.skin, player.hair, player.hair_length)

  // Logo club depuis la sélection
  const clubId = get('cb-club')
  const clubSel = document.getElementById('cb-club')
  const logoUrl = clubSel?.selectedOptions[0]?.dataset?.logo || null

  const html = renderCardHTML(player, { portraitUrl, clubLogoUrl: logoUrl, showNotes: true })
  const preview = document.getElementById('card-preview')
  if (preview) preview.innerHTML = html

  // Résumé encodage
  const realName  = get('cb-surname-real')
  const encName   = player.surname_encoded
  const sumEl = document.getElementById('encode-summary')
  if (sumEl && realName) {
    sumEl.textContent = `${get('cb-firstname')} ${realName} → ${get('cb-firstname')} ${encName}`
  }
}

// ── Événements ───────────────────────────────────────────
function attachEvents(container, clubs, toast) {
  // Tous les inputs déclenchent la preview
  container.querySelectorAll('input,select').forEach(el => {
    el.addEventListener('input', updatePreview)
    el.addEventListener('change', updatePreview)
  })

  // Encodage auto du nom
  document.getElementById('cb-surname-real')?.addEventListener('input', () => {
    encodeVowelsUI(); updatePreview()
  })
  document.getElementById('btn-encode')?.addEventListener('click', () => {
    encodeVowelsUI(); updatePreview()
  })

  // Bouton Enregistrer joueur
  document.getElementById('btn-save-player')?.addEventListener('click', async () => {
    await savePlayer(clubs, toast)
  })

  // Bouton Réinitialiser
  document.getElementById('btn-reset')?.addEventListener('click', () => {
    container.querySelectorAll('input').forEach(el => el.value = '')
    container.querySelectorAll('select').forEach(el => el.selectedIndex = 0)
    updatePreview()
  })
}

// ── Sauvegarde en BDD ─────────────────────────────────────
async function savePlayer(clubs, toast) {
  const get = id => document.getElementById(id)?.value || ''
  const realName = get('cb-surname-real').trim()
  const encName  = get('cb-surname-enc').trim() || encodeVowels(realName)

  if (!get('cb-firstname') || !realName || !get('cb-country') || !get('cb-job')) {
    toast('Remplissez les champs obligatoires (prénom, nom, pays, poste)', 'error')
    return
  }

  const clubId = get('cb-club') || null

  const payload = {
    firstname:        get('cb-firstname').trim(),
    surname_real:     realName,
    surname_encoded:  encName,
    country_code:     get('cb-country'),
    club_id:          clubId || null,
    job:              get('cb-job'),
    job2:             get('cb-job2') || null,
    note_g:           parseInt(get('cb-note-g')) || 0,
    note_d:           parseInt(get('cb-note-d')) || 0,
    note_m:           parseInt(get('cb-note-m')) || 0,
    note_a:           parseInt(get('cb-note-a')) || 0,
    rarity:           get('cb-rarity') || 'normal',
    note_min:         parseInt(get('cb-note-min')) || null,
    note_max:         parseInt(get('cb-note-max')) || null,
    skin:             get('cb-skin') || 'blanc',
    hair:             get('cb-hair') || 'noir',
    hair_length:      get('cb-hair-length') || 'court',
    sell_price:       parseInt(get('cb-price')) || 0,
  }

  const { error } = await supabase.from('players').insert(payload)
  if (error) { toast('Erreur: ' + error.message, 'error'); return }
  toast(`✅ Joueur "${payload.firstname} ${payload.surname_encoded}" enregistré !`, 'success')
}

// ── Rendu UI ─────────────────────────────────────────────
function buildUI(clubs) {
  const ctyOptions = COUNTRIES.map(([code, name]) =>
    `<option value="${code}">${name} (${code})</option>`).join('')

  const clubOptions = `<option value="">— Sélectionner un club —</option>` +
    clubs.map(c => `<option value="${c.id}" data-logo="${c.logo_url||''}">${c.encoded_name}</option>`).join('')

  const jobOptions    = JOBS.map(j => `<option value="${j}">${j}</option>`).join('')
  const job2Options   = `<option value="">Aucun</option>` + JOBS.map(j => `<option value="${j}">${j}</option>`).join('')
  const rarityOptions = RARITIES.map(r => `<option value="${r}">${r.charAt(0).toUpperCase()+r.slice(1)}</option>`).join('')
  const skinOptions   = SKINS.map(s => `<option value="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')
  const hairOptions   = HAIRS.map(h => `<option value="${h}">${h.charAt(0).toUpperCase()+h.slice(1)}</option>`).join('')
  const lenOptions    = LENGTHS.map(l => `<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join('')

  return `
  <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start">

    <!-- ── Formulaire gauche ── -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <!-- Identité -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">👤 Identité du joueur</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label>Prénom *</label><input id="cb-firstname" placeholder="Osame"></div>
          <div>
            <label>Nom réel * <span style="font-weight:400;color:#999">(non affiché en jeu)</span></label>
            <div style="display:flex;gap:6px">
              <input id="cb-surname-real" placeholder="Sahraoui" style="flex:1">
              <button class="btn btn-ghost btn-sm" id="btn-encode" title="Encoder les voyelles">↻</button>
            </div>
          </div>
          <div>
            <label>Nom encodé * <span style="font-weight:400;color:#999">(GDD §4.5 — voyelles +1)</span></label>
            <input id="cb-surname-enc" placeholder="Sehreuao">
          </div>
          <div id="encode-summary-wrap" style="display:flex;align-items:flex-end">
            <div id="encode-summary" style="font-size:11px;color:var(--gray-600);padding-bottom:8px;font-style:italic"></div>
          </div>
          <div><label>Pays *</label><select id="cb-country">${ctyOptions}</select></div>
          <div><label>Club</label><select id="cb-club">${clubOptions}</select></div>
        </div>
      </div>

      <!-- Poste & Notes -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">⭐ Poste & Notes</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label>Poste principal *</label><select id="cb-job">${jobOptions}</select></div>
          <div><label>Poste secondaire</label><select id="cb-job2">${job2Options}</select></div>
          <div><label>Note GK (0-10)</label><input id="cb-note-g" type="number" min="0" max="10" value="0"></div>
          <div><label>Note DEF (0-10)</label><input id="cb-note-d" type="number" min="0" max="10" value="0"></div>
          <div><label>Note MIL (0-10)</label><input id="cb-note-m" type="number" min="0" max="10" value="0"></div>
          <div><label>Note ATT (0-10)</label><input id="cb-note-a" type="number" min="0" max="10" value="0"></div>
        </div>
        <div style="font-size:11px;color:var(--gray-600);margin-top:8px">
          La note principale affichée est celle du poste principal. Ex: poste ATT → note_a est mise en avant.
        </div>
      </div>

      <!-- Rareté -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">💎 Rareté (GDD §4.4)</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div><label>Rareté</label><select id="cb-rarity">${rarityOptions}</select></div>
          <div><label>Note min (Pépite/Papyte)</label><input id="cb-note-min" type="number" min="0" max="10" placeholder="—"></div>
          <div><label>Note max (Pépite seulement)</label><input id="cb-note-max" type="number" min="0" max="10" placeholder="—"></div>
        </div>
        <div style="margin-top:8px;display:flex;gap:8px">
          ${['normal','pepite','papyte','legende'].map(r => `
            <div style="background:${RARITY_BORDERS[r]};color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700">
              ${r.toUpperCase()}
            </div>`).join('')}
        </div>
      </div>

      <!-- Portrait -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:4px">🎨 Portrait joueur</h3>
        <p style="font-size:12px;color:var(--gray-600);margin-bottom:12px">
          Sélectionne les paramètres → l'image est chargée depuis Supabase Storage<br>
          Convention: <code style="background:#f0f0f0;padding:1px 4px;border-radius:3px">{peau}-{cheveux}-{longueur}.jpg</code>
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div><label>Peau</label><select id="cb-skin">${skinOptions}</select></div>
          <div><label>Cheveux</label><select id="cb-hair">${hairOptions}</select></div>
          <div><label>Longueur</label><select id="cb-hair-length">${lenOptions}</select></div>
        </div>
        <div style="font-size:11px;color:var(--gray-600);margin-top:6px">
          📂 Uploader les images dans Supabase Storage > <code>assets/tetes/</code>
        </div>
      </div>

      <!-- Prix & Actions -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">💰 Prix & Enregistrement</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
          <div><label>Prix de vente directe (crédits)</label><input id="cb-price" type="number" min="0" value="30000"></div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" id="btn-save-player">💾 Enregistrer en BDD</button>
          <button class="btn btn-ghost" id="btn-reset">↺ Réinitialiser</button>
        </div>
      </div>
    </div>

    <!-- ── Preview droite ── -->
    <div style="position:sticky;top:16px">
      <div class="card-panel" style="text-align:center">
        <h3 style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--gray-600)">APERÇU EN TEMPS RÉEL</h3>
        <div id="card-preview" style="display:inline-block"></div>
        <div style="margin-top:12px;font-size:11px;color:var(--gray-600)">
          La carte se met à jour automatiquement<br>selon tes saisies.
        </div>
      </div>
    </div>
  </div>
  `
}
