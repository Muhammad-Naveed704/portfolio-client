import Head from 'next/head';

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

const defaultTitle = 'Xws Solution | AI & Robotics Lab | SaaS Development Services | Web Development Agency';
const defaultDescription = 'Xws Solution - Leading SaaS Development Services, Web Development Agency, DevOps Solutions, AI & Robotics Development, Full-Stack Development, Shopify & WordPress Development. Enterprise AI & ML Solutions, Automation & MLOps Services, CI/CD Pipeline Implementation, Custom Software Development.';
const defaultKeywords = 'SaaS Development Services, Web Development Agency, DevOps Solutions, AI & Robotics Development, Full-Stack Development Services, Shopify Development, WordPress Development, Cloud Solutions, AWS, Azure, Vercel, React.js Development, Next.js Development Company, Enterprise AI Solutions, ML Solutions, Automation Services, MLOps Services, CI/CD Pipeline Implementation, Custom Software Development Services, UX/UI Design for SaaS, E-commerce Web Development Services, React.js, Next.js, Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Docker, Kubernetes, AI Copilots, Computer Vision, LLM Products, MLOps, Robotics Platforms';
const siteUrl = 'https://xws.digital';
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
  const fullTitle = title ? `${title} | Xws Solution` : defaultTitle;
  const canonicalUrl = canonical || siteUrl;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Xws Solution",
    "description": "Full-spectrum digital engineering studio specializing in SaaS Development, Web Development, DevOps, AI & Robotics, and Enterprise Solutions",
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
      <meta name="author" content="Xws Solution" />
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
      <meta property="og:image:alt" content={title || 'Xws Solution'} />
      <meta property="og:site_name" content="Xws Solution" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title || 'Xws Solution'} />
      <meta name="twitter:creator" content="@xwssolution" />
      <meta name="twitter:site" content="@xwssolution" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#0ea5e9" />
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
