import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/signin');
	}

	// nacteni rostliny z plantId URL parametru
	const res = await db
		.select()
		.from(table.plant)
		.where(eq(table.plant.id, Number(event.params.plantId)));

	const plant = res[0];

	// rostlina neexistuje NEBO nepatri prihlasenemu uzivateli 
	if (!plant || event.locals.user.id !== plant.userId) {
		return redirect(302, '/');
	}

	return { plant };
};

export const actions: Actions = {
	water: async (event) => {
		// uzivatel musi byt prihlasen
		if (!event.locals.session) {
			return fail(401);
		}

		// nacteni udaju o rostline z databaze
		const res = await db
			.select()
			.from(table.plant)
			.where(eq(table.plant.id, Number(event.params.plantId)));
		const plant = res[0];

		// rostlina neexistuje NEBO nepatri prihlasenemu uzivateli 
		if (!plant || event.locals.session.userId !== plant.userId) {
			return fail(401);
		}

		const DAY_IN_MS = 1000 * 60 * 60 * 24;
		// vypocet data dalsiho zalevani 
		const nextCycle = plant.cycle * DAY_IN_MS + Date.now();
		const nextCycleTimestamp = new Date(nextCycle);

		// zapsani aktualizovane hodnoty do databaze
		await db
			.update(table.plant)
			.set({ nextCycleTimestamp })
			.where(eq(table.plant.id, +event.params.plantId));

		return true;
	},
	delete: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		const res = await db
			.select()
			.from(table.plant)
			.where(eq(table.plant.id, Number(event.params.plantId)));
		const plant = res[0];

		// kontrola, zda tato rostlina existuje + patri prihlasenemu uzivateli
		if (!plant || event.locals.session.userId !== plant.userId) {
			return fail(401);
		}

		// odstraneni rostliny z databaze 
		await db.delete(table.plant).where(eq(table.plant.id, +event.params.plantId));
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