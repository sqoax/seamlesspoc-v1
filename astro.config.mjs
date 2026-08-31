// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is the production domain; used for canonical URLs and sitemap.
export default defineConfig({
  site: 'https://www.seamlesspoc.com',
  output: 'static',
  integrations: [sitemap()],
  // Legacy URL map per the skill's conventions §6. Mirror in the host's
  // native config (vercel.json / _redirects) as real 301s at deploy time.
  redirects: {
    '/what-we-do': '/services',
    '/solution-finding': '/services/solution-finding-procurement',
    '/expert-installation': '/services/installation-deployment',
    '/products': '/what-we-install',
    '/our-work': '/projects',
    '/why-seamless': '/how-we-work',
    '/our-people': '/about/team',
  },
});
