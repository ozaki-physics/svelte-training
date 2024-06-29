<script>
  // @ts-ignore
  import { name, greeting } from "./store02.js";
</script>

<h1>{$greeting}</h1>
<!-- store のバインド -->
<input bind:value={$name} />

<button on:click={() => ($name += "!")}> exclamation mark を追加する </button>
