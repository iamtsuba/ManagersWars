/**
 * Manager Wars — Logique de jeu pure (GDD §7 & §8)
 * Calculs de liens, notes d'attaque/défense, duel milieu, résolution
 */

// ── Game Changers (GDD §4.1) ──────────────────────────────
export const GC_DEFS = {
  'Ressusciter':    { icon:'💫', desc:'Réactive un joueur grisé pour ce match.' },
  'Double attaque': { icon:'⚡', desc:'La note d\'attaque compte double.' },
  'Bouclier':       { icon:'🛡️', desc:'Annule le prochain but adverse.' },
  'Vol de note':    { icon:'🎯', desc:'-1 à la note d\'un joueur adverse.' },
  'Gel':            { icon:'❄️', desc:'Bloque 1 joueur adverse ce match.' },
  'Remplacement+':  { icon:'🔄', desc:'+1 remplacement pour ce match.' },
}

// ── Notes par poste ───────────────────────────────────────
export function getNoteForRole(player, role) {
  if (!player) return 0
  switch (role) {
    case 'GK':  return player.note_g || 0
    case 'DEF': return player.note_d || 0
    case 'MIL': return player.note_m || 0
    case 'ATT': return player.note_a || 0
    default:    return 0
  }
}

/**
 * Calcul du bonus de liens (GDD §7)
 * Les liens ne s'appliquent qu'entre joueurs ADJACENTS et sélectionnés.
 * +1 par lien Pays partagé, +1 par lien Club partagé entre paires adjacentes.
 * @param {Array} selected - liste ordonnée des joueurs sélectionnés (adjacents)
 * @returns {number} bonus total
 */
export function calcLinks(selected) {
  let bonus = 0
  for (let i = 0; i < selected.length - 1; i++) {
    const a = selected[i]
    const b = selected[i + 1]
    if (!a || !b) continue
    // Lien pays
    if (a.country_code && b.country_code && a.country_code === b.country_code) bonus += 1
    // Lien club
    if (a.club_id && b.club_id && a.club_id === b.club_id) bonus += 1
  }
  return bonus
}

/**
 * Calcul de la note d'attaque (GDD §5.2)
 * Somme des notes ATT + bonus liens
 */
export function calcAttack(selected, modifiers = {}) {
  let base = selected.reduce((sum, p) => sum + getNoteForRole(p, 'ATT'), 0)
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.doubleAttack) total *= 2
  if (modifiers.stolenNote) total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

/**
 * Calcul de la note de défense (GDD §5.4)
 * Somme des notes DEF + bonus liens
 */
export function calcDefense(selected, modifiers = {}) {
  let base = selected.reduce((sum, p) => sum + getNoteForRole(p, 'DEF'), 0)
  const links = calcLinks(selected)
  let total = base + links
  if (modifiers.stolenNote) total -= modifiers.stolenNote
  return { base, links, total: Math.max(0, total) }
}

/**
 * Duel du milieu de terrain (GDD §4.1)
 * Somme notes MIL des joueurs sur postes milieux + liens
 */
export function calcMidfieldDuel(midfielders) {
  const base = midfielders.reduce((sum, p) => sum + getNoteForRole(p, 'MIL'), 0)
  const links = calcLinks(midfielders)
  return base + links
}

/**
 * Résolution du duel (GDD §5.7)
 * Attaque > Défense → But ; sinon arrêté
 */
export function resolveDuel(attackTotal, defenseTotal, modifiers = {}) {
  if (modifiers.shield) {
    return { goal: false, shielded: true }
  }
  return { goal: attackTotal > defenseTotal, shielded: false }
}

/**
 * IA simple : choix de joueurs adjacents pour attaque ou défense
 * @param {Array} grid - grille de joueurs (avec used flag)
 * @param {string} mode - 'attack' | 'defense'
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 */
export function aiSelectPlayers(availablePlayers, mode, difficulty = 'easy') {
  const role = mode === 'attack' ? 'ATT' : 'DEF'
  // Filtrer les joueurs disponibles
  const usable = availablePlayers.filter(p => !p.used)
  if (usable.length === 0) return []

  // Trier par note décroissante pour le rôle
  const sorted = [...usable].sort((a, b) => getNoteForRole(b, role) - getNoteForRole(a, role))

  // Difficulté détermine le nombre de joueurs et l'optimalité
  let count
  if (difficulty === 'easy')   count = 1 + Math.floor(Math.random() * 2)  // 1-2
  else if (difficulty === 'medium') count = 2 + Math.floor(Math.random() * 2) // 2-3
  else count = 3 // hard: toujours 3 si possible

  count = Math.min(count, sorted.length, 3)
  return sorted.slice(0, count)
}

/**
 * Récompenses selon mode (GDD §6.1)
 */
export function getRewards(mode, result) {
  const table = {
    vs_ai_easy:   { victoire:500,  nul:250,  defaite:50 },
    vs_ai_medium: { victoire:1000, nul:500,  defaite:50 },
    vs_ai_hard:   { victoire:1500, nul:750,  defaite:100 },
    vs_ai_club:   { victoire:2500, nul:1250, defaite:100 },
  }
  return (table[mode] || table.vs_ai_easy)[result] || 0
}
