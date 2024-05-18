import { error } from '@sveltejs/kit';

// デフォルト だけど 明示的に書いてみる
// false にすると シングルページアプリ(SPA) になる
export const ssr = true;
// false にすると JS が配信されなくなり インタラクティブじゃなくなる
export const csr = true;
// ture にすると 静的サイトジェネレーター(SSG) になる
export const prerender = false;
// URL 末尾のスラッシュを削除する
// SSG で ディレクトリごとの index.html を作りたいなら always にする
// スラッシュを雑に扱ってはダメで 基本 は never でよい
export const trailingSlash = 'never';

export function load() {
	// 静的な error.html を見たいときに使う
	// throw error(420, 'まぁまぁ落ち着け');
}
