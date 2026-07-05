import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, MapPin } from 'lucide-react';

const DEFAULT_AVATAR = '/devavatar.jpg';

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
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Amir Khan',
    role: 'Software Engineer',
    focus: 'FinTech systems, SQL-heavy architectures, MongoDB, MERN Stack, Next.js, Golang, .NET, AI (LangChain, LLMs)',
    experience: '3 yrs — FinTech & Databases',
    location: 'Karachi · GMT+5',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Rashid Minhaj',
    role: 'SQA Engineer',
    focus: 'Selenium automation, Manual & API testing, Flutter/.NET basics',
    experience: '2 yrs — QA & Testing',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Abdul Wahab',
    role: 'Web Designer & Developer',
    focus: 'I specialize in designing and developing responsive websites using WordPress and Shopify. With a keen eye for aesthetics and a strong understanding of user experience, I create visually appealing and functional websites that cater to the unique needs of each client.',
    experience: '1 yr — WordPress & PHP',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Ashir',
    role: 'Software Engineer',
    focus: 'MERN Stack, Python, AI development',
    experience: '2 yrs — Full-Stack & AI',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Usama',
    role: 'Full-Stack Developer',
    focus: 'React, TypeScript, NestJS, Docker, SQL',
    experience: '4 yrs — Scalable Web Apps',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Asad',
    role: 'WordPress & Shopify Developer',
    focus: 'Custom themes, plugins, eCommerce solutions',
    experience: '5+ yrs — WordPress Expert',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
  },
  {
    name: 'Shafaqat',
    role: 'WordPress & Shopify Developer',
    focus: 'Website setup, customization, cPanel management',
    experience: '1 yr — Web Development',
    location: 'Remote',
    avatar: DEFAULT_AVATAR,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <motion.article
            key={member.name}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-950 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_28px_80px_rgba(14,165,233,0.12)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent opacity-80" />

            <div className="relative px-6 pt-8 pb-6 flex flex-col flex-1">
              <div className="flex items-start gap-4 mb-5">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand/40 to-brand/10 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-[72px] w-[72px] rounded-2xl overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-lg">
                    <Image
                      src={member.avatar ?? DEFAULT_AVATAR}
                      alt={`${member.name} profile`}
                      width={72}
                      height={72}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand mt-1">
                    {member.role}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-brand/70" />
                    <span className="truncate">{member.location}</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1">
                {member.focus}
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-white/10">
                  <Briefcase className="w-3.5 h-3.5 text-brand" />
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
