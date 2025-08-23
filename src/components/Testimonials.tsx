import { motion } from 'framer-motion';

type Testimonial = {
  name: string;
  title: string;
  text: string;
};

const items: Testimonial[] = [
  {
    name: 'Jayesh Patil',
    title: 'CEO, Lirante',
    text: 'Consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum egestas lobortis.'
  },
  {
    name: 'Jayesh Patil',
    title: 'CEO, Lirante',
    text: 'Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum egestas lobortis.'
  },
  {
    name: 'Jayesh Patil',
    title: 'CEO, Lirante',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum egestas lobortis.'
  }
];

export default function Testimonials() {
  return (
    <section className="container-responsive py-16" id="testimonials">
      <div className="rounded-3xl overflow-hidden p-6 sm:p-10" style={{background:"linear-gradient(135deg, #0f0f12 0%, #1b1b1f 60%, #111114 100%)"}}>
        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-semibold">Testimonials That</h2>
          <p className="text-2xl sm:text-3xl font-semibold mt-1">Speak to <span className="text-brand">My Results</span></p>
          <p className="mt-3 text-sm text-gray-300 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white" initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">👤</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-300">{t.title}</p>
                </div>
              </div>
              <div className="mt-3 text-orange-400 text-sm">★★★★★ <span className="text-white/80 ml-1">5.0</span></div>
              <p className="mt-3 text-sm text-gray-200 leading-6">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


