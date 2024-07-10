import { error } from '@sveltejs/kit';

export function load() {
	throw error(420, 'まぁまぁ落ち着け');
}
