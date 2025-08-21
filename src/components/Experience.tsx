type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    company: 'Connect Logistic',
    title: 'Senior MERN Stack Developer',
    period: '2022 — Present',
    bullets: [
      'Led development of logistics dashboards and tracking systems',
      'Architected scalable REST APIs with Express and MongoDB',
      'Implemented CI/CD and performance optimizations'
    ]
  },
  {
    company: 'Freelance / International Clients',
    title: 'Full-Stack Developer',
    period: '2019 — 2022',
    bullets: [
      'Delivered e-commerce and SaaS apps with Next.js',
      'Built authentication, payments, and admin portals',
      'Optimized SEO and Lighthouse performance'
    ]
  }
];

export default function Experience() {
  return (
    <section className="container-responsive py-16" id="experience">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-6 space-y-4">
        {roles.map((r) => (
          <div key={r.company} className="card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{r.company}</p>
              </div>
              <span className="text-xs text-gray-500">{r.period}</span>
            </div>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


