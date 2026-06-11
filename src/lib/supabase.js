import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export function encodeVowels(str) {
  const map = { A:'E',E:'I',I:'O',O:'U',U:'A',a:'e',e:'i',i:'o',o:'u',u:'a' }
  return (str||'').replace(/[AEIOUaeiou]/g, c => map[c]||c)
}

export function getPortraitUrl(skin, hair, hairLength) {
  if (!skin || !hair || !hairLength || !supabaseUrl) return null
  const key = hair === 'chauve' ? `${skin}-chauve-rase` : `${skin}-${hair}-${hairLength}`
  return `${supabaseUrl}/storage/v1/object/public/assets/tetes/${key}.jpg`
}

export function getClubLogoUrl(logoPath) {
  if (!logoPath || !supabaseUrl) return null
  return `${supabaseUrl}/storage/v1/object/public/assets/${logoPath}`
}
