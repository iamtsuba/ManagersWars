/**
 * Manager Wars — Logique de jeu (GDD §7 & §8)
 * Grille 3 colonnes × 4 lignes. Liens H (même ligne, cols adjacentes) et V (même col, lignes adjacentes)
 */

export const GC_DEFS = {
  'Ressusciter':    { icon:'💫', desc:'Réactive un joueur grisé pour ce match.' },
  'Double attaque': { icon:'⚡', desc:'La note d\'attaque compte double.' },
  'Bouclier':       { icon:'🛡️', desc:'Annule le prochain but adverse.' },
  'Vol de note':    { icon:'🎯', desc:'-1 à la note d\'un joueur adverse.' },
  'Gel':            { icon:'❄️', desc:'Bloque le meilleur attaquant IA.' },
  'Remplacement+':  { icon:'🔄', desc:'+1 remplacement pour ce match.' },
}

// ── Placement en grille selon le nombre de joueurs ────────
// 1 → [1], 2 → [0,2], 3 → [0,1,2], 4 → [0,1,1,2], 5 → [0,1,1,1,2]
export function getColsForCount(n) {
  if (n === 1) return [1]
  if (n === 2) return [0, 2]
  if (n === 3) return [0, 1, 2]
  if (n === 4) return [0, 1, 1, 2]
  if (n === 5) return [0, 1, 1, 1, 2]
  return [1]
}

// Affecter une colonne à chaque joueur d'une ligne
export function assignCols(players, role, allLines) {
  const n = players.length
  const cols = getColsForCount(n)
  return players.map((p, i) => ({ ...p, _line: role, _col: cols[i] }))
}

// ── Note d'un joueur selon le rôle ────────────────────────
export function getNoteForRole(player, role) {
  if (!player) return 0
  switch (role) {
    case 'GK':  return Number(player.note_g) || 0
    case 'DEF': return Number(player.note_d) || 0
    case 'MIL': return Number(player.note_m) || 0
    case 'ATT': return Number(player.note_a) || 0
    default:    return 0
  }
}

// ── Calcul des liens (GDD §7) ─────────────────────────────
// Liens H : même ligne, cols adjacentes (|col1-col2| == 1)
// Liens V : même col,  lignes adjacentes (lignes consécutives dans la grille)
const LINE_ORDER = ['ATT','MIL','DEF','GK']

export function calcLinks(selected) {
  let bonus = 0
  const n = selected.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = selected[i]
      const b = selected[j]
      if (!a || !b) continue

      const sameCol  = a._col !== undefined && b._col !== undefined && a._col === b._col
      const adjCols  = a._col !== undefined && b._col !== undefined && Math.abs(a._col - b._col) === 1
      const lineIdxA = LINE_ORDER.indexOf(a._line)
      const lineIdxB = LINE_ORDER.indexOf(b._line)
      const adjLines = Math.abs(lineIdxA - lineIdxB) === 1
      const sameLine = a._line === b._line

      // Lien valide si : même ligne + cols adjacentes, OU même col + lignes adjacentes
      const linked = (sameLine && adjCols) || (sameCol && adjLines)
      if (!linked) continue

      // +1 par lien pays, +1 par lien club
      if (a.country_code && b.country_code && a.country_code === b.country_code) bonus++
      if (a.club_id && b.club_id && a.club_id === b.club_id) bonus++
    }
  }
  return bonus
}

// ── Attaque (GDD §5.2) ────────────────────────────────────
export function calcAttack(selected, modifiers = {}) {
  const base  = selected.reduce((s, p) => s + getNoteForRole(p, 'ATT'), 0)
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.doubleAttack) total *= 2
  if (modifiers.stolenNote)   total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

// ── Défense (GDD §5.4) ────────────────────────────────────
// GK → note_g, tout le reste → note_d
export function calcDefense(selected, modifiers = {}) {
  const base = selected.reduce((s, p) => {
    return s + (p._line === 'GK' || p.job === 'GK' ? getNoteForRole(p,'GK') : getNoteForRole(p,'DEF'))
  }, 0)
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.stolenNote) total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

// ── Duel milieu (GDD §4.1) ───────────────────────────────
export function calcMidfieldDuel(midfielders) {
  const base  = midfielders.reduce((s, p) => s + getNoteForRole(p, 'MIL'), 0)
  const links = calcLinks(midfielders)
  return base + links
}

// ── Résolution (GDD §5.7) ────────────────────────────────
export function resolveDuel(atk, def, modifiers = {}) {
  if (modifiers.shield) return { goal: false, shielded: true }
  return { goal: atk > def, shielded: false }
}

// ── IA ────────────────────────────────────────────────────
export function aiSelectPlayers(availablePlayers, mode, difficulty = 'easy') {
  const usable = availablePlayers.filter(p => !p.used)
  if (!usable.length) return []

  const sorted = [...usable].sort((a, b) => {
    const nA = mode === 'attack' ? getNoteForRole(a,'ATT') : (a._line==='GK' ? getNoteForRole(a,'GK') : getNoteForRole(a,'DEF'))
    const nB = mode === 'attack' ? getNoteForRole(b,'ATT') : (b._line==='GK' ? getNoteForRole(b,'GK') : getNoteForRole(b,'DEF'))
    return nB - nA
  })

  let count = difficulty === 'easy'   ? 1 + Math.floor(Math.random() * 2)
            : difficulty === 'medium' ? 2 + Math.floor(Math.random() * 2)
            : 3
  return sorted.slice(0, Math.min(count, sorted.length, 3))
}

// ── Récompenses (GDD §6.1) ───────────────────────────────
export function getRewards(mode, result) {
  const table = {
    vs_ai_easy:   { victoire:500,  nul:250,  defaite:50 },
    vs_ai_medium: { victoire:1000, nul:500,  defaite:50 },
    vs_ai_hard:   { victoire:1500, nul:750,  defaite:100 },
    vs_ai_club:   { victoire:2500, nul:1250, defaite:100 },
  }
  return (table[mode] || table.vs_ai_easy)[result] || 0
}
