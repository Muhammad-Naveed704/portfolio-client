import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const categories = [
  {
    id: 'frontend',
    label: 'Front End',
    technologies: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'Vue.js', icon: '💚' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Svelte', icon: '🧡' },
    ],
  },
  {
    id: 'backend',
    label: 'Back End',
    technologies: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'NestJS', icon: '🪺' },
      { name: 'Python', icon: '🐍' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'GraphQL', icon: '📊' },
      { name: 'tRPC', icon: '🔷' },
      { name: 'FastAPI', icon: '⚡' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    technologies: [
      { name: 'React Native', icon: '📱' },
      { name: 'Flutter', icon: '💙' },
      { name: 'Swift', icon: '🍎' },
      { name: 'Kotlin', icon: '🤖' },
      { name: 'Ionic', icon: '⚡' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    technologies: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Supabase', icon: '⚡' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    technologies: [
      { name: 'GitHub Actions', icon: '🔧' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '☸️' },
      { name: 'Terraform', icon: '🏗️' },
      { name: 'Jenkins', icon: '🤖' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    technologies: [
      { name: 'OpenAI', icon: '🤖' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'Hugging Face', icon: '🤗' },
      { name: 'Anthropic', icon: '🧬' },
    ],
  },
];

export default function TechnologiesPlatforms() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <section className="container-responsive py-16 sm:py-20">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          Technologies & <span className="text-brand">Platforms</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We work with cutting-edge technologies and platforms to build modern, scalable solutions.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-brand text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Technologies Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {categories
            .find((cat) => cat.id === activeCategory)
            ?.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-3"
                  animate={{
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {tech.icon}
                </motion.div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h3>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}


