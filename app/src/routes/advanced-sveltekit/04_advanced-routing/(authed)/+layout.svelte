<script>
    import { page } from "$app/stores";
</script>

<slot />
<div>このページは {$page.url.pathname}</div>

<form method="POST" action="/advanced-sveltekit/04_advanced-routing/logout">
	<button>log out</button>
</form>
