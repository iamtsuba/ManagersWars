/**
 * Manager Wars — Liens explicites par formation (GDD §7)
 * Reproduction copy-exact des 25 schémas FUT17 (fifauteam.com)
 * Chaque lien est une paire [posA, posB] où pos = "ROLE+NUM" ex: "ATT1", "MIL3"
 *
 * Mapping poste FIFA → catégorie :
 *   GK → GK
 *   CB, RB, LB, LWB, RWB → DEF
 *   CDM, CM, LM, RM, CAM → MIL
 *   ST, LW, RW, LF, RF, CF → ATT
 *
 * 25/25 formations.
 */

export const FORMATION_LINKS = {

  // 1. 4-3-3 (3) — LW/ST/RW, CDM/CM/CDM, LB/CB/CB/RB, GK
  '4-3-3 (3)': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT2','MIL2'],['ATT3','MIL3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['MIL1','DEF1'],['MIL1','DEF2'],
    ['MIL3','DEF3'],['MIL3','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 2. 5-3-2 — ST/ST, CM/CM/CM, LWB/CB/CB/CB/RWB, GK
  '5-3-2': [
    ['ATT1','ATT2'],
    ['ATT1','MIL1'],['ATT1','MIL2'],['ATT2','MIL2'],['ATT2','MIL3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['MIL1','DEF1'],['MIL3','DEF5'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],['DEF4','DEF5'],
    ['GK1','DEF2'],['GK1','DEF3'],['GK1','DEF4'],
  ],

  // 3. 4-3-3 (4) — LW/ST/RW, CM/CAM/CM, LB/CB/CB/RB, GK
  '4-3-3 (4)': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT2','MIL2'],['ATT3','MIL3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['ATT1','DEF1'],
    ['MIL1','DEF1'],['MIL1','DEF2'],
    ['MIL3','DEF3'],['MIL3','DEF4'],
    ['ATT3','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 4. 4-3-2-1 — LF/ST/RF, CM/CM/CM, LB/CB/CB/RB, GK
  '4-3-2-1': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL2'],['ATT3','MIL2'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['MIL1','DEF1'],['MIL3','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 5. 4-3-3 (2) — LW/ST/RW, CM/CDM/CM, LB/CB/CB/RB, GK
  '4-3-3 (2)': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT2','MIL1'],['ATT2','MIL3'],['ATT3','MIL3'],
    ['MIL1','MIL3'],
    ['MIL1','DEF1'],['MIL3','DEF4'],
    ['MIL2','DEF2'],['MIL2','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 6. 4-3-3 — LW/ST/RW, CM/CM/CM, LB/CB/CB/RB, GK
  '4-3-3': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT2','MIL2'],['ATT3','MIL3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['MIL1','DEF1'],
    ['MIL2','DEF2'],['MIL2','DEF3'],
    ['MIL3','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 7. 4-3-3 (5) — LW/CF/RW, CM/CDM/CM, LB/CB/CB/RB, GK
  '4-3-3 (5)': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','DEF1'],
    ['ATT2','MIL1'],['ATT2','MIL3'],
    ['ATT3','MIL1'],['ATT3','DEF4'],
    ['MIL1','MIL3'],
    ['MIL1','DEF1'],['MIL3','DEF4'],
    ['MIL2','DEF2'],['MIL2','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 8. 5-2-2-1 — LW/ST/RW, CM/CM, LWB/CB/CB/CB/RWB, GK
  '5-2-2-1': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','DEF1'],
    ['ATT1','MIL1'],['ATT2','MIL1'],['ATT2','MIL2'],
    ['ATT3','MIL2'],['ATT3','DEF5'],
    ['MIL1','MIL2'],
    ['MIL1','DEF1'],['MIL1','DEF3'],
    ['MIL2','DEF3'],['MIL2','DEF5'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],['DEF4','DEF5'],
    ['DEF3','GK1'],
    ['GK1','DEF2'],['GK1','DEF4'],
  ],

  // 9. 4-3-1-2 — ST/ST, CAM/CM/CM/CM, LB/CB/CB/RB, GK
  '4-3-1-2': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL4'],
    ['MIL1','MIL3'],
    ['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL2','DEF1'],
    ['MIL3','DEF2'],['MIL3','DEF3'],
    ['MIL4','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 10. 5-2-1-2 — ST/ST, CAM/CM/CM, LWB/CB/CB/CB/RWB, GK
  '5-2-1-2': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL3'],
    ['MIL1','MIL2'],['MIL1','MIL3'],
    ['MIL2','MIL3'],
    ['MIL2','DEF1'],['MIL2','DEF2'],
    ['MIL3','DEF4'],['MIL3','DEF5'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],['DEF4','DEF5'],
    ['DEF3','GK1'],
    ['GK1','DEF2'],['GK1','DEF4'],
  ],

  // 11. 4-5-1 (2) — ST, LM/CM/CM/CM/RM, LB/CB/CB/RB, GK
  '4-5-1 (2)': [
    ['ATT1','MIL2'],['ATT1','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],['MIL4','MIL5'],
    ['MIL1','DEF1'],
    ['MIL2','DEF1'],['MIL2','DEF2'],
    ['MIL3','DEF2'],['MIL3','DEF3'],
    ['MIL4','DEF3'],['MIL4','DEF4'],
    ['MIL5','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 12. 4-5-1 — ST, LM/CAM/CM/CAM/RM, LB/CB/CB/RB, GK
  '4-5-1': [
    ['ATT1','MIL2'],['ATT1','MIL4'],
    ['MIL1','MIL2'],
    ['MIL2','MIL4'],
    ['MIL4','MIL5'],
    ['MIL2','MIL3'],['MIL4','MIL3'],
    ['MIL1','DEF1'],['MIL5','DEF4'],
    ['MIL3','DEF2'],['MIL3','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 13. 4-4-2 — ST/ST, LM/CM/CM/RM, LB/CB/CB/RB, GK
  '4-4-2': [
    ['ATT1','ATT2'],
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT2','MIL3'],['ATT2','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL2','DEF2'],['MIL3','DEF3'],['MIL4','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 14. 4-4-2 (2) — ST/ST, LM/CDM/CDM/RM, LB/CB/CB/RB, GK
  '4-4-2 (2)': [
    ['ATT1','ATT2'],
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT2','MIL3'],['ATT2','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL2','DEF2'],['MIL3','DEF3'],['MIL4','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 15. 4-4-1-1 — ST/CF, LM/CM/CM/RM, LB/CB/CB/RB, GK
  '4-4-1-1': [
    ['ATT1','ATT2'],
    ['ATT1','MIL2'],['ATT1','MIL3'],
    ['ATT2','MIL2'],['ATT2','MIL3'],
    ['MIL1','MIL2'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL2','DEF2'],['MIL3','DEF3'],['MIL4','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 16. 4-1-2-1-2 — ST/ST, CAM/LM/CDM/RM, LB/CB/CB/RB, GK
  '4-1-2-1-2': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL4'],
    ['MIL1','MIL3'],
    ['MIL2','MIL4'],
    ['MIL2','MIL3'],['MIL4','MIL3'],
    ['MIL2','DEF1'],['MIL4','DEF4'],
    ['MIL3','DEF2'],['MIL3','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 17. 3-4-1-2 — ST/ST, CAM/LM/CM/CM/RM, CB/CB/CB, GK
  '3-4-1-2': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL5'],
    ['MIL1','MIL3'],['MIL1','MIL4'],
    ['MIL2','MIL3'],
    ['MIL3','MIL4'],
    ['MIL4','MIL5'],
    ['MIL2','DEF1'],
    ['MIL5','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    ['DEF2','GK1'],
    ['GK1','DEF1'],['GK1','DEF3'],
  ],

  // 18. 3-4-2-1 — LF/ST/RF, LM/CM/CM/RM, CB/CB/CB, GK
  '3-4-2-1': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT3','MIL3'],['ATT3','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL4','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    ['DEF2','GK1'],
    ['GK1','DEF1'],['GK1','DEF3'],
  ],

  // 19. 3-5-2 — ST/ST, CAM/LM/CDM/CDM/RM, CB/CB/CB, GK
  '3-5-2': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL5'],
    ['MIL1','MIL3'],['MIL1','MIL4'],
    ['MIL2','MIL3'],
    ['MIL3','MIL4'],
    ['MIL4','MIL5'],
    ['MIL2','DEF1'],
    ['MIL5','DEF3'],
    ['MIL3','DEF2'],['MIL4','DEF2'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    ['DEF2','GK1'],
    ['GK1','DEF1'],['GK1','DEF3'],
  ],

  // 20. 4-1-4-1 — ST, LM/CM/CM/RM/CDM, LB/CB/CB/RB, GK
  '4-1-4-1': [
    ['ATT1','MIL2'],['ATT1','MIL3'],
    ['MIL1','MIL2'],['MIL1','MIL3'],
    ['MIL2','MIL4'],
    ['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL2','DEF2'],['MIL3','DEF3'],['MIL4','DEF4'],
    ['MIL2','MIL5'],['MIL3','MIL5'],
    ['MIL5','DEF2'],['MIL5','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 21. 4-2-2-2 — ST/ST, CAM/CDM/CDM/CAM, LB/CB/CB/RB, GK
  '4-2-2-2': [
    ['ATT1','ATT2'],
    ['ATT1','MIL1'],['ATT2','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL4','DEF4'],
    ['MIL2','DEF2'],['MIL3','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 22. 4-2-3-1 — ST, CAM/CAM/CAM/CDM/CDM, LB/CB/CB/RB, GK
  '4-2-3-1': [
    ['ATT1','MIL1'],['ATT1','MIL3'],['ATT1','MIL2'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['MIL1','MIL4'],['MIL3','MIL5'],
    ['MIL4','MIL5'],
    ['MIL4','DEF1'],['MIL4','DEF2'],
    ['MIL5','DEF3'],['MIL5','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 23. 4-2-3-1 (2) — ST, LM/CDM/CAM/CDM/RM, LB/CB/CB/RB, GK
  '4-2-3-1 (2)': [
    ['ATT1','MIL1'],['ATT1','MIL5'],['ATT1','MIL3'],
    ['MIL1','MIL2'],
    ['MIL1','MIL3'],['MIL3','MIL2'],['MIL3','MIL4'],['MIL5','MIL3'],
    ['MIL5','MIL4'],
    ['MIL1','DEF1'],['MIL5','DEF4'],
    ['MIL2','DEF1'],['MIL2','DEF2'],
    ['MIL4','DEF3'],['MIL4','DEF4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

  // 24. 3-4-3 — LF/ST/RF, LM/CM/CM/RM, CB/CB/CB, GK
  '3-4-3': [
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT3','MIL3'],['ATT3','MIL4'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['MIL1','DEF1'],['MIL4','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    ['DEF2','GK1'],
    ['GK1','DEF1'],['GK1','DEF3'],
  ],

  // 25. 4-1-2-1-2 (2) — ST/ST, CAM/CM/CDM/CM, LB/CB/CB/RB, GK
  '4-1-2-1-2 (2)': [
    ['ATT1','MIL1'],['ATT2','MIL1'],
    ['ATT1','MIL2'],['ATT2','MIL4'],
    ['MIL1','MIL3'],
    ['MIL2','MIL4'],
    ['MIL2','MIL3'],['MIL4','MIL3'],
    ['MIL2','DEF1'],['MIL4','DEF4'],
    ['MIL3','DEF2'],['MIL3','DEF3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    ['GK1','DEF2'],['GK1','DEF3'],
  ],

}

// ── Overrides admin (chargés depuis Supabase) ──────────────
// Permet à l'admin d'activer/désactiver chaque lien possible
// pour chaque formation via la page Admin > Formations.
let formationLinksOverrides = {} // { [formation]: [[posA,posB], ...] }

export function setFormationLinksOverrides(overrides) {
  formationLinksOverrides = overrides || {}
}

export function getActiveLinks(formation) {
  return formationLinksOverrides[formation] || FORMATION_LINKS[formation] || []
}

/**
 * Calcule tous les liens actifs pour un terrain donné.
 * @param {Object} slots      { 'ATT1': player, 'MIL2': player, ... }
 * @param {string} formation  ex: '4-3-3 (3)'
 * @returns {Array}           [{ posA, posB, playerA, playerB, color }]
 */
export function computeLinks(slots, formation) {
  const links  = getActiveLinks(formation)
  const result = []

  for (const [posA, posB] of links) {
    const pA = slots[posA]
    const pB = slots[posB]
    const color = linkColor(pA, pB)
    result.push({ posA, posB, playerA: pA, playerB: pB, color })
  }
  return result
}

/**
 * Génère toutes les paires de postes "candidates" pour une formation,
 * c'est-à-dire les paires de postes suffisamment proches pour qu'un
 * lien visuel ait un sens (utilisé par l'éditeur admin), en incluant
 * systématiquement les liens actifs connus (même si plus éloignés).
 */
export function getCandidateLinks(formation, maxDist = 0.4) {
  const pos = FORMATION_POSITIONS[formation] || {}
  const keys = Object.keys(pos)
  const pairSet = new Set()
  const pairs = []

  function addPair(a, b) {
    const key = [a, b].sort().join('-')
    if (pairSet.has(key)) return
    pairSet.add(key)
    pairs.push([a, b])
  }

  // Paires proches géométriquement
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const a = pos[keys[i]], b = pos[keys[j]]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist <= maxDist) addPair(keys[i], keys[j])
    }
  }

  // Toujours inclure les liens actifs connus, même éloignés
  for (const [a, b] of (FORMATION_LINKS[formation] || [])) {
    if (pos[a] && pos[b]) addPair(a, b)
  }

  return pairs
}

/**
 * Couleur d'un lien selon affinité pays/club
 */
export function linkColor(pA, pB) {
  if (!pA || !pB) return '#cc2222'          // rouge : case vide ou aucun lien
  const sc = pA.country_code && pB.country_code && pA.country_code === pB.country_code
  const sk = pA.club_id && pB.club_id && pA.club_id === pB.club_id
  if (sc && sk) return '#00ff88'            // vert flashy : pays + club
  if (sc || sk)  return '#FFD700'           // jaune flashy : pays OU club
  return '#ff3333'                          // rouge : aucun lien
}

/**
 * Positions des slots sur le terrain SVG (coordonnées normalisées 0-1)
 * y=0 = ligne d'attaque (haut), y=1 = gardien (bas)
 */
export const FORMATION_POSITIONS = {

  '4-3-3 (3)': {
    ATT1:{x:0.18,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.82,y:0.05},
    MIL1:{x:0.27,y:0.33}, MIL2:{x:0.50,y:0.30}, MIL3:{x:0.73,y:0.33},
    DEF1:{x:0.10,y:0.62}, DEF2:{x:0.37,y:0.65}, DEF3:{x:0.63,y:0.65}, DEF4:{x:0.90,y:0.62},
    GK1: {x:0.50,y:0.90},
  },

  '5-3-2': {
    ATT1:{x:0.32,y:0.04}, ATT2:{x:0.68,y:0.04},
    MIL1:{x:0.15,y:0.28}, MIL2:{x:0.50,y:0.25}, MIL3:{x:0.85,y:0.28},
    DEF1:{x:0.05,y:0.55}, DEF2:{x:0.27,y:0.62}, DEF3:{x:0.50,y:0.65}, DEF4:{x:0.73,y:0.62}, DEF5:{x:0.95,y:0.55},
    GK1: {x:0.50,y:0.90},
  },

  '4-3-3 (4)': {
    ATT1:{x:0.18,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.82,y:0.05},
    MIL1:{x:0.30,y:0.35}, MIL2:{x:0.50,y:0.35}, MIL3:{x:0.70,y:0.35},
    DEF1:{x:0.08,y:0.65}, DEF2:{x:0.37,y:0.65}, DEF3:{x:0.63,y:0.65}, DEF4:{x:0.92,y:0.65},
    GK1: {x:0.50,y:0.92},
  },

  '4-3-2-1': {
    ATT1:{x:0.30,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.70,y:0.05},
    MIL1:{x:0.27,y:0.35}, MIL2:{x:0.50,y:0.40}, MIL3:{x:0.73,y:0.35},
    DEF1:{x:0.08,y:0.65}, DEF2:{x:0.37,y:0.68}, DEF3:{x:0.63,y:0.68}, DEF4:{x:0.92,y:0.65},
    GK1: {x:0.50,y:0.92},
  },

  '4-3-3 (2)': {
    ATT1:{x:0.18,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.82,y:0.05},
    MIL1:{x:0.30,y:0.35}, MIL2:{x:0.50,y:0.42}, MIL3:{x:0.70,y:0.35},
    DEF1:{x:0.08,y:0.65}, DEF2:{x:0.37,y:0.68}, DEF3:{x:0.63,y:0.68}, DEF4:{x:0.92,y:0.65},
    GK1: {x:0.50,y:0.92},
  },

  '4-3-3': {
    ATT1:{x:0.18,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.82,y:0.05},
    MIL1:{x:0.27,y:0.35}, MIL2:{x:0.50,y:0.40}, MIL3:{x:0.73,y:0.35},
    DEF1:{x:0.08,y:0.65}, DEF2:{x:0.37,y:0.68}, DEF3:{x:0.63,y:0.68}, DEF4:{x:0.92,y:0.65},
    GK1: {x:0.50,y:0.92},
  },

  '4-3-3 (5)': {
    ATT1:{x:0.18,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.82,y:0.05},
    MIL1:{x:0.30,y:0.35}, MIL2:{x:0.50,y:0.42}, MIL3:{x:0.70,y:0.35},
    DEF1:{x:0.08,y:0.65}, DEF2:{x:0.37,y:0.68}, DEF3:{x:0.63,y:0.68}, DEF4:{x:0.92,y:0.65},
    GK1: {x:0.50,y:0.92},
  },

  '5-2-2-1': {
    ATT1:{x:0.15,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.85,y:0.05},
    MIL1:{x:0.37,y:0.32}, MIL2:{x:0.63,y:0.32},
    DEF1:{x:0.03,y:0.45}, DEF2:{x:0.22,y:0.60}, DEF3:{x:0.50,y:0.58}, DEF4:{x:0.78,y:0.60}, DEF5:{x:0.97,y:0.45},
    GK1: {x:0.50,y:0.90},
  },

  '4-3-1-2': {
    ATT1:{x:0.35,y:0.05}, ATT2:{x:0.65,y:0.05},
    MIL1:{x:0.50,y:0.28}, MIL2:{x:0.27,y:0.42}, MIL3:{x:0.50,y:0.48}, MIL4:{x:0.73,y:0.42},
    DEF1:{x:0.08,y:0.72}, DEF2:{x:0.37,y:0.75}, DEF3:{x:0.63,y:0.75}, DEF4:{x:0.92,y:0.72},
    GK1: {x:0.50,y:0.95},
  },

  '5-2-1-2': {
    ATT1:{x:0.35,y:0.05}, ATT2:{x:0.65,y:0.05},
    MIL1:{x:0.50,y:0.28}, MIL2:{x:0.32,y:0.38}, MIL3:{x:0.68,y:0.38},
    DEF1:{x:0.03,y:0.52}, DEF2:{x:0.25,y:0.60}, DEF3:{x:0.50,y:0.62}, DEF4:{x:0.75,y:0.60}, DEF5:{x:0.97,y:0.52},
    GK1: {x:0.50,y:0.90},
  },

  '4-5-1 (2)': {
    ATT1:{x:0.50,y:0.05},
    MIL1:{x:0.05,y:0.30}, MIL2:{x:0.30,y:0.40}, MIL3:{x:0.50,y:0.45}, MIL4:{x:0.70,y:0.40}, MIL5:{x:0.95,y:0.30},
    DEF1:{x:0.08,y:0.70}, DEF2:{x:0.37,y:0.72}, DEF3:{x:0.63,y:0.72}, DEF4:{x:0.92,y:0.70},
    GK1: {x:0.50,y:0.92},
  },

  '4-5-1': {
    ATT1:{x:0.50,y:0.05},
    MIL1:{x:0.05,y:0.30}, MIL2:{x:0.32,y:0.38}, MIL3:{x:0.50,y:0.48}, MIL4:{x:0.68,y:0.38}, MIL5:{x:0.95,y:0.30},
    DEF1:{x:0.08,y:0.70}, DEF2:{x:0.37,y:0.72}, DEF3:{x:0.63,y:0.72}, DEF4:{x:0.92,y:0.70},
    GK1: {x:0.50,y:0.92},
  },

  '4-4-2': {
    ATT1:{x:0.32,y:0.05}, ATT2:{x:0.68,y:0.05},
    MIL1:{x:0.08,y:0.35}, MIL2:{x:0.34,y:0.42}, MIL3:{x:0.66,y:0.42}, MIL4:{x:0.92,y:0.35},
    DEF1:{x:0.08,y:0.68}, DEF2:{x:0.34,y:0.70}, DEF3:{x:0.66,y:0.70}, DEF4:{x:0.92,y:0.68},
    GK1: {x:0.50,y:0.92},
  },

  '4-4-2 (2)': {
    ATT1:{x:0.40,y:0.05}, ATT2:{x:0.60,y:0.05},
    MIL1:{x:0.08,y:0.35}, MIL2:{x:0.37,y:0.42}, MIL3:{x:0.63,y:0.42}, MIL4:{x:0.92,y:0.35},
    DEF1:{x:0.08,y:0.68}, DEF2:{x:0.37,y:0.70}, DEF3:{x:0.63,y:0.70}, DEF4:{x:0.92,y:0.68},
    GK1: {x:0.50,y:0.92},
  },

  '4-4-1-1': {
    ATT1:{x:0.50,y:0.03}, ATT2:{x:0.50,y:0.32},
    MIL1:{x:0.08,y:0.40}, MIL2:{x:0.33,y:0.42}, MIL3:{x:0.67,y:0.42}, MIL4:{x:0.92,y:0.40},
    DEF1:{x:0.08,y:0.70}, DEF2:{x:0.37,y:0.72}, DEF3:{x:0.63,y:0.72}, DEF4:{x:0.92,y:0.70},
    GK1: {x:0.50,y:0.92},
  },

  '4-1-2-1-2': {
    ATT1:{x:0.35,y:0.05}, ATT2:{x:0.65,y:0.05},
    MIL1:{x:0.50,y:0.28}, MIL2:{x:0.05,y:0.40}, MIL3:{x:0.50,y:0.55}, MIL4:{x:0.95,y:0.40},
    DEF1:{x:0.08,y:0.75}, DEF2:{x:0.37,y:0.78}, DEF3:{x:0.63,y:0.78}, DEF4:{x:0.92,y:0.75},
    GK1: {x:0.50,y:0.95},
  },

  '3-4-1-2': {
    ATT1:{x:0.35,y:0.04}, ATT2:{x:0.65,y:0.04},
    MIL1:{x:0.50,y:0.25}, MIL2:{x:0.05,y:0.35}, MIL3:{x:0.35,y:0.42}, MIL4:{x:0.65,y:0.42}, MIL5:{x:0.95,y:0.35},
    DEF1:{x:0.22,y:0.65}, DEF2:{x:0.50,y:0.65}, DEF3:{x:0.78,y:0.65},
    GK1: {x:0.50,y:0.90},
  },

  '3-4-2-1': {
    ATT1:{x:0.30,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.70,y:0.05},
    MIL1:{x:0.05,y:0.35}, MIL2:{x:0.35,y:0.40}, MIL3:{x:0.65,y:0.40}, MIL4:{x:0.95,y:0.35},
    DEF1:{x:0.22,y:0.65}, DEF2:{x:0.50,y:0.65}, DEF3:{x:0.78,y:0.65},
    GK1: {x:0.50,y:0.90},
  },

  '3-5-2': {
    ATT1:{x:0.30,y:0.04}, ATT2:{x:0.70,y:0.04},
    MIL1:{x:0.50,y:0.23}, MIL2:{x:0.05,y:0.36}, MIL3:{x:0.32,y:0.44}, MIL4:{x:0.68,y:0.44}, MIL5:{x:0.95,y:0.36},
    DEF1:{x:0.16,y:0.66}, DEF2:{x:0.50,y:0.66}, DEF3:{x:0.84,y:0.66},
    GK1: {x:0.50,y:0.90},
  },

  '4-1-4-1': {
    ATT1:{x:0.50,y:0.05},
    MIL1:{x:0.05,y:0.32}, MIL2:{x:0.35,y:0.35}, MIL3:{x:0.65,y:0.35}, MIL4:{x:0.95,y:0.32}, MIL5:{x:0.50,y:0.55},
    DEF1:{x:0.08,y:0.75}, DEF2:{x:0.37,y:0.78}, DEF3:{x:0.63,y:0.78}, DEF4:{x:0.92,y:0.75},
    GK1: {x:0.50,y:0.95},
  },

  '4-2-2-2': {
    ATT1:{x:0.40,y:0.05}, ATT2:{x:0.60,y:0.05},
    MIL1:{x:0.18,y:0.30}, MIL2:{x:0.37,y:0.45}, MIL3:{x:0.63,y:0.45}, MIL4:{x:0.82,y:0.30},
    DEF1:{x:0.08,y:0.70}, DEF2:{x:0.37,y:0.72}, DEF3:{x:0.63,y:0.72}, DEF4:{x:0.92,y:0.70},
    GK1: {x:0.50,y:0.92},
  },

  '4-2-3-1': {
    ATT1:{x:0.50,y:0.04},
    MIL1:{x:0.32,y:0.28}, MIL2:{x:0.50,y:0.32}, MIL3:{x:0.68,y:0.28}, MIL4:{x:0.30,y:0.48}, MIL5:{x:0.70,y:0.48},
    DEF1:{x:0.08,y:0.72}, DEF2:{x:0.37,y:0.75}, DEF3:{x:0.63,y:0.75}, DEF4:{x:0.92,y:0.72},
    GK1: {x:0.50,y:0.95},
  },

  '4-2-3-1 (2)': {
    ATT1:{x:0.50,y:0.05},
    MIL1:{x:0.08,y:0.35}, MIL2:{x:0.30,y:0.45}, MIL3:{x:0.50,y:0.42}, MIL4:{x:0.70,y:0.45}, MIL5:{x:0.92,y:0.35},
    DEF1:{x:0.08,y:0.72}, DEF2:{x:0.37,y:0.75}, DEF3:{x:0.63,y:0.75}, DEF4:{x:0.92,y:0.72},
    GK1: {x:0.50,y:0.95},
  },

  '3-4-3': {
    ATT1:{x:0.30,y:0.05}, ATT2:{x:0.50,y:0.05}, ATT3:{x:0.70,y:0.05},
    MIL1:{x:0.05,y:0.35}, MIL2:{x:0.35,y:0.40}, MIL3:{x:0.65,y:0.40}, MIL4:{x:0.95,y:0.35},
    DEF1:{x:0.22,y:0.65}, DEF2:{x:0.50,y:0.65}, DEF3:{x:0.78,y:0.65},
    GK1: {x:0.50,y:0.90},
  },

  '4-1-2-1-2 (2)': {
    ATT1:{x:0.35,y:0.05}, ATT2:{x:0.65,y:0.05},
    MIL1:{x:0.50,y:0.28}, MIL2:{x:0.15,y:0.42}, MIL3:{x:0.50,y:0.55}, MIL4:{x:0.85,y:0.42},
    DEF1:{x:0.08,y:0.75}, DEF2:{x:0.37,y:0.78}, DEF3:{x:0.63,y:0.78}, DEF4:{x:0.92,y:0.75},
    GK1: {x:0.50,y:0.95},
  },

}
