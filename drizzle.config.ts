import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  connectionString: process.env.POSTGRES_URL,
  breakpoints: true,
} satisfies Config;
