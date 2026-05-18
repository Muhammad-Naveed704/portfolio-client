import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Default Meta Tags - Can be overridden by page-specific SEO component */}
        <meta name="description" content="XWS Solution — software house in Pakistan: web & mobile apps, Next.js, React, Node.js, Flutter, AI automation, Shopify, WordPress, AWS, DevOps. Karachi-based engineering for global clients." />
        <meta name="keywords" content="XWS Solution, software house Pakistan, web development Karachi, Next.js agency, React developer, Flutter apps, AI solutions Pakistan, Shopify Pakistan, WordPress agency, Node.js, NestJS, AWS, DevOps, SaaS development, full stack Pakistan" />
        <meta name="author" content="XWS Solution" />
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


