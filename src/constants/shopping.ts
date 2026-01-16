// Shopping list constants: units and categories

export const UNITS = [
  { value: 'pcs', label: 'pieces' },
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'liters' },
  { value: 'g', label: 'grams' },
  { value: 'kg', label: 'kg' },
  { value: 'mg', label: 'mg' },
  { value: 'oz', label: 'oz' },
  { value: 'lb', label: 'lb' },
  { value: 'cup', label: 'cups' },
  { value: 'tbsp', label: 'tbsp' },
  { value: 'tsp', label: 'tsp' },
] as const;

// Default category order for display (store layout order)
export const DEFAULT_CATEGORY_ORDER = [
  'Produce',
  'Dairy',
  'Meat',
  'Pantry',
  'Frozen',
  'Beverage',
  'Health',
  'Other',
] as const;

export const CATEGORIES = DEFAULT_CATEGORY_ORDER.map((cat) => ({
  value: cat,
  label: cat,
}));

export type Unit = (typeof UNITS)[number]['value'];
export type Category = (typeof DEFAULT_CATEGORY_ORDER)[number];

export const getUnitLabel = (unit: string): string => {
  const found = UNITS.find((u) => u.value === unit);
  return found ? found.label : unit;
};

export const getCategoryLabel = (category: string): string => {
  return category;
};
