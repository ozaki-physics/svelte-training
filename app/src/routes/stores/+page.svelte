<script>
	import { page } from '$app/stores';
</script>


<h1>stores/home</h1>
<p>this is the home page.</p>

{#if $page.url.pathname === '/stores'}
  <span>stores の カレントです</span>
{/if}
