import { motion } from "framer-motion";
import { useState } from "react";

type Testimonial = {
  name: string;
  title: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
  highlight: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marvin Mahoney",
    title: "CEO",
    company: "Savtech",
    text: "Naveed contributed to building our HR module with React, TypeScript, and NestJS. His attention to detail and ability to integrate complex APIs made the module both efficient and user-friendly. The final product exceeded our expectations.",
    rating: 5,
    avatar: "MM",
    highlight: "exceeded our expectations"
  },
  {
    name: "Faheem",
    title: "Technical Lead",
    company: "ClaimsMed",
    text: "He worked on the eClinic Assist product and delivered clean, responsive UIs. Naveed's understanding of frontend best practices helped us achieve a professional and scalable system that our users love.",
    rating: 5,
    avatar: "F",
    highlight: "professional and scalable system"
  },
  {
    name: "Tariq Siddiqui",
    title: "Technical Lead", 
    company: "eSanad",
    text: "Naveed developed role management and organizational hierarchy modules. His problem-solving skills and structured approach ensured smooth implementation of critical features. Highly recommended!",
    rating: 5,
    avatar: "TS",
    highlight: "smooth implementation of critical features"
  },
  {
    name: "Sufiyan",
    title: "CEO",
    company: "Hiring Mine",
    text: "He played an important role in building our job posting platform. Naveed showed excellent ownership, delivering a modern and responsive frontend with ReactJS. Outstanding work quality!",
    rating: 5,
    avatar: "S",
    highlight: "Outstanding work quality"
  },
];


export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="container-responsive py-16" id="testimonials">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Testimonials
        </div>
        <h2 className="text-4xl font-bold mb-4">
          What <span className="text-brand">Clients Say</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Don't just take my word for it. Here's what industry professionals say about working with me.
        </p>
      </motion.div>

      {/* Featured Testimonial */}
      <motion.div 
        className="mb-12 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl p-8 border border-brand/10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand/80 flex items-center justify-center text-white text-xl font-bold">
              {testimonials[activeTestimonial].avatar}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">5.0</span>
            </div>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
              "{testimonials[activeTestimonial].text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonials[activeTestimonial].title} at {testimonials[activeTestimonial].company}
                </p>
              </div>
              <div className="hidden sm:block px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
                {testimonials[activeTestimonial].highlight}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 ${
              activeTestimonial === index
                ? 'bg-brand text-white shadow-lg shadow-brand/25'
                : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setActiveTestimonial(index)}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                activeTestimonial === index
                  ? 'bg-white/20 text-white'
                  : 'bg-gradient-to-br from-brand to-brand/80 text-white'
              }`}>
                {testimonial.avatar}
              </div>
              <div>
                <p className={`font-semibold text-sm ${
                  activeTestimonial === index ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {testimonial.name}
                </p>
                <p className={`text-xs ${
                  activeTestimonial === index ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {testimonial.company}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 fill-current ${
                  activeTestimonial === index ? 'text-yellow-300' : 'text-yellow-400'
                }`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className={`text-xs leading-relaxed line-clamp-3 ${
              activeTestimonial === index ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {testimonial.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeTestimonial === index
                ? 'bg-brand w-8'
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-brand/50'
            }`}
          />
        ))}
      </div>

      {/* Stats Section */}
      <motion.div 
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="space-y-2">
          <div className="text-3xl font-bold text-brand">50+</div>
          <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-brand">100%</div>
          <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-brand">1+</div>
          <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
        </div>
      </motion.div>
    </section>
  );
}
