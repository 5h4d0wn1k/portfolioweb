import { getCollection } from 'astro:content';

// Function to format date as required by sitemaps (YYYY-MM-DD)
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Current date for lastmod
const NOW = new Date();

export async function get() {
  // Get all work entries
  const workEntries = await getCollection('work');
  
  // Build sitemap entries for work pages
  const workPages = workEntries.map((entry) => ({
    url: `https://portfolio.shadownik.tech/work/${entry.id}/`,
    lastmod: formatDate(entry.data.publishDate || NOW),
  }));

  // Add static pages
  const pages = [
    {
      url: 'https://portfolio.shadownik.tech/',
      lastmod: formatDate(NOW),
      priority: 1.0,
      changefreq: 'weekly',
    },
    {
      url: 'https://portfolio.shadownik.tech/about/',
      lastmod: formatDate(NOW),
      priority: 0.8,
      changefreq: 'monthly',
    },
    {
      url: 'https://portfolio.shadownik.tech/work/',
      lastmod: formatDate(NOW),
      priority: 0.9,
      changefreq: 'weekly',
    },
    ...workPages.map(page => ({
      ...page,
      priority: 0.7,
      changefreq: 'monthly',
    })),
  ];

  // XML sitemap generation
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return {
    body: xml,
    headers: {
      'Content-Type': 'application/xml',
    },
  };
} 