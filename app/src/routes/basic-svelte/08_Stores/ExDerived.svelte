<script>
  // @ts-ignore
  import { time, elapsed } from "./store.js";

  const formatter = new Intl.DateTimeFormat("ja", {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
</script>

<h1>現在時刻: {formatter.format($time)}</h1>

<p>
  このページを開いてからの時間: {$elapsed}
  {$elapsed === 1 ? "second" : "seconds"}
</p>
