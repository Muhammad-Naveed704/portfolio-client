import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xws.digital';
  
  // All important pages with their priority and change frequency
  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/ai', priority: '0.9', changefreq: 'weekly' },
    { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
    { path: '/projects', priority: '0.8', changefreq: 'weekly' },
    { path: '/company', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/career', priority: '0.7', changefreq: 'weekly' },
    { path: '/insights', priority: '0.7', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  ];
  
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(body);
  res.end();
  return { props: {} } as any;
};

export default function Sitemap() {
  return null;
}


