import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const values = [
  {
    title: 'Innovation First',
    description: 'We stay ahead of technology trends and continuously explore new solutions to solve complex problems.',
    icon: '💡',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Client-Centric',
    description: 'Your success is our success. We prioritize understanding your needs and delivering value.',
    icon: '🤝',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Quality Excellence',
    description: 'We maintain the highest standards in code quality, design, and project delivery.',
    icon: '⭐',
    color: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Transparent Communication',
    description: 'Open, honest communication throughout the project lifecycle builds trust and ensures alignment.',
    icon: '💬',
    color: 'from-green-400 to-emerald-500',
  },
];

const milestones = [
  { year: '2017', title: 'Founded', description: 'Started as a small team with big dreams' },
  { year: '2019', title: 'First Major Client', description: 'Delivered enterprise solutions for international clients' },
  { year: '2021', title: 'Team Expansion', description: 'Grew to 12+ dedicated experts across multiple domains' },
  { year: '2023', title: 'AI Integration', description: 'Launched AI & Robotics division' },
  { year: '2025', title: 'Global Reach', description: 'Serving clients across 5 continents' },
];

const stats = [
  { value: '70+', label: 'Projects Delivered' },
  { value: '12+', label: 'Expert Team Members' },
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Happy Clients' },
];

export default function CompanyPage() {
  return (
    <Layout title="Company">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container-responsive py-16 sm:py-24">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.4em] text-brand mb-4">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6">
              Building the Future of <span className="text-brand">Digital Solutions</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Xws Solution is a full-spectrum digital engineering studio specializing in AI, web, mobile, 
              and platform solutions. We combine technical expertise with creative innovation to deliver 
              products that make a difference.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  className="text-4xl sm:text-5xl font-bold text-brand mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container-responsive grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                innovation, and competitive advantage. We believe in building products that not 
                only meet today's needs but anticipate tomorrow's challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                To become the global leader in AI-powered digital solutions, recognized for our 
                technical excellence, innovative approach, and unwavering commitment to client success. 
                We envision a future where technology seamlessly enhances human potential.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="container-responsive py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-semibold mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-white flex items-center justify-center text-3xl mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container-responsive">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold mb-4">Our Journey</h2>
              <p className="text-white/70">
                Milestones that shaped who we are today
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    className="relative pl-20"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 w-4 h-4 rounded-full bg-brand border-4 border-gray-900" />

                    <div className="text-sm text-brand font-semibold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-white/70">{milestone.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-responsive py-16">
          <motion.div
            className="bg-gradient-to-br from-brand/10 to-transparent rounded-3xl p-12 text-center border border-brand/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Join Us on Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're looking to build your next product or join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand/90 transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="/career"
                className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                View Careers
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}


