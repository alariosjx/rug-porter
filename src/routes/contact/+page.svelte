<svelte:head><title>Contact — Andres Jimenez Larios</title></svelte:head>

<div class="container py-5">
  <p class="eyebrow mb-4">Get in touch</p>
  <h1 class="mb-4">Contact</h1>

  <div class="row g-4" style="max-width:800px">
    <div class="col-12 col-md-6">
      <div class="rp-card h-100">
        <div class="mono mb-2" style="color:var(--blue);font-size:0.68rem">Email</div>
        <a href="mailto:alariosjz@gmail.com" style="font-family:var(--serif);font-size:1.15rem;font-weight:700;color:var(--txt)">alariosjz@gmail.com</a>
        <p style="font-size:1rem;font-weight:300;color:var(--muted);line-height:1.7;margin-top:0.75rem;margin-bottom:0">
          Story tips, pitches, collaborations, or general inquiries.
        </p>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="rp-card alt h-100">
        <div class="mono mb-2" style="color:var(--blue);font-size:0.68rem">Published work</div>
        <a href="https://localnewsmatters.org/author/andres-larios-bay-city-news/" target="_blank" rel="noopener" style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--txt)">Bay City News / Local News Matters</a>
        <p style="font-size:0.95rem;font-weight:300;color:var(--muted);margin-top:0.5rem;margin-bottom:0.75rem">Current bylines and archive.</p>
        <a href="https://thefrisc.com/author/andres-jimenez-larios/" target="_blank" rel="noopener" style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--txt)">The Frisc</a>
        <p style="font-size:0.95rem;font-weight:300;color:var(--muted);margin-top:0.25rem;margin-bottom:0">Additional bylines.</p>
      </div>
    </div>
    <div class="col-12">
      <div class="rp-card">
        <div class="mono mb-3" style="color:var(--blue);font-size:0.68rem">Profiles and socials</div>
        <div class="d-flex flex-wrap gap-3">
          {#each links as { href, label }}
            <a {href} target="_blank" rel="noopener" class="btn-outline">{label} ↗</a>
          {/each}
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="rp-card">
        <div class="mono mb-2" style="color:var(--blue);font-size:0.68rem">Academic</div>
        <a href="https://journalism.berkeley.edu/person/andresamx/" target="_blank" rel="noopener" style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--txt)">UC Berkeley J-School</a>
        <p style="font-size:0.95rem;font-weight:300;color:var(--muted);margin-top:0.5rem;margin-bottom:0">Graduate School of Journalism profile.</p>
      </div>
    </div>
  </div>
</div>

<script>
  const links = [
    { href:'https://instagram.com/alariosjz',                    label:'Instagram'   },
    { href:'https://bsky.app/profile/alariosj.bsky.social',      label:'Bluesky'     },
    { href:'https://twitter.com/alariosjz',                      label:'X / Twitter' },
    { href:'https://github.com/alariosjx',                       label:'GitHub'      },
    { href:'https://www.linkedin.com/in/andres-l-25a461168/',    label:'LinkedIn'    },
  ];
</script>
