## 情報の整理
Svelte の最新バージョンは 4
SvelteKit の最新バージョンは 1?
### Svelte の始め方
https://svelte.jp/docs/introduction
1. `npm create svelte@latest myapp`
SvelteKit が始まる
Svelte チームは SvelteKit の使用を推奨

2. `npm create vite@latest`
SvelteKit を使いたくない場合のやり方
Vist の機能として サーバを起動するときに `npm run dev -- --host --port=8080` で localhost 以外(Docker の外)から接続できるようになる
3. `npx degit sveltejs/template アプリ名`
検索したら ちらほら見かける方法
ただ 過去に Svelte 公式で書かれていたが 現在は見当たらない
SvelteKit はインストールされないっぽい
アーカイブされているから使わないほうが良さそう
https://github.com/sveltejs/template
>デフォルトでは、サーバーは localhost からのリクエストにのみ応答します。
>他のコンピュータからの接続を許可するには、package.json の sirv コマンドを編集して --host 0.0.0.0 オプションを含めます。
package.json を `"start": "sirv public --no-clear --host=0.0.0.0 --port 8080"` 書き換え
そして `npm run dev` すれば動く
### ビルドに関して
SvelteKit はコードをビルドするのに Vite を使用
いずれにしても `npm install` は実行したほうば無難そう


### Docker の操作
`> docker pull node:20`
Dockerfile の作成
docker-compose.yml の作成
node_modules のファイル数が多いから ローカル と Docker 内で同期させたくない
過去に React で作ったときの docker-compose を参考にした
ただ Docker のボリュームとして 毎回生成されることに注意
https://github.com/ozaki-physics/react-training/blob/develop/docker-compose.yml
`> docker-compose build`
`> docker-compose up -d`
`> docker-compose exec svelte_training bash`
`# node -v`
v20.11.0
`# npm -v`
10.2.4
`# npm create svelte@latest svelte-training`
```console
Need to install the following packages:
create-svelte@6.0.8
Ok to proceed? (y) y

create-svelte version 6.0.8

┌  Welcome to SvelteKit!
│
◇  Directory not empty. Continue?
│  Yes
│
◇  Which Svelte app template?
│  Skeleton project
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  Select additional options (use arrow keys/space bar)
│  Add ESLint for code linting
│
└  Your project is ready!

✔ Typescript
  Inside Svelte components, use <script lang="ts">

✔ ESLint
  https://github.com/sveltejs/eslint-plugin-svelte

Install community-maintained integrations:
  https://github.com/svelte-add/svelte-add

Next steps:
  1: cd svelte-training
  2: npm install
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open

To close the dev server, hit Ctrl-C

Stuck? Visit us at https://svelte.dev/chat
npm notice
npm notice New minor version of npm available! 10.2.4 -> 10.4.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.4.0
npm notice Run npm install -g npm@10.4.0 to update!
npm notice
```
`# cd svelte-training`
`# npm install`
```console
added 223 packages, and audited 224 packages in 32s

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
`# npm run dev -- --host --port=8080`
Docker の 8080 を ローカルの 5000 に繋いでいるから http://localhost:5000/ でアクセスできる
### Vite とは
https://ja.vitejs.dev/
Vue.js の作者によって作られた バンドルツール 兼 ローカル開発サーバを作るツール
https://ja.vitejs.dev/guide/
>現代の Web プロジェクトのために、より速く無駄のない開発体験を提供することを目的としたビルドツールです。
>2 つの主要な部分で構成されています:
>- 非常に高速な Hot Module Replacement (HMR) など、ネイティブ ES モジュールを利用した豊富な機能拡張を提供する開発サーバー。
>- Rollup でコードをバンドルするビルドコマンド。プロダクション用に高度に最適化された静的アセットを出力するように事前に設定されています。

内部で バンドルツール としては esbuild と Rollup を使っている
esbuild は Go で実装されているビルドツール

[Vite を使う理由](https://ja.vitejs.dev/guide/why.html)
将来的には Rolldown と呼ばれる Rollup の Rust ポートを構築する取り組みが進行中
[次世代バンドルツールの競争の今 Turbopack vs Vite](https://recruit.gmo.jp/engineer/jisedai/blog/turbopack-vs-vite/)
### バンドルとは
モジュールを1つの js ファイルにまとめること もしくは1つにまとめたファイルのこと
モジュール とは 機能ごとに分割されたファイルのこと
JS には モジュール機能が ES2015 まで標準で無かった
だから 標準で実装される前まで まとめる(バンドル)ツールが必要だった
### Rollup とは
JavaScript をバンドルするツール
### Webpack とは
JavaScript をバンドルするツール
現在 開発は事実上終了している
開発者は Next.js の開発企業である Vercel に移籍して 後継となる Turbopack を開発
### Turbopack とは
バンドルツール
まだアルファ版など 安定してない
内部で Turbo engine を使ってバンドルやビルドの時間を早くしようとしている
Turbo engine は Rust で実装されているビルドツール
### Babel とは
JavaScript をトランスコンパイルするツール
### Gulp とは
タスクランナーツール
Node.js のプラグインとして開発されている
### degit とは
https://github.com/Rich-Harris/degit
git リポジトリのコピーを作成するツール
git clone より早い なぜなら git の履歴全体をダウンロードするわけではないから

degit は使いたいが degit 自体を環境内にインストールしたくない場合 は degit の前に npm や npx をつける
### npx とは
npm: Node Package Manger
npx: Node Package Executer
ローカルにインストールされていない機能を一時的にインストールして実行するためのコマンド
npm との違いはインストールされてないパッケージでも 自動的に探してインストールして実行して インストールしたパッケージの削除をします
npx とは npm バージョン 5.2.0 より同梱されているコマンド
### メモ
【2024年】Svelte + Vite + TailwindCSSの環境構築
https://zenn.dev/y_ta/articles/9b9d4954ce5bac

DockerでVue(Vite使用)の環境構築をしたが、docker-compose upをしてもVueの画面が表示されない時の対処法
https://qiita.com/ginger-yell/items/602091d7010f77fbb47a
```javascript (vite.config.js)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  //ここを追加！
  server: {
    host: true
  },

  plugins: [vue()]
})
```
### SvelteKit とは (What's the deal with SvelteKit?)
https://svelte.jp/blog/whats-the-deal-with-sveltekit
SvelteKit の前身は Svelte チームが開発していた Sapper というのがあった
>前提の1つは、アプリをビルドするのに webpack や Rollup のようなモジュールバンドラーを使う必要

>確かにここ数年はバンドラーが必要でした。ブラウザーが import キーワードをネイティブにサポートしていなかったからです。しかし今日ではそれほど当てはまりません。
>現在では、 バンドルしない 開発ワークフローが台頭しており、これは根本的にシンプルです。
>アプリをバンドルする代わりに、開発サーバーが (必要に応じて JavaScript に変換された) モジュールを オンデマンド でサーブします。
>つまり、アプリが大きくなったとしても基本的にはすぐに起動できることを意味します。

>他の基本的な前提としては、サーバーレンダリングされたアプリには、サーバーが必要である、というものがあります。
>Sapper には事実上2つのモードがあります。
>Nodeサーバー上で実行されるスタンドアローンアプリを作る sapper build と、アプリを GitHub Pages のようなサービスでのホスティングに適した静的ファイルのコレクションに仕上げる sapper export です。
>SvelteKit はサーバーレスパラダイムを完全に取り入れており、メジャーなサーバーレスプロバイダを全てサポートする予定です。
>公式には対応していないプラットフォームをターゲットにするための 'adapter' API も用意されます。さらに、部分的なプリレンダリングも可能になるでしょう。
>つまり、静的なページはビルド時に生成することができ、動的なページはオンデマンドでレンダリングするということです。
### Web standards
https://kit.svelte.jp/docs/web-standards
>SvelteKit は、ネットワーク越しにデータを取得するために fetch を使用します。
>ブラウザだけでなく、hooks や サーバールート(server routes) の中でも使用することができます。
### Static site generation
https://kit.svelte.jp/docs/adapter-static
>SvelteKit を static site generator (SSG) として使用するには、adapter-static を使用します。
>この adapter はサイト全体を静的なファイルのコレクションとしてプリレンダリングします。
>もし、一部のページのみをプリレンダリングして他のページは動的にサーバーでレンダリングしたい場合、別の adapter と prerender オプション を組み合わせて使用する必要があります。
### Svelte FAQ
https://svelte.jp/faq
>公式のルーティングライブラリは SvelteKit です。
>SvelteKit は、ファイルシステムルーター、サーバーサイドレンダリング(SSR)、ホットモジュールリローディング(HMR)を1つの使いやすいパッケージで提供します。
### SvelteKit FAQ
https://kit.svelte.jp/docs/faq
>SvelteKitで何が作れますか？
>- ロード関数とAPIルートによる動的ページコンテンツ。
>- サーバーサイドレンダリング(SSR)を使用したSEOフレンドリーな動的コンテンツ。
>- SSRとフォームアクションによる、ユーザーフレンドリーな段階的インタラクティブページ。
>- プリレンダリングによる静的ページ
>また、SvelteKitはアダプタを介して幅広いホストアーキテクチャにデプロイすることができます。
>SSRを使用する場合（またはプリレンダリングなしでサーバサイドのロジックを追加する場合）、それらの機能はターゲットバックエンドに適応されます。いくつかの例を挙げます：
>- Node.jsバックエンドによるセルフホストダイナミックWebアプリケーション。
>- バックエンドローダーと API をリモート関数としてデプロイしたサーバーレス Web アプリケーション。一般的なデプロイメントオプションについては、ゼロコンフィグデプロイメントを参照してください。
>- CDN や静的ホストでホストされたブログやマルチページサイトのような[静的なプリレンダリングサイト](https://kit.svelte.jp/docs/adapter-static)。静的に生成されたサイトはバックエンドなしで出荷されます。
>- API ドリブンな動的コンテンツのためのクライアントサイドのルーティングとレンダリングを備えた[シングルページ・アプリケーション（SPA）](https://kit.svelte.jp/docs/single-page-apps)。SPA はバックエンドなしで出荷され、サーバーレンダリングされません。このオプションは、PHP、.Net、Java、C、Golang、Rustなどで書かれたアプリにSvelteKitをバンドルする場合によく選択されます。
>- いくつかのルートは静的であり、いくつかのルートは動的な情報を取得するためにバックエンド関数を使用できます。これはSSRをオプトアウトするオプションを含むページオプションで設定できます。

>SSRをサポートするには、Node.jsやDenoベースのサーバー、サーバーレス関数、エッジ関数などのJSバックエンドが必要です。
>また、特殊なサーバー環境、ブラウザ拡張機能、ネイティブアプリケーションなど、より多くのプラットフォームにSvelteKitをデプロイするために、カスタムアダプターを書いたり、コミュニティアダプターを活用することも可能です。その他の例や統合については、統合をご覧ください。

別のバックエンド API サーバーを使用するにはどうすれば良いですか？
https://kit.svelte.jp/docs/faq#how-do-i-use-x-with-sveltekit-how-do-i-use-a-different-backend-api-server
>外部の API サーバーにデータをリクエストするのに event.fetch を使用することができますが、
>CORS に対応しなければならず、一般的にはリクエストのプリフライトが必要になり、結果として高レイテンシーになるなど、複雑になることにご注意ください。
>別のサブドメインへのリクエストも、追加の DNS ルックアップや TLS セットアップなどのためにレイテンシーが増加する可能性があります。この方法を使いたい場合は、handleFetch が参考になるかもしれません。
>別の方法は、頭痛の種である CORS をバイパスするためのプロキシーをセットアップすることです。
>本番環境では、/api などのパスを API サーバーに書き換えます(rewrite)。ローカルの開発環境では、Vite の server.proxy オプションを使用します。
