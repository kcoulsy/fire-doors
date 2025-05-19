import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://coulsyfiredoors.co.uk', // <-- Replace with your actual site URL
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
