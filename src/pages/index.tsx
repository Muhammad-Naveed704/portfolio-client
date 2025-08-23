import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import HireMe from '@/components/HireMe';
import Testimonials from '@/components/Testimonials';
import CTAEmail from '@/components/CTAEmail';
import BlogPosts from '@/components/BlogPosts';
import ProjectCard from '@/components/ProjectCard';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import GithubShowcase from '@/components/GithubShowcase';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Services from '@/components/Services';

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
      <Services />
      <About />
      <PortfolioShowcase projects={featured} />
      <section className="container-responsive py-16" id="projects">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-brand text-sm hover:underline">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <Skills />
      <Experience />
      <HireMe />
      <Testimonials />
      <CTAEmail />
      <BlogPosts />
      <GithubShowcase />
    </Layout>
  );
}


