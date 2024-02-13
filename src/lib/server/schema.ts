import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: varchar('id', { length: 50 }).unique().notNull().primaryKey(),
	username: varchar('username', { length: 256 }),
	firstName: varchar('firstName', { length: 256 }),
	lastName: varchar('lastName', { length: 256 }),
	clerkUserId: text('clerkUserId').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
