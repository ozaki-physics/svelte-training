<script>
  import Inner from "./Inner.svelte";

  /**
   * @param {{ detail: { text: any; }; }} event
   */
  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<!-- dispatch に書かれた第一引数と同じ文字列(greet)じゃないと動かない -->
<Inner on:greet={handleMessage} />
