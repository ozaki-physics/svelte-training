import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/advanced-sveltekit/04_advanced-routing/login?redirectTo=${url.pathname}`);
	}
}
