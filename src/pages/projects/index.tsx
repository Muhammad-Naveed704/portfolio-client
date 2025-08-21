import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type Props = { projects: Project[]; tag?: string };

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const tag = typeof query.tag === 'string' ? query.tag : undefined;
  try {
    const projects = await fetchProjects({ tag });
    return { props: { projects, tag: tag || null } } as any;
  } catch {
    return { props: { projects: [], tag: tag || null } } as any;
  }
};

export default function ProjectsPage({ projects, tag }: Props) {
  const router = useRouter();
  const setTag = (t?: string) => router.push({ pathname: '/projects', query: t ? { tag: t } : {} });
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));
  return (
    <Layout title="Projects">
      <section className="container-responsive py-12">
        <div className="flex flex-wrap items-center gap-2">
          <button className={`px-3 py-1 rounded ${!tag ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}`} onClick={() => setTag(undefined)}>All</button>
          {tags.map((t) => (
            <button key={t} className={`px-3 py-1 rounded ${tag === t ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}`} onClick={() => setTag(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}


