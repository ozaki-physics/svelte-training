<script>
  import Outer from "./Outer.svelte";

  /**
   * @param {{ detail: { text: any; }; }} event
   */
  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<!-- EventForwarding -> Outer -> Inner の順でコンポーネントしてあり Outer が フォーワードしている -->
<Outer on:greet={handleMessage} />
