<script>
  // @ts-ignore
	import { count } from './stores.js';

	function decrement() {
		count.update((/** @type {number} */ n) => n - 1);
	}
</script>

<button on:click={decrement}>
	-
</button>
