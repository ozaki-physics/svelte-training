<script>
  import Nested from "./Nested.svelte";
  import Nested02 from "./Nested02.svelte";
  import PackageInfo from "./PackageInfo.svelte";

  const pkg = {
    name: "svelte",
    speed: "blazing",
    version: 4,
    website: "https://svelte.dev",
  };
</script>

<Nested answer={42} />

<Nested02 answer={32} />
<Nested02 />

<PackageInfo
  name={pkg.name}
  speed={pkg.speed}
  version={pkg.version}
  website={pkg.website}
/>
<PackageInfo {...pkg} />
