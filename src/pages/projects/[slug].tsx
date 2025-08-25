import Layout from '@/components/Layout';
import { fetchProject, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';
import { assetUrl } from '@/lib/url';

type Props = { project: Project | null };

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || '');
  try {
    const project = await fetchProject(slug);
    return { props: { project } };
  } catch {
    return { notFound: true } as any;
  }
};

export default function ProjectDetail({ project }: Props) {
  if (!project) return null;
  return (
    <Layout title={project.title}>
      <section className="container-responsive py-12">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl">{project.longDescription || project.description}</p>
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={assetUrl(project.image)} alt={project.title} className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800" />
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.techStack?.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">{t}</span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {project.liveUrl && (
            <a className="px-5 py-2 rounded-full bg-brand text-white" href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>
          )}
          {project.githubUrl && (
            <a className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          )}
        </div>
      </section>
    </Layout>
  );
}


