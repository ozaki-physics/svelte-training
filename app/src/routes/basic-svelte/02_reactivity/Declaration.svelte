<script>
  let count = 0;
  // リアクティブに再計算
  $: doubled = count * 2;
  // 値以外のリアクティブ
  $: console.log(`count is ${count}`);
  // まとめてリアクティブ
  $: {
    console.log(`count is ${count}`);
    console.log(`count is ${doubled}`);
  }
  // 式もリアクティブにできる
  $: if (count >= 10) {
    alert("max");
    count = 0;
  }

  function increment01() {
    count += 1;
  }
</script>

<button on:click={increment01}>
  Clicked {count}
  {count === 1 ? "time" : "times"}
</button>

<p>{count} * 2 = {doubled}</p>
