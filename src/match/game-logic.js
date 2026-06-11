/**
 * Manager Wars — Logique de jeu pure (GDD §7 & §8)
 */

export const GC_DEFS = {
  'Ressusciter':    { icon:'💫', desc:'Réactive un joueur grisé pour ce match.' },
  'Double attaque': { icon:'⚡', desc:'La note d\'attaque compte double.' },
  'Bouclier':       { icon:'🛡️', desc:'Annule le prochain but adverse.' },
  'Vol de note':    { icon:'🎯', desc:'-1 à la note d\'un joueur adverse.' },
  'Gel':            { icon:'❄️', desc:'Bloque 1 joueur adverse ce match.' },
  'Remplacement+':  { icon:'🔄', desc:'+1 remplacement pour ce match.' },
}

// ── Note d'un joueur pour un rôle donné ───────────────────
// Si le joueur joue hors de son poste, on utilise quand même sa note pour ce rôle
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

// ── Note principale affichée sur la carte (poste du slot) ─
export function getDisplayNote(player, slotRole) {
  return getNoteForRole(player, slotRole)
}

// ── Bonus de liens (GDD §7) ───────────────────────────────
export function calcLinks(selected) {
  let bonus = 0
  for (let i = 0; i < selected.length - 1; i++) {
    const a = selected[i]
    const b = selected[i + 1]
    if (!a || !b) continue
    if (a.country_code && b.country_code && a.country_code === b.country_code) bonus += 1
    if (a.club_id && b.club_id && a.club_id === b.club_id) bonus += 1
  }
  return bonus
}

// ── Note d'attaque (GDD §5.2) ─────────────────────────────
// Toujours basé sur note_a, peu importe le poste du joueur
export function calcAttack(selected, modifiers = {}) {
  let base = selected.reduce((sum, p) => sum + getNoteForRole(p, 'ATT'), 0)
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.doubleAttack) total *= 2
  if (modifiers.stolenNote) total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

// ── Note de défense (GDD §5.4) ────────────────────────────
// GK → note_g, DEF → note_d, MIL/ATT utilisés en défense → note_d
// Si aucun défenseur disponible → 0 (GDD Petit 4)
export function calcDefense(selected, modifiers = {}) {
  let base = 0
  for (const p of selected) {
    // GK utilise note_g, tout le reste utilise note_d
    if (p._line === 'GK' || p.job === 'GK') {
      base += getNoteForRole(p, 'GK')
    } else {
      base += getNoteForRole(p, 'DEF')
    }
  }
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.stolenNote) total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

// ── Duel du milieu (GDD §4.1) ─────────────────────────────
export function calcMidfieldDuel(midfielders) {
  const base = midfielders.reduce((sum, p) => sum + getNoteForRole(p, 'MIL'), 0)
  const links = calcLinks(midfielders)
  return base + links
}

// ── Résolution du duel (GDD §5.7) ────────────────────────
export function resolveDuel(attackTotal, defenseTotal, modifiers = {}) {
  if (modifiers.shield) return { goal: false, shielded: true }
  return { goal: attackTotal > defenseTotal, shielded: false }
}

// ── IA : sélection de joueurs ─────────────────────────────
export function aiSelectPlayers(availablePlayers, mode, difficulty = 'easy') {
  const usable = availablePlayers.filter(p => !p.used)
  if (usable.length === 0) return []

  // Trier selon le bon critère
  const sorted = [...usable].sort((a, b) => {
    const noteA = mode === 'attack' ? getNoteForRole(a, 'ATT') : (a._line === 'GK' ? getNoteForRole(a,'GK') : getNoteForRole(a,'DEF'))
    const noteB = mode === 'attack' ? getNoteForRole(b, 'ATT') : (b._line === 'GK' ? getNoteForRole(b,'GK') : getNoteForRole(b,'DEF'))
    return noteB - noteA
  })

  let count = difficulty === 'easy' ? 1 + Math.floor(Math.random() * 2)
            : difficulty === 'medium' ? 2 + Math.floor(Math.random() * 2)
            : 3
  count = Math.min(count, sorted.length, 3)
  return sorted.slice(0, count)
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
