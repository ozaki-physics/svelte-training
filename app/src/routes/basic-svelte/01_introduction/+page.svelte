<script>
  import Nested from "./Nested.svelte";
  let name = 'Svelte';
  const src ="/favicon.png"
  let s = `this <strong>HTML!!!</strong>`
</script>

<!-- js を埋め込む方法 -->
<h1>Hello {name}!</h1>
<h1>Hello {name.toUpperCase()}!</h1>

<!-- 省略して書ける -->
<img src="{src}" alt="hello" />
<img {src} alt="hello02" />

<!-- import して使える かつ 同じ p タグ だけど css が反映されない -->
<Nested />

<p>{s}</p>
<!-- 出力: this <strong>HTML!!!</strong> と文字列で出る -->
<p>{@html s}</p>
<!-- 出力: this HTML!!! とふと文字になって出力される -->
<!-- XSS 攻撃 に注意 -->

<p>hello world</p>

<style>
  p {
    color: skyblue;
    font-size: 3em;
  }
</style>
