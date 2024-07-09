export async function load() {
  return new Promise((fulfil) => {
    // わざと遅延を設けて stores の navigating を確認する
    setTimeout(fulfil, 3000);
  });
}
