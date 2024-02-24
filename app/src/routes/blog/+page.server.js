import { posts } from './data.js';

export function load() {
  return {
    // 練習として data.js から データを取得しているが 実際は DB や CMS になる
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title
    }))
  };
}
