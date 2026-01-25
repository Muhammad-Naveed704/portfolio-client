import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Head from 'next/head';
import { CheckCircle, ArrowRight, Sparkles, Zap, Shield, Rocket, Code, Palette, ShoppingCart, Heart, BookOpen, Film } from 'lucide-react';
import Link from 'next/link';

type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
  image: string;
  benefits: string[];
};

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications with modern technologies and scalable architecture.',
    longDescription: 'Transform your business with cutting-edge web solutions. From dynamic single-page applications to complex enterprise platforms, we deliver scalable, performant, and maintainable web applications that drive growth.',
    features: [
      'Custom websites using Next.js, React.js, Node.js, NestJS',
      'Scalable backend & frontend architecture',
      'API Development & Integration',
      'Database design & optimization',
      'Performance optimization & SEO',
      'Progressive Web Apps (PWA)',
      'Serverless architecture',
      'Cloud deployment & scaling'
    ],
    technologies: ['Next.js', 'React.js', 'Node.js', 'NestJS', 'TypeScript', 'MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'Vercel'],
    icon: <Code className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Faster time to market', 'Reduced development costs', 'Improved user experience', 'Better SEO rankings']
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    description: 'Modern, responsive, and user-friendly frontend solutions with cutting-edge technologies.',
    longDescription: 'Create stunning user interfaces that captivate and convert. Our frontend solutions combine beautiful design with exceptional performance, ensuring your users have an unforgettable experience.',
    features: [
      'Responsive UI/UX with React, Next.js, Tailwind, MUI',
      'Reusable components & clean code practices',
      'Performance optimization (SEO + Accessibility)',
      'Cross-browser compatibility',
      'Mobile-first responsive design',
      'Animation & micro-interactions',
      'Design system implementation',
      'Accessibility (WCAG 2.1 compliance)'
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Material-UI', 'Framer Motion', 'TypeScript', 'Storybook', 'Jest'],
    icon: <Palette className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Increased user engagement', 'Higher conversion rates', 'Better brand perception', 'Reduced bounce rates']
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    description: 'Robust and scalable backend systems with secure APIs and efficient data management.',
    longDescription: 'Build powerful, secure, and scalable backend infrastructure that powers your applications. From RESTful APIs to microservices, we create systems that handle millions of requests with ease.',
    features: [
      'Node.js / Express.js / NestJS applications',
      'Database design & management (MongoDB, MySQL)',
      'Authentication, role & permission management',
      'RESTful APIs & GraphQL',
      'Microservices architecture',
      'Real-time features with WebSockets',
      'Caching strategies (Redis)',
      'API security & rate limiting'
    ],
    technologies: ['Node.js', 'Express.js', 'NestJS', 'MongoDB', 'MySQL', 'JWT', 'Socket.io', 'Redis', 'GraphQL', 'Docker'],
    icon: <Zap className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Improved system reliability', 'Enhanced security', 'Better scalability', 'Faster API responses']
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with secure payment integration and management systems.',
    longDescription: 'Launch your online store with a fully-featured e-commerce platform. From product catalogs to checkout flows, we build secure, scalable solutions that drive sales and customer satisfaction.',
    features: [
      'Custom e-commerce platforms (React/Next.js)',
      'Secure payment integration (Stripe, PayPal)',
      'Product management dashboards',
      'Order tracking & inventory management',
      'Customer analytics & reporting',
      'Shopping cart & wishlist',
      'Multi-currency support',
      'Order fulfillment automation'
    ],
    technologies: ['Next.js', 'Stripe', 'PayPal', 'MongoDB', 'Redis', 'Node.js', 'Prisma', 'Shopify API'],
    icon: <ShoppingCart className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Increased online sales', 'Better customer experience', 'Streamlined operations', 'Real-time inventory tracking']
  },
  {
    id: 'insurance-healthcare',
    title: 'Insurance & Healthcare Platforms',
    description: 'Specialized platforms for insurance and healthcare with advanced role management.',
    longDescription: 'Build compliant, secure platforms for healthcare and insurance industries. Our solutions ensure HIPAA compliance, data security, and seamless workflows for providers and patients.',
    features: [
      'Role & Permission systems (eSanad & ClaimsMed experience)',
      'Document & claim management',
      'Dynamic admin dashboards',
      'Patient/Client portals',
      'Compliance & security features',
      'HIPAA compliant architecture',
      'Electronic health records (EHR)',
      'Telemedicine integration'
    ],
    technologies: ['React.js', 'NestJS', 'MongoDB', 'JWT', 'Socket.io', 'PDF.js', 'AWS S3', 'HIPAA Compliance'],
    icon: <Heart className="w-8 h-8" />,
    color: 'from-teal-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    benefits: ['HIPAA compliance', 'Improved patient care', 'Streamlined workflows', 'Enhanced data security']
  },
  {
    id: 'digital-publishing',
    title: 'Digital Publishing Solutions',
    description: 'Complete publishing platforms for digital content creators and publishers.',
    longDescription: 'Empower content creators with powerful publishing platforms. From eBook distribution to digital magazines, we create platforms that make content creation and distribution seamless.',
    features: [
      'eBook publishing websites (KDP Digital Publishers)',
      'SEO optimized landing pages',
      'Client portals & author dashboards',
      'Content management systems',
      'Analytics & reporting tools',
      'Multi-format content support',
      'Subscription management',
      'Content monetization'
    ],
    technologies: ['Next.js', 'WordPress', 'Strapi', 'MongoDB', 'AWS S3', 'Cloudinary', 'Stripe', 'SendGrid'],
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Increased content reach', 'Better author experience', 'Automated workflows', 'Higher revenue potential']
  },
  {
    id: 'creative-services',
    title: 'Creative & Graphic Services',
    description: 'Professional design services for branding, marketing, and digital content.',
    longDescription: 'Elevate your brand with stunning visual design. From logos to complete brand identities, we create designs that resonate with your audience and drive engagement.',
    features: [
      'Logo design & brand identity (Xwave Solutions background)',
      'CV design & portfolio design',
      'Thumbnails & video editing',
      'Marketing materials design',
      'UI/UX design mockups',
      'Social media graphics',
      'Print design',
      'Animation & motion graphics'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Canva Pro', 'After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    icon: <Film className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Stronger brand identity', 'Increased brand recognition', 'Better marketing ROI', 'Professional appearance']
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Services | Xws Solution | Professional Development Services</title>
        <meta name="description" content="Comprehensive development services including web development, frontend, backend, e-commerce, healthcare platforms, and creative design solutions." />
      </Head>
      <Layout title="Services">
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          {/* Hero Section */}
          <section className="container-responsive py-20 sm:py-28 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div 
              className="text-center mb-16 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 text-brand text-sm font-medium mb-6 border border-brand/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" />
                My Services
              </motion.div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Professional <span className="text-brand bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent">Development Services</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From full-stack web development to creative design solutions, I provide comprehensive services 
                to help bring your digital vision to life with modern technologies and professional expertise.
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { value: '10+', label: 'Projects Completed', icon: <Rocket className="w-8 h-8" /> },
                { value: '7', label: 'Service Categories', icon: <Sparkles className="w-8 h-8" /> },
                { value: '100%', label: 'Client Satisfaction', icon: <Shield className="w-8 h-8" /> },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-purple-500/10 text-brand mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Services Grid */}
          <section className="container-responsive pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 border-2 border-gray-200 dark:border-gray-800 hover:border-brand/50 hover:shadow-2xl ${service.gradient}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/90 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.longDescription}
                    </p>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: activeService === service.id ? 'auto' : 0,
                        opacity: activeService === service.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700 mt-6">
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-brand" />
                            Key Features
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <CheckCircle className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-brand" />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-sm font-semibold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:border-brand hover:text-brand transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Expand Button */}
                    <div className="flex justify-end mt-6">
                      <motion.button
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-purple-600 text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        animate={{ rotate: activeService === service.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container-responsive py-20">
            <motion.div 
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand/10 via-purple-500/10 to-brand/5 p-12 sm:p-16 text-center border-2 border-brand/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Let's discuss how I can help bring your ideas to life with professional development services 
                  tailored to your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" passHref>
                  <motion.a 
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-brand via-brand to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-brand/50 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                    </Link>
                  <Link href="/projects" passHref>
                  <motion.a 
                  className="px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                    </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </Layout>
    </>
  );
}
