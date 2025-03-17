import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/signin');
	}

	// get the plant from the passed parameter plantId
	const res = await db
		.select()
		.from(table.plant)
		.where(eq(table.plant.id, Number(event.params.plantId)));

	const plant = res[0];

	// check if the plant even exists OR if the userId matches
	if (!plant || event.locals.user.id !== plant.userId) {
		return redirect(302, '/');
	}

	return { plant };
};
