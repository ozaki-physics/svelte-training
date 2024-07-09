<script>
// @ts-nocheck

	import { page, navigating } from '$app/stores';
</script>

<nav>
  <div>以下は stores の ナビゲーションだよ</div>
	<a href="/stores" aria-current={$page.url.pathname === '/stores'}>
		home
	</a>

  <a href="/stores/about" aria-current={$page.url.pathname === '/stores/about'}>
		about
	</a>

  <!-- わざと遅延を設けて 表示を確認する -->
	{#if $navigating}
    <div>
      navigating to {$navigating.to.url.pathname}
    </div>
    <div>
      navigating from {$navigating.from.url.pathname}
    </div>
    <div>
      navigating type {$navigating.type}
    </div>
	{/if}
</nav>

<slot />
