import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { createPool } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import 'dotenv/config';

const poolConnection = createPool({
  connectionString: process.env.POSTGRES_URL,
});

const db = drizzle(poolConnection);

const main = async () => {
  console.log('⏳ Running migrations...');
  const start = Date.now();
  await migrate(db, { migrationsFolder: 'db/migrations' });
  const end = Date.now();
  console.log(`✅ Migrations completed in ${end - start}ms`);
  process.exit(0);
};

main().catch(err => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
