<script>
  const socials = [
    { href: 'https://instagram.com/alariosjz',                       label: 'Instagram'    },
    { href: 'https://bsky.app/profile/alariosj.bsky.social',         label: 'Bluesky'      },
    { href: 'https://twitter.com/alariosjz',                         label: 'X / Twitter'  },
    { href: 'https://github.com/alariosjx',                          label: 'GitHub'       },
    { href: 'https://www.linkedin.com/in/andres-l-25a461168/',       label: 'LinkedIn'     },
    { href: 'https://localnewsmatters.org/author/andres-larios-bay-city-news/', label: 'Bay City News' },
  ];
</script>

<footer class="rp-footer">
  <div class="container">
    <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
      <div>
        <div class="footer-brand">Andres Jimenez Larios</div>
        <div class="footer-sub">Multimedia Reporter · Bay Area, CA</div>
      </div>
      <div class="footer-links d-flex flex-wrap gap-3">
        {#each socials as { href, label }}
          <a {href} target="_blank" rel="noopener noreferrer">{label}</a>
        {/each}
      </div>
      <div class="footer-copy">© 2026</div>
    </div>
  </div>
</footer>
