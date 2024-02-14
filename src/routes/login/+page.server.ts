import { Argon2id } from 'oslo/password';
import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { lucia } from '$lib/server/auth';

export const actions = {
	login: async (event) => {
		try {
			const existingUser = await db
				.select()
				.from(users)
				.where(eq(users.email, 'chetankharel7@gmail.com'));

			if (!existingUser) {
				return fail(404, {
					message: 'User not found'
				});
			}

			if (existingUser && existingUser[0].password) {
				const validPassword = await new Argon2id().verify(existingUser[0].password, 'password');
				if (!validPassword) {
					return fail(400, {
						message: 'Incorrect username or password'
					});
				}
				const session = await lucia.createSession(existingUser[0].id, {});
				const sessionCookie = lucia.createSessionCookie(session.id);

				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
		} catch (err) {
			return fail(500, {
				message: 'An unknown error occurred' + (err as Error).message
			});
		}
		return redirect(302, '/dashboard');
	}
} satisfies Actions;
