import { error } from '@sveltejs/kit';
import { posts } from '../data.js';

export function load({ params }) {
  // posts の 要素の1個を取り出して post とする
  // params.slug は URL で変数([slug] のこと)に該当する実際の値
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) throw error(404);

  return {
    post
  };
}
