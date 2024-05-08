import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

// ページ読み込み時に動くメソッド
export function load({ cookies }) {
  let id = cookies.get('userid');

  if (!id) {
    id = crypto.randomUUID();
    cookies.set('userid', id, { path: '/' });
  }

  return {
    // DB から取ってくる
    todos: db.getTodos(id)
  };
}

// form タグの アクション属性 と Key 名を一致させると それが動く
export const actions = {
  // form での create アクション のとき動く
  create: async ({ cookies, request }) => {
    // form データの取得
    const data = await request.formData();

    try {
      // DB に保存する エラーが throw される可能性がある
      db.createTodo(cookies.get('userid'), data.get('description'));
    } catch (/** @type any */ error) {
      // fail 関数を使うと HTTP ステータスコードを返せる
      return fail(422, {
        description: data.get('description'),
        error: error.message
      });
    }
  },

  // form での delete01 アクション のとき動く
  delete01: async ({ cookies, request }) => {
    // form データの取得
    const data = await request.formData();
    db.deleteTodo(cookies.get('userid'), data.get('id'));
  }
};
