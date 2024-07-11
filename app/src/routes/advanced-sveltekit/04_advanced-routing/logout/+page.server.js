import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		cookies.delete('logged_in', { path: '/advanced-sveltekit/04_advanced-routing' });
		throw redirect(303, '/advanced-sveltekit/04_advanced-routing');
	}
};
