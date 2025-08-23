/* Services section resembling the dark carousel-style from the reference */
import { motion } from 'framer-motion';

type Service = {
  title: string;
  image: string;
};

const services: Service[] = [
  {
    title: 'UI/ UX Design',
    image:
      'https://images.unsplash.com/photo-1559027615-5f66825c1b66?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Web Design',
    image:
      'https://images.unsplash.com/photo-1529336953121-d090d08ac995?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Landing Page',
    image:
      'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Services() {
  return (
    <section className="container-responsive py-12" id="services">
      <div className="rounded-3xl overflow-hidden p-6 sm:p-10 relative" style={{
        background:
          'radial-gradient(1200px 400px at 20% -20%, rgba(255,122,0,0.08), transparent), radial-gradient(1000px 400px at 90% 120%, rgba(255,122,0,0.08), transparent), linear-gradient(135deg, #0f0f12 0%, #1b1b1f 60%, #111114 100%)',
      }}>
        <div className="flex items-start justify-between">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold">My <span className="text-brand">Services</span></h2>
          <p className="hidden sm:block max-w-md text-sm text-white/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo volutpat, bibendum sodales.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 pt-4 pb-2 text-white/90 text-sm">{s.title}</div>
              <div className="px-5">
                <div className="rounded-2xl bg-black/40 shadow-inner p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} className="rounded-xl w-full h-48 object-cover" />
                </div>
              </div>
              <div className="flex items-center justify-end p-4">
                <button className="w-12 h-12 rounded-full bg-black/70 text-white grid place-items-center hover:bg-brand transition-colors">↗</button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Slider dots mock */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-8 h-1 rounded bg-brand" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}


