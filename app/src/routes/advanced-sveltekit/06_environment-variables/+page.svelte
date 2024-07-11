<script>
  // actions の戻り値が入っている
  // フォーム送信後のみ 値が入っている
	export let form;

  // 環境変数の読み込み
	import {
		// @ts-ignore
		PUBLIC_THEME_BACKGROUND,
		// @ts-ignore
		PUBLIC_THEME_FOREGROUND
	} from '$env/static/public';
</script>

<!-- エラーメッセージがあれば表示 -->
{#if form?.incorrect}
	<p class="error">wrong passphrase!</p>
{/if}


<form method="POST">
	<label>
		環境変数のフレーズを入れてね
		<input name="passphrase" autocomplete="off" />
	</label>
</form>

<div>バックグラウンドの色は {PUBLIC_THEME_BACKGROUND}</div>
<div>フロントの色は {PUBLIC_THEME_FOREGROUND}</div>

<style>
	.error {
		color: red;
	}
</style>
