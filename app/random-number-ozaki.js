import { createServer } from 'http';

// 使うときは node random-number-ozaki.js コマンドを実行する

const server = createServer((req, res) => {
  // CORS ポリシー に対応
  // Docker コンテナ外の ホストブラウザから確認したいから
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/random-number' && req.method === 'GET') {

    // 成功と失敗をランダムに決定
    const shouldFail = Math.random() < 0.4; // 約40%の確率で true

    // レスポンスを返す前にランダムなミリ秒待機
    const delay = Math.floor(Math.random() * 500) + 500; // 500から1000ミリ秒のランダムな遅延
    setTimeout(() => {
      // 意図的にエラーにする
      if (shouldFail) {
        console.log("Must: Intentional Failure");
        // エラーレスポンスを送信
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Intentional error occurred');
      } else {
        // 0から100の間の乱数を生成
        const randomNumber = Math.floor(Math.random() * 101);
        console.log(randomNumber);
        // レスポンスヘッダを設定
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // 乱数をテキストとして送信
        res.end(randomNumber.toString());
      }
    }, delay);
  } else {
    console.log("err: Not Found");
    setTimeout(() => {
      // 他のリクエストには404 Not Foundを返す
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }, delay);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
