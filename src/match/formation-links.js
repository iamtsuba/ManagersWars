/**
 * Manager Wars — Liens explicites par formation (GDD §7)
 * Basé sur les schémas fournis par le designer.
 * Chaque lien est une paire [posA, posB] où pos = "ROLE+NUM" ex: "ATT1", "MIL3"
 */

export const FORMATION_LINKS = {
  '4-4-2': [
    // Horizontaux
    ['ATT1','ATT2'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    // Verticaux
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT2','MIL3'],['ATT2','MIL4'],
    ['MIL1','DEF1'],['MIL1','DEF2'],['MIL2','DEF2'],
    ['MIL3','DEF3'],['MIL4','DEF3'],['MIL4','DEF4'],
    ['DEF1','GK1'],['DEF2','GK1'],['DEF3','GK1'],['DEF4','GK1'],
  ],

  '4-3-3': [
    // Horizontaux
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],
    // Verticaux
    ['ATT1','MIL1'],['ATT2','MIL2'],['ATT3','MIL3'],
    ['MIL1','DEF1'],['MIL1','DEF2'],['MIL2','DEF2'],['MIL2','DEF3'],['MIL3','DEF3'],['MIL3','DEF4'],
    ['DEF1','GK1'],['DEF2','GK1'],['DEF3','GK1'],['DEF4','GK1'],
  ],

  '3-4-3': [
    // Horizontaux
    ['ATT1','ATT2'],['ATT2','ATT3'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    // Verticaux
    ['ATT1','MIL1'],['ATT2','MIL2'],['ATT2','MIL3'],['ATT3','MIL4'],
    ['MIL1','DEF1'],['MIL2','DEF1'],['MIL2','DEF2'],['MIL3','DEF2'],['MIL3','DEF3'],['MIL4','DEF3'],
    ['DEF1','GK1'],['DEF2','GK1'],['DEF3','GK1'],
  ],

  '3-5-2': [
    // Horizontaux
    ['ATT1','ATT2'],
    ['MIL1','MIL2'],['MIL2','MIL3'],['MIL3','MIL4'],['MIL4','MIL5'],
    ['DEF1','DEF2'],['DEF2','DEF3'],
    // Verticaux
    ['ATT1','MIL1'],['ATT1','MIL2'],
    ['ATT2','MIL4'],['ATT2','MIL5'],
    ['MIL1','DEF1'],['MIL2','DEF1'],['MIL2','DEF2'],
    ['MIL3','DEF2'],['MIL4','DEF2'],['MIL4','DEF3'],['MIL5','DEF3'],
    ['DEF1','GK1'],['DEF2','GK1'],['DEF3','GK1'],
  ],

  '5-3-2': [
    // Horizontaux
    ['ATT1','ATT2'],
    ['MIL1','MIL2'],['MIL2','MIL3'],
    ['DEF1','DEF2'],['DEF2','DEF3'],['DEF3','DEF4'],['DEF4','DEF5'],
    // Verticaux
    ['ATT1','MIL1'],['ATT2','MIL3'],
    ['MIL1','DEF1'],['MIL1','DEF2'],['MIL2','DEF2'],['MIL2','DEF3'],['MIL2','DEF4'],['MIL3','DEF4'],['MIL3','DEF5'],
    ['DEF1','GK1'],['DEF2','GK1'],['DEF3','GK1'],['DEF4','GK1'],['DEF5','GK1'],
  ],
}

/**
 * Calcule tous les liens actifs pour un terrain donné.
 * @param {Object} slots      { 'ATT1': player, 'MIL2': player, ... }
 * @param {string} formation  ex: '4-3-3'
 * @returns {Array}           [{ posA, posB, playerA, playerB, color }]
 */
export function computeLinks(slots, formation) {
  const links  = FORMATION_LINKS[formation] || []
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
 * Pour chaque formation, chaque poste a une position (x, y) dans [0,1]
 */
export const FORMATION_POSITIONS = {
  '4-4-2': {
    ATT1:{x:0.30,y:0.04}, ATT2:{x:0.70,y:0.04},
    MIL1:{x:0.10,y:0.30}, MIL2:{x:0.37,y:0.30}, MIL3:{x:0.63,y:0.30}, MIL4:{x:0.90,y:0.30},
    DEF1:{x:0.10,y:0.60}, DEF2:{x:0.37,y:0.60}, DEF3:{x:0.63,y:0.60}, DEF4:{x:0.90,y:0.60},
    GK1: {x:0.50,y:0.88},
  },
  '4-3-3': {
    ATT1:{x:0.20,y:0.04}, ATT2:{x:0.50,y:0.04}, ATT3:{x:0.80,y:0.04},
    MIL1:{x:0.20,y:0.33}, MIL2:{x:0.50,y:0.33}, MIL3:{x:0.80,y:0.33},
    DEF1:{x:0.10,y:0.62}, DEF2:{x:0.37,y:0.62}, DEF3:{x:0.63,y:0.62}, DEF4:{x:0.90,y:0.62},
    GK1: {x:0.50,y:0.88},
  },
  '3-4-3': {
    ATT1:{x:0.20,y:0.04}, ATT2:{x:0.50,y:0.04}, ATT3:{x:0.80,y:0.04},
    MIL1:{x:0.10,y:0.33}, MIL2:{x:0.37,y:0.33}, MIL3:{x:0.63,y:0.33}, MIL4:{x:0.90,y:0.33},
    DEF1:{x:0.20,y:0.62}, DEF2:{x:0.50,y:0.62}, DEF3:{x:0.80,y:0.62},
    GK1: {x:0.50,y:0.88},
  },
  '3-5-2': {
    ATT1:{x:0.30,y:0.04}, ATT2:{x:0.70,y:0.04},
    MIL1:{x:0.05,y:0.33}, MIL2:{x:0.28,y:0.33}, MIL3:{x:0.50,y:0.33}, MIL4:{x:0.72,y:0.33}, MIL5:{x:0.95,y:0.33},
    DEF1:{x:0.20,y:0.62}, DEF2:{x:0.50,y:0.62}, DEF3:{x:0.80,y:0.62},
    GK1: {x:0.50,y:0.88},
  },
  '5-3-2': {
    ATT1:{x:0.30,y:0.04}, ATT2:{x:0.70,y:0.04},
    MIL1:{x:0.20,y:0.33}, MIL2:{x:0.50,y:0.33}, MIL3:{x:0.80,y:0.33},
    DEF1:{x:0.05,y:0.62}, DEF2:{x:0.28,y:0.62}, DEF3:{x:0.50,y:0.62}, DEF4:{x:0.72,y:0.62}, DEF5:{x:0.95,y:0.62},
    GK1: {x:0.50,y:0.88},
  },
}
