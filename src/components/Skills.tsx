type SkillGroup = {
  title: string;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs']
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Vercel', 'Railway', 'Render']
  }
];

export default function Skills() {
  return (
    <section className="container-responsive py-16" id="skills">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div key={g.title} className="card p-6">
            <h3 className="font-medium text-lg">{g.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


