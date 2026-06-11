import { supabase } from '../../lib/supabase.js'
import { encodeVowels } from '../../components/card.js'

/**
 * Import/Export CSV pour gestion de masse (clubs & joueurs)
 */
export async function pageImportExport(container, { toast }) {
  container.innerHTML = `
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- CLUBS -->
    <div class="card-panel">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:4px">🏟️ Clubs</h3>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:16px">Exporter/importer les clubs en masse via CSV.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" id="export-clubs-template">📄 Template CSV vide</button>
        <button class="btn btn-primary" id="export-clubs">⬇️ Exporter les clubs</button>
        <label class="btn btn-yellow" style="cursor:pointer;margin:0">
          ⬆️ Importer clubs
          <input type="file" id="import-clubs" accept=".csv" style="display:none">
        </label>
      </div>
      <div id="clubs-import-result" style="margin-top:12px;font-size:13px"></div>
    </div>

    <!-- JOUEURS -->
    <div class="card-panel">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:4px">🃏 Joueurs</h3>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:16px">Exporter/importer les joueurs en masse via CSV. L'encodage des noms est automatique si la colonne surname_encoded est vide.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" id="export-players-template">📄 Template CSV vide</button>
        <button class="btn btn-primary" id="export-players">⬇️ Exporter les joueurs</button>
        <label class="btn btn-yellow" style="cursor:pointer;margin:0">
          ⬆️ Importer joueurs
          <input type="file" id="import-players" accept=".csv" style="display:none">
        </label>
      </div>
      <div id="players-import-result" style="margin-top:12px;font-size:13px"></div>
    </div>

    <!-- AIDE -->
    <div class="card-panel" style="background:#f9f9f9">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">📋 Format CSV</h4>
      <div style="font-size:12px;color:var(--gray-600);line-height:1.8">
        <b>Clubs :</b> real_name, encoded_name, country_code, logo_url<br>
        <b>Joueurs :</b> firstname, surname_real, surname_encoded, country_code, club_encoded_name, job, job2, note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price<br><br>
        <b>Valeurs autorisées :</b><br>
        • job/job2 : GK, DEF, MIL, ATT<br>
        • rarity : normal, pepite, papyte, legende<br>
        • skin : blanc, metisse, typ, noir<br>
        • hair : blond, marron, noir, chauve<br>
        • hair_length : rase, court, milong, long<br><br>
        💡 Le séparateur est la virgule. Première ligne = en-têtes. Si surname_encoded est vide, il est calculé automatiquement.
      </div>
    </div>
  </div>
  `

  // ── Templates ──
  document.getElementById('export-clubs-template').addEventListener('click', () => {
    downloadCSV('clubs_template.csv',
      'real_name,encoded_name,country_code,logo_url\n' +
      'Paris Saint-Germain,PARIS FC,FR,\n' +
      'Real Madrid,MADRID FC,ES,\n')
  })

  document.getElementById('export-players-template').addEventListener('click', () => {
    downloadCSV('players_template.csv',
      'firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price\n' +
      'Kylian,Mbappe,,FR,PARIS FC,ATT,,0,0,2,9,legende,,,blanc,noir,court,50000\n' +
      'Achraf,Hakimi,,MA,PARIS FC,DEF,MIL,0,7,5,3,pepite,5,9,metisse,noir,court,20000\n')
  })

  // ── Export clubs ──
  document.getElementById('export-clubs').addEventListener('click', async () => {
    const { data: clubs, error } = await supabase.from('clubs').select('real_name,encoded_name,country_code,logo_url').order('encoded_name')
    if (error) { toast(error.message, 'error'); return }
    if (!clubs || clubs.length === 0) { toast('Aucun club à exporter', 'info'); return }

    let csv = 'real_name,encoded_name,country_code,logo_url\n'
    clubs.forEach(c => {
      csv += [c.real_name, c.encoded_name, c.country_code, c.logo_url || ''].map(csvEscape).join(',') + '\n'
    })
    downloadCSV('clubs_export.csv', csv)
    toast(`${clubs.length} clubs exportés`, 'success')
  })

  // ── Export joueurs ──
  document.getElementById('export-players').addEventListener('click', async () => {
    const { data: players, error } = await supabase
      .from('players')
      .select('firstname,surname_real,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name)')
      .order('surname_encoded')
    if (error) { toast(error.message, 'error'); return }
    if (!players || players.length === 0) { toast('Aucun joueur à exporter', 'info'); return }

    let csv = 'firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price\n'
    players.forEach(p => {
      csv += [
        p.firstname, p.surname_real, p.surname_encoded, p.country_code,
        p.clubs?.encoded_name || '', p.job, p.job2 || '',
        p.note_g, p.note_d, p.note_m, p.note_a, p.rarity,
        p.note_min ?? '', p.note_max ?? '', p.skin, p.hair, p.hair_length, p.sell_price
      ].map(csvEscape).join(',') + '\n'
    })
    downloadCSV('players_export.csv', csv)
    toast(`${players.length} joueurs exportés`, 'success')
  })

  // ── Import clubs ──
  document.getElementById('import-clubs').addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const resultEl = document.getElementById('clubs-import-result')
    resultEl.innerHTML = '<span style="color:var(--gray-600)">Import en cours...</span>'

    try {
      const text = await file.text()
      const rows = parseCSV(text)
      if (rows.length === 0) { resultEl.innerHTML = '<span style="color:#c0392b">Fichier vide</span>'; return }

      let success = 0, errors = 0
      const errorMsgs = []

      for (const row of rows) {
        if (!row.real_name || !row.encoded_name || !row.country_code) {
          errors++; errorMsgs.push(`Ligne ignorée (champs manquants): ${row.real_name || '?'}`)
          continue
        }
        const payload = {
          real_name: row.real_name,
          encoded_name: row.encoded_name.toUpperCase(),
          country_code: row.country_code.toUpperCase().slice(0,2),
          logo_url: row.logo_url || null,
        }
        // Upsert sur encoded_name
        const { error } = await supabase.from('clubs').upsert(payload, { onConflict: 'encoded_name' })
        if (error) { errors++; errorMsgs.push(`${row.encoded_name}: ${error.message}`) }
        else success++
      }

      resultEl.innerHTML = `<div style="color:var(--green)">✅ ${success} clubs importés</div>
        ${errors > 0 ? `<div style="color:#c0392b">❌ ${errors} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${errorMsgs.slice(0,10).join('<br>')}</div>` : ''}`
      toast(`${success} clubs importés`, 'success')
    } catch (err) {
      resultEl.innerHTML = `<span style="color:#c0392b">Erreur : ${err.message}</span>`
    }
    e.target.value = ''
  })

  // ── Import joueurs ──
  document.getElementById('import-players').addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const resultEl = document.getElementById('players-import-result')
    resultEl.innerHTML = '<span style="color:var(--gray-600)">Import en cours...</span>'

    try {
      const text = await file.text()
      const rows = parseCSV(text)
      if (rows.length === 0) { resultEl.innerHTML = '<span style="color:#c0392b">Fichier vide</span>'; return }

      // Charger les clubs pour mapper encoded_name → id
      const { data: clubs } = await supabase.from('clubs').select('id,encoded_name')
      const clubMap = {}
      ;(clubs || []).forEach(c => { clubMap[c.encoded_name.toUpperCase()] = c.id })

      let success = 0, errors = 0
      const errorMsgs = []
      const validJobs = ['GK','DEF','MIL','ATT']
      const validRarities = ['normal','pepite','papyte','legende']
      const validSkins = ['blanc','metisse','typ','noir']
      const validHairs = ['blond','marron','noir','chauve']
      const validLengths = ['rase','court','milong','long']

      for (const row of rows) {
        if (!row.firstname || !row.surname_real || !row.country_code || !row.job) {
          errors++; errorMsgs.push(`Ligne ignorée (champs requis manquants): ${row.firstname || '?'}`)
          continue
        }
        if (!validJobs.includes(row.job)) {
          errors++; errorMsgs.push(`${row.firstname}: job invalide "${row.job}"`)
          continue
        }

        const clubId = row.club_encoded_name ? clubMap[row.club_encoded_name.toUpperCase()] || null : null

        const payload = {
          firstname: row.firstname,
          surname_real: row.surname_real,
          surname_encoded: row.surname_encoded || encodeVowels(row.surname_real),
          country_code: row.country_code.toUpperCase().slice(0,2),
          club_id: clubId,
          job: row.job,
          job2: validJobs.includes(row.job2) ? row.job2 : null,
          note_g: parseInt(row.note_g) || 0,
          note_d: parseInt(row.note_d) || 0,
          note_m: parseInt(row.note_m) || 0,
          note_a: parseInt(row.note_a) || 0,
          rarity: validRarities.includes(row.rarity) ? row.rarity : 'normal',
          note_min: row.note_min !== '' && row.note_min != null ? parseInt(row.note_min) : null,
          note_max: row.note_max !== '' && row.note_max != null ? parseInt(row.note_max) : null,
          skin: validSkins.includes(row.skin) ? row.skin : 'blanc',
          hair: validHairs.includes(row.hair) ? row.hair : 'noir',
          hair_length: validLengths.includes(row.hair_length) ? row.hair_length : 'court',
          sell_price: parseInt(row.sell_price) || 0,
        }

        const { error } = await supabase.from('players').insert(payload)
        if (error) { errors++; errorMsgs.push(`${row.firstname} ${row.surname_real}: ${error.message}`) }
        else success++
      }

      resultEl.innerHTML = `<div style="color:var(--green)">✅ ${success} joueurs importés</div>
        ${errors > 0 ? `<div style="color:#c0392b">❌ ${errors} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${errorMsgs.slice(0,10).join('<br>')}</div>` : ''}`
      toast(`${success} joueurs importés`, 'success')
    } catch (err) {
      resultEl.innerHTML = `<span style="color:#c0392b">Erreur : ${err.message}</span>`
    }
    e.target.value = ''
  })
}

// ── Utilitaires CSV ───────────────────────────────────────
function csvEscape(val) {
  const s = String(val ?? '')
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

function downloadCSV(filename, content) {
  const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function parseCSV(text) {
  // Parser CSV simple gérant les guillemets
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(l => l.trim())
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map(h => h.trim())
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const row = {}
    headers.forEach((h, idx) => { row[h] = (values[idx] || '').trim() })
    rows.push(row)
  }
  return rows
}

function parseCSVLine(line) {
  const result = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQuotes) {
      if (c === '"') {
        if (line[i+1] === '"') { cur += '"'; i++ }
        else inQuotes = false
      } else cur += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { result.push(cur); cur = '' }
      else cur += c
    }
  }
  result.push(cur)
  return result
}
