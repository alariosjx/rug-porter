<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  // ── Nav links ────────────────────────────────────────────────
  // CUSTOMIZE: add, remove, or rename links here.
  // href must match the folder name in src/routes/ (prefixed with {base})
  const links = [
    { href: `${base}/reporting`,   label: 'Reporting'   },
    { href: `${base}/projects`,    label: 'Projects'    },
    { href: `${base}/photography`, label: 'Photography' },
    { href: `${base}/about`,       label: 'About'       },
    { href: `${base}/contact`,     label: 'Contact'     },
  ];

  // `path` is the current URL — used to highlight the active nav link
  $: path = $page.url.pathname;
</script>

<!-- Sticky nav bar — Bootstrap handles mobile collapse via data-bs-toggle -->
<nav class="navbar navbar-expand-md rp-nav sticky-top">
  <div class="container">

    <!-- Brand / logo — CUSTOMIZE: change the name or subtitle text below -->
    <a class="navbar-brand" href="{base}/">
      <div class="brand-name">Andres Jimenez Larios</div>
      <div class="brand-sub">Multimedia Reporter · Bay City News</div>
    </a>

    <!-- Hamburger button (mobile only — Bootstrap shows/hides this automatically) -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#rpNav"
      aria-controls="rpNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Nav links — collapse on mobile, expand on md+ -->
    <div class="collapse navbar-collapse justify-content-end" id="rpNav">
      <ul class="navbar-nav gap-1 align-items-md-center mt-3 mt-md-0">
        {#each links as { href, label }}
          <li class="nav-item">
            <!-- class:active highlights the link for the current page -->
            <a
              class="nav-link"
              class:active={path.startsWith(href)}
              {href}
            >{label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
