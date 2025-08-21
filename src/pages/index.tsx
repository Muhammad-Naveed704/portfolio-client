import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import ProjectCard from '@/components/ProjectCard';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';

type Props = { featured: Project[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const featured = await fetchProjects({ featured: true });
    return { props: { featured } };
  } catch {
    return { props: { featured: [] } };
  }
};

export default function Home({ featured }: Props) {
  return (
    <Layout title="Home">
      <Hero />
      <About />
      <section className="container-responsive py-16" id="projects">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <a href="/projects" className="text-brand text-sm hover:underline">View all</a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <Skills />
      <Experience />
    </Layout>
  );
}


