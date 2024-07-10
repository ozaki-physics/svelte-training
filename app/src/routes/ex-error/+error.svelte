<script>
// @ts-nocheck

	import { page } from '$app/stores';
	import { emojis } from './emoji.js';
</script>

<h1>{$page.status} {$page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[$page.status] ?? emojis[500]}
</span>
