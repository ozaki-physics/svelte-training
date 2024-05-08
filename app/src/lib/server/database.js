// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.
// 実際のアプリでは、このデータはメモリ上ではなくデータベースに保存される。しかし、今はごまかす。
const db = new Map();

/**
 * 取得する
 * @param {any} userid
 */
export function getTodos(userid) {
  if (!db.get(userid)) {
    db.set(userid, [{
      id: crypto.randomUUID(),
      description: 'SvelteKit を勉強する',
      done: false
    }]);
  }

  return db.get(userid);
}

/**
 * 作成する
 * @param {any} userid
 * @param {any} description
 */
export function createTodo(userid, description) {
  // サーバサイドとしてのバリデーション
  if (description === '') {
    throw new Error('必ず なにか入力してください');
  }

  const todos = db.get(userid);

  // 内容としてのバリデーション
  if (todos.find((/** @type {{ description: any; }} */ todo) => todo.description === description)) {
    throw new Error('ToDo の内容はユニークじゃないとダメ');
  }

  todos.push({
    id: crypto.randomUUID(),
    description,
    done: false
  });
}

/**
 * 削除する
 * @param {any} userid
 * @param {any} todoid
 */
export function deleteTodo(userid, todoid) {
  const todos = db.get(userid);
  const index = todos.findIndex((/** @type {{ id: any; }} */ todo) => todo.id === todoid);

  if (index !== -1) {
    todos.splice(index, 1);
  }
}
