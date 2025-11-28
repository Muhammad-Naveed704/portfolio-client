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
import { useEffect, useState } from 'react';
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
  const [clientFeatured, setClientFeatured] = useState<Project[] | null>(featured.length ? featured : null);
  const [clientAll, setClientAll] = useState<Project[] | null>(allProjects.length ? allProjects : null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        if (clientFeatured === null) {
          const f = await fetchProjects({ featured: true });
          if (!mounted) return;
          setClientFeatured(f);
        }
        if (clientAll === null) {
          const a = await fetchProjects({});
          if (!mounted) return;
          setClientAll(a);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[home] client fallback fetch failed', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, [clientFeatured, clientAll]);

  const effectiveFeatured = clientFeatured ?? featured;
  const effectiveAll = clientAll ?? allProjects;
  return (
    <Layout title="Home">
      {/*<Hero /> */}
      {/* <About /> */}
      <FeaturedProjects projects={effectiveFeatured} />
      <Skills />
      {/* <Experience />*/}
     {/*  <HireMe />*/}
      <Testimonials />
      {/* <CTAEmail /> */}
      <BlogPosts />
      <GithubShowcase />
    </Layout>
  );
}