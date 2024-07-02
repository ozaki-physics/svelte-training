<script>
	import Card from "./Card.svelte";
	import Card02 from "./Card02.svelte";
</script>

<main>
	<Card>
		<span>Patrick BATEMAN</span>
		<span>Vice President</span>
	</Card>
	<Card02><span>入れた</span></Card02>
	<Card02></Card02>
</main>

<style>
  span {
    color: greenyellow;
  }
</style>
