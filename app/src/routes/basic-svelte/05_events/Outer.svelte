<script>
  import Inner from "./Inner.svelte";
</script>

<Inner on:greet />

<!-- 
<script>
  // 丁寧に書くなら 以下になるが Svelte は省略して 書ける
  import Inner from './Inner.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function forward(event) {
    dispatch('greet', event.detail);
  }
</script>

<Inner on:greet={forward}/>
 -->
