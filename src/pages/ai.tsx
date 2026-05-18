import Layout from '@/components/Layout';
import AutomationShowcase from '@/components/AutomationShowcase';
import SEO from '@/components/SEO';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, CheckCircle, ArrowRight, Code, Sparkles } from 'lucide-react';
import Link from 'next/link';
import {
  AI_IMAGES,
  AI_STUDIO_PILLARS,
  AI_STUDIO_LAB,
  AI_STUDIO_GALLERY,
} from '@/lib/ai-assets';

const heroStats = [
  { label: 'models orchestrated', value: '15+', icon: Brain },
  { label: 'robotics cells automated', value: '3+', icon: Cpu },
  { label: 'ml deployments / month', value: '10+', icon: Zap },
];

const stack = [
  'OpenAI · Anthropic · Gemini',
  'LangChain · LlamaIndex · Haystack',
  'TensorFlow · PyTorch · ONNX',
  'Weaviate · Pinecone · Redis Vector',
  'Airflow · Prefect · Dagster',
  'Weights & Biases · MLflow · BentoML',
];

const platformFeatures = [
  'Audit logging, PII redaction, and SOC2-ready operational controls.',
  'Continuous fine-tuning pipelines with automated evaluation harnesses.',
  'Blue/green deployments, GPU workload orchestration, and budget guardrails.',
];

const pillarIcons = [Brain, Cpu, Zap];

export default function AIStudioPage() {
  return (
    <>
      <SEO
        title="AI Studio | LLM, Robotics & MLOps"
        description="XWS Solution AI Studio — production LLM copilots, computer vision, robotics consoles, and MLOps. From prototype to enterprise-grade AI systems."
        keywords="AI Studio, LLM development, robotics software, computer vision, MLOps Pakistan, AI copilots, generative AI, industrial AI"
        canonical="https://xws.digital/ai"
      />
      <Layout title="AI Studio">
        <div className="min-h-screen bg-[var(--xws-bg-canvas)] text-[var(--xws-text-primary)]">
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-xws-radial-green pointer-events-none hidden dark:block" />
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={AI_IMAGES.aidevPng}
                alt=""
                fill
                className="object-cover opacity-[0.12] dark:opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--xws-bg-canvas)] via-[var(--xws-bg-canvas)]/92 to-[var(--xws-bg-canvas)] dark:from-black/75 dark:via-black/88 dark:to-[var(--xws-bg-canvas)]" aria-hidden />
            </div>

            <div className="container-responsive py-20 sm:py-28 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <p className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border)] bg-[var(--xws-bg-card)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--xws-accent)] mb-6">
                  <Sparkles className="w-4 h-4" />
                  AI & Robotics Lab
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="text-[var(--xws-text-primary)]">From prototype demos to </span>
                  <span className="text-[var(--xws-accent)]">mission-critical intelligence</span>
                </h1>
                <p className="text-lg text-[var(--xws-text-muted)] leading-relaxed max-w-2xl">
                  Copilots, vision systems, and robotics platforms built with guardrails, observability, and
                  platform engineering — ready for real adoption.
                </p>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="xws-card p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-3xl font-bold text-[var(--xws-accent)]">{stat.value}</p>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-[var(--xws-text-muted)]">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pillars */}
          <section className="container-responsive py-16 sm:py-20">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] mb-2">Core capabilities</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Enterprise AI solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AI_STUDIO_PILLARS.map((pillar, idx) => {
                const Icon = pillarIcons[idx] ?? Brain;
                return (
                  <motion.article
                    key={pillar.title}
                    className="xws-card overflow-hidden group"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--xws-accent)] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[var(--xws-text-muted)] mb-4 leading-relaxed">{pillar.description}</p>
                      <ul className="space-y-2">
                        {pillar.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm text-[var(--xws-text-secondary)]">
                            <CheckCircle className="w-4 h-4 text-[var(--xws-accent)] shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* Gallery */}
          <section className="border-y border-[var(--xws-border)] bg-[var(--xws-bg-raised)] py-16">
            <div className="container-responsive">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] mb-2 text-center">Visual lab</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">AI programs we deliver</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {AI_STUDIO_GALLERY.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="xws-card overflow-hidden group"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <div className="relative h-40">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-[var(--xws-accent)] font-semibold">
                        {item.tag}
                      </span>
                    </div>
                    <p className="p-4 text-sm font-semibold text-[var(--xws-text-primary)]">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Lab projects */}
          <section className="container-responsive py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] mb-2">Lab snapshots</p>
                <h2 className="text-3xl font-bold">Representative AI programs</h2>
                <p className="text-[var(--xws-text-muted)] mt-2 max-w-xl">
                  Deployments across robotics, vision QA, and intelligent operations.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--xws-accent)] text-[var(--xws-accent-contrast)] px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all shrink-0"
              >
                Discuss your initiative
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {AI_STUDIO_LAB.map((project, idx) => (
                <motion.article
                  key={project.title}
                  className="xws-card overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                    
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-[var(--xws-text-muted)] mb-4">{project.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-[var(--radius-pill)] text-xs border border-[var(--xws-border)] bg-[var(--xws-bg-raised)] text-[var(--xws-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* MLOps */}
          <section className="border-t border-[var(--xws-border)] bg-[var(--xws-bg-raised)] py-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <Image src={AI_IMAGES.fullstack} alt="" fill className="object-cover" />
            </div>
            <div className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--xws-accent)] mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Platform + MLOps
                </p>
                <h2 className="text-3xl font-bold mb-6">Observability, compliance, and resilience</h2>
                <ul className="space-y-3 mb-6">
                  {platformFeatures.map((f) => (
                    <li key={f} className="flex gap-3 text-[var(--xws-text-secondary)]">
                      <CheckCircle className="w-5 h-5 text-[var(--xws-accent)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/solutions"
                  className="text-[var(--xws-accent)] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Explore platform solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="xws-card p-6">
                <p className="text-xs uppercase tracking-widest text-[var(--xws-text-muted)] mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Preferred stack
                </p>
                <div className="space-y-2">
                  {stack.map((item) => (
                    <div
                      key={item}
                      className="px-4 py-3 rounded-xl border border-[var(--xws-border)] bg-[var(--xws-bg-canvas)] text-sm text-[var(--xws-text-secondary)] hover:border-[var(--xws-accent)]/40 transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />
          </section>
        </div>
      </Layout>
    </>
  );
}
