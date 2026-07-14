import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://coulsyfiredoors.co.uk',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({
      // Never submit a page we tell robots not to index — a sitemap entry says
      // "index this" and the meta tag says the opposite, which is a conflicting
      // signal and wasted crawl budget. /compliance and /sustainability are
      // noindex; /qualifications is deliberately indexable and stays in.
      filter: (page) =>
        !/\/(compliance|sustainability)$/.test(new URL(page).pathname),
    }),
  ],
  image: {
    // Enable image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Generate multiple formats for better browser support
    formats: ['webp', 'avif'],
    // Responsive image sizes
    densities: [1, 2],
    // Quality settings
    quality: 80,
  },
  build: {
    // Enable asset optimization
    assets: '_astro',
  },
});
