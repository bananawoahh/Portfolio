import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { portfolio } from './src/data/portfolio';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );
const base = process.env.BASE_PATH || '/';
const siteUrl = (process.env.SITE_URL || portfolio.seo.siteUrl).replace(/\/$/, '');
const localAsset = (path: string) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml() {
        const { seo } = portfolio;
        const meta = (property: string, content: string) => ({
          tag: 'meta',
          attrs: { property, content },
          injectTo: 'head' as const,
        });
        return [
          { tag: 'title', children: escape(seo.title), injectTo: 'head' },
          {
            tag: 'meta',
            attrs: { name: 'description', content: seo.description },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: { rel: 'icon', type: 'image/svg+xml', href: localAsset('favicon.svg') },
            injectTo: 'head',
          },
          meta('og:type', 'website'),
          meta('og:title', seo.title),
          meta('og:description', seo.description),
          meta('og:image', siteUrl ? `${siteUrl}/${seo.image}` : localAsset(seo.image)),
          meta('og:image:alt', seo.imageAlt),
          meta('og:image:width', '1200'),
          meta('og:image:height', '630'),
          {
            tag: 'meta',
            attrs: { name: 'twitter:card', content: 'summary_large_image' },
            injectTo: 'head',
          },
          ...(siteUrl
            ? [
                meta('og:url', `${siteUrl}/`),
                {
                  tag: 'link',
                  attrs: { rel: 'canonical', href: `${siteUrl}/` },
                  injectTo: 'head' as const,
                },
              ]
            : []),
        ];
      },
    },
  ],
});
