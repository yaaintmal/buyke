import { z } from 'zod';
import { UNIT_VALUES } from '../shared/units';

const VALID_CATEGORIES = [
  'Produce',
  'Dairy',
  'Meat',
  'Pantry',
  'Frozen',
  'Beverage',
  'Health',
  'Other',
];

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  quantity: z.number().positive('Quantity must be positive').default(1).optional(),
  unit: z
    .enum([...UNIT_VALUES] as [string, ...string[]])
    .default('pcs')
    .optional(),
  category: z
    .enum(VALID_CATEGORIES as [string, ...string[]])
    .default('Other')
    .optional(),
  listId: z.string().optional().nullable(),
});

export const updateItemSchema = z.object({
  bought: z.boolean().optional(),
  quantity: z.number().positive('Quantity must be positive').optional(),
  unit: z.enum([...UNIT_VALUES] as [string, ...string[]]).optional(),
  category: z.enum(VALID_CATEGORIES as [string, ...string[]]).optional(),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});
