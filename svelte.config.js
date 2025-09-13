// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: { adapter: adapter() },
  vitePlugin: { inspector: false }
};

export default config;
