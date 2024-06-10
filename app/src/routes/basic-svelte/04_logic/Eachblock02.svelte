<script>
  import Thing from "./Thing.svelte";

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

<!-- 子コンポート の中で const だから each に key をあてる -->
<button on:click={handleClick}> 最初の要素を削除する </button>

{#each things as thing (thing.id)}
  <Thing name={thing.name} />
{/each}
