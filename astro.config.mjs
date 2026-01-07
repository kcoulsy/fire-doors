import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://coulsyfiredoors.co.uk',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude web-development page from sitemap (off-topic, hurts SEO)
        return !page.includes('/web-development');
      },
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
