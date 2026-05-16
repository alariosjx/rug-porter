<script>
  const chapters = [
    { num:'01', title:'The village and the road', desc:'A Mixtec community three hours from the nearest hospital confronts the aftermath of COVID-19 and the silence that followed.' },
    { num:'02', title:'What the data says', desc:'Mortality figures from INEGI mapped against proximity to health infrastructure reveal a stark geography of exclusion.' },
    { num:'03', title:'The caregivers', desc:'Local parteras and traditional healers fill the void left by an underfunded public health system.' },
    { num:'04', title:'Policy and the politics of neglect', desc:'A paper trail from Mexico City shows decades of promised investment that never arrived.' },
  ];
</script>

<svelte:head><title>El Viaje Eterno — Andres Jimenez Larios</title></svelte:head>

<div style="background:var(--surf2);border-bottom:1px solid var(--border);padding:5rem 0 4rem">
  <div class="container">
    <p class="mono mb-4" style="color:rgba(44,95,138,0.7);font-size:0.68rem">Masters Thesis · UC Berkeley GSJ · 2025-2026</p>
    <h1 style="font-size:clamp(3rem,8vw,6rem);margin-bottom:1.25rem">
      El Viaje<br><em style="color:var(--blue)">Eterno</em>
    </h1>
    <p style="font-family:var(--serif);font-size:clamp(1rem,2vw,1.2rem);font-style:italic;color:var(--txt);line-height:1.65;max-width:580px;margin-bottom:1rem;opacity:0.85">
      Economic and social inequalities in rural Mexico revealed during COVID-19 continue to plague vulnerable communities with poor healthcare outcomes.
    </p>
    <p style="font-size:1rem;font-weight:300;color:var(--muted);line-height:1.75;max-width:520px;margin-bottom:2rem">
      A multimedia documentary built on months of field reporting, interviews, video, photography, and original data analysis.
    </p>
    <div class="d-flex flex-wrap gap-2 mb-3">
      <span class="rp-tag active">Documentary</span>
      <span class="rp-tag active">Healthcare</span>
      <span class="rp-tag">Rural Mexico</span>
      <span class="rp-tag">Data</span>
      <span class="rp-tag">Video</span>
    </div>
    <a href="https://alariosjx.github.io/hours_from_oxygen/" target="_blank" rel="noopener" class="btn-blue mt-2">Visit the project ↗</a>
  </div>
</div>

<div class="container py-5">
  <p class="eyebrow mb-4">Chapters</p>
  <div class="row g-3 mb-5">
    {#each chapters as ch, i}
      <div class="col-12 col-sm-6">
        <div class="rp-card h-100" class:alt={i % 2 !== 0}>
          <div class="mono mb-2" style="color:var(--blue);font-size:0.68rem">{ch.num}</div>
          <h3 style="font-size:1.2rem;margin-bottom:0.65rem">{ch.title}</h3>
          <p style="font-size:1rem;font-weight:300;color:var(--muted);line-height:1.7;margin:0">{ch.desc}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="rp-card" style="max-width:640px">
    <p class="eyebrow mb-4">A note on the project</p>
    <p style="font-size:1rem;font-weight:300;color:var(--txt);line-height:1.85;margin-bottom:1rem;opacity:0.85">
      El Viaje Eterno — "The Eternal Journey" — takes its name from the phrase used by families
      in Oaxaca's mountain communities when someone dies far from home, unable to access timely care.
      This project is a journalism thesis and a personal act of witness.
    </p>
    <p style="font-size:0.95rem;font-weight:300;color:var(--muted);line-height:1.75;margin:0">
      Inquiries: <a href="mailto:alariosjz@gmail.com">alariosjz@gmail.com</a>
    </p>
  </div>
</div>
