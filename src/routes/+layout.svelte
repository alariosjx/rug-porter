<script>
  import '../app.css';
  import Nav from '$components/Nav.svelte';
  import Footer from '$components/Footer.svelte';

  let { children } = $props();
</script>

<Nav />
<main>
  {@render children()}
</main>
<Footer />
