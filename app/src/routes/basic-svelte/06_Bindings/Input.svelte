<script>
  let name = "world";
  let name02 = "world";

  let a = 1;
  let b = 2;

  let yes = false;

  let value = `Some words are <i>italic</i>, some are <b>bold</b> <ul><li>lists</li><li>are</li><li>cool</li></ul>`;
</script>

<p>バインドしない</p>
<input value={name} />
<h1>Hello {name}!</h1>

<p>バインドする</p>
<input bind:value={name02} />
<h1>Hello {name02}!</h1>

<p>---</p>

<!-- input が number や range でも 同じようにできる -->
<label>
  <input type="number" bind:value={a} min="0" max="10" />
  <input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
  <input type="number" bind:value={b} min="0" max="10" />
  <input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>

<p>---</p>

<!-- チェックボックス は bind:checked にする -->
<label>
  <input type="checkbox" bind:checked={yes} />
  同意しますか?
</label>

{#if yes}
  <p>同意ありがとう</p>
{:else}
  <p>同意しないの分かった</p>
{/if}

<button disabled={!yes}>同意したら押していいよ</button>

<p>---</p>

<div class="grid">
  input: <textarea bind:value></textarea>
  output: <div>{@html value}</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
	}
</style>
