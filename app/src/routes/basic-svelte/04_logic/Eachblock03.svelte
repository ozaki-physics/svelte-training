<script>
  import Thing02 from "./Thing02.svelte";

  let things = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "carrot" },
    { id: 4, name: "doughnut" },
    { id: 5, name: "egg" },
  ];

  function handleClick() {
    things = things.slice(1);
  }
</script>

<!-- 子コンポート の中で $: を使ったパターン -->
<button on:click={handleClick}> 最初の要素を削除する </button>

{#each things as thing}
  <Thing02 name={thing.name} />
{/each}
