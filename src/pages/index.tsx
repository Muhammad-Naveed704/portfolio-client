import Layout from '@/components/Layout';
import FeaturedProjects from '@/components/FeaturedProjects';
import Testimonials from '@/components/Testimonials';
import BlogPosts from '@/components/BlogPosts';
import TechStackStrip from '@/components/TechStackStrip';
import { HOME_AI_CARDS } from '@/lib/ai-assets';
import Image from 'next/image';
import TeamShowcase from '@/components/TeamShowcase';
import HeroBackground from '@/components/HeroBackground';
import SEO from '@/components/SEO';
import { fetchProjects, Project } from '@/lib/api';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';


type Props = { featured: Project[]; allProjects: Project[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const featured = await fetchProjects({ featured: true });
    const allProjects = await fetchProjects({});
    console.log("Fetched featured projects:", featured);
    console.log("Fetched all projects:", allProjects);
    return { props: { featured, allProjects } };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { props: { featured: [], allProjects: [] } };
  }
};

const capabilities = [
  {
    title: 'AI & Robotics Studio',
    description: 'LLM products, computer vision, copilots, industrial robots, and autonomous workflows built with production MLOps.',
    badges: ['LLMs & Agents', 'Computer Vision', 'MLOps', 'Robotics UI'],
  },
  {
    title: 'Product Engineering',
    description: 'Multi-platform apps with Next.js, React, and Node—designed with conversion-focused UX and maintainable systems.',
    badges: ['Next.js', 'React Native', 'Design Systems', 'DX Tooling'],
  },
  {
    title: 'Platform & DevOps',
    description: 'CI/CD pipelines, observability, zero-downtime deploys, and secure cloud foundations across AWS, Azure, and Vercel.',
    badges: ['CI/CD', 'IaC', 'Monitoring', 'Security'],
  },
  {
    title: 'Growth & Support',
    description: 'Lifecycle services including email/SMS infrastructure, analytics, experimentation, and 24/7 production support.',
    badges: ['Comms Platforms', 'Analytics', 'SRE', 'Global Support'],
  },
];

export default function Home({ featured, allProjects }: Props) {
  const [clientFeatured, setClientFeatured] = useState<Project[] | null>(featured.length ? featured : null);
  const [clientAll, setClientAll] = useState<Project[] | null>(allProjects.length ? allProjects : null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        if (clientFeatured === null) {
          const f = await fetchProjects({ featured: true });
          if (!mounted) return;
          setClientFeatured(f);
        }
        if (clientAll === null) {
          const a = await fetchProjects({});
          if (!mounted) return;
          setClientAll(a);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[home] client fallback fetch failed', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, [clientFeatured, clientAll]);

  const effectiveFeatured = clientFeatured ?? featured;
  const effectiveAll = clientAll ?? allProjects;
  const launchCount = effectiveAll.length ? `${effectiveAll.length}+` : '70+';
  return (
    <>
      <SEO
        title="XWS Solution | Software House Pakistan | Web, App, AI & Cloud"
        description="XWS Solution — software house in Pakistan: web apps, Next.js, React, Node.js, Flutter, AI automation, Shopify & WordPress e-commerce, AWS & DevOps. Karachi-based team, worldwide clients. Enterprise-grade delivery from prototype to production."
        keywords="software house Pakistan, web development Karachi, app development company Pakistan, Next.js agency, React development services, Node.js backend, Flutter app developer, AI solutions Pakistan, Shopify developer Pakistan, WordPress development, AWS cloud services, DevOps consulting, SaaS development, full stack developer Pakistan, custom software development, ERP integration, ecommerce website, portfolio agency, XWS Solution, Tech Wave Solution, hire remote developers Pakistan, TypeScript, NestJS, MongoDB, PostgreSQL, GraphQL, CI/CD, Vercel deployment, SEO services tech company"
        canonical="https://xws.digital"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "XWS Solution",
          "description": "Software house in Pakistan: web & mobile apps, AI, DevOps, e-commerce, and cloud platforms.",
          "url": "https://xws.digital",
          "logo": "https://xws.digital/xws-logo.png",
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
          "offers": [
            {
              "@type": "Offer",
              "name": "SaaS Development Services",
              "description": "Custom SaaS platform development with modern technologies"
            },
            {
              "@type": "Offer",
              "name": "Web Development Services",
              "description": "Full-stack web development with React, Next.js, Node.js"
            },
            {
              "@type": "Offer",
              "name": "DevOps Solutions",
              "description": "CI/CD pipelines, cloud infrastructure, and automation"
            },
            {
              "@type": "Offer",
              "name": "AI & Robotics Development",
              "description": "AI copilots, computer vision, and robotics platforms"
            }
          ],
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
        }}
      />
      <Layout title="Home">
        <div className="min-h-screen bg-[var(--xws-bg-canvas)] text-[var(--xws-text-primary)] relative overflow-x-hidden">
          {/* Hero */}
          <section className="relative min-h-[min(92vh,900px)] flex flex-col justify-center pt-20 pb-20 sm:pt-28 sm:pb-28 font-body">
            <HeroBackground />

            <div className="container-responsive relative z-10 text-center max-w-5xl lg:max-w-6xl mx-auto w-full">
              <motion.p
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border)] bg-[var(--xws-bg-card)]/80 backdrop-blur-sm px-4 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[var(--xws-text-muted)] mb-8 sm:mb-10 font-body"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--xws-accent)] shadow-[0_0_12px_var(--xws-accent)]" />
                Crafting digital excellence
              </motion.p>
              <motion.h1
                className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.75rem] font-bold tracking-tight mb-8 sm:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <span className="block text-[var(--xws-text-primary)]">Elevate your</span>
                <span className="block text-[var(--xws-accent)] mt-1 sm:mt-2">
                  digital presence
                  <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--xws-accent)] ml-2 sm:ml-3 align-middle shadow-xws-glow" />
                </span>
              </motion.h1>
              <motion.p
                className="font-body text-base sm:text-xl md:text-2xl text-[var(--xws-text-muted)] max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
              >
                We build cross-platform apps, high-performance websites, and AI-powered workflows — from Karachi to global
                teams — with the reliability you expect from a serious software partner.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <Link
                  href="/contact"
                  className="font-body inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--xws-accent)] px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-semibold text-[var(--xws-accent-contrast)] shadow-xws-glow hover:brightness-110 transition-all"
                >
                  Start your project
                  <span>→</span>
                </Link>
                <Link
                  href="/services"
                  className="font-body inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border-strong)] bg-[var(--xws-bg-card)]/40 backdrop-blur-sm px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-semibold text-[var(--xws-text-primary)] hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
                >
                  Explore services
                </Link>
              </motion.div>
              <motion.div
                className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-10 border-t border-[var(--xws-border)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--xws-accent)]">{launchCount}</p>
                  <p className="text-xs text-[var(--xws-text-muted)] mt-1 font-body">Shipped work</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--xws-accent)]">15+</p>
                  <p className="text-xs text-[var(--xws-text-muted)] mt-1">AI integrations</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--xws-accent)]">4.9</p>
                  <p className="text-xs text-[var(--xws-text-muted)] mt-1">Client rating</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Trust strip */}
          <section className="border-y border-[var(--xws-border)] bg-[var(--xws-bg-raised)] py-10">
            <div className="container-responsive text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[var(--xws-text-faint)] mb-6">
                Trusted delivery · modern stack
              </p>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[var(--xws-text-muted)] text-sm font-medium opacity-60">
                {['Next.js', 'React', 'Node.js', 'Flutter', 'AWS', 'PostgreSQL', 'Shopify', 'WordPress'].map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Feature cards with charts */}
          <section className="container-responsive py-20 sm:py-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border)] px-3 py-1.5 text-xs text-[var(--xws-text-muted)] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--xws-accent)]" />
                Powerful features
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--xws-text-primary)]">
                Everything you need to <span className="text-[var(--xws-accent)]">build and scale</span>
              </h2>
              <p className="mt-4 text-[var(--xws-text-muted)]">
                Enterprise-minded engineering with startup speed — observability, security, and growth baked in.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Scale at speed',
                  body: 'Architecture that grows with traffic — caching, queues, and horizontal scaling patterns.',
                  chart: 'bars' as const,
                },
                {
                  title: 'Instant deploy',
                  body: 'CI/CD, previews, and zero-downtime releases so your roadmap never waits on infrastructure.',
                  chart: 'deploy' as const,
                },
                {
                  title: 'Real-time analytics',
                  body: 'Dashboards and telemetry so product and engineering see the same truth, in real time.',
                  chart: 'line' as const,
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  className="xws-card p-6 sm:p-8 flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="h-40 mb-6 rounded-xl border border-[var(--xws-border)] bg-[var(--xws-bg-raised)] relative overflow-hidden flex items-end justify-center gap-1.5 px-6 pb-4">
                    {card.chart === 'bars' && (
                      <>
                        {[35, 55, 28, 70, 42, 88, 50].map((h, i) => (
                          <div
                            key={i}
                            className={`w-3 rounded-t xws-bar ${i === 5 ? 'bg-[var(--xws-accent)] shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
                          />
                        ))}
                      </>
                    )}
                    {card.chart === 'deploy' && (
                      <div className="absolute inset-3 rounded-lg border border-[var(--xws-border)] bg-[var(--xws-bg-card)] p-3 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[var(--xws-accent)]/20 flex items-center justify-center text-[var(--xws-accent)] shadow-xws-glow">
                          <span className="text-xl font-bold">⚡</span>
                        </div>
                        <div className="text-left text-xs">
                          <p className="text-[var(--xws-text-faint)] uppercase tracking-wider">Deployment</p>
                          <p className="text-[var(--xws-text-primary)] font-semibold">Live & active</p>
                          <p className="text-[var(--xws-accent)] mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--xws-accent)] animate-pulse" />
                            All systems operational
                          </p>
                        </div>
                      </div>
                    )}
                    {card.chart === 'line' && (
                      <svg viewBox="0 0 200 80" className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gline" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="var(--xws-blue)" />
                            <stop offset="100%" stopColor="var(--xws-accent)" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,60 Q40,55 80,40 T160,15 L200,10"
                          fill="none"
                          stroke="url(#gline)"
                          strokeWidth="2.5"
                          className="drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        />
                        <circle cx="160" cy="15" r="4" fill="var(--xws-accent)" />
                        <rect x="168" y="6" width="28" height="14" rx="6" fill="var(--xws-accent)" opacity="0.9" />
                        <text x="172" y="16" fill="var(--xws-accent-contrast)" fontSize="8" fontWeight="bold">
                          +127%
                        </text>
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--xws-text-primary)] mb-2">{card.title}</h3>
                  <p className="text-sm text-[var(--xws-text-muted)] leading-relaxed flex-1">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section className="container-responsive py-16 sm:py-20 border-t border-[var(--xws-border)]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] font-semibold mb-2">What we do</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--xws-text-primary)] max-w-xl">
                  Full-spectrum product, AI, and platform teams.
                </h2>
                <p className="text-[var(--xws-text-muted)] mt-3 max-w-xl">
                  End-to-end delivery from strategy to operations — dedicated squads that own outcomes, not tickets.
                </p>
              </div>
              <Link
                href="/services"
                className="text-[var(--xws-accent)] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
              >
                Explore services →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, idx) => (
                <motion.div
                  key={capability.title}
                  className="xws-card p-8 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-[var(--xws-text-primary)] group-hover:text-[var(--xws-accent)] transition-colors">
                      {capability.title}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[var(--xws-accent)] shadow-xws-glow shrink-0 mt-2" />
                  </div>
                  <p className="text-[var(--xws-text-muted)] mb-6 leading-relaxed">{capability.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-medium border border-[var(--xws-border)] bg-[var(--xws-bg-raised)] text-[var(--xws-text-secondary)]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI case studies */}
          <section className="container-responsive py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] font-semibold mb-2">AI & robotics lab</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--xws-text-primary)]">Proof of impact across industries.</h2>
                <p className="text-[var(--xws-text-muted)] mt-3 max-w-2xl">
                  Deployments that combine models, data pipelines, and operator-grade UX — not slide-deck experiments.
                </p>
              </div>
              <Link
                href="/ai"
                className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--xws-accent)] text-[var(--xws-accent)] px-6 py-3 text-sm font-semibold hover:bg-[var(--xws-accent-dim)] transition-colors shrink-0"
              >
                Visit AI Studio →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOME_AI_CARDS.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.title}
                  className="xws-card flex flex-col overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden border-b border-[var(--xws-border)]">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-[var(--xws-accent)] font-semibold">
                      AI deployment
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[var(--xws-text-primary)] mb-2 group-hover:text-[var(--xws-accent)] transition-colors">{caseStudy.title}</h3>
                    <p className="text-sm text-[var(--xws-text-muted)] flex-1 leading-relaxed">{caseStudy.description}</p>
                    <p className="mt-4 text-sm font-semibold text-[var(--xws-accent)]">{caseStudy.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <TechStackStrip />

          {/* Featured projects */}
          <section className="container-responsive py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] font-semibold mb-2">Our projects</p>
                <h2 className="text-3xl font-bold text-[var(--xws-text-primary)]">Work we have shipped</h2>
              </div>
              <Link href="/projects" className="text-sm font-semibold text-[var(--xws-accent)] hover:underline">
                View all projects →
              </Link>
            </div>
            <FeaturedProjects projects={effectiveFeatured} hideIntro />
          </section>

          {/* Testimonials */}
          <section className="bg-[var(--xws-bg-raised)] border-y border-[var(--xws-border)] py-4">
            <Testimonials />
          </section>

          <TeamShowcase />

          <section className="container-responsive py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--xws-text-primary)]">Insights & field notes</h2>
                  <Link href="/insights" className="text-sm font-semibold text-[var(--xws-accent)] hover:underline">
                    Read articles →
                  </Link>
                </div>
                <BlogPosts />
              </div>
              {/* GitHub showcase hidden */}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}