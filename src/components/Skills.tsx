import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tech = {
  name: string;
  icon: string; // url
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Databases' | 'DevOps' | 'AI';
};

const techs: Tech[] = [
  { name: 'CSS', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg', category: 'Frontend' },
  { name: 'HTML', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg', category: 'Frontend' },
  { name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', category: 'Frontend' },
  { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', category: 'Frontend' },
  { name: 'Next.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg', category: 'Frontend' },
  { name: 'Angular', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg', category: 'Frontend' },
  { name: 'Vue.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg', category: 'Frontend' },
  { name: 'Ember', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ember/ember-original-wordmark.svg', category: 'Frontend' },

  { name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg', category: 'Backend' },
  { name: 'Express', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg', category: 'Backend' },
  { name: 'MongoDB', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg', category: 'Databases' },
  { name: 'PostgreSQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg', category: 'Databases' },
  { name: 'Redis', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg', category: 'Databases' },
  { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', category: 'DevOps' },
  { name: 'GitHub Actions', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg', category: 'DevOps' },
  { name: 'Expo', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/expo/expo-original.svg', category: 'Mobile' },
  { name: 'React Native', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', category: 'Mobile' },
  { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai/412991', category: 'AI' },
];

const categories = ['Frontend', 'Backend', 'Mobile', 'Databases', 'DevOps', 'AI', 'All'] as const;

export default function Skills() {
  const [tab, setTab] = useState<(typeof categories)[number]>('Frontend');
  const list = useMemo(() => (tab === 'All' ? techs : techs.filter((t) => t.category === tab)), [tab]);

  return (
    <section className="container-responsive py-16" id="skills">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          TECHNO<span className="text-brand">LOGIES</span> <span className="text-brand">WE USE</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We leverage cutting‑edge technologies to build robust and scalable solutions.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${tab === c ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {list.map((t) => (
            <motion.div
              layout
              key={t.name}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.icon} alt={t.name} className="w-7 h-7" />
              <div className="font-medium">{t.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}


