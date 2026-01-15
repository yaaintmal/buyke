import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
});

export const updateItemSchema = z.object({
  bought: z.boolean(),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});
