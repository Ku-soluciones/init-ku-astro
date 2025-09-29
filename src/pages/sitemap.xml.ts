import type { APIRoute } from 'astro';

const pages = [
  {
    url: 'https://www.ku-soluciones.cl',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: 'https://www.ku-soluciones.cl/about',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'https://www.ku-soluciones.cl/services',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'https://www.ku-soluciones.cl/contact',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: 'https://www.ku-soluciones.cl/blog',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9'
  }
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
