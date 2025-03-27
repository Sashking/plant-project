import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
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

export const actions: Actions = {
	edit: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const desc = formData.get('desc') as string | null;
		const cycle = Number(formData.get('cycle'));
		const image = formData.get('image') as string | null;

		if (name == null || cycle == null) throw new Error('form data not complete');

		// todo: add auth that its the right user
		const userId = event.locals.session.userId;

		const data = {
			name,
			desc,
			cycle,
			image
		};

		await db
			.update(table.plant)
			.set(data as any)
			.where(eq(table.plant.id, Number(event.params.plantId)));

		redirect(302, '/');
	}
};
