import Layout from '@/components/Layout';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';

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
        <h1 className="text-3xl font-bold mb-8">My Projects</h1>
        
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button 
            className={`px-3 py-1 rounded ${!tag ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}`} 
            onClick={() => setTag(undefined)}
          >
            All
          </button>
          {tags.map((t) => (
            <button 
              key={t} 
              className={`px-3 py-1 rounded ${tag === t ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}`} 
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.slug} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="md:flex">
                  {(project.gallery?.[0] || project.image) && (
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={assetUrl(project.gallery?.[0] || project.image!)}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  )}
                  <div className={`p-6 ${(project.gallery?.[0] || project.image) ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-2 rounded-full bg-brand text-white hover:bg-brand/90 transition-colors"
                        >
                          View Live ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}


