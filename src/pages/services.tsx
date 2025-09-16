import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: string;
  color: string;
  gradient: string;
};

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications with modern technologies and scalable architecture.',
    features: [
      'Custom websites using Next.js, React.js, Node.js, NestJS',
      'Scalable backend & frontend architecture',
      'API Development & Integration',
      'Database design & optimization',
      'Performance optimization & SEO'
    ],
    technologies: ['Next.js', 'React.js', 'Node.js', 'NestJS', 'TypeScript', 'MongoDB', 'MySQL'],
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    description: 'Modern, responsive, and user-friendly frontend solutions with cutting-edge technologies.',
    features: [
      'Responsive UI/UX with React, Next.js, Tailwind, MUI',
      'Reusable components & clean code practices',
      'Performance optimization (SEO + Accessibility)',
      'Cross-browser compatibility',
      'Mobile-first responsive design'
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Material-UI', 'Framer Motion', 'TypeScript'],
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    description: 'Robust and scalable backend systems with secure APIs and efficient data management.',
    features: [
      'Node.js / Express.js / NestJS applications',
      'Database design & management (MongoDB, MySQL)',
      'Authentication, role & permission management',
      'RESTful APIs & GraphQL',
      'Microservices architecture'
    ],
    technologies: ['Node.js', 'Express.js', 'NestJS', 'MongoDB', 'MySQL', 'JWT', 'Socket.io'],
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with secure payment integration and management systems.',
    features: [
      'Custom e-commerce platforms (React/Next.js)',
      'Secure payment integration (Stripe, PayPal)',
      'Product management dashboards',
      'Order tracking & inventory management',
      'Customer analytics & reporting'
    ],
    technologies: ['Next.js', 'Stripe', 'PayPal', 'MongoDB', 'Redis', 'Node.js'],
    icon: '🛒',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
  },
  {
    id: 'insurance-healthcare',
    title: 'Insurance & Healthcare Platforms',
    description: 'Specialized platforms for insurance and healthcare with advanced role management.',
    features: [
      'Role & Permission systems (eSanad & ClaimsMed experience)',
      'Document & claim management',
      'Dynamic admin dashboards',
      'Patient/Client portals',
      'Compliance & security features'
    ],
    technologies: ['React.js', 'NestJS', 'MongoDB', 'JWT', 'Socket.io', 'PDF.js'],
    icon: '🏥',
    color: 'from-teal-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20'
  },
  {
    id: 'digital-publishing',
    title: 'Digital Publishing Solutions',
    description: 'Complete publishing platforms for digital content creators and publishers.',
    features: [
      'eBook publishing websites (KDP Digital Publishers)',
      'SEO optimized landing pages',
      'Client portals & author dashboards',
      'Content management systems',
      'Analytics & reporting tools'
    ],
    technologies: ['Next.js', 'WordPress', 'Strapi', 'MongoDB', 'AWS S3', 'Cloudinary'],
    icon: '📚',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
  },
  {
    id: 'creative-services',
    title: 'Creative & Graphic Services',
    description: 'Professional design services for branding, marketing, and digital content.',
    features: [
      'Logo design & brand identity (Xwave Solutions background)',
      'CV design & portfolio design',
      'Thumbnails & video editing',
      'Marketing materials design',
      'UI/UX design mockups'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Canva Pro', 'After Effects', 'Premiere Pro'],
    icon: '🎬',
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <Layout title="Services">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container-responsive py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              My Services
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Professional <span className="text-brand">Development Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From full-stack web development to creative design solutions, I provide comprehensive services 
              to help bring your digital vision to life with modern technologies and professional expertise.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-brand mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand mb-2">7</div>
              <div className="text-gray-600 dark:text-gray-300">Service Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="container-responsive pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`group cursor-pointer rounded-2xl p-8 transition-all duration-500 border border-gray-200 dark:border-gray-800 hover:shadow-2xl ${service.gradient}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
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
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Expand Button */}
                <div className="flex justify-end mt-4">
                  <motion.button
                    className="w-10 h-10 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors duration-300 flex items-center justify-center"
                    animate={{ rotate: activeService === service.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-responsive py-16">
          <motion.div 
            className="bg-gradient-to-br from-brand/5 to-transparent rounded-3xl p-12 text-center border border-brand/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with professional development services 
              tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="px-8 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand/90 transition-colors duration-300 hover:shadow-lg"
              >
                Get Started Today
              </a>
              <a 
                href="/projects"
                className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
