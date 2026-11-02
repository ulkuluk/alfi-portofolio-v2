// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Keep in sync with `site.url` in src/config/site.ts.
const SITE_URL = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  // Strict CSP (no inline styles/scripts): always emit external, hashed assets.
  build: { format: 'file', inlineStylesheets: 'never' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
