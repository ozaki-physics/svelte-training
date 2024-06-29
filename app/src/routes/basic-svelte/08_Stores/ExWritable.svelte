<script>
  // import { onDestroy } from "svelte";
  // @ts-ignore
  import { count } from "./stores.js";
  import Incrementer from "./Incrementer.svelte";
  import Decrementer from "./Decrementer.svelte";
  import Resetter from "./Resetter.svelte";

  // デストロイが必要な書き方
  // let count_value;

  // const unsubscribe = count.subscribe((/** @type {any} */ value) => {
  //   count_value = value;
  // });

  // onDestroy(unsubscribe);
</script>

<!-- デストロイが必要な書き方 -->
<!-- <h1>The count is {count_value}</h1> -->
<h1>The count is {$count}</h1>

<Incrementer />
<Decrementer />
<Resetter />
