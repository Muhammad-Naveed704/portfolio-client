import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Default Meta Tags - Can be overridden by page-specific SEO component */}
        <meta name="description" content="Xws Solution - Leading SaaS Development Services, Web Development Agency, DevOps Solutions, AI & Robotics Development, Full-Stack Development Services, Shopify & WordPress Development" />
        <meta name="keywords" content="SaaS Development Services, Web Development Agency, DevOps Solutions, AI & Robotics Development, Full-Stack Development Services, Shopify Development, WordPress Development, Cloud Solutions, AWS, Azure, Vercel, React.js, Next.js, Node.js, NestJS" />
        <meta name="author" content="Xws Solution" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://xws.digital" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


