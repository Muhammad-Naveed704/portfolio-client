import Layout from '@/components/Layout';
import AutomationShowcase from '@/components/AutomationShowcase';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Rocket, TrendingUp, Code, Database, Cloud, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const heroStats = [
  { label: 'models orchestrated', value: '2+', icon: <Brain className="w-6 h-6" /> },
  { label: 'robotics cells automated', value: '1', icon: <Cpu className="w-6 h-6" /> },
  { label: 'ml deployments / month', value: '2+', icon: <Zap className="w-6 h-6" /> },
];

const pillars = [
  {
    title: 'LLM Products & Copilots',
    description: 'Secure copilots, AI agents, and retrieval applications with guardrails, observability, and enterprise access control.',
    bullets: ['Prompt engineering & evaluation', 'Vector DB architecture', 'Compliance-ready audit trails'],
    icon: <Brain className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Computer Vision & Robotics',
    description: 'Custom models for inspection, safety, telepresence, and robotic arm control with low-latency dashboards.',
    bullets: ['Edge deployments', 'WebRTC control rooms', 'Digital twin visualizations'],
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Automation & Intelligent Ops',
    description: 'Workflow automation, predictive maintenance, and event-driven pipelines wired into ERP, CRM, and support tooling.',
    bullets: ['Orchestration with Temporal', 'MLOps + CI/CD', 'SLO-backed incident response'],
    icon: <Zap className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop',
  },
];

const labProjects = [
  {
    title: 'Hybrid Robotics Console',
    detail: '3D mission planning, ROS telemetry, and OTA updates for autonomous material handling robots.',
    stack: ['ROS2', 'WebRTC', 'Next.js', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Industrial Vision QA',
    detail: 'Transformer-based defect detection deployed on Jetson edge devices with live retraining schedule.',
    stack: ['PyTorch', 'TensorRT', 'FastAPI', 'Azure IoT'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'AI Ops Copilot',
    detail: 'LangChain-powered assistant monitoring logs, suggesting remediations, and triggering workflows via Slack.',
    stack: ['LangChain', 'OpenAI', 'Temporal', 'Postgres'],
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop',
  },
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

export default function AIStudioPage() {
  return (
    <>
      <SEO
        title="AI & Robotics Lab | Enterprise AI & ML Solutions | Automation & MLOps Services"
        description="Xws Solution AI & Robotics Lab: Enterprise AI & ML Solutions, Automation & MLOps Services, LLM Products & Copilots, Computer Vision Systems, Robotics Platforms. From prototype AI demos to mission-critical intelligence in production. Specializing in OpenAI, Anthropic, LangChain, PyTorch, TensorFlow, MLOps, and production-ready AI systems."
        keywords="Enterprise AI Solutions, ML Solutions, AI & Robotics Development, Automation Services, MLOps Services, LLM Products, AI Copilots, Computer Vision, Robotics Platforms, OpenAI, Anthropic, Gemini, LangChain, LlamaIndex, Haystack, TensorFlow, PyTorch, ONNX, Vector Databases, Weaviate, Pinecone, Redis Vector, Airflow, Prefect, Dagster, MLflow, BentoML, Weights & Biases, AI Ops, Intelligent Automation, Predictive Maintenance, Edge AI, WebRTC Robotics, Digital Twin, Industrial AI, Vision AI, GenAI, Prompt Engineering, Vector DB Architecture, MLOps Pipeline, CI/CD for AI, Model Deployment, GPU Orchestration"
        canonical="https://xws.digital/ai"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Xws Solution AI & Robotics Lab",
          "description": "Enterprise AI & ML Solutions, Automation & MLOps Services",
          "url": "https://xws.digital/ai",
          "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Robotics",
            "Computer Vision",
            "LLM Products",
            "MLOps",
            "Automation",
            "AI Copilots"
          ],
          "offers": {
            "@type": "Offer",
            "name": "AI & Robotics Development Services",
            "description": "Enterprise AI solutions, computer vision systems, and robotics platforms"
          }
        }}
      />
      <Layout title="AI Studio">
        <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen">
          {/* Hero Section */}
          <section className="container-responsive py-20 sm:py-28 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
              className="max-w-4xl relative z-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="text-sm uppercase tracking-[0.4em] text-brand font-medium mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Brain className="w-4 h-4" />
                AI & Robotics Lab
              </motion.p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                From prototype AI demos to{' '}
                <span className="text-brand bg-gradient-to-r from-brand to-purple-400 bg-clip-text text-transparent">mission-critical intelligence</span>{' '}
                in production.
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-12">
                Xws Solution builds AI copilots, computer vision systems, and robotics platforms that pass enterprise security reviews and survive real-world adoption. 
                We pair a dedicated applied AI squad with platform engineers so every experiment is production-ready.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-transparent p-8 backdrop-blur-sm hover:border-brand/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-purple-500/20 flex items-center justify-center text-brand">
                      {stat.icon}
                    </div>
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                  </div>
                  <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Pillars Section */}
          <section className="container-responsive py-20">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Core Capabilities</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Enterprise AI Solutions
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  className="group rounded-3xl border-2 border-white/10 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-sm overflow-hidden hover:border-brand/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-2xl`}>
                        {pillar.icon}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">{pillar.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">{pillar.description}</p>
                    <ul className="space-y-3">
                      {pillar.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Lab Projects */}
          <section className="container-responsive py-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4 font-medium">Lab snapshots</p>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Representative AI programs
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                  Real-world deployments showcasing our expertise in AI, robotics, and intelligent automation.
                </p>
              </div>
              <Link href="/contact">
              <motion.a 
                 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-brand/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                >
                Discuss your initiative
                <ArrowRight className="w-5 h-5" />
              </motion.a>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {labProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  className="group rounded-3xl border-2 border-white/10 bg-gradient-to-b from-gray-900/80 to-gray-950/80 overflow-hidden hover:border-brand/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-white">{project.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">{project.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-4 py-2 rounded-full border-2 border-white/10 bg-white/5 text-white/90 text-xs font-semibold hover:border-brand/50 hover:bg-brand/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Platform + MLOps */}
          <section className="bg-gradient-to-r from-brand/20 via-purple-500/10 to-transparent py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-white/70 mb-4 font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Platform + MLOps
                </p>
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Observability, compliance, and resilience by design.
                </h2>
                <ul className="space-y-4 mb-8">
                  {platformFeatures.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3 text-white/90 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle className="w-6 h-6 text-brand mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.a 
                  href="/solutions" 
                  className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand transition-colors text-lg"
                  whileHover={{ x: 5 }}
                >
                  Explore platform solutions
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>

              <motion.div
                className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-6 font-medium flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Preferred stack
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {stack.map((item, idx) => (
                    <motion.div
                      key={item}
                      className="px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-sm text-white/90 font-medium hover:border-brand/50 hover:bg-brand/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Automation Showcase */}
          <section className="container-responsive py-20">
            <AutomationShowcase />
          </section>
        </div>
      </Layout>
    </>
  );
}
