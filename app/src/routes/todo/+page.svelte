<script>
  import { fly, slide } from 'svelte/transition';
  // from タグ の ページリロード を無くす ライブラリ
  import { enhance } from '$app/forms';
  // app/src/routes/+layout.js で prerender を true にしてたら動かない
  // エラー： アクションを含むページをプリレンダリングできません と言われた

  // load で return されるデータが全部格納されている
  export let data;
  // actions の戻り値が入っている
  // フォーム送信後のみ 値が入っている
  export let form;

  // 待機状態を作るためのローカル状態
  let creating = false;
  /*** @type {any[]} */
  let deleting = [];
</script>

<div class="centered">
  <h1>todos</h1>

  <!-- エラーメッセージがあれば表示 -->
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <!-- なにか入力して Enter すると POST になる -->
  <!-- use:enhance をつけて ページリロードを無くす -->
  <form method="POST" action="?/create"
    use:enhance={() => {
      creating = true;

      return async ({ update }) => {
        await update();
        creating = false;
      }
  }}>
    <label>
      todo を追加して Enter 押してね:
      <input
        name="description"
        value={form?.description ?? ""}
        autocomplete="off"
        required
      />
    </label>
  </form>

  <ul class="todos">
    {#each data.todos.filter((/** @type {{ id: any; }} */ todo) => !deleting.includes(todo.id)) as todo (todo.id)}
      <li in:fly={{ y: 20 }} out:slide>
        <!-- +page.server.js の actions(JS 的には Map) の中で -->
        <!-- 一致した Key のやつが動く -->
        <form method="POST" action="?/delete01"
          use:enhance={() => {
            deleting = [...deleting, todo.id];
            return async ({ update }) => {
              await update();
              deleting = deleting.filter((id) => id !== todo.id);
            };
          }}
        >
          <input type="hidden" name="id" value={todo.id} />
          <span>{todo.description}</span>
          <button aria-label="Mark as complete" />
        </form>
      </li>
    {/each}
  </ul>

  {#if creating}
    <span class="saving">作成中...</span>
  {/if}
</div>

<style>
  .centered {
    max-width: 20em;
    margin: 0 auto;
  }

  label {
    width: 100%;
  }

  input {
    flex: 1;
  }

  span {
    flex: 1;
  }

  button {
    border: none;
    background: url(./remove.svg) no-repeat 50% 50%;
    background-size: 1rem 1rem;
    cursor: pointer;
    height: 100%;
    aspect-ratio: 1;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  button:hover {
    opacity: 1;
  }

  .saving {
    opacity: 0.5;
  }
</style>
