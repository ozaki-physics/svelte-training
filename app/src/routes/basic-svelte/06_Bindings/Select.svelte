<script>
  let questions = [
    {
      id: 1,
      text: `出身校は?`,
    },
    {
      id: 2,
      text: `母の名前は?`,
    },
    {
      id: 3,
      text: `明日の予定は?`,
    },
  ];

  /**
   * @type {{ id: any; text: any; }}
   */
  let selected;

  let answer = "";

  function handleSubmit() {
    alert(`ID は ${selected.id} 質問: (${selected.text}) の答え: "${answer}"`);
  }
</script>

<h2>質問</h2>

<!-- selected がバインドできるか確かめる オブジェクトとしてバインドできる -->
<p>これはフォームです</p>
<!-- preventDefault は ハンドラを実行する前に 呼び出す 修飾子 -->
<form on:submit|preventDefault={handleSubmit}>
  <!-- 選択を切り替えるたびに 答えを空欄にする -->
  <select bind:value={selected} on:change={() => (answer = "")}>
    <!-- 配列の分だけ選択肢を作る -->
    {#each questions as question}
      <option value={question}>
        {question.text}
      </option>
    {/each}
  </select>

  <div>答えをどうぞ</div>
  <input bind:value={answer} />

  <button disabled={!answer} type="submit"> 書いたら送信できるよ </button>
</form>

<p>
  <!-- 選んでなかったら(リロードしたとき一瞬) [waiting...] が表示される -->
  選んだ質問 {selected ? selected.id : "[waiting...]"}
</p>
