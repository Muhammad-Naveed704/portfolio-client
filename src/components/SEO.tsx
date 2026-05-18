import Head from 'next/head';
import { DEFAULT_PAGE_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/site-seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  structuredData?: object;
}

const defaultTitle = `${SITE_NAME} | Software House Pakistan | Web, App, AI & Cloud Engineering`;
const defaultDescription =
  `${SITE_NAME} is a software house in Pakistan delivering web & mobile apps, AI automation, Shopify and WordPress e-commerce, and cloud-native platforms. ` +
  'From discovery to production with Next.js, React, Node.js, Flutter, and AWS — trusted by teams worldwide.';
const defaultKeywords = DEFAULT_PAGE_KEYWORDS;
const siteUrl = SITE_URL;
const defaultOgImage = `${siteUrl}/xws-logo.png`;

export default function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : defaultTitle;
  const canonicalUrl = canonical || siteUrl;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "description": "Software house in Pakistan: web & mobile engineering, AI solutions, e-commerce, and cloud platforms.",
    "url": siteUrl,
    "logo": `${siteUrl}/xws-logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-344-286-2704",
      "contactType": "Customer Service",
      "email": "mnaveed2862@gmail.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://github.com/Muhammad-Naveed704",
      "https://www.linkedin.com/company/team-tech-wave-solution"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "offers": {
      "@type": "Offer",
      "name": "SaaS Development Services",
      "description": "Professional SaaS, Web Development, DevOps, and AI Solutions"
    },
    "knowsAbout": [
      "SaaS Development",
      "Web Development",
      "DevOps",
      "AI & Machine Learning",
      "Robotics",
      "Cloud Computing",
      "Full-Stack Development",
      "E-commerce Development"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="geo.region" content="PK-SD" />
      <meta name="geo.placename" content="Karachi" />
      <meta name="geo.position" content="24.8607;67.0011" />
      <meta name="ICBM" content="24.8607, 67.0011" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title || SITE_NAME} />
      <meta name="twitter:creator" content="@xwssolution" />
      <meta name="twitter:site" content="@xwssolution" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />
    </Head>
  );
}
