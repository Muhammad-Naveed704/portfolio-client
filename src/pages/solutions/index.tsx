import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const solutionStreams = [
  {
    title: 'CI/CD & Platform Engineering',
    summary: 'Turbocharged release pipelines, infrastructure as code, and golden paths for mono-repo or multi-service squads.',
    bullets: ['GitHub Actions + Turbo workflows', 'Kubernetes + Vercel hybrid deployments', 'Secrets governance & policy as code'],
  },
  {
    title: 'Production Reliability',
    summary: 'SRE-grade observability, alerting, and post-incident systems to keep SLAs green.',
    bullets: ['Grafana / Datadog observability arcs', 'Synthetic monitoring & load testing', 'Runbooks, chaos drills, incident tooling'],
  },
  {
    title: 'Commerce & SaaS Platforms',
    summary: 'Subscription billing, marketplaces, portals, and ERP integrations with hardened admin experiences.',
    bullets: ['Stripe, LemonSqueezy, and Paddle', 'Multi-tenant RBAC + audit logs', 'Reporting and RevOps automation'],
  },
  {
    title: 'Communication & Email Systems',
    summary: 'Transactional and marketing communication infrastructure with compliance, analytics, and deliverability insights.',
    bullets: ['Postmark / Resend / Twilio', 'Template tooling + visual builders', 'DMARC, SPF, DKIM monitoring'],
  },
];

const deploymentTimeline = [
  { title: 'Blueprint', detail: 'Systems audit, readiness scoring, and roadmap.' },
  { title: 'Enable', detail: 'Reference architectures, IaC modules, and design reviews.' },
  { title: 'Ship', detail: 'Pairing with your team to launch net-new services.' },
  { title: 'Operate', detail: 'SLOs, on-call support, and continuous optimization.' },
];

export default function SolutionsPage() {
  return (
    <Layout title="Solutions">
      <div className="bg-white dark:bg-gray-950">
        <section className="container-responsive py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">Solutions</p>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-6">Battle-tested delivery frameworks for web, SaaS, AI, and platform teams.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you need to harden your deployment pipeline, integrate AI into existing operations, or launch a new customer-facing experience,
              Xws Solution plugs in with managed squads, proven playbooks, and measurable outcomes.
            </p>
          </div>
        </section>

        <section className="container-responsive pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {solutionStreams.map((stream, index) => (
            <motion.div
              key={stream.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-gray-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <h3 className="text-2xl font-semibold mb-3">{stream.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">{stream.summary}</p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                {stream.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand mt-0.5">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        <section className="bg-gray-900 text-white py-16">
          <div className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">Deployment program</p>
              <h2 className="text-3xl font-semibold mb-6">Zero to production with shared accountability.</h2>
              <p className="text-white/70">
                We run an embedded engagement model: architects, engineers, product ops, and DevOps leads sit with your team, sharing rituals 
                and success metrics. Every workstream is paired with weekly demos, automated reports, and ops coverage.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="space-y-6">
                {deploymentTimeline.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="text-brand font-semibold">{(index + 1).toString().padStart(2, '0')}</span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-white/70">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-responsive py-16">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-brand/10 to-transparent p-10 flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-600 dark:text-gray-300">Engage</p>
            <h3 className="text-2xl font-semibold">Need help with AI integrations, infrastructure, or full product builds?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tell us about your roadmap and we’ll outline the team, timeline, and pricing in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-3 rounded-full bg-brand text-white font-semibold shadow-lg">
                Start discovery
              </Link>
              <Link href="/services" className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                View service catalog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

