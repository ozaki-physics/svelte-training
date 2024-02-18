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
`# npm -v`
`# npm create svelte@latest svelte-training`
```console
create-svelte@6.0.8
Ok to proceed? (y) y

create-svelte version 6.0.8

┌  Welcome to SvelteKit!
│
◇  Which Svelte app template?
│  Library project
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
`# npm run dev -- --host --port=8080`
### Vite とは
https://ja.vitejs.dev/
Vue.js の作者によって作られた バンドルツール 兼 ローカル開発サーバを作るツール

内部で バンドルツール としては esbuild と Rollup を使っている
将来的には バンドルツールを esbuild に統一したいらしい?
esbuild は Go で実装されているビルドツール
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
