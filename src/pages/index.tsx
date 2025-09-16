import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import HireMe from '@/components/HireMe';
import Testimonials from '@/components/Testimonials';
import CTAEmail from '@/components/CTAEmail';
import BlogPosts from '@/components/BlogPosts';
import GithubShowcase from '@/components/GithubShowcase';
import FeaturedProjects from '@/components/FeaturedProjects';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';

type Props = { featured: Project[]; allProjects: Project[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const featured = await fetchProjects({ featured: true });
    const allProjects = await fetchProjects({});
    console.log("Fetched featured projects:", featured);
    console.log("Fetched all projects:", allProjects);
    return { props: { featured, allProjects } };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { props: { featured: [], allProjects: [] } };
  }
};

export default function Home({ featured, allProjects }: Props) {
  console.log("FEATURED PROJECTS in Home:", featured);
  console.log("ALL PROJECTS in Home:", allProjects);
  return (
    <Layout title="Home">
      <Hero />
      {/* <About /> */}
      <FeaturedProjects projects={featured} />
      <Skills />
      <Experience />
      <HireMe />
      <Testimonials />
      {/* <CTAEmail /> */}
      <BlogPosts />
      <GithubShowcase />
    </Layout>
  );
}