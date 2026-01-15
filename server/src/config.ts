import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 5000)),
  MONGO_URI: z.string().nonempty(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEBUG: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.format());
  throw new Error('Invalid environment configuration');
}

export const config = {
  PORT: parsed.data.PORT as number,
  MONGO_URI: parsed.data.MONGO_URI,
  NODE_ENV: parsed.data.NODE_ENV,
  DEBUG: parsed.data.DEBUG,
};

export default config;
