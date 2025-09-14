import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000';
  const content = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} } as any;
};

export default function Robots() {
  return null;
}


