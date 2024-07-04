<script>
  /** @type {number} */
  let number;

  // クリックしたときに動くメソッド
  async function roll01() {
    const response = await fetch('/api-router/get-method/roll');
    number = await response.json();
  }
</script>

<button on:click={roll01}>Roll the dice</button>

{#if number !== undefined}
  <p>ルーレットした値は {number}</p>
{/if}
