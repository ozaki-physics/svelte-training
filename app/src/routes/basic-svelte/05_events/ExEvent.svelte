<script>
  let m = { x: 0, y: 0 };

  /**
   * @param {{ clientX: number; clientY: number; }} event
   */
  function handleMove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div on:pointermove={handleMove}>
  The pointer is at {m.x} x {m.y}
</div>

<style>
  div {
    position: fixed;
    /* left: 0; */
    /* top: 0; */
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>
