## Basic Svelte
### 01_introduction
Svelte は web アプリケーションを構築するためのツール  
マークアップ(markup), スタイル(styles), 振る舞い(behaviours) を組み合わせた コンポーネント でアプリを 宣言的(declaratively) に構築  
JavaScript モジュールに コンパイル されるため オーバーヘッドがない  
コンポーネントとは HTML, CSS, JavaScript をカプセル化した再利用可能な自己完結型のコードブロックのこと  
`.svelte` ファイルに記述  
svelte ファイルは script, html, css の順で書く  
中括弧 `{}` の中は JS のコードが書ける  
html の 属性(img の src など)に 中括弧も使える `src={}` など  

```svelte
<script>
	let name = 'Svelte';
</script>

<h1>Hello {name.toUpperCase()}!</h1>
```

Svelte は アクセシビリティ(Accessibility: 略:a11y) の警告を表示して a11y を正しく行う手助けをしてくれる  
`src={src}` のように 属性の名前と値の変数が一致する場合 Svelte では省略して書ける  
`<img {src} />`  

他のファイル から コンポーネント を インポート し マークアップ でそれを使用することができる  
新たに Nested.svelte ファイルを作って それを 他の svelte ファイルの `<script>` で  
`import Nested from "./Nested.svelte";` すると使えるようになる  
使う時は html の領域で `<Nested />` と書く  
コンポーネントが別だから css は反映されない  

js で書かれた html を そのまま出力するのではなく html として 出力するためには `{@html ...}` と書く  
ただし  Cross-Site Scripting (XSS) 攻撃 に注意  
```svelte
<script>
  let s = `this <strong>HTML!!!</strong>`
</script>

<p>{s}</p>
<!-- 出力: this <strong>HTML!!!</strong> -->
<p>{@html s}</p>
<!-- 出力: this HTML!!! -->
```
### 02_reactivity
Svelte の中心には DOMをアプリケーションの状態に同期し続けさせるための強力な reactivity システムがある  
イベントハンドラで関数を動かす  
```svelte
<script>
  let count = 0;
  function increment01(){
    count += 1;
  }
</script>

<button on:click={increment01}>
  Clicked {count}
</button>
```

コンポーネントの状態によっては 他の状態から計算しなければならない部分があり 変更されるたびに再計算しなけれいけない  
(例えば firstname と lastname から派生する fullname など)  
これに対応するために リアクティブ宣言(reactive declarations) がある  
リアクティブステートメント(reactive statement)が 未宣言の変数への代入だけで構成されている場合 Svelte は自動で let 宣言を追加してくれる  
リアクティブ宣言, リアクティブステートメント は 他のスクリプトコードの後 かつ コンポーネントの html がレンダリングされる前に実行される  
```svelte
<script>
  $: doubled = count * 2;
</script>
```

値だけでなく 任意のステートメント(関数や式)も リアクティブ にできる  
Svelte のリアクティビティは代入によってトリガーされるため push や splice のような配列のメソッドを使用しても更新が自動的に行われない  
そのため 配列に push しただけでは反応しない  
対応策として 生成した配列を元の配列に再代入する など ある  
配列の要素に代入 や オブジェクトのプロパティに代入 は リアクティブに反応してくれる  
### 03_props
あるコンポーネントから その子コンポーネントにデータを渡す方法で プロパティ(properties)を宣言する  
Svelte では export というキーワードを使用する  
子コンポーネント の `<script>` で `export let answer` として 親コンポーネント で `<Nested answer={42}/>` と書く  

TypeScript 的に 変数の宣言 には型を書けと アラートが出る  
`@type number | string` とコメントで書かないといけない  

親コンポーネント で 子コンポーネント が期待するプロパティに対応しているのであれば spread 構文 が使える  
属性の名前と値の変数が一致する場合 のやつと似ている  
```svelte
<PackageInfo
	name={pkg.name}
	speed={pkg.speed}
	version={pkg.version}
	website={pkg.website}
/>
<!-- spread 構文 -->
<PackageInfo {...pkg} />
```
### 04_logic
HTML の部分で 表示の切り替えに IF 文を使う  
```svelte
{#if count > 10}
  <p>{count} is greater than 10</p>
{:else if count < 5}
  <p>{count} is less than 5</p>
{:else}
  <p>{count} is between 0 and 10</p>
{/if}
```
HTML の部分で 表示の切り替えに each 文を使う  
```svelte
  {#each colors as color, i}
  <!-- HTML を書いたり color や i 変数を使う -->
  {/each}
```
式の `colors` の部分には length プロパティ を持っていれば使える  
一般的な反復可能なデータ構造は `each [...iterable]` を用いてループできる  

デフォルトでは each ブロックの値を変更すると ブロックの 末尾 で DOM ノードが 追加・削除 され 変更された値が更新される  
each ブロックの each イテレーションに 一意な識別子 (または"key") を指定できる  
後ろに () で書く  
`{#each things as thing (thing.id)}`  

非同期のデータを扱う時は マークアップの中(HTML の中)で操作できる  
また 直近の promise だけが処理されるので 他の非同期処理の状態を気にしなくてよい  
```svelte
{#await promise}
  <p>...waiting</p>
{:then aaa}
  <p>The number is {aaa}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
```
promise が reject できないことがわかっている場合は catch ブロックを省略できる  
また promise が resolve するまで何も表示したくない場合は 最初のブロックを省略する  
```svelte
{#await promise then aaa}
  <p>The number is {aaa}</p>
{/await}
```
### 05_events
イベント は `on:` ディレクティブを使って 要素の任意の DOM イベント(click や pointermove) を 検知できる  
```svelte
<script>
  let m = { x: 0, y: 0 };

  function handleMove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div on:pointermove={handleMove}>
  The pointer is at {m.x} x {m.y}
</div>
```
インラインで実装することもできる  
```svelte
<script>
	let m = { x: 0, y: 0 };
</script>

<div
	on:pointermove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer is at {m.x} x {m.y}
</div>
```
一部のフレームワークでは パフォーマンス上の理由(特にループ処理内)から イベントハンドラ を インラインで宣言しないように推奨されてる  
しかし Svelte 適切にコンパイルするため 気にしなくて良い  

DOM イベントハンドラには それらの動作を変更する 修飾子(modifiers)が設定できる  
イベント修飾子を連結することも可能 `on:click|once|capture={...}`  
`|` の前後にハイフン入れるとエラーになる  

イベント修飾子の一覧  
- preventDefault  
ハンドラを実行する前に event.preventDefault() を呼び出します。たとえば、クライアントのフォーム処理に役立ちます。  
- stopPropagation  
次の要素にイベントが伝播しないように event.stopPropagation() を呼び出します。  
- passive  
タッチ/ホイールイベントでスクロールのパフォーマンスを向上させます（Svelte が安全な場所に自動的に追加します）。  
- nonpassive  
passive: false を明示的に設定します。  
- capture  
バブリング(bubbling) フェーズではなく、キャプチャ(capture) フェーズ中にハンドラを起動します。  
- once  
ハンドラを最初に実行した後に削除します。  
- self  
設定した要素が event.target の場合にのみ、ハンドラをトリガします。  
- trusted  
event.isTrusted が true の場合にのみハンドラをトリガします。つまり、JavaScript が element.dispatchEvent(...) を呼び出した場合は true にならず、ユーザーのアクションによってイベントがトリガされた場合は true になります。  

コンポーネント から イベント を発信することもできる  
そのときは ディスパッチャ を作成する  
`createEventDispatcher` はコンポーネントを最初にインスタンス化するときに呼び出す必要がある  
これにより `dispatch` をコンポーネントインスタンスに関連づける  

コンポーネント の イベント は バブル しない  
もし深くネストされた コンポーネント で イベント を リッスン する場合 中間コンポーネント は イベント を フォワード する必要がある  
その方法は `createEventDispatcher` を追加して フォーワードしたい イベント(message や greet)をリッスンして そのハンドラを作成すること  
イベントフォワーディング は ディスパッチャ 以外にも DOM イベント(click など)でも使える  
`<button on:click>Push</button>` で伝播していく  
### 06_Bindings
原則 Svelte のデータフローはトップダウン  
親コンポーネント から 子コンポーネント に プロパティをセット, 要素に属性をセットできる  
子コンポーネント から 親コンポーネント はできない  
子コンポーネント から 親コンポーネント に情報を伝える方法として バインド がある  
フォームの select みたいに オブジェクト(id と text のオブジェクト) でも バインド できる  
`type="radio"` や `type="checkbox"` で input が複数あるとき value 属性と一緒に `bind:group={なんとか}` が使える  
同じグループの radio input は互いに排他的(exclusive)になる  
同じグループの checkbox input は選択した値の配列になる  
`<select multiple>` にすると プルダウンが全部表示された状態になる  
textarea も同じように `<textarea bind:value={value}></textarea>` と書ける  
属性と変数名が一致する場合は 省略形で書ける `<textarea bind:value></textarea>`  
### 07_Lifecycle
すべての コンポーネント は 開始(作成されるとき)と 終了(破棄されるとき)のライフサイクルがある  
タイミングによってコードを実行できるようにする関数がある  

`onMount` 関数は コンポーネントが最初に DOM にレンダリングされた後に実行される  
`onMount` を使うためには `import { onMount } from "svelte";` する  
`onMount(() => {処理});` 
コンポーネントが破棄されたときのために `onMount` の処理の中からクリーンアップ用の関数を返す必要ある  
`return () => {cancelAnimationFrame(frame);};`  

`beforeUpdate` 関数は DOM が更新される直前に動く  
`beforeUpdate` は コンポーネント が最初にマウントされる前に実行されるので プロパティ を読み込む前に div があるかチェックしたりする  
`afterUpdate` 関数は DOM がデータと同期した後にコードを実行するために使う  
この2種は 自動スクロールなので使ったりするっぽい  

`tick` 関数は 他のライフサイクル関数と異なり いつでも呼び出すことができる  
保留中の状態変更が DOM に適用されるとすぐに (保留中の状態変更がない場合はすぐに) resolve して promise を返す  
ブラウザでバッチ処理を行うときに使ったりする  
### 08_Stores
アプリケーションの すべての状態 が コンポーネント階層の内部にあるとは限らない  
場合によっては 関連のない複数のコンポーネント や 通常の JavaScript モジュール から アクセスする必要のある値がある  
Svelte では そのアクセスを store(ストア) で行う  
store とは 値が変化するたびに 関係者に通知する subscribe メソッドを備えたオブジェクト  

`import { writable } from 'svelte/store';` で変数が定義されていたら `set()` と `update()` も兼ね備えている  
コンポーネントが何度もインスタンス化および破棄されるなら メモリリーク が発生することになるので アンサブスクライブ が必要  
subscribe メソッドを呼ぶと unsubscribe 関数が返るため それを変数に格納し `onDestroy(変数);` とする  
ただ Svelte には 便利や使い方が用意されていて store の名前の前に `$` を付けることで、store の値を参照できる  
store 名の前に `$` をつけることで 毎回呼び出して コンポーネントを生成するのではなく 参照で済むし 自動サブスクリプションになる  

読み込み専用の store として readable がある  
`import { readable } from 'svelte/store';` の readable は 第1引数 が 初期値, 第2引数 が set コールバックを受け取り stop 関数を返す start 関数  
start 関数 は 最初 の サブスクライバー が store を 取得したときに呼ばれる  
stop 関数 は 最後 の サブスクライバー が サブスクライブ を 解除したときに呼ばれる  

他の store に基づいた値の store を作成する derived がある  

自作の sotre を作成することもできる  
オブジェクトが subscribe メソッド をもっていればよい  

ローカルコンポーネントの状態にバインドするのと同じように store の値もバインドできる  
## Advanced Svelte
### 07_ComponentComposition
要素を入れ子にできるように コンポーネント 入れ子にできる  
そのとき コンポーネント 内のどこに 入れ子にするか 指定するために `<slot />` を書く
## Basic SvelteKit
### 01_Introduction
Svelte は コンポーネントフレームワーク  
SvelteKit は アプリケーションフレームワーク  
- ルーティング  
- サーバーサイドレンダリング  
- データ取得  
- Service workers  
- TypeScript インテグレーション  
- プリレンダリング  
- シングルページアプリ  
- ライブラリのパッケージング  
- プロダクション向けビルドの最適化  
- 様々なホスティングプロバイダーへのデプロイ  
SvelteKit アプリ は デフォルト では (従来の 'マルチページアプリ': MPA) サーバーでレンダリングを行う -> 優れた初期ロードパフォーマンスと SEO 特性  
初回のロードのあとは クライアントサイドナビゲーション(モダンな 'シングルページアプリ': SPA)に移行する -> ユーザーが移動する際の不愉快なフルリロードを回避  
package.json で `"type": "module"` になっているため デフォルトで JS ファイルは レガシーな CommonJS フォーマット ではなく ネイティブ の JavaScript モジュール として扱われる  
src はアプリのソースコードを置く場所  
src/app.html はページのテンプレート (SvelteKit が %sveltekit.head% と %sveltekit.body% を適切に置き換えます)  
src/routes はアプリの ルート(routes) を定義  
static にはアプリをデプロイするときに含めるべきアセット (favicon.png や robots.txt など)  
### 02_Routing
SvelteKit はファイルシステムベースのルーティング(Routing)を採用  
src/routes 内にあるすべての +page.svelte ファイルは、アプリのページを作成  
UI を共有する場合 同じディレクトリ内のすべてのルートに適用される +layout.svelte コンポーネント を使用する  
動的なパラメータ付きのルート(routes) は 角括弧を使用して有効な変数名を囲む  
`src/routes/blog/[slug]/+page.svelte` というファイルは、/blog/one, /blog/two, /blog/three などにマッチするルート(route)を作成  
少なくとも1つの静的な文字で区切られていれば 1つの URL セグメント内に複数のルートパラメータを使用することができる  
例: `foo/[bar]x[baz]` だと `[bar]` と `[baz]` は動的なパラメータ  
### 03_Loading
SvelteKit が行う仕事は 本質的には 次の3つに集約  
- ルーティング(Routing) - 受け取ったリクエストにどのルートがマッチするかを判断する  
- ローディング(Loading) - ルートが必要とするデータを取得する  
- レンダリング(Rendering) - (サーバー上で) HTML を生成する または (ブラウザで) DOMを更新する  

ここでは Loading の説明をする  
+page.svelte ファイルと同じ階層に +page.server.js ファイルを作成し load 関数を宣言できる  
このモジュールはサーバーでのみ実行される  
+layout.server.js ファイルは全ての子ルート(route)共通で使えるデータをロードする  
### 04_headers and cookies
load 関数の中で setHeaders 関数を使用することができる  
後で学習する form actions, hooks, API routes も同様に使用できる  
setHeaders 関数で Set-Cookie は使用できない  
代わりに cookies API を使用する  
load 関数では `cookies.get(name, options)` で cookie を読み取ることができる  
cookie を設定するには `cookies.set(name, value, options)`  
cookie を設定するときは path を明示的に設定することを強く推奨  
なぜなら ブラウザのデフォルトの挙動は 現在のパスの親に cookie を設定するから  
SvelteKit では cookie をセキュアにするために 以下をデフォルトで設定  
```js
{
	httpOnly: true,
	secure: true,
	sameSite: 'lax'
}
```
### 05_Shared modules
SvelteKit では `src/lib` に `$lib` エイリアスが設定されている  
コードは使う場所のすぐ近くに置くのがよいが 複数の場所で使われるコードもあるから  
そのときに プレフィックスで `../` を連続して 書かなくて済むようになる  
