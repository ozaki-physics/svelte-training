<script>
  const emojis = {
    apple: "🍎",
    banana: "🍌",
    carrot: "🥕",
    doughnut: "🍩",
    egg: "🥚",
  };

  // プロパティの値が変わるたびに名前が更新される
  /** @type {string | number} */
  export let name;

  // ...しかし `$:` ではなく`const`を使用しているため コンポーネントの初期化時に "emoji "変数は固定される
  // だから 名前は変わっていくのに 絵文字は変わっていかない
  // const のままで 親コンポート で調整する
  // @ts-ignore
  const emoji = emojis[name];
</script>

<p>{emoji} この絵文字は {name}</p>
