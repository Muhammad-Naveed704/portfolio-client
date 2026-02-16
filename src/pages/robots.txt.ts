import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xws.digital';
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /xws-admin/
Disallow: /chat
Disallow: /thank-you

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} } as any;
};

export default function Robots() {
  return null;
}


