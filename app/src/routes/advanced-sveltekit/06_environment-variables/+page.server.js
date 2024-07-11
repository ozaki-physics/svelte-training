import { redirect, fail } from '@sveltejs/kit';
// ビルド時に解決できるとき
import { PASSPHRASE } from '$env/static/private';
// アプリ実行時に解決するとき
// import { env } from '$env/dynamic/private';

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		throw redirect(307, '/advanced-sveltekit/06_environment-variables/welcom');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

    // ビルド時に解決できるとき
		if (data.get('passphrase') === PASSPHRASE) {
    // アプリ実行時に解決するとき
    // if (data.get('passphrase') === env.PASSPHRASE) {
			cookies.set('allowed', 'true', {
				path: '/advanced-sveltekit/06_environment-variables'
			});

			throw redirect(303, '/advanced-sveltekit/06_environment-variables/welcom');
		}

		return fail(403, {incorrect: true});
	}
};
