<script>
  import { base } from '$app/paths';

  const experience = [
    {
      org: 'Bay City News / Local News Matters',
      title: 'General Assignment Reporter',
      location: 'San Francisco Bay Area',
      period: 'June 2025 - Present',
      bullets: [
        'Covered public transit agencies ridership recovery and funding fights across the Bay Area — BART, Muni, and SF Bay Ferry — drawing on National Transit Database figures and public records.',
        'Produced original photos and video alongside every story as the primary visual journalist, with work appearing across subscribing publications and social platforms.',
      ],
    },
    {
      org: 'Richmond Confidential',
      title: 'Transportation Reporter',
      location: 'Richmond, CA',
      period: 'Aug 2024 - Jan 2025',
      bullets: [
        'Covered public and private transportation in one of the Bay Areas most socioeconomically diverse cities.',
        'Created a previously nonexistent database of all bus shelters and their conditions across neighborhoods with differing incomes.',
        'Used public records requests to obtain information on school transportation and absentee rates.',
      ],
    },
  ];

  const education = [
    { school:'UC Berkeley Graduate School of Journalism', degree:'Master of Journalism, Multimedia', period:'Fall 2024 - Spring 2026', note:'Thesis: El Viaje Eterno — healthcare inequity in rural Mexico.' },
    { school:'UC Berkeley, College of Letters and Sciences', degree:'B.A., Political Science and Spanish and Portuguese', period:'2019 - 2023', note:'GPA: 3.76. Honor Thesis: U.S. Borders Extending Into Mexico.' },
  ];

  const skills = {
    'Languages': ['Spanish (native)', 'Portuguese (fluent)', 'French (intermediate)'],
    'Data and Maps': ['Datawrapper', 'Flourish', 'QGIS', 'RStudio', 'D3.js', 'SvelteKit'],
    'Media': ['Adobe Lightroom', 'Premiere', 'Audition', 'After Effects', 'Final Cut'],
    'Groups': ['NAHJ', 'NLGJA', 'IRE', 'SF Fog RFC'],
  };
</script>

<svelte:head><title>About — Andres Jimenez Larios</title></svelte:head>

<div class="container py-5">
  <p class="eyebrow mb-4">Reporter · Data journalist · Rugby back</p>
  <h1 class="mb-4">Andres<br>Jimenez Larios</h1>
  <div style="max-width:640px;margin-bottom:3rem">
    <p style="font-size:1.1rem;font-weight:300;color:var(--muted);line-height:1.8;margin-bottom:1rem">
      I am a multimedia data reporter at Bay City News covering transit, health, and accountability
      in the San Francisco Bay Area. Grown in Fontana, California. Shaped by Berkeley, D.C.,
      Mexico City, and Madrid before settling back in the Bay in fall 2022.
    </p>
    <p style="font-size:1.1rem;font-weight:300;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">
      I am finishing my Masters at Berkeley Graduate School of Journalism. My thesis,
      El Viaje Eterno, documents healthcare inequity in rural Mexico through video,
      photography, and data. Off hours I play back for the San Francisco Fog RFC.
    </p>
    <a href="https://alariosjx.github.io/hours_from_oxygen/" target="_blank" rel="noopener" class="btn-blue">Read El Viaje Eterno →</a>
  </div>

  <!-- Portrait -->
  <div class="row mb-5">
    <div class="col-12 col-md-4">
      <img src="{base}/images/portrait.jpg" alt="Andres Jimenez Larios" style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:4px;display:block" />
    </div>
  </div>

  <!-- Experience -->
  <hr style="border-color:var(--border);margin-bottom:1.5rem" />
  <h2 style="font-size:1.75rem;margin-bottom:1.5rem">Experience</h2>
  <div class="d-flex flex-column gap-3 mb-5">
    {#each experience as job}
      <div class="rp-card">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
          <div>
            <div style="font-family:var(--serif);font-size:1.15rem;font-weight:700">{job.org}</div>
            <div class="mono mt-1" style="color:var(--blue);font-size:0.68rem">{job.title} · {job.location}</div>
          </div>
          <span class="mono" style="color:var(--dim);font-size:0.65rem">{job.period}</span>
        </div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem">
          {#each job.bullets as b}
            <li style="font-size:1rem;font-weight:300;color:var(--muted);line-height:1.7;padding-left:1.2rem;position:relative">
              <span style="position:absolute;left:0;color:var(--blue)">—</span>{b}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <!-- Education -->
  <hr style="border-color:var(--border);margin-bottom:1.5rem" />
  <h2 style="font-size:1.75rem;margin-bottom:1.5rem">Education</h2>
  <div class="row g-3 mb-5">
    {#each education as edu, i}
      <div class="col-12 col-md-6">
        <div class="rp-card h-100" class:alt={i % 2 !== 0}>
          <div style="font-family:var(--serif);font-size:1.1rem;font-weight:700;margin-bottom:0.35rem">{edu.school}</div>
          <div style="font-size:1rem;font-weight:300;margin-bottom:0.25rem">{edu.degree}</div>
          <div class="mono mb-2" style="color:var(--dim);font-size:0.65rem">{edu.period}</div>
          <p style="font-size:0.95rem;font-weight:300;color:var(--muted);font-style:italic;margin:0">{edu.note}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Skills -->
  <hr style="border-color:var(--border);margin-bottom:1.5rem" />
  <h2 style="font-size:1.75rem;margin-bottom:1.5rem">Skills and affiliations</h2>
  <div class="row g-3">
    {#each Object.entries(skills) as [cat, items], i}
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="rp-card h-100" class:alt={i % 2 !== 0}>
          <div class="mono mb-3" style="color:var(--blue);font-size:0.68rem">{cat}</div>
          <div class="d-flex flex-wrap gap-2">
            {#each items as item}
              <span class="rp-tag">{item}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
