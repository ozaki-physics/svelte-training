import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

  // さっきは Incrementer.svelte で update() や Resetter.svelte で set() を使っていたが
  // 全部ここに格納して 外のコンポーネントからは update(), set() を使えないようにもできる
	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}

export const count = createCount();
