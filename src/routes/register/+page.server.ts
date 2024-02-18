import { Argon2id } from 'oslo/password';
import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { lucia } from '$lib/server/auth';
import { generateId } from 'lucia';

export const actions = {
	register: async (event) => {
		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash('password');
		try {
			await db.insert(users).values({
				id: userId,
				email: 'chetankharel7@gmail.com',
				password: hashedPassword,
				clerkUserId: userId
			});
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			return fail(500, {
				message: 'An unknown error occurred' + (err as Error).message
			});
		}
		return redirect(302, '/dashboard');
	}
} satisfies Actions;
