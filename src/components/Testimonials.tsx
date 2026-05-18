import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  text: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Marvin Mahoney',
    role: 'CEO, Savtech',
    text: 'Naveed built our HR module with React, TypeScript, and NestJS. The integration was clean, the UX thoughtful, and the final product exceeded our expectations.',
    avatar: 'MM',
  },
  {
    name: 'Faheem',
    role: 'Technical Lead, ClaimsMed',
    text: 'He delivered responsive UIs for eClinic Assist with strong frontend practices. Our users noticed the polish immediately — professional and scalable.',
    avatar: 'F',
  },
  {
    name: 'Tariq Siddiqui',
    role: 'Technical Lead, eSanad',
    text: 'Role management and org hierarchy modules were implemented smoothly. Excellent problem-solving on critical features — highly recommended.',
    avatar: 'TS',
  },
  {
    name: 'Sufiyan',
    role: 'CEO, Hiring Mine',
    text: 'Outstanding ownership on our job platform frontend with React. Modern, responsive, and shipped on schedule with great communication.',
    avatar: 'S',
  },
];

function visibleIndices(active: number, total: number) {
  if (total <= 3) return Array.from({ length: total }, (_, i) => i);
  return [(active - 1 + total) % total, active, (active + 1) % total];
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const indices = visibleIndices(active, total);

  return (
    <section className="container-responsive py-20 sm:py-24" id="testimonials">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border)] bg-[var(--xws-bg-card)] px-4 py-2 text-xs text-[var(--xws-text-muted)] mb-4">
          <Quote className="w-3.5 h-3.5 text-[var(--xws-accent)]" />
          Testimonials
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--xws-text-primary)]">
          What our clients <span className="text-[var(--xws-accent)]">say about us</span>
        </h2>
        <p className="mt-4 text-[var(--xws-text-muted)] max-w-xl mx-auto">
          Trusted by founders and engineering leaders who need reliable delivery, not demos.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {indices.map((idx) => {
            const t = testimonials[idx];
            const isCenter = idx === active;
            return (
              <motion.article
                key={`${idx}-${t.name}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: isCenter ? 1.02 : 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`relative xws-card p-7 sm:p-8 flex flex-col min-h-[280px] ${
                  isCenter ? 'border-[var(--xws-accent)]/40 shadow-xws-glow md:-translate-y-1' : ''
                }`}
              >
                <span
                  className="absolute top-5 right-6 text-6xl font-serif text-[var(--xws-text-primary)] opacity-[0.04] leading-none select-none"
                  aria-hidden
                >
                  "
                </span>
                <div className="flex gap-1 mb-5" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--xws-accent)] fill-[var(--xws-accent)]" />
                  ))}
                </div>
                <p className="text-[var(--xws-text-secondary)] leading-relaxed flex-1 text-sm sm:text-base">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-[var(--xws-border)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-sm font-bold text-[var(--xws-accent)]">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--xws-text-primary)]">{t.name}</p>
                    <p className="text-xs text-[var(--xws-text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="w-11 h-11 rounded-full border border-[var(--xws-border-strong)] flex items-center justify-center text-[var(--xws-text-primary)] hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-8 bg-[var(--xws-accent)]' : 'w-1.5 bg-[var(--xws-text-faint)] hover:bg-[var(--xws-text-muted)]'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="w-11 h-11 rounded-full border border-[var(--xws-border-strong)] flex items-center justify-center text-[var(--xws-text-primary)] hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
