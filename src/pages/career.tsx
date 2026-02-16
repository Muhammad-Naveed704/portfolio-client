import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, DollarSign, BookOpen, Heart, Laptop, PartyPopper, CheckCircle, ArrowRight, MapPin, Briefcase, Clock, Users } from 'lucide-react';

const benefits = [
  {
    title: 'Remote First',
    description: 'Work from anywhere in the world with flexible hours',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
  },
  {
    title: 'Competitive Salary',
    description: 'Market-competitive compensation packages with performance bonuses',
    icon: <DollarSign className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
  },
  {
    title: 'Learning & Growth',
    description: 'Access to courses, conferences, and mentorship programs',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
  },
  {
    title: 'Health & Wellness',
    description: 'Health insurance and wellness programs for you and your family',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-red-400 to-orange-500',
    gradient: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
  },
  {
    title: 'Latest Tools',
    description: 'Top-of-the-line equipment and software licenses',
    icon: <Laptop className="w-8 h-8" />,
    color: 'from-indigo-400 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
  },
  {
    title: 'Team Events',
    description: 'Regular team building activities and company retreats',
    icon: <PartyPopper className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
  },
];

const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'We are looking for an experienced full-stack developer to join our team. You will work on cutting-edge web applications using modern technologies like Next.js, React, and Node.js.',
    requirements: ['5+ years experience', 'React/Next.js expertise', 'Node.js/NestJS', 'TypeScript'],
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI Studio',
    type: 'Full-time',
    location: 'Remote',
    description: 'Join our AI team to build cutting-edge machine learning solutions. Work on LLM products, computer vision systems, and robotics platforms.',
    requirements: ['ML/AI experience', 'Python/PyTorch', 'LangChain/OpenAI', 'MLOps knowledge'],
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'Create beautiful and functional user interfaces with React and Next.js. Work on responsive designs and modern UI/UX patterns.',
    requirements: ['3+ years experience', 'React/Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'DevOps Engineer',
    department: 'Platform',
    type: 'Full-time',
    location: 'Remote',
    description: 'Build and maintain our CI/CD pipelines and cloud infrastructure. Ensure high availability and scalability of our platforms.',
    requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
  },
];

const values = [
  'Innovation & Creativity',
  'Work-Life Balance',
  'Diversity & Inclusion',
  'Continuous Learning',
  'Collaboration',
  'Ownership & Accountability',
];

export default function CareerPage() {
  return (
    <>
      <SEO
        title="Careers | Join Our Team | Xws Solution"
        description="Build your career with Xws Solution. We're looking for talented Software Engineers, Full-Stack Developers, AI/ML Engineers, Frontend Developers, and DevOps Engineers. Remote-first positions available with competitive salary, learning opportunities, and great work culture. Join our team of experts in SaaS Development, Web Development, AI & Robotics."
        keywords="Xws Solution Careers, Software Engineer Jobs, Full-Stack Developer Jobs, AI Engineer Jobs, ML Engineer Jobs, Frontend Developer Jobs, DevOps Engineer Jobs, Remote Jobs, Software Development Jobs, Web Development Jobs, AI Development Jobs, Technology Jobs, Karachi Jobs, Pakistan Jobs, Remote Work, Tech Careers"
        canonical="https://xws.digital/career"
      />
      <Layout title="Career">
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          {/* Hero Section */}
          <section className="container-responsive py-20 sm:py-28 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
              className="text-center max-w-4xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="text-sm uppercase tracking-[0.4em] text-brand mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Users className="w-4 h-4" />
                Join Our Team
              </motion.p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Build Your Career with <span className="text-brand bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent">Xws Solution</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We're always looking for talented individuals who are passionate about technology 
                and innovation. Join us in building the future of digital solutions.
              </p>
            </motion.div>
          </section>

          {/* Benefits */}
          <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
            <div className="container-responsive">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Why Work With Us?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  We offer competitive benefits and a great work environment
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className={`group rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 hover:shadow-2xl transition-all duration-300 hover:border-brand/50 ${benefit.gradient}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Culture */}
          <section className="container-responsive py-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our Culture
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                We believe in creating an environment where everyone can thrive
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {values.map((value, idx) => (
                  <motion.span
                    key={value}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand transition-all duration-300 shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {value}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Open Positions */}
          <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
            <div className="container-responsive">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Open Positions
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Check out our current openings
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {openPositions.map((position, index) => (
                  <motion.div
                    key={position.title}
                    className="group rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 hover:shadow-2xl transition-all duration-300 hover:border-brand/50"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{position.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 text-brand text-sm font-semibold border border-brand/20">
                            <Briefcase className="w-4 h-4" />
                            {position.department}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{position.description}</p>
                    
                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand" />
                        Key Requirements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-brand font-bold hover:text-purple-600 transition-colors text-lg group"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="container-responsive py-20">
            <motion.div
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand/10 via-purple-500/10 to-brand/5 p-12 sm:p-16 text-center border-2 border-brand/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Don't See Your Role?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  We're always interested in hearing from talented individuals. Even if we don't have 
                  an open position that matches your skills, feel free to reach out!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand via-brand to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-brand/50 transition-all"
                  >
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
      </Layout>
    </>
  );
}
