// Shopping list constants: units and categories

import { UNIT_VALUES, UNIT_LABELS } from '../../shared/units';
import type { Unit as SharedUnit } from '../../shared/units';

export const UNITS = UNIT_VALUES.map((value) => ({
  value,
  label: UNIT_LABELS[value] ?? value,
})) as const;

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
