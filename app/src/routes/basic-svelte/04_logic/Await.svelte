<script>
  import { getRandomNumber } from "./utils.js";

  let promise = getRandomNumber();

  function handleClick() {
    promise = getRandomNumber();
  }
</script>

<button on:click={handleClick}> generate random number </button>

{#await promise}
  <p>...waiting</p>
{:then aaa}
  <p>The number is {aaa}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<div>---</div>

{#await promise then aaa}
  <p>The number is {aaa}</p>
{/await}
