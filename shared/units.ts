export const UNIT_VALUES = [
  'pcs',
  'slice',
  'bar',
  'chunk',
  'packet',
  'pack',
  'crate',
  'bottle',
  'can',
  'mg',
  'g',
  'kg',
  'ml',
  'l',
  'oz',
  'lb',
  'cup',
  'tbsp',
  'tsp',
] as const;

export type Unit = (typeof UNIT_VALUES)[number];

// Map common aliases / plurals to canonical unit values
export const UNIT_ALIASES: Record<string, Unit> = {
  piece: 'pcs',
  pieces: 'pcs',
  pkt: 'packet',
  packets: 'packet',
  grams: 'g',
  gram: 'g',
  gms: 'g',
  milligram: 'mg',
  milligrams: 'mg',
  kilogram: 'kg',
  kilograms: 'kg',
  liter: 'l',
  litre: 'l',
  liters: 'l',
  litres: 'l',
  milliliter: 'ml',
  millilitre: 'ml',
  milliliters: 'ml',
  millilitres: 'ml',
  // German/English aliases for 'crate'
  kiste: 'crate',
  kisten: 'crate',
  crates: 'crate',
  // German/English aliases for 'bottle' and 'can'
  flasche: 'bottle',
  flaschen: 'bottle',
  bottle: 'bottle',
  bottles: 'bottle',
  dose: 'can',
  dosen: 'can',
  can: 'can',
  cans: 'can',
  // German/English aliases for 'pack'
  packung: 'pack',
  packungen: 'pack',
  pack: 'pack',
  packs: 'pack',
};

// Default English labels (can be overridden via i18n)
export const UNIT_LABELS: Record<Unit, string> = {
  pcs: 'piece(s)',
  slice: 'slice',
  bar: 'bar',
  chunk: 'chunk',
  packet: 'packet',
  pack: 'pack',
  crate: 'crate',
  bottle: 'bottle',
  can: 'can',
  mg: 'mg',
  g: 'g',
  kg: 'kg',
  ml: 'ml',
  l: 'l',
  oz: 'oz',
  lb: 'lb',
  cup: 'cup',
  tbsp: 'tbsp',
  tsp: 'tsp',
};

export function normalizeUnit(input?: string | null): Unit | undefined {
  if (!input) return undefined;
  const s = String(input).trim().toLowerCase();
  if (UNIT_VALUES.includes(s as Unit)) return s as Unit;
  if (Object.prototype.hasOwnProperty.call(UNIT_ALIASES, s)) {
    return UNIT_ALIASES[s];
  }
  return undefined;
}
