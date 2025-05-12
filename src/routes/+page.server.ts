import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	// pokud uzivatel neni prihlaseny - presmerovani na prihlasovaci stranku
	if (!event.locals.user) {
		return redirect(302, '/signin');
	}
	
	// nacitani vsech rostlin daneho uzivatele z databaze
	const plants = await db
		.select()
		.from(table.plant)
		.where(eq(table.plant.userId, event.locals.user.id))
		.orderBy(table.plant.nextCycleTimestamp);

	return { user: event.locals.user, plants };
};

export const actions: Actions = {
	logout: async (event) => {
		// jenom jestli se uzivatel jeste neodhlasil
		if (!event.locals.session) {
			return fail(401);
		}

		// smazat relaci z databaze & smazat autentizacni cookies
		await auth.invalidateSession(event.locals.session.id);
		event.cookies.delete(auth.sessionCookieName, { path: '/' });

		return redirect(302, '/signin');
	}
};
