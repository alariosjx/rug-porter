# Andres Jimenez Larios — Multimedia Reporter Portfolio

**Live site: https://alariosjx.github.io/rug-porter/**

Personal portfolio for Andres Jimenez Larios, multimedia data reporter at Bay City News. Built with SvelteKit and deployed automatically to GitHub Pages via GitHub Actions.

---

## What this is

This is a **SvelteKit static site** — not a basic HTML file. SvelteKit compiles the project into plain HTML, CSS, and JavaScript using `@sveltejs/adapter-static`. The result is a fast, pre-built site with no server required, hosted for free on GitHub Pages.

| Tool | Role |
|------|------|
| **SvelteKit 2 + Svelte 5** | Framework, file-based routing, reactive components |
| **Bootstrap 5** | Responsive grid and layout utilities, loaded from CDN |
| **Custom CSS** | Design tokens, card/button/animation styles (`src/app.css`) |
| **GitHub Actions** | CI/CD: builds and deploys automatically on every push to `main` |

---

## Project structure

```
src/
  routes/                      # SvelteKit file-based routing — folder = URL
    +layout.svelte             # Shared shell: nav + footer wrap every page
    +page.svelte               # Home page          →  /
    about/+page.svelte         # About              →  /about
    reporting/+page.svelte     # Reporting archive  →  /reporting
    photography/+page.svelte   # Photo gallery      →  /photography
    projects/+page.svelte      # Data projects      →  /projects
    contact/+page.svelte       # Contact            →  /contact
    viaje/+page.svelte         # El Viaje Eterno    →  /viaje
  lib/
    components/
      Nav.svelte               # Sticky navbar with active-route highlighting
      Footer.svelte            # Footer with labeled social icons
    data/
      photos.json              # Photo gallery metadata (captions, locations, tags)
  app.css                      # All global styles, design tokens, animations
  app.html                     # HTML shell — loads Bootstrap 5 + Google Fonts from CDN
static/
  images/                      # Photo assets served at /rug-porter/images/
.github/
  workflows/
    jekyll-gh-pages.yml        # GitHub Actions: install → build → .nojekyll → deploy
svelte.config.js               # adapter-static config; reads BASE_PATH from CI env var
```

---

## Why `+page.svelte` instead of something more complex

SvelteKit uses **file-based routing**: a file at `src/routes/about/+page.svelte` automatically becomes the `/about` URL. No router configuration. No path mapping. The folder structure *is* the site map.

I chose flat `+page.svelte` files over alternatives (dynamic `[slug].svelte` routes, a headless CMS, or a single-page app with a JS router) because:

1. **Fixed pages** — A portfolio has a stable, known set of pages. Dynamic slug routes are for blogs or databases where pages are generated at runtime from external data.
2. **Static output** — `adapter-static` pre-renders everything at build time into a `build/` folder of plain HTML files that any host can serve. No Node server needed.
3. **`+layout.svelte` handles the shared shell** — The nav and footer live once in `+layout.svelte` and wrap every route automatically via `{@render children()}`. No copy-pasting across files.
4. **Easy to edit** — The reporting page is in `reporting/+page.svelte`. The photography gallery is in `photography/+page.svelte`. One file = one page = easy to find.

---

## Bootstrap + CSS architecture

**Bootstrap 5** is loaded from CDN in `src/app.html` and handles:
- Responsive grid: `col-12 col-md-6 col-lg-4` breakpoints
- Navbar collapse for mobile (`data-bs-toggle="collapse"`)
- Spacing and flex utilities: `d-flex`, `gap-3`, `mb-4`, `d-none d-lg-block`

**`src/app.css`** layers on top and defines everything custom:
- **Design tokens** as CSS custom properties: `--blue`, `--gold`, `--serif`, `--mono`, `--radius`, `--bg`, etc. Change one variable to retheme the whole site.
- **Components**: `.rp-card`, `.btn-blue`, `.btn-outline`, `.rp-tag`, `.stat-card`, `.eyebrow`, `.photo-grid`
- **Animations**: `fadeUp` entrance animation (staggered with `.delay-1` etc.), `ticker` scrolling banner, stat counter animation driven by JavaScript in `+page.svelte`
- **Lightbox**: fullscreen photo viewer with keyboard nav (Escape, arrow keys)

---

## Running locally

```sh
npm install
npm run dev      # dev server at http://localhost:5173/
npm run build    # static build → build/
npm run preview  # preview the production build locally
```

Deployment is automatic — push to `main` and GitHub Actions builds and publishes the site. See `.github/workflows/jekyll-gh-pages.yml` for the pipeline.
