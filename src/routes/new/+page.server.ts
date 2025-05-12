import * as auth from '$lib/server/auth';
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
		// pokud uzivatel neni prihlasen, chyba
		if (!event.locals.session) {
			return fail(401);
		}

		// udaje uvedene ve formulari
		const formData = await event.request.formData();
		const name = formData.get('name') as string;
		const desc = formData.get('desc') as string | null;
		const cycle = Number(formData.get('cycle'));
		const image = formData.get('image') as string | null;

		if (name == null || cycle == null) throw new Error('Údaje ve formuláři nejsou úplné');

		const DAY_IN_MS = 24 * 60 * 60 * 1000;
		const userId = event.locals.session.userId;

		// vypocet data dalsiho zalevani (dnesni datum + 1 zavlazovaci cyklus)
		const nextCycleTimestamp = new Date(Date.now() + +cycle * DAY_IN_MS);

		const newPlant = {
			userId,
			name,
			desc,
			cycle,
			image,
			nextCycleTimestamp
		};

		// ulozeni dat do databaze
		await db.insert(table.plant).values(newPlant as any);

		redirect(302, '/');
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		event.cookies.delete(auth.sessionCookieName, { path: '/' });

		return redirect(302, '/signin');
	}
};
