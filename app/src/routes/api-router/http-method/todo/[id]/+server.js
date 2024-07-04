import * as database from '$lib/server/database.js';

export async function PUT({ params, request, cookies }) {
  const { done } = await request.json();
  const userid = cookies.get('userid');

  await database.toggleTodo02({ userid, id: params.id, done });
  // ブラウザに実際のデータを返す必要はないため 空の Response を 204 No Content ステータスで返している
  return new Response(null, { status: 204 });
}

export async function DELETE({ params, cookies }) {
  const userid = cookies.get('userid');

  await database.deleteTodo02({ userid, id: params.id });
  // ブラウザに実際のデータを返す必要はないため 空の Response を 204 No Content ステータスで返している
  return new Response(null, { status: 204 });
}
