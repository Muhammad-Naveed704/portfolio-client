import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const industries = [
  {
    name: 'Fintech',
    icon: '🏦',
    description: 'Secure financial platforms, payment gateways, and banking solutions with compliance-ready architecture.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Ecommerce',
    icon: '🛒',
    description: 'Scalable online stores with advanced inventory management and seamless payment integration.',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'Education',
    icon: '🎓',
    description: 'Learning management systems, e-learning platforms, and educational technology solutions.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Real Estate',
    icon: '🏠',
    description: 'Property management platforms, listing systems, and real estate technology solutions.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Healthcare',
    icon: '🏥',
    description: 'HIPAA-compliant healthcare platforms, patient management systems, and telemedicine solutions.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'InsureTech',
    icon: '🛡️',
    description: 'Insurance platforms with claims management, policy administration, and document verification.',
    color: 'from-teal-500 to-blue-600',
  },
  {
    name: 'Travel & Hospitality',
    icon: '✈️',
    description: 'Booking platforms, reservation systems, and hospitality management solutions.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    name: 'Telecommunication',
    icon: '📡',
    description: 'Telecom solutions, network management, and communication platform integrations.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Industrial Tech',
    icon: '🏭',
    description: 'Manufacturing automation, IoT solutions, and industrial digital transformation.',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'NGOs',
    icon: '🤝',
    description: 'Non-profit platforms, donation systems, and community engagement solutions.',
    color: 'from-green-400 to-teal-600',
  },
];

export default function IndustriesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + industries.length) % industries.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % industries.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const visibleIndustries = [
    industries[(currentIndex - 1 + industries.length) % industries.length],
    industries[currentIndex],
    industries[(currentIndex + 1) % industries.length],
  ];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="container-responsive py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          Industries We <span className="text-brand">Specialize In</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Xws Solution brings over 8 years of expertise in delivering tailored digital solutions for various industries — 
          helping businesses overcome challenges and scale confidently.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-300"
          aria-label="Previous industry"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-300"
          aria-label="Next industry"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Industry Cards */}
        <div className="relative h-[400px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                {visibleIndustries.map((industry, idx) => {
                  const isCenter = idx === 1;
                  return (
                    <motion.div
                      key={`${industry.name}-${idx}`}
                      className={`relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-all duration-300 ${
                        isCenter
                          ? 'shadow-2xl scale-105 z-10'
                          : 'shadow-lg opacity-70 scale-95'
                      }`}
                      whileHover={isCenter ? { y: -8 } : {}}
                    >
                      {/* Gradient background for center card */}
                      {isCenter && (
                        <motion.div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${industry.color} opacity-10`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${industry.color} text-white flex items-center justify-center text-4xl mb-6 relative z-10`}
                        animate={isCenter ? { rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {industry.icon}
                      </motion.div>

                      {/* Name */}
                      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white relative z-10">
                        {industry.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 relative z-10">
                        {industry.description}
                      </p>

                      {/* Decorative element */}
                      {isCenter && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${industry.color} rounded-b-3xl`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-brand w-8'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
              aria-label={`Go to ${industries[index].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


