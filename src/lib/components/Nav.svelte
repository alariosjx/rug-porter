<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  const links = [
    { href: `${base}/reporting`,   label: 'Reporting'   },
    { href: `${base}/projects`,    label: 'Projects'    },
    { href: `${base}/photography`, label: 'Photography' },
    { href: `${base}/about`,       label: 'About'       },
    { href: `${base}/contact`,     label: 'Contact'     },
  ];

  $: path = $page.url.pathname;
</script>

<nav class="navbar navbar-expand-md rp-nav sticky-top">
  <div class="container">
    <a class="navbar-brand" href="{base}/">
      <div class="brand-name">Andres Jimenez Larios</div>
      <div class="brand-sub">Multimedia Reporter · Bay City News</div>
    </a>

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

    <div class="collapse navbar-collapse justify-content-end" id="rpNav">
      <ul class="navbar-nav gap-1 align-items-md-center mt-3 mt-md-0">
        {#each links as { href, label }}
          <li class="nav-item">
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
