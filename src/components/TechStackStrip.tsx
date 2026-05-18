import Image from 'next/image';
import { motion } from 'framer-motion';
import { TECH_STACK, techIconPath } from '@/lib/tech-stack';

type Props = {
  className?: string;
};

export default function TechStackStrip({ className = '' }: Props) {
  return (
    <section className={`border-y border-[var(--xws-border)] bg-[var(--xws-bg-raised)] py-16 ${className}`}>
      <motion.div
        className="container-responsive text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--xws-border)] px-3 py-1.5 text-xs text-[var(--xws-text-muted)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--xws-accent)]" />
          Tech stack
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--xws-text-primary)] mb-10">
          Technologies we master
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.slug}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group flex flex-col items-center gap-2.5 w-[5.5rem] sm:w-24"
            >
              <motion.div
                className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl border border-[var(--xws-border)] bg-[var(--xws-bg-card)] flex items-center justify-center p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-[var(--xws-accent)] group-hover:shadow-xws-glow"
                whileHover={{ y: -4, scale: 1.04 }}
              >
                <Image
                  src={techIconPath(tech.slug)}
                  alt={`${tech.name} logo`}
                  width={40}
                  height={40}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <span className="text-[10px] sm:text-xs font-medium text-[var(--xws-text-muted)] group-hover:text-[var(--xws-accent)] transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
