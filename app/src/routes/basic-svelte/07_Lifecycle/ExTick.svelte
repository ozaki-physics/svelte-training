<script>
  import { tick } from "svelte";

  let text = `Select some text and hit the tab key to toggle uppercase`;

  /**
   * @param {{ key: string; preventDefault: () => void; }} event
   */
  async function handleKeydown(event) {
    if (event.key !== "Tab") return;

    event.preventDefault();

    // @ts-ignore
    const { selectionStart, selectionEnd, value } = this;
    const selection = value.slice(selectionStart, selectionEnd);

    const replacement = /[a-z]/.test(selection)
      ? selection.toUpperCase()
      : selection.toLowerCase();

    text =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

    await tick();
    // @ts-ignore
    this.selectionStart = selectionStart;
    // @ts-ignore
    this.selectionEnd = selectionEnd;
  }
</script>

<!-- 文字列を選択して タブを押すと 大文字と小文字が切り替わる -->
<!-- でも tick() を使わないと 切り替えたと同時に末尾にカーソルが動いてしまう -->
<textarea value={text} on:keydown={handleKeydown} />

<style>
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
  }
</style>
