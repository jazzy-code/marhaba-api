// env.ts
import { z } from 'zod';
import 'dotenv/config'; // Carga .env

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default('3000').transform(Number),
  API_KEY: z.string().optional(), // Si no está, será undefined, pero pasará
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  // Clerk
  CLERK_SECRET_KEY: z.string(),
  CLERK_WEBHOOK_SECRET: z.string(),
});

// Valida en tiempo de ejecución
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variables de entorno inválidas:', _env.error.format());
  process.exit(1);
}

// Exporta el entorno ya parseado y tipado
export const env = _env.data;
