// ── SvelteKit configuration ────────────────────────────────────────────────
// This file controls how SvelteKit builds and serves the site.
//
// adapter-static: compiles the site to plain HTML/CSS/JS in the build/ folder.
// That folder is what gets deployed to GitHub Pages — no server needed.
//
// BASE_PATH: set by the GitHub Actions workflow to "/rug-porter" in production.
// In local dev (npm run dev) it's empty, so the site runs at localhost:5173/
// without a subpath. This is why {base} in Svelte files is always needed for
// internal links and image paths — it prepends the correct prefix automatically.

import adapter from "@sveltejs/adapter-static";

// Read the base path from the environment:
//   - In GitHub Actions: BASE_PATH = "/rug-porter" (set in the workflow YAML)
//   - In local dev:      BASE_PATH = "" (not set, defaults to empty string)
const base = process.env.BASE_PATH || '';

export default {
  kit: {
    adapter: adapter({
      pages: "build",   // where HTML pages are written
      assets: "build",  // where static assets (images, JS, CSS) are written
      fallback: "404.html",  // enables SPA routing — GitHub Pages serves this for unknown URLs
    }),
    paths: {
      base,  // tells SvelteKit to prefix all internal URLs with this value
    },
    alias: {
      // CUSTOMIZE: add your own shortcut imports here
      // $components → src/lib/components (used as: import Nav from '$components/Nav.svelte')
      $components: "src/lib/components",
    },
  },
};
