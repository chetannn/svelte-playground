import * as dotenv from 'dotenv';
dotenv.config();

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(postgres(process.env.DATABASE_URL!, { max: 1 }));

export const migrateDb = async () => {
	await migrate(db, { migrationsFolder: 'migrations' });
};

migrateDb()
	.then(() => {
		console.log('🚂 Database has been migrated');
		process.exit(0);
	})
	.catch((err) => {
		console.error('❌ Database migration failed', err);
		process.exit(1);
	});
