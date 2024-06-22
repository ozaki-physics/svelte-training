<script>
  // @ts-nocheck

  let scoops = 1;
  /**
   * @type {string | any[] | Iterable<string>}
   */
  let flavours = [];

  // リストをいい感じに出力表現してくれるらしい
  const formatter = new Intl.ListFormat("ja", {
    style: "long",
    type: "conjunction",
  });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
  <label>
    <input type="radio" name="scoops" value={number} bind:group={scoops} />
    数字は {number}
    {number === 1 ? "個" : "個で複数"}
  </label>
{/each}

<h2>Flavours</h2>

{#each ["クッキーandクリーム", "ミントチョコチップ", "ラズベリーリップル"] as flavour}
  <label>
    <input
      type="checkbox"
      name="flavours"
      value={flavour}
      bind:group={flavours}
    />
    {flavour}
  </label>
{/each}

{#if flavours.length === 0}
  <p>少なくとも1個選んでください</p>
{:else if flavours.length > scoops}
  <p>ラジオで選んだ個数以上はダメ</p>
{:else}
  <p>
    あなたのオーダー: {scoops}
    {scoops === 1 ? "個" : "個で複数"}
    そして味は: {formatter.format(flavours)}
  </p>
{/if}
