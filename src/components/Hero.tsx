import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="container-responsive py-16 sm:py-24 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            className="font-display text-4xl sm:text-6xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Muhammad Naveed
          </motion.h1>
          <motion.p
            className="mt-3 text-base sm:text-lg text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
          I am Muhammad Naveed, a MERN Stack Developer with 5+ years of experience building high-performance web and mobile applications. I specialize in Next.js, React, Node.js, and MongoDB, crafting scalable architectures, clean UI/UX, and robust APIs. I’ve delivered e-commerce, dashboards, and mobile backends for international clients.
          </motion.p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/Muhammad%20Naveed%20SW%20ENG.pdf"
              className="btn-primary px-6 py-2.5 rounded-full"
            >
              Download CV
            </a>
            <a
              href="/contact"
              className="px-6 py-2.5 rounded-full border border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact
            </a>
          </div>
          {/* Left quote block */}
          {/* <div className="hidden sm:block mt-8 max-w-sm">
            <p className="text-sm text-gray-500">“Naveed’s exceptional product design ensures our website’s success. Highly recommended.”</p>
          </div> */}
        </div>
        <div className="justify-self-center order-first md:order-none relative">
          {/* background semicircle */}
          <div className="absolute -bottom-8 -z-10 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-brand/20" />
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-brand/60 shadow-xl">
            <Image src="/avatar.jpg" alt="Muhammad Naveed" fill priority sizes="(max-width: 768px) 12rem, 16rem" />
          </div>
          {/* Right stars and years */}
          <div className="hidden md:flex flex-col items-center gap-1 absolute right-[-5rem] top-4">
            <div className="flex gap-1 text-brand">★★★★★</div>
            <div className="text-sm text-gray-700 dark:text-gray-200"><span className="font-semibold">02 Years</span><br/>Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}


