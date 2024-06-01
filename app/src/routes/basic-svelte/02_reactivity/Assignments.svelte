<script>
  let count = 0;
  function increment01(){
    count += 1;
  }
</script>

<button on:click={increment01}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
