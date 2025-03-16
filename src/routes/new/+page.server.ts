import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/signin');
	}
	return { user: event.locals.user };
};

export const actions: Actions = {
	new: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		// const response = await fetch('https://trefle.io/api/v1/plants?token=vQ7lT1TgW0349je_ySvjMTP9XeKMyFoPPhBLZZxodrQ');
		// const json = await response.json();
		// console.log(json);

		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const desc = formData.get('desc') as string | null;
		const cycle = Number(formData.get('cycle'));
		const image = formData.get('image') as string | null;

		if (name == null || cycle == null) throw new Error('form data not complete');

		const DAY_IN_MS = 24 * 60 * 60 * 1000;
		const userId = event.locals.session.userId;

		const nextCycleTimestamp = new Date(Date.now() + +cycle * DAY_IN_MS); // convert the days into milliseconds and add that to the date to get the next watering cycle timestamp

		const newPlant = {
			userId,
			name,
			desc,
			cycle,
			image,
			nextCycleTimestamp
		}

		await db.insert(table.plant).values(newPlant as any);

		redirect(302, '/');
	}
};
