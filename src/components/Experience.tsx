import { useEffect, useState } from 'react';
import { Experience as Exp, fetchExperience } from '@/lib/api';
import { motion } from 'framer-motion';

export default function Experience() {
  const [items, setItems] = useState<Exp[]>([]);
  useEffect(() => {
    fetchExperience().then(setItems).catch(() => setItems([]));
  }, []);
  return (
    <section className="container-responsive py-20" id="experience">
      <h2 className="text-3xl font-semibold text-center">
        My <span className="text-brand">Work Experience</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
        {items.map((r, idx) => (
          <motion.div
            key={r.company + r.title}
            className={`relative ${idx % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:col-start-2'}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute hidden md:block top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 bg-brand" />
            <div className="card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{r.company}</p>
                </div>
                <span className="text-xs text-gray-500">{r.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
                {(r.bullets || []).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


