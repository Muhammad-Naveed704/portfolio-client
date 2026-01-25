import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote, CheckCircle } from "lucide-react";

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
    <section className="container-responsive py-20" id="testimonials">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-4 border border-brand/20">
          <Quote className="w-4 h-4" />
          Testimonials
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          What <span className="text-brand">Clients Say</span>
        </h2>
        <p className="text-lg text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
          Don't just take my word for it. Here's what industry professionals say about working with me.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Delivery Playbook - Left Side */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400 mb-4 font-medium">Delivery playbook</p>
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-white dark:text-white leading-tight">
              One accountable partner from strategy to operations.
            </h3>
          </div>
          
          <div className="space-y-6">
            {[
              { num: '01', label: 'Discover', detail: 'Research, product strategy, technical archetypes' },
              { num: '02', label: 'Design', detail: 'Brand, UX flows, system architecture blueprints' },
              { num: '03', label: 'Build', detail: 'Iterative sprints with weekly demos & QA gates' },
              { num: '04', label: 'Deploy', detail: 'Automated pipelines, load testing, hardening' },
              { num: '05', label: 'Operate', detail: 'Observability, SLOs, dedicated support pods' },
            ].map((phase, idx) => (
              <motion.div
                key={phase.num}
                className="group flex gap-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand via-brand to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {phase.num}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{phase.label}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{phase.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials - Right Side */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Featured Testimonial Card */}
          <motion.div 
            className="relative rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-2 border-gray-200 dark:border-gray-800 p-8 shadow-2xl hover:shadow-brand/20 transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, borderColor: 'rgb(14, 165, 233)' }}
          >
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand/5 to-purple-500/5 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand via-brand to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xl font-bold text-gray-900 dark:text-white ml-2">5.0</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {testimonials[activeTestimonial].title} at {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg italic relative pl-6 border-l-4 border-brand">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 text-brand text-sm font-semibold border border-brand/20">
                  <CheckCircle className="w-4 h-4" />
                  {testimonials[activeTestimonial].highlight}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="grid grid-cols-4 gap-3">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`group relative rounded-2xl p-4 transition-all duration-300 text-left overflow-hidden ${
                  activeTestimonial === index
                    ? 'bg-gradient-to-br from-brand via-purple-600 to-brand text-white shadow-2xl shadow-brand/50 scale-105 ring-2 ring-brand/50 z-10'
                    : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-brand/50 hover:shadow-xl'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: activeTestimonial === index ? 1.05 : 1.08, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient effect */}
                {activeTestimonial === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transition-transform ${
                      activeTestimonial === index
                        ? 'bg-white/20 backdrop-blur-sm text-white ring-2 ring-white/30'
                        : 'bg-gradient-to-br from-brand to-purple-600 text-white group-hover:scale-110'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${
                        activeTestimonial === index ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        {testimonial.name.split(' ')[0]}
                      </p>
                      <p className={`text-xs truncate font-medium ${
                        activeTestimonial === index ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${
                        activeTestimonial === index ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-400 fill-yellow-400'
                      }`} />
                    ))}
                  </div>
                  <p className={`text-xs leading-tight line-clamp-3 font-medium ${
                    activeTestimonial === index ? 'text-white/95' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {testimonial.text}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { value: '10+', label: 'Projects Completed' },
          { value: '100%', label: 'Client Satisfaction' },
          { value: '3+', label: 'Years Experience' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="text-center p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-brand to-purple-600 bg-clip-text text-transparent mb-3">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
