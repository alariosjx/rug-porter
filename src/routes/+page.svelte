<script>
  // ── Imports ────────────────────────────────────────────────────
  // `base` is the URL prefix (empty in dev, "/rug-porter" in production)
  // Always prefix internal links and image paths with {base}
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // Import the photo metadata from the JSON data file
  // To add photos: drop the image in static/images/ and add an entry to src/lib/data/photos.json
  import allPhotos from '$lib/data/photos.json';

  // ── State ──────────────────────────────────────────────────────
  // `mounted` controls fade-up animations — elements are hidden until the page loads
  let mounted = false;

  // ── Stats ──────────────────────────────────────────────────────
  // CUSTOMIZE: update these numbers and labels to reflect your current stats
  // count + suffix + decimals control the count-up animation:
  //   count=4.4, suffix='K', decimals=1  →  animates 0.0K → 4.4K
  const stats = [
    { num: '4.4K',  label: 'Social engagement', sub: 'TPUSA coverage',   count: 4.4,  suffix: 'K', decimals: 1 },
    { num: '1.8K',  label: 'TikTok views',       sub: 'Gaza kids at SFO', count: 1.8,  suffix: 'K', decimals: 1 },
    { num: '3',     label: 'Languages',           sub: 'ES · PT · FR',    count: 3,    suffix: '',  decimals: 0 },
    { num: '150+',  label: 'Bylines at BCN',      sub: 'Bay City News',   count: 150,  suffix: '+', decimals: 0 },
  ];

  // ── Ticker items ───────────────────────────────────────────────
  // CUSTOMIZE: the scrolling blue banner below the hero
  // These items repeat twice so the scroll loops seamlessly
  const tickerItems = [
    'Bay Area Transit Funding', 'HIV Funding Cuts', 'Gaza Kids at SFO',
    'Turning Point USA', 'El Viaje Eterno', 'BART · Muni · SF Bay Ferry',
    'Richmond Bus Shelters', 'Public Records · GIS · Data',
  ];

  // ── Featured stories ───────────────────────────────────────────
  // CUSTOMIZE: these 4 cards appear on the home page under "Selected reporting"
  // href should be the full URL to the published story
  const work = [
    { kicker:'Transit · Public Records', title:'Bay Area Transit Funding Sales Tax', desc:'Sameday turnaround; original photos; cross-referenced NTD figures for BART, Muni, and SF Bay Ferry.', date:'Jan 2026', stat:'910 words', href:'https://localnewsmatters.org/2026/01/26/bay-area-transit-funding-sales-tax-ballot-measure-sf-advocates/' },
    { kicker:'Health · Data', title:'HIV Funding Cuts: Bay Area Braces', desc:'Open-source data; consolidated local HIV databases into a unified regional resource.', date:'Sept 2025', stat:'Interactive', href:'https://localnewsmatters.org/2025/09/12/aids-funding-at-risk-bay-area-hiv-providers-brace-for-cuts-warn-progress-could-unravel/' },
    { kicker:'Civil Rights · On the Ground', title:'Turning Point USA at UC Berkeley', desc:'Front page of SFGate. 4.4K Facebook comments. On-the-ground coverage.', date:'Nov 2025', stat:'Front page', href:'https://localnewsmatters.org/2025/11/11/tpusa-at-uc-berkeley-violence-protest/' },
    { kicker:'International · Video', title:'Injured Gaza Children Arrive at SFO', desc:'1.8K TikTok views; follow-up stories picked up by regional publications.', date:'Aug 2025', stat:'1.8K views', href:'https://localnewsmatters.org/2025/08/07/injured-gaza-children-arrive-in-san-francisco-for-medical-care-welcomed-by-supporters/' },
  ];

  // ── Photo preview ──────────────────────────────────────────────
  // Pulls 6 photos from the reporting gallery to show on the home page
  // CUSTOMIZE: change the number (6) or filter (gallery === 'rugby') to show different photos
  const previewPhotos = allPhotos
    .filter(p => p.gallery === 'reporting')
    .slice(0, 6);

  // ── On mount ───────────────────────────────────────────────────
  // Runs after the page loads in the browser (not during server-side render)
  onMount(() => {
    mounted = true;

    // Count-up animation: finds every element with data-count and animates it
    // The numbers count from 0 to their target value over 1.6 seconds
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0');
        const duration = 1600;  // CUSTOMIZE: animation duration in milliseconds
        const startTime = performance.now();
        const tick = (now) => {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);  // ease-out cubic curve
          const val = eased * target;
          el.textContent = (decimals > 0 ? val.toFixed(decimals) : Math.round(val)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
  });
</script>

<!-- Page title and meta description (shows in browser tab and search results) -->
<svelte:head>
  <title>Andres Jimenez Larios — Multimedia & Data Reporter</title>
  <meta name="description" content="Andres Jimenez Larios is a multimedia data reporter at Bay City News covering public transit, health, and accountability journalism in the SF Bay Area." />
</svelte:head>

<!-- ═══════════════════════════════════════════════════════════════
     HERO SECTION
     The big top section with your name, bio, portrait, and stat cards.
     Layout: text on left (col-lg-7), portrait + stats on right (col-lg-5).
     On mobile: portrait shows at top, stats show at bottom.
     ═══════════════════════════════════════════════════════════════ -->
<section class="rp-hero">
  <div class="container">

    <!-- Mobile portrait (hidden on desktop — desktop portrait is in the right column below) -->
    <div class="d-flex justify-content-center mb-4 d-lg-none {mounted ? 'fade-up' : 'opacity-0'}">
      <img src="{base}/images/portrait.jpg" alt="Andres Jimenez Larios" class="hero-portrait" />
    </div>

    <div class="row align-items-center g-5">

      <!-- LEFT: text content -->
      <div class="col-12 col-lg-7">

        <!-- Eyebrow label — small text above the headline -->
        <p class="eyebrow mb-4 {mounted ? 'fade-up' : 'opacity-0'}">Bay City News · UC Berkeley GSJ</p>

        <!-- Main headline — your name -->
        <h1 class="{mounted ? 'fade-up delay-1' : 'opacity-0'} mb-3">
          Andres Jimenez Larios
        </h1>

        <!-- Role subtitle — styled in italic blue (see .hero-role in app.css) -->
        <p class="hero-role mb-3 {mounted ? 'fade-up delay-2' : 'opacity-0'}">
          Multimedia &amp; Data Reporter
        </p>

        <!-- Bio paragraph — CUSTOMIZE: edit this text to update your description -->
        <p class="hero-sub mb-4 {mounted ? 'fade-up delay-2' : 'opacity-0'}">
          I'm a reporter at Bay City News covering the systems that shape everyday life in the Bay Area —
          transit funding fights, public health crises, and accountability stories.
          My work combines data analysis, public records, original photography, and video.
          Originally from Fontana, CA. Shaped by Berkeley, D.C., Mexico City, and Madrid.
          Currently finishing my Master's at UC Berkeley's Graduate School of Journalism.
        </p>

        <!-- Skill tags — CUSTOMIZE: add/remove tags by editing this array -->
        <div class="d-flex flex-wrap gap-2 mb-4 {mounted ? 'fade-up delay-3' : 'opacity-0'}">
          <span class="rp-tag active">Data Journalism</span>
          <span class="rp-tag active">Maps &amp; GIS</span>
          <span class="rp-tag">Multimedia</span>
          <span class="rp-tag">Public Records</span>
          <span class="rp-tag">ES · PT · FR</span>
        </div>

        <!-- CTA buttons — href links to internal pages or external projects -->
        <div class="d-flex flex-wrap gap-2 {mounted ? 'fade-up delay-4' : 'opacity-0'}">
          <a href="{base}/reporting" class="btn-blue">View my reporting</a>
          <a href="https://alariosjx.github.io/hours_from_oxygen/" target="_blank" rel="noopener" class="btn-outline">El Viaje Eterno ↗</a>
        </div>
      </div>

      <!-- RIGHT: portrait + stat cards (desktop only) -->
      <div class="col-12 col-lg-5 d-none d-lg-flex flex-column align-items-center gap-4 {mounted ? 'fade-up delay-3' : 'opacity-0'}">

        <!-- Portrait photo — replace portrait.jpg in static/images/ to update -->
        <img src="{base}/images/portrait.jpg" alt="Andres Jimenez Larios" class="hero-portrait" />

        <!-- Stat grid — data comes from the stats array above -->
        <div class="row g-3 w-100">
          {#each stats as s}
            <div class="col-6">
              <div class="stat-card">
                <!-- data-count / data-suffix / data-decimals drive the JS counter animation -->
                <div class="stat-num" data-count={s.count} data-suffix={s.suffix} data-decimals={s.decimals}>{s.num}</div>
                <div class="stat-label">{s.label}</div>
                <div class="stat-sub">{s.sub}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Mobile stats (shown on small screens, hidden on desktop) -->
    <div class="row g-2 mt-4 d-lg-none">
      {#each stats as s}
        <div class="col-6 col-sm-3">
          <div class="stat-card">
            <div class="stat-num" data-count={s.count} data-suffix={s.suffix} data-decimals={s.decimals}>{s.num}</div>
            <div class="stat-label">{s.label}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     TICKER — scrolling blue banner
     Items are defined in the tickerItems array above.
     Animation speed is set in app.css (.ticker-inner animation duration).
     ═══════════════════════════════════════════════════════════════ -->
<div class="rp-ticker">
  <div class="ticker-inner">
    <!-- Items doubled so the scroll loops seamlessly -->
    {#each [...tickerItems, ...tickerItems] as item}
      <span class="ticker-item">{item}</span>
    {/each}
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════
     THESIS PROJECT CARD
     Links out to the El Viaje Eterno site.
     To swap the image: replace bcn-goats.jpg with any file in static/images/
     ═══════════════════════════════════════════════════════════════ -->
<section class="container my-5">
  <div class="section-header">
    <span class="eyebrow">Thesis project</span>
    <a href="https://alariosjx.github.io/hours_from_oxygen/" target="_blank" rel="noopener" class="section-link">Visit project →</a>
  </div>
  <a href="https://alariosjx.github.io/hours_from_oxygen/" target="_blank" rel="noopener" class="rp-card d-block">
    <div class="row align-items-center g-4">
      <div class="col-12 col-md-7">
        <div class="card-kicker">Master's Thesis · Multimedia Documentary</div>
        <h2 class="card-title" style="font-size:2rem">El Viaje Eterno</h2>
        <p class="card-desc">Economic and social inequalities in rural Mexico revealed during COVID-19 continue to plague vulnerable communities with poor healthcare outcomes. A multimedia documentary built on field reporting, video, photography, and data from Oaxacan communities.</p>
        <div class="card-meta">
          <span>UC Berkeley GSJ · 2025-26</span>
          <span class="stat">Thesis</span>
        </div>
        <div class="card-arrow">Visit project →</div>
      </div>
      <div class="col-12 col-md-5 d-none d-md-block">
        <!-- CUSTOMIZE: swap this image for a photo from your thesis reporting -->
        <img
          src="{base}/images/bcn-goats.jpg"
          alt="Field reporting — El Viaje Eterno thesis project"
          style="width:100%;height:200px;object-fit:cover;border-radius:0.75rem;display:block;box-shadow:0 4px 20px rgba(30,26,22,0.15)"
        />
      </div>
    </div>
  </a>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     SELECTED REPORTING — 4 featured story cards
     Edit the `work` array above to change which stories appear.
     Each card links out to the published article.
     ═══════════════════════════════════════════════════════════════ -->
<section class="container mb-5">
  <div class="section-header">
    <span class="eyebrow">Selected reporting</span>
    <a href="{base}/reporting" class="section-link">All stories →</a>
  </div>
  <div class="row g-3">
    {#each work as piece, i}
      <!-- class:alt adds the mirrored border-radius on even cards -->
      <div class="col-12 col-sm-6 col-xl-3">
        <a href={piece.href} target="_blank" rel="noopener" class="rp-card d-block h-100" class:alt={i % 2 !== 0}>
          <div class="card-kicker">{piece.kicker}</div>
          <h3 class="card-title">{piece.title}</h3>
          <p class="card-desc">{piece.desc}</p>
          <div class="card-meta">
            <span>{piece.date}</span>
            <span class="stat">{piece.stat}</span>
          </div>
          <div class="card-arrow">→</div>
        </a>
      </div>
    {/each}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     PHOTO PREVIEW — sample from the photography gallery
     Pulls from src/lib/data/photos.json (reporting gallery, first 6).
     Each image links to the full Photography page.
     CUSTOMIZE: change slice(0, 6) to show more/fewer, or filter by 'rugby'.
     ═══════════════════════════════════════════════════════════════ -->
<section class="container mb-5">
  <div class="section-header">
    <span class="eyebrow">Photography</span>
    <a href="{base}/photography" class="section-link">Full gallery →</a>
  </div>
  <div class="row g-2">
    {#each previewPhotos as photo, i}
      <div class="col-6 col-md-4">
        <a href="{base}/photography" class="photo-item d-block" style="aspect-ratio:4/3" aria-label="View gallery: {photo.label}">
          <img src="{base}{photo.src}" alt={photo.alt} loading="lazy" style="width:100%;height:100%;object-fit:cover" />
          <div class="photo-overlay">
            <div class="photo-label">{photo.label}</div>
            <div class="photo-loc">{photo.location}</div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     ABOUT STRIP — short bio, rugby card, toolkit card
     ═══════════════════════════════════════════════════════════════ -->
<section class="container mb-5">
  <div class="row g-3">

    <!-- About me card — CUSTOMIZE: edit the paragraph text and button link -->
    <div class="col-12 col-lg-6">
      <div class="rp-card h-100">
        <p class="eyebrow mb-3">About me</p>
        <h2 style="font-size:1.9rem;margin-bottom:0.9rem">Andres<br>Jimenez Larios</h2>
        <p style="font-size:1.15rem;font-weight:300;color:var(--muted);line-height:1.8;margin-bottom:1.25rem">
          Grown in Fontana, CA. Shaped by Berkeley, D.C., Mexico City, and Madrid.
          I cover the systems that shape everyday life — transit, health, housing —
          with data, photos, and a notebook. Master's student at Berkeley J-School.
        </p>
        <a href="{base}/about" class="btn-blue" style="font-size:0.85rem">Full bio →</a>
      </div>
    </div>

    <!-- Rugby card — CUSTOMIZE: text, icon, or link -->
    <div class="col-12 col-md-6 col-lg-3">
      <div class="rp-card alt h-100">
        <div style="color:var(--blue);margin-bottom:0.65rem">
          <!-- Rugby ball icon (SVG drawn inline — no external dependency) -->
          <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
            <ellipse cx="16" cy="16" rx="7" ry="13" stroke="currentColor" stroke-width="1.5"/>
            <line x1="9" y1="16" x2="23" y2="16" stroke="currentColor" stroke-width="1"/>
            <line x1="10" y1="11" x2="22" y2="11" stroke="currentColor" stroke-width=".8"/>
            <line x1="10" y1="21" x2="22" y2="21" stroke="currentColor" stroke-width=".8"/>
          </svg>
        </div>
        <div class="mono mb-1" style="color:var(--blue);font-size:0.65rem">Off the pitch</div>
        <h3 style="font-size:1.3rem;margin-bottom:0.4rem">SF Fog Rugby</h3>
        <p style="font-size:1.05rem;font-weight:300;color:var(--muted);line-height:1.65">
          Playing back for the Bay's LGBTQ+ inclusive rugby club.
        </p>
      </div>
    </div>

    <!-- Toolkit card — CUSTOMIZE: add/remove tools from the array -->
    <div class="col-12 col-md-6 col-lg-3">
      <div class="rp-card h-100">
        <p class="eyebrow mb-3">Toolkit</p>
        <div class="d-flex flex-wrap gap-2">
          {#each ['R / RStudio','QGIS','Datawrapper','Flourish','Adobe Suite','GitHub','SvelteKit','Final Cut'] as s}
            <span class="rp-tag">{s}</span>
          {/each}
        </div>
        <a href="{base}/projects" class="section-link mt-3 d-inline-block">Data projects →</a>
      </div>
    </div>
  </div>
</section>
