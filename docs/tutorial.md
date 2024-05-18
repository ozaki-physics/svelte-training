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
ハンドラを実行する前に event.preventDefault() を呼び出します。たとえば クライアントのフォーム処理に役立ちます。  
- stopPropagation  
次の要素にイベントが伝播しないように event.stopPropagation() を呼び出します。  
- passive  
タッチ/ホイールイベントでスクロールのパフォーマンスを向上させます（Svelte が安全な場所に自動的に追加します）。  
- nonpassive  
passive: false を明示的に設定します。  
- capture  
バブリング(bubbling) フェーズではなく キャプチャ(capture) フェーズ中にハンドラを起動します。  
- once  
ハンドラを最初に実行した後に削除します。  
- self  
設定した要素が event.target の場合にのみ ハンドラをトリガします。  
- trusted  
event.isTrusted が true の場合にのみハンドラをトリガします。つまり JavaScript が element.dispatchEvent(...) を呼び出した場合は true にならず ユーザーのアクションによってイベントがトリガされた場合は true になります。  

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
ただ Svelte には 便利や使い方が用意されていて store の名前の前に `$` シンボル を付けることで store の値を参照できる  
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
[サンプル](../app/src/routes/advanced-svelte/07_ComponentComposition)  
要素を入れ子にできるように コンポーネント 入れ子にできる  
そのとき コンポーネント 内のどこに 入れ子にするか 指定するために `<slot />` を書く  
`<slot>foo</slot>` にすると slot が空のとき foo が表示される  
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
src/routes 内にあるすべての +page.svelte ファイルは アプリのページを作成  
UI を共有する場合 同じディレクトリ内のすべてのルートに適用される +layout.svelte コンポーネント を使用する  
動的なパラメータ付きのルート(routes) は 角括弧を使用して有効な変数名を囲む  
`src/routes/blog/[slug]/+page.svelte` というファイルは /blog/one, /blog/two, /blog/three などにマッチするルート(route)を作成  
少なくとも1つの静的な文字で区切られていれば 1つの URL セグメント内に複数のルートパラメータを使用することができる  
例: `foo/[bar]x[baz]` だと `[bar]` と `[baz]` は動的なパラメータ  
### 03_Loading data
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
[サンプル](../app/src/routes/deeply/nested/+page.svelte)  
SvelteKit では `src/lib` に `$lib` エイリアスが設定されている  
コードは使う場所のすぐ近くに置くのがよいが 複数の場所で使われるコードもあるから  
そのときに プレフィックスで `../` を連続して 書かなくて済むようになる  
### 06_Forms
[サンプル](../app/src/routes/todo)  
web プラットフォームにおけるデータ送信方法である `<form>`  
Enter を押すと 勝手に データベースが更新され 新しいデータでページがリロードされる  
この動作に `fetch` など動かしておらず それにも関わらずデータが更新されていることが凄い  
つまり JavaScript が利用できない環境でも動作する  

1つのページに複数の action を持たせる場合が多く 単一の action しかないページは稀  
`+page.server.js` の default アクション を 名前付きにする  
default action と 名前付きの action は 共存できない  

form の action 属性には任意の URL を指定できる  
別のページで定義されている action を呼び出したければ `/todos?/create` と指定する  
同一のページに action が あるとき パス名を省略して 先頭が `?` から始められる  

バリデーション は ブラウザに組み込まれたフォームバリデーション(built-in form validation) がある  
例えば `<input>` を必須項目としてマークすることができる  
でも ちゃんと サーバサイド のバリデーション も 実装する必要がある  

サーバのコンソールにエラーを出しても ユーザー には不親切  
同じページを表示させたまま何が問題だったのかを示し ユーザーがそれを修正できるようにするほうが良い  
これを行うために fail 関数を使用して action からデータと適切な HTTP ステータスコードを返すことができる  
`src/routes/+page.svelte` では form プロパティを介して  
`app/src/routes/todo/+page.server.js` の actions 戻り値にアクセスすることができる  
form プロパティ には フォーム送信後のときだけ 値が入っている  

fail でラップしなくても action から値を返すこともできる  
例えば データが保存されたときに 'success!' というメッセージを返すなど  

ユーザーが JavaScript を有効にしているときは  
a タグ を シングルページアプリケーション として動かすように  
form タグ を 送信しても ページリロード しないようにできる方法がある  
それが form タグ に追加する `use:enhance`  
ページをリロードするのではなく更新するようなったので トランジションなどで装飾することができる  
シングルページアプリケーションのような ページ遷移 に見せない動作のことを チュートリアル上では ブラウザネイティブな動作をエミュレート と表現している  

ブラウザネイティブな動作をエミュレート ができるようになると コールバックを提供して 待機状態 など表現できるようになる  
### 07_API routers
[サンプル](../app/src/routes/api-router)  
+server.js ファイルを追加して HTTP メソッドと同じ文字列の関数を エクスポートするだけで API Router が作れる  
リクエストハンドラは Response オブジェクトを返さないといけない  

JSON で返すとき レスポンスヘッダー などを JSON 用にしてくれる ライブラリ が SvelteKit にある  

```js
export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
```

上記の代わりに下記で済む  

```js
import { json } from '@sveltejs/kit';

export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return json(number);
}
```

POST も書けるけど JS なしでも動作するし form action の方が推奨らしい  
REST API にするために URL も `/[id]/+server.js` の中に PUT や DELETE メソッドを書くとよい  
### 08_Stores
Svelte の Store は 個々のコンポーネントに属さない データを おいておける  
SvelteKit では 3つの読み取り専用 store を $app/stores から使用できる(page, navigating, updated)  
一番多く使うのは page  
https://kit.svelte.jp/docs/types#public-types-page  

- url : 現在のページの URL  
- params : 現在のページのパラメータ  
- route : 現在のルート(route)を表す id プロパティを持つオブジェクト  
- status : 現在のページの HTTP ステータスコード  
- error : 現在のページのエラーオブジェクト (エラーが存在する場合。以降の演習でエラーハンドリングを学習する予定です)  
- data : 現在のページの data。全ての load 関数からの戻り値が足されたもの  
- form : form action から返されるデータ  

他の store と同様 コンポーネントでは `$` シンボルを先頭に付けることでその値を参照できる  
現在のパス名は `$page.url.pathname`  

次は navigating  
例えばリンクをクリック, ブラウザの '戻る/進む', プログラムで goto を呼んだとき に navigating の値は以下のプロパティを持つオブジェクトになる  
https://kit.svelte.jp/docs/types#public-types-navigation  

- from : ナビゲーションがトリガーされた場所 : NavigationTarget オブジェクト or null  
- to : ナビゲーションの行き先/行った先 : NavigationTarget オブジェクト or null  
- type : ナビゲーションのタイプ(例えば link, popstate, goto)  

NavigationTarget オブジェクト が params, route, url プロパティを持つ  

最後は updated  
最初にページを開いてからそれ以降にアプリの新バージョンがデプロイされたかどうかを表す true or false を持つ  
これを動作させるには `svelte.config.js` で `kit.version.pollInterval` を指定する必要がある  
`pollInterval` と関係なく 手動で新バージョンがデプロイされたかチェックする方法は `updated.check()` を呼び出す  
### 09_Errors and redirects
SvelteKit には2種類のエラーがある  
- 想定される(expected) エラー  
- 予期せぬ(unexpected) エラー  

想定されるエラーは `@sveltejs/kit` からインポートできる error ヘルパーを使用して作成できる  
想定されるエラーのメッセージはユーザーに表示されますが 予期せぬエラーのメッセージは編集されて 一般的な 'Internal Error' メッセージと 500 ステータスコードになる  
なぜなら エラーメッセージには機密情報が含まれている可能性があるから  

load 関数の内側でなにか問題が発生したとき SvelteKit はエラーページをレンダリングする  
`src/routes/+error.svelte` コンポーネントを作成することで エラーページをカスタマイズできる  
+error.svelte は +layout.svelte の内側でレンダリングされる  
ディレクトリごとに +error.svelte を作成できる  

もし 深刻な 問題が発生した場合 SvelteKit は静的なエラーページにフォールバックする  
深刻な問題とは 例えば最上位(root)のレイアウトでデータをロードしているとき, エラーページのレンダリング中にエラーが発生した場合など  
試しに発生させる方法は `src/routes/+layout.server.js` の `load()` で `thow new Error("foo");` や `throw error(420, 'まぁまぁ落ち着け');` をする  
すると `500 | Internal Error` とシンプルなデザインのページになる  
この フォールバックエラーページ は `src/error.html` ファイルを作ってカスタマイズすることも可能  
`src/error.html` は 以下の項目を含めることができる  

- `%sveltekit.status%` : HTTP ステータスコード  
- `%sveltekit.error.message%` : エラーメッセージ  

throw のメカニズムを あるページから別のページにリダイレクトするのにも流用できる  
`import { redirect } from '@sveltejs/kit';` で `throw redirect(307, '/home');` する  
よく使用されるステータスコードは以下がある  

- 303 : form actions で 送信に成功したあと続いて使用されます  
- 307 : 一時的なリダイレクトに使用されます  
- 308 : 恒久的なリダイレクトに使用されます  

`throw redirect(...)` は load 関数, form actions, API ルート, handle hook の内側 で使うことができる  
## Advanced SvelteKit
### 02_Page options
+page.js, +page.server.js, +layout.js, +layout.server.js ファイルから load 関数をエクスポートする方法を Loading data の章で学んだ  
これらのモジュールからは 他にも 様々な ページオプション をエクスポートできる  
- ssr — ページをサーバーレンダリングするかどうか
- csr — SvelteKit client をロードするかどうか
- prerender — リクエストの度にレンダリングする代わりに ビルド時にページをプリレンダリングするかどうか
- trailingSlash — URL の末尾のスラッシュ(trailing slashes)を, 削除するか, 追加するか, 無視するか

ページオプションは ページごと, ページのグループごと, アプリ全体 でも適用できる  
- ページごと: +page.js や +page.server.js からエクスポート  
- ページのグループごと: +layout.js や +layout.server.js からエクスポート  
- アプリ全体 最上位のレイアウト(root layout) からエクスポート  

基本は親レイアウトで設定された値でオーバーライドする  
マーケティング用のページはプリレンダリング, データドリブンなページは動的にサーバーでレンダリング, 管理者用ページはクライアントレンダリングされる SPA など使い分けができる  

サーバーサイドレンダリング (Server-side rendering, SSR)  
サーバーで HTML を生成するプロセス  
SvelteKit の デフォルト は SSR  
SSR を無効にするためには その階層の `+page.server.js` で `export const ssr = false;` を書く  
ルートの `+layout.server.js` で `ssr=false` にすると アプリ全体が シングルページアプリ(SPA) になる  

クライアントサイドレンダリング(CSR)  
ページをインタラクティブにし SvelteKit がナビゲーション時にフルページリロードなしでページを更新できる  
CSR を無効にするためには その階層の `+page.server.js` で `export const csr = false;` を書く  
無効にすると JavaScript がクライアントに全く提供されなくなるため インタラクティブでなくなる  

プリレンダリング  
リクエストのたびに動的にレンダリングするのではなく ビルド時に1度だけ HTML を生成する  
メリット は 静的データの配信が 圧倒的にパフォーマンス良くなる  
cache-control ヘッダー (これは間違いやすいことです) のことを気にすることない  
デメリット は ビルドに時間がかかる, プリレンダリングされたコンテンツの更新に アプリを再度デプロイするしかない  
プリレンダリングにするには `+page.server.js` で `export const prerender = true;` を書く  
最上位(root)の `+layout.server.js` で `prerender=true` にすると SvelteKit は 静的サイトジェネレーター (static site generator, SSG) になる  

末尾のスラッシュ  
SEO に悪影響を与えたりと 雑に扱ってはならない  
今見ているページが `/foo` で `./bar` に移動したときは `/bar` に行く  
今見ているページが `/foo/` で `./bar` に移動したときは `/foo/bar` に行く  
SvelteKit はデフォルトで 末尾のスラッシュを削除 する  
つまり /foo/ に対するリクエストは /foo にリダイレクト する  
末尾のスラッシュが常に存在したいときは `+page.server.js` で `export const trailingSlash = 'always';` を書く  
デフォルトの値は `trailingSlash='never'`  
末尾のスラッシュ は プリレンダリング に影響する  
`/always/` のような URL は `always/index.html` として ディスクに保存される  
`/never` のような URL は `never.html` のように保存される  
### 04_Advanced routing
ログインが必要なページと否なページを分けられる  
[サンプル](../app/src/routes/advanced-sveltekit/04_advanced-routing)  
URL のルーティングに影響しないで 共通のレイアウトを使いたいとき ルートグループ(route group) が便利  
ルートグループ は 丸括弧でくくられたディレクトリ  
共通のログインの仕組みなどを用意できる  
### 06_Environment variables
API キーやデータベースの認証情報などの環境変数は .env ファイルに追加することでき アプリケーションから使えるようになる  
[パス](../app/.env)  
gitignore するのを忘れないようにすること  
`import { PASSPHRASE } from '$env/static/private';` で呼び出せるようになる  
PASSPHRASE は .env に書いた key  
`$env/static/private` は 間違えて ブラウザに送信しないように `+page.svelte` のクライアントサイドコードに インポートを書くとエラーになる  
インポートできるのは サーバモジュールのみ  
- +page.server.js  
- +layout.server.js  
- +server.js  
- .server.js で終わるモジュール  
- src/lib/server に置いてあるモジュール  

`$env/static/private` は これらの値がビルド時に解決され 静的に置き換えられる ことを示す  
アプリの実行時に環境変数の値を読む必要があるときは `$env/dynamic/private` を使う  
`import { env } from '$env/dynamic/private'` と書いて JS コードは env.KEY と書く  

ブラウザに公開してもよい 環境変数は `PUBLIC_` プレフィックス をつける  
そして `+page.svelte` で `import { PUBLIC_THEME_FOREGROUND } from '$env/static/public';` と書く  
先ほどと同様に アプリ実行時に解決したいときは `import { env } from '$env/dynamic/public';` と書く  

## 感覚的なメモ
`+page.svelte` が その path でのページ  
`+page.server.js` が `+page.svelte` のロード時に呼び出すものや HTML の Form の アクションを定義したりする  
`+server.js` は その path のときに動く サーバ側のコード  
