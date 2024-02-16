import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const users = await db.query.users.findMany();
	return {
		users
	};
};

export const actions: Actions = {};
