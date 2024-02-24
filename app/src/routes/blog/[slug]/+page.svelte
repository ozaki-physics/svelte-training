<script>
  /**
   * @type {{ post: {slug: string, title: string, content: string};}}
   */
  export let data;
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
