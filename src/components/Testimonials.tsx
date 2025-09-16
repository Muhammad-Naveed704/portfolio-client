import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  title: string;
  text: string;
};

const items: Testimonial[] = [
  {
    name: "Savtech",
    title: "Project Manager",
    text: "Naveed contributed to building our HR module with React, TypeScript, and NestJS. His attention to detail and ability to integrate complex APIs made the module both efficient and user-friendly.",
  },
  {
    name: "ClaimsMed",
    title: "Technical Lead",
    text: "He worked on the eClinic Assist product and delivered clean, responsive UIs. Naveed’s understanding of frontend best practices helped us achieve a professional and scalable system.",
  },
  {
    name: "eSanad",
    title: "Product Owner",
    text: "Naveed developed role management and organizational hierarchy modules. His problem-solving skills and structured approach ensured smooth implementation of critical features.",
  },
  {
    name: "Hiring Mine",
    title: "CEO",
    text: "He played an important role in building our job posting platform. Naveed showed excellent ownership, delivering a modern and responsive frontend with ReactJS.",
  },
];


export default function Testimonials() {
  return (
    <section className="container-responsive py-16" id="testimonials">
      <div
        className="rounded-3xl overflow-hidden p-6 sm:p-10"
        style={{
          background:
            "linear-gradient(135deg, #0f0f12 0%, #1b1b1f 60%, #111114 100%)",
        }}
      >
        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Testimonials That
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold mt-1">
            Speak to <span className="text-brand">My Results</span>
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-300">{t.title}</p>
                </div>
              </div>
              <div className="mt-3 text-orange-400 text-sm">
                ★★★★★ <span className="text-white/80 ml-1">5.0</span>
              </div>
              <p className="mt-3 text-sm text-gray-200 leading-6">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
