import * as dotenv from 'dotenv';
dotenv.config();
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { randomUUID } from 'node:crypto';

function generateUsersArray(numUsers: number) {
	const usersArray = [];
	const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Eva'];
	const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

	for (let i = 0; i < numUsers; i++) {
		const user = {
			firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
			lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
			email: `user${i + 1}@example.com`,
			clerkId: randomUUID()
		};

		usersArray.push(user);
	}

	return usersArray;
}

async function cleanUpDb() {
	await db.transaction(async (tx) => {
		await tx.delete(users);
	});
}
async function seedDb() {
	console.log('🌱 Seeding...');
	console.time(`🌱 Database has been seeded`);

	console.time('🧹 Cleaned up the database...');
	await cleanUpDb();
	console.timeEnd('🧹 Cleaned up the database...');

	const userList = generateUsersArray(100);

	for (const user of userList) {
		await db.insert(users).values({
			id: user.clerkId,
			clerkUserId: user.clerkId,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		});
	}

	console.timeEnd(`🌱 Database has been seeded`);
}

seedDb()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
