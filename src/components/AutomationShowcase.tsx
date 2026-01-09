import { motion } from 'framer-motion';
import { useState } from 'react';

const automationFeatures = [
  {
    title: 'CI/CD Automation',
    description: 'Automated deployment pipelines with GitHub Actions, Docker, and Kubernetes for seamless releases.',
    icon: '🔄',
    benefits: [
      'Zero-downtime deployments',
      'Automated testing & quality gates',
      'Rollback capabilities',
      'Multi-environment management',
    ],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Workflow Automation',
    description: 'Intelligent automation using Temporal, Airflow, and custom orchestration for complex business processes.',
    icon: '⚙️',
    benefits: [
      'Event-driven workflows',
      'Error handling & retries',
      'Scalable task processing',
      'Real-time monitoring',
    ],
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'AI-Powered Automation',
    description: 'Machine learning models for predictive maintenance, intelligent routing, and automated decision-making.',
    icon: '🤖',
    benefits: [
      'Predictive analytics',
      'Natural language processing',
      'Computer vision automation',
      'Intelligent document processing',
    ],
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Infrastructure Automation',
    description: 'Infrastructure as Code with Terraform, Ansible, and cloud-native tools for consistent environments.',
    icon: '🏗️',
    benefits: [
      'Infrastructure as Code',
      'Auto-scaling capabilities',
      'Cost optimization',
      'Security compliance',
    ],
    color: 'from-orange-500 to-red-600',
  },
];

const automationStats = [
  { value: '95%', label: 'Process Automation', description: 'Reduced manual tasks' },
  { value: '10x', label: 'Faster Deployments', description: 'Compared to manual' },
  { value: '24/7', label: 'Automated Monitoring', description: 'Continuous oversight' },
  { value: '99.9%', label: 'Uptime', description: 'Reliability guarantee' },
];

export default function AutomationShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="container-responsive py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm uppercase tracking-[0.4em] text-brand mb-4">Automation & Intelligence</p>
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          Intelligent <span className="text-brand">Automation Solutions</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Streamline operations, reduce costs, and accelerate growth with our comprehensive automation 
          and AI-powered solutions. From CI/CD pipelines to intelligent workflows, we automate what matters.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {automationStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.05 }}
          >
            <motion.div
              className="text-4xl font-bold text-brand mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {stat.value}
            </motion.div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</div>
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {automationFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className={`relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 h-full transition-all duration-300 ${
                hoveredIndex === index ? 'shadow-2xl scale-105' : 'shadow-lg'
              }`}
              whileHover={{ y: -8 }}
            >
              {/* Animated background */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                initial={false}
                animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
              />

              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center text-3xl mb-6 relative z-10`}
                animate={{
                  rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2 relative z-10">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <motion.svg
                      className="w-5 h-5 text-brand mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative element */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-white font-semibold hover:bg-brand/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Discuss Your Automation Needs
          <span className="text-xl">→</span>
        </a>
      </motion.div>
    </section>
  );
}


