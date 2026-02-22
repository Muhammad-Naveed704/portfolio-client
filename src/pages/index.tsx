import Layout from '@/components/Layout';
import FeaturedProjects from '@/components/FeaturedProjects';
import Testimonials from '@/components/Testimonials';
import BlogPosts from '@/components/BlogPosts';
import GithubShowcase from '@/components/GithubShowcase';
import TeamShowcase from '@/components/TeamShowcase';
import { fetchProjects, Project } from '@/lib/api';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import Head from 'next/head';
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

const aiCaseStudies = [
  {
    title: 'Vision AI for Smart Manufacturing',
    description: 'Custom YOLO-based inspection with a React control cockpit that triages defects and syncs telemetry to the cloud.',
    impact: '95% accuracy · 30% faster QA cycles',
  },
  {
    title: 'GenAI Copilot for Financial Ops',
    description: 'Secure prompt-engineered assistant layered over ERP data with guardrails, audit logs, and Slack workflows.',
    impact: '400+ daily tasks automated',
  },
  {
    title: 'Robotics Fleet Dashboard',
    description: 'Real-time telemetry, mission planning, and OTA updates for collaborative robots controlled via WebRTC.',
    impact: 'Deployed across 3 continents',
  },
];

const deliveryPhases = [
  { label: 'Discover', detail: 'Research, product strategy, technical archetypes' },
  { label: 'Design', detail: 'Brand, UX flows, system architecture blueprints' },
  { label: 'Build', detail: 'Iterative sprints with weekly demos & QA gates' },
  { label: 'Deploy', detail: 'Automated pipelines, load testing, hardening' },
  { label: 'Operate', detail: 'Observability, SLOs, dedicated support pods' },
];

const deliveryStack = [
  'Next.js · React · Node',
  'NestJS · GraphQL · tRPC',
  'Postgres · Mongo · Redis',
  'Docker · Kubernetes · Vercel',
  'GitHub Actions · TurboRepo',
  'Postmark · Resend · Twilio',
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
      <Head>
        <title>Xws Solution | AI & Robotics Lab | Digital Engineering Studio</title>
        <meta name="description" content="Xws Solution builds AI copilots, computer vision systems, and robotics platforms. From prototype AI demos to mission-critical intelligence in production. Full-spectrum product, AI, and platform teams delivering enterprise-grade solutions." />
        <meta name="keywords" content="AI development, robotics, computer vision, LLM products, MLOps, Next.js development, React development, enterprise AI, automation, intelligent operations, digital engineering" />
        <meta name="author" content="Xws Solution" />
        <meta property="og:title" content="Xws Solution | AI & Robotics Lab | Digital Engineering Studio" />
        <meta property="og:description" content="From prototype AI demos to mission-critical intelligence in production. We build AI copilots, computer vision systems, and robotics platforms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xwssolution.com" />
        <meta property="og:image" content="https://xwssolution.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xws Solution | AI & Robotics Lab" />
        <meta name="twitter:description" content="From prototype AI demos to mission-critical intelligence in production." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://xwssolution.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Xws Solution",
              "description": "AI & Robotics Lab delivering enterprise-grade AI copilots, computer vision systems, and robotics platforms",
              "url": "https://xwssolution.com",
              "logo": "https://xwssolution.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92-344-286-2704",
                "contactType": "Customer Service",
                "email": "hello@xwssolution.com"
              },
              "sameAs": [
                "https://github.com/Xws-Solution",
                "https://linkedin.com/company/xws-solution"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressCountry": "PK"
              }
            })
          }}
        />
      </Head>
      <Layout title="Home">
      <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        {/* Hero */}
        <section className="container-responsive pt-20 pb-16 sm:pt-24 sm:pb-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 text-brand text-sm font-medium mb-6 border border-brand/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                Xws Solution · AI & Robotics Lab
              </motion.p>
              <h1 className="text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                From prototype AI demos to{' '}
                <span className="text-brand bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent">mission-critical intelligence</span>{' '}
                in production.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Xws Solution builds AI copilots, computer vision systems, and robotics platforms that pass enterprise security reviews and survive real-world adoption. We pair a dedicated applied AI squad with platform engineers so every experiment is production-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" >
                <motion.span
                  
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-brand via-brand to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-brand/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  >
                  Start a Project
                  <span className="text-lg">→</span>
                </motion.span>
                  </Link> 
                <Link href="/ai">
                <motion.span
                  
                  className="px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  >
                  Explore AI Studio
                  <span>↗</span>
                </motion.span>
                  </Link>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{launchCount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Digital Launches</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">15+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI Models</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">4.9/5</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client Rating</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-brand/30 via-purple-500/20 to-brand/10 blur-3xl opacity-60 animate-pulse" />
              <div className="relative rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">AI Production Dashboard</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Real-time monitoring</p>
                  </div>
                  <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="space-y-5 mb-6">
                  {deliveryPhases.map((phase, idx) => (
                    <motion.div 
                      key={phase.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{phase.label}</p>
                        <span className="text-xs text-brand font-medium">Active</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{phase.detail}</p>
                      <div className="h-2 mt-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-brand to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${75 + idx * 5}%` }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-gray-200 dark:border-gray-800">
                  {deliveryStack.map((item) => (
                    <div key={item} className="px-3 py-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 font-medium text-gray-700 dark:text-gray-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="container-responsive py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl font-bold text-brand mb-2">2+</div>
              <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Models Orchestrated</div>
            </motion.div>
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-brand mb-2">1</div>
              <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Robotics Cells Automated</div>
            </motion.div>
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-brand mb-2">10+</div>
              <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">ML Deployments / Month</div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="container-responsive py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-brand font-medium mb-2">What we do</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Full-spectrum product, AI, and platform teams.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
                End-to-end delivery from strategy to operations with dedicated teams that own the entire product lifecycle.
              </p>
            </div>
            <Link href="/services">
            <motion.span 
              className="text-brand font-semibold hover:underline flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Explore services →
            </motion.span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, idx) => (
              <motion.div
                key={capability.title}
                className="group p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 hover:border-brand/30"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{capability.title}</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-purple-500/20 text-brand flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    ●
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{capability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {capability.badges.map((badge) => (
                    <span 
                      key={badge} 
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-sm text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700"
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
        <section className="container-responsive py-20 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand font-medium mb-2">AI & Robotics Lab</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Proof of impact across industries.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
                Real-world deployments of AI systems, computer vision, and robotics platforms delivering measurable business outcomes.
              </p>
            </div>
            <Link href="/ai">
            <motion.span 
               
              className="px-6 py-3 rounded-full border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
              Visit AI Studio →
            </motion.span>
              </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiCaseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.title}
                className="group rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50 p-6 flex flex-col hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 hover:border-brand/30"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 rounded-2xl bg-gradient-to-br from-brand/20 via-purple-500/20 to-brand/10 mb-6 border border-white/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,.3),_transparent_70%)]" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/90 font-medium">AI Deployment</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{caseStudy.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-1 leading-relaxed">{caseStudy.description}</p>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-bold text-brand">{caseStudy.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section className="container-responsive py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-semibold">Recent engineering launches</h2>
            <a href="/projects" className="text-sm text-brand font-semibold hover:underline">See all work</a>
          </div>
      <FeaturedProjects projects={effectiveFeatured} />
        </section>

        {/* Delivery playbook & testimonials */}
        <section className="bg-gray-900 text-white py-16">
          
           
            <div>
      <Testimonials />
            </div>
          
        </section>

        {/* Team */}
        <TeamShowcase />

        {/* Insights & OSS */}
        <section className="container-responsive py-16">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">Insights & field notes</h2>
                <a href="/insights" className="text-brand text-sm font-semibold hover:underline">Read articles</a>
              </div>
      <BlogPosts />
            </div>
            <div>
              <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-4">Open engineering</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We contribute to the tools we rely on. Explore experiments, starter kits, and dev tooling we maintain for the community.
                </p>
      <GithubShowcase />
              </div>
            </div>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}