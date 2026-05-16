import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV === "development";
const base = dev ? "" : "/rug-porter";

export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
    }),
    paths: {
      base,
    },
    alias: {
      $components: "src/lib/components",
    },
  },
};
