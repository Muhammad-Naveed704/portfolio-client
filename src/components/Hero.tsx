import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="container-responsive py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            className="text-3xl sm:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Muhammad Naveed
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Senior MERN Stack Developer — 5+ years building scalable web and mobile experiences.
          </motion.p>
          <div className="mt-6 flex gap-3">
            <a
              href="/Muhammad%20Naveed%20SW%20ENG.pdf"
              className="px-5 py-2 rounded-full bg-brand text-white hover:bg-brand-dark"
            >
              Download CV
            </a>
            <a
              href="contact"
              className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="justify-self-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-brand/60 shadow-xl">
            <Image src="/avatar.jpg" alt="Muhammad Naveed" fill priority sizes="(max-width: 768px) 12rem, 16rem" />
          </div>
        </div>
      </div>
    </section>
  );
}


