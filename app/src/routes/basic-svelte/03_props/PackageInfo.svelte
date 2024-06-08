<script>
  /** @type string */
  export let name;
  /** @type number */
  export let version;
  /** @type string */
  export let speed;
  /** @type string */
  export let website;

  $: href = `https://www.npmjs.com/package/${name}`;
</script>

<p>
  The <code>{name}</code> package is {speed} fast.<br />
  Download version {version} from <a {href}>npm</a> and
  <a href={website}>learn more here</a>
</p>
