<script>
   import { base } from '$app/paths';
   import allPhotos from '$lib/data/photos.json';

  const reporting = allPhotos
    .filter(p => p.gallery === 'reporting')
    .sort((a, b) => b.date.localeCompare(a.date));

  const rugbyMeta = {
    'rugby-01.jpg': { label:'Tackle · SF skyline', caption:'Action from SF Fog RFC at Cesar Chavez Park, with the San Francisco skyline in background.' },
    'rugby-02.jpg': { label:'Pre-match · SF Fog RFC', caption:'Pre-match lineup in SF Fog kit under blue skies.' },
    'rugby-03.jpg': { label:'Rain game · Fog RFC', caption:'Focused before a scrum in the rain.' },
    'rugby-04.jpg': { label:'After the final whistle', caption:'Arms around teammates, laughing in the rain after the match.' },
    'rugby-05.jpg': { label:'Breaking the line', caption:'Fog attack — ball carrier in full sprint.' },
    'rugby-06.jpg': { label:'Scrum · Fog RFC', caption:'Scrum engagement against opponents.' },
    'rugby-07.jpg': { label:'Maul · rain game', caption:'Maul contest in heavy rain.' },
    'rugby-08.jpg': { label:'Set piece · referee watching', caption:'Scrum, wide shot, referee in background.' },
    'rugby-09.jpg': { label:'Off the back', caption:'Ball carrier readying to pass off the ruck.' },
    'rugby-10.jpg': { label:'Reading the play', caption:'Backs organizing in the rain.' },
    'rugby-11.jpg': { label:'Touchline kick · rain', caption:'Line kick in torrential rain.' },
    'rugby-12.jpg': { label:'Turnover tackle', caption:'Fog player makes a tackle, ball loose.' },
    'rugby-13.jpg': { label:'Ruck ball', caption:'Scrum-half picks ball off the ruck in the rain.' },
  };

  const rugby = allPhotos
    .filter(p => p.gallery === 'rugby')
    .map(p => {
      const filename = p.src.split('/').pop();
      const m = rugbyMeta[filename] || {};
      return { ...p, label: m.label || p.label, caption: m.caption || p.caption, alt: m.caption || p.alt };
    });

  let lightbox = null;
  let activeGallery = [];
  function open(photo, gallery) { lightbox = photo; activeGallery = gallery; }
  function close() { lightbox = null; }
  function next() { const i = activeGallery.indexOf(lightbox); lightbox = activeGallery[(i+1)%activeGallery.length]; }
  function prev() { const i = activeGallery.indexOf(lightbox); lightbox = activeGallery[(i-1+activeGallery.length)%activeGallery.length]; }
  function handleKey(e) {
    if (!lightbox) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  let activeTab = 'reporting';
</script>

<svelte:head><title>Photography — Andres Jimenez Larios</title></svelte:head>
<svelte:window on:keydown={handleKey} />

<div class="container py-5">
  <p class="eyebrow mb-4">Visual work</p>
  <h1 class="mb-2">Photography</h1>
  <p style="font-size:1.1rem;font-weight:300;color:var(--muted);max-width:540px;margin-bottom:2rem">
    Original photos produced alongside every story, and from the pitch.
    Captions from IPTC metadata. All images copyright Andres Jimenez Larios / Bay City News.
  </p>

  <div class="tab-bar mb-4">
    <button class="tab-btn" class:active={activeTab==='reporting'} on:click={() => activeTab='reporting'}>
      Reporting <span class="tab-count">{reporting.length}</span>
    </button>
    <button class="tab-btn" class:active={activeTab==='rugby'} on:click={() => activeTab='rugby'}>
      Rugby <span class="tab-count">{rugby.length}</span>
    </button>
  </div>

  {#if activeTab === 'reporting'}
    <div class="photo-grid">
      {#each reporting as photo, i}
        <button class="photo-item" on:click={() => open(photo, reporting)} aria-label="View: {photo.label}">
          <img src="{base}{photo.src}" alt={photo.alt} loading="lazy" />
          <div class="photo-overlay">
            <div class="photo-label">{photo.label}</div>
            <div class="photo-loc">{photo.location}</div>
          </div>
        </button>
      {/each}
    </div>
  {/if}

  {#if activeTab === 'rugby'}
    <div class="photo-grid">
      {#each rugby as photo, i}
        <button class="photo-item" on:click={() => open(photo, rugby)} aria-label="View: {photo.label}">
          <img src="{base}{photo.src}" alt={photo.alt} loading="lazy" />
          <div class="photo-overlay">
            <div class="photo-label">{photo.label}</div>
            <div class="photo-loc">{photo.location}</div>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if lightbox}
  <div class="lightbox-backdrop" on:click={close} role="dialog" aria-modal="true">
    <div class="lightbox-inner" on:click|stopPropagation role="document">
      <img src="{base}{lightbox.src}" alt={lightbox.alt} />
      <div>
        <p class="lightbox-caption">{lightbox.caption}</p>
        <div class="lightbox-sub">
          {lightbox.location}{lightbox.credit ? ' · copyright ' + lightbox.credit : ''}
        </div>
      </div>
      <button class="lightbox-close" on:click={close} aria-label="Close">x</button>
      <button class="lightbox-prev" on:click={prev} aria-label="Previous">&#8249;</button>
      <button class="lightbox-next" on:click={next} aria-label="Next">&#8250;</button>
    </div>
  </div>
{/if}
