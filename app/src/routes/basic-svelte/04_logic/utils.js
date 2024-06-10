export async function getRandomNumber() {
  // 0から100の間の乱数を取得する (私たちがそれを見ることができるように、遅延を伴う)
  // Svelte チュートリアル上の API っぽいからローカルでは動かなかった
  // const res = await fetch('/random-number');
  // だから ローカルでも動くように app/random-number-ozaki.js で API を作った
  // この API を動かす時は /svelte-training/app で node random-number-ozaki.js コマンドを実行する
  // すると http://localhost:3000/random-number が値を返すようになる
  // 確認する時は curl http://localhost:3000/random-number で動く
  // https にするには 証明書とか面倒だったからやめた
  // 意図的に時々 500エラーになるように API を作った
  const res = await fetch('http://localhost:3000/random-number');

  if (res.ok) {
      return await res.text();
  } else {
      // APIが失敗することもある！
      throw new Error('Request failed');
  }
}
