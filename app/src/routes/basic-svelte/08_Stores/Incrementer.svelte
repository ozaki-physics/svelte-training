<script>
  // @ts-ignore
	import { count } from './stores.js';

	function increment() {
		count.update((/** @type {number} */ n) => n + 1);
	}
</script>

<button on:click={increment}>
	+
</button>
