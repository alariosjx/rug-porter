<script>
  const projects = [
    { title:'El Viaje Eterno', type:'Multimedia · Data · Video', desc:'Masters thesis. Economic and social inequalities in rural Mexico revealed during COVID-19.', status:'Live', href:'https://alariosjx.github.io/hours_from_oxygen/' },
    { title:'Bay Area Transit Tracker', type:'R · GitHub · NTD Data', desc:'Open-source tracking of ridership recovery and funding across BART, Muni, and SF Bay Ferry.', status:'Live', href:'https://github.com/alariosjx/bcn-transit-tracker' },
    { title:'Volaris Capstone', type:'Data · Svelte · Mapping', desc:'Capstone project examining Volaris airline operations and route data.', status:'Live', href:'https://alariosjx.github.io/volaris_capstone/' },
    { title:'Bay Area Bus Shelter Equity Map', type:'QGIS · R', desc:'Mapped every bus shelter in Richmond against neighborhood income data using public records.', status:'Published', href:null },
    { title:'HIV Service Provider Database', type:'Python · Flourish', desc:'Consolidated fragmented Bay Area HIV service databases into a unified searchable resource.', status:'Published', href:null },
    { title:'Healthcare Access · Rural Oaxaca', type:'R · QGIS · INEGI', desc:'Geospatial analysis mapping mortality data against distance-to-hospital in Mixtec communities.', status:'In progress', href:null },
  ];

  const tools = [
    { name:'R / RStudio', use:'Statistical analysis, geospatial (sf, ggplot2, osmdata)' },
    { name:'QGIS', use:'Cartography, geospatial analysis, map finishing' },
    { name:'Datawrapper', use:'Charts and embeddable graphics for web' },
    { name:'Flourish', use:'Interactive storytelling visualizations' },
    { name:'Adobe Illustrator', use:'Print-ready map finishing (NTD house style)' },
    { name:'SvelteKit', use:'Multimedia web projects and data-driven pages' },
    { name:'GitHub', use:'Version control and open data publishing' },
  ];

  function statusColor(s) {
    if (s === 'Live') return 'color:var(--blue);border-color:rgba(44,95,138,0.4)';
    if (s === 'Published') return 'color:#5a9e63;border-color:rgba(92,168,107,0.4)';
    return 'color:var(--dim);border-color:var(--border)';
  }
</script>

<svelte:head><title>Projects — Andres Jimenez Larios</title></svelte:head>

<div class="container py-5">
  <p class="eyebrow mb-4">Data and multimedia</p>
  <h1 class="mb-2">Projects</h1>
  <p style="font-size:1.1rem;font-weight:300;color:var(--muted);max-width:540px;margin-bottom:3rem">
    Maps, databases, and data journalism built in R, QGIS, and Svelte. Grounded in public records.
  </p>

  <div class="row g-3 mb-5">
    {#each projects as p, i}
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="rp-card h-100 d-flex flex-column" class:alt={i % 2 !== 0}>
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="mono" style="color:var(--blue);font-size:0.65rem">{p.type}</span>
            <span class="mono" style="font-size:0.6rem;border:1px solid;border-radius:9999px;padding:0.2rem 0.65rem;{statusColor(p.status)}">{p.status}</span>
          </div>
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem">{p.title}</h3>
          <p style="font-size:0.95rem;font-weight:300;color:var(--muted);flex:1;margin-bottom:{p.href ? '1rem' : '0'}">{p.desc}</p>
          {#if p.href}
            <a href={p.href} target="_blank" rel="noopener" class="btn-outline" style="font-size:0.65rem;align-self:flex-start">Visit ↗</a>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <hr style="border-color:var(--border);margin-bottom:1.5rem" />
  <h2 style="font-size:1.5rem;margin-bottom:1.25rem">Toolkit</h2>
  {#each tools as t}
    <div class="d-flex flex-wrap justify-content-between align-items-baseline gap-3 py-3" style="border-bottom:1px solid var(--border)">
      <span class="mono" style="font-size:0.72rem;color:var(--txt);min-width:160px">{t.name}</span>
      <span style="font-size:0.95rem;font-weight:300;color:var(--muted)">{t.use}</span>
    </div>
  {/each}
</div>
