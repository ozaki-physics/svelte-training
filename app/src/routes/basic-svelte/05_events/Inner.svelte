<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch("greet", {
      text: "Hello!",
    });
  }
</script>

<!-- クリックしたときに dispatch が書かれたメソッドを動かす -->
<button on:click={sayHello}> Click to say hello </button>
