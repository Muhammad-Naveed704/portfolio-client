import { useEffect, useState } from 'react';
import { Experience as Exp, fetchExperience } from '@/lib/api';
import { motion } from 'framer-motion';

export default function Experience() {
  const [items, setItems] = useState<Exp[]>([]);
  useEffect(() => {
    fetchExperience().then(setItems).catch(() => setItems([]));
  }, []);
  return (
    <section className="container-responsive py-16" id="experience">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-6 space-y-4">
        {items.map((r) => (
          <motion.div key={r.company + r.title} className="card p-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}


