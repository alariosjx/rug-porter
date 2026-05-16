<script>
  import { base } from '$app/paths';

  const stories = [
    { kicker:'Transit · Public Records', title:'Bay Area Transit Funding Sales Tax Ballot Measure', desc:'Sameday turnaround; original photos; cross-referenced NTD figures for BART, Muni, and SF Bay Ferry.', date:'Jan 26, 2026', stat:'910 words', href:'https://localnewsmatters.org/2026/01/26/bay-area-transit-funding-sales-tax-ballot-measure-sf-advocates/', tag:'Transit' },
    { kicker:'Civil Rights · On the Ground', title:'Turning Point USA at UC Berkeley', desc:'Front page of SFGate. 4.4K Facebook comments. On-the-ground coverage of protest and counter-protest.', date:'Nov 11, 2025', stat:'Front page', href:'https://localnewsmatters.org/2025/11/11/tpusa-at-uc-berkeley-violence-protest/', tag:'Civil Rights' },
    { kicker:'Health · Data', title:'HIV Funding Cuts: Bay Area Braces', desc:'Open-source data; consolidated local HIV databases into a unified resource.', date:'Sept 12, 2025', stat:'Interactive', href:'https://localnewsmatters.org/2025/09/12/aids-funding-at-risk-bay-area-hiv-providers-brace-for-cuts-warn-progress-could-unravel/', tag:'Health' },
    { kicker:'International · Video', title:'Injured Gaza Children Arrive at SFO', desc:'1.8K TikTok views; follow-up stories picked up by regional publications.', date:'Aug 7, 2025', stat:'1.8K views', href:'https://localnewsmatters.org/2025/08/07/injured-gaza-children-arrive-in-san-francisco-for-medical-care-welcomed-by-supporters/', tag:'International' },
  ];

  const filters = ['All','Transit','Health','Civil Rights','International'];
  let active = 'All';
  $: filtered = active === 'All' ? stories : stories.filter(s => s.tag === active);
</script>

<svelte:head><title>Reporting — Andres Jimenez Larios</title></svelte:head>

<div class="container py-5">
  <p class="eyebrow mb-4">Bylines</p>
  <h1 class="mb-2">Reporting</h1>
  <p style="font-size:1.1rem;font-weight:300;color:var(--muted);max-width:540px;margin-bottom:2.5rem">
    Data-driven storytelling, public records, and accountability coverage from the San Francisco Bay Area.
  </p>

  <div class="filter-bar">
    {#each filters as f}
      <button class="filter-btn" class:active={active === f} on:click={() => active = f}>{f}</button>
    {/each}
  </div>

  <div class="row g-3">
    {#each filtered as piece, i}
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
</div>
