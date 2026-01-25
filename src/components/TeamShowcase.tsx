import { motion } from 'framer-motion';

type TeamMember = {
  name: string;
  role: string;
  focus: string;
  experience: string;
  location: string;
  avatar?: string;
};

const team: TeamMember[] = [
  {
    name: 'Muhammad Naveed',
    role: 'Software Engineer',
    focus: 'MERN Stack, Next.js, Golang, .NET, AI (LangChain, LLMs)',
    experience: '3 yrs — Web, AI & DevOps',
    location: 'Karachi · GMT+5',
  },
  {
    name: 'Amir Khan',
    role: 'Software Engineer',
    focus: 'FinTech systems, SQL-heavy architectures, MongoDB , MERN Stack, Next.js, Golang, .NET, AI (LangChain, LLMs)',
    experience: '3 yrs — FinTech & Databases',
    location: 'Karachi · GMT+5',
  },
  {
    name: 'Rashid Minhaj',
    role: 'SQA Engineer',
    focus: 'Selenium automation, Manual & API testing, Flutter/.NET basics',
    experience: '2 yrs — QA & Testing',
    location: 'Remote',
  },
  {
    name: 'Ashir',
    role: 'Software Engineer',
    focus: 'MERN Stack, Python, AI development',
    experience: '2 yrs — Full-Stack & AI',
    location: 'Remote',
  },
  {
    name: 'Usama',
    role: 'Full-Stack Developer',
    focus: 'React, TypeScript, NestJS, Docker, SQL',
    experience: '4 yrs — Scalable Web Apps',
    location: 'Remote',
  },
  {
    name: 'Asad',
    role: 'WordPress & Shopify Developer',
    focus: 'Custom themes, plugins, eCommerce solutions',
    experience: '5+ yrs — WordPress Expert',
    location: 'Remote',
  },
  {
    name: 'Shafaqat',
    role: 'WordPress & Shopify Developer',
    focus: 'Website setup, customization, cPanel management',
    experience: '1 yr — Web Development',
    location: 'Remote',
  },
];

export default function TeamShowcase() {
  return (
    <section className="container-responsive py-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">
            Core team
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mt-3">
            Crafted by leads who have shipped products for iconic companies.
          </h2>
        </div>
        <p className="max-w-lg text-gray-600 dark:text-gray-300 text-sm">
          A senior strike team embedded with your org—mirroring the calm, detail-first presentation you see from
          Apple launches. Quiet confidence, high accountability.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member, index) => (
          <motion.article
            key={member.name}
            className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,.18),_transparent_55%)]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/50">
                    {member.location}
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-white/80">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400 dark:text-white/40">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {member.focus}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-white/70 pt-2">
                <span className="px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                  {member.experience}
                </span>
                
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

