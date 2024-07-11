import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies, url }) => {
		cookies.set('logged_in', 'true', { path: '/advanced-sveltekit/04_advanced-routing' });
		throw redirect(303, url.searchParams.get('redirectTo') ?? '/advanced-sveltekit/04_advanced-routing');
	}
};
