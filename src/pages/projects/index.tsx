import Layout from '@/components/Layout';
import { fetchProjects, Project } from '@/lib/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Client-side fallback: if server-side fetch returned empty, try fetching from client
  const [clientProjects, setClientProjects] = useState<Project[] | null>(projects.length ? projects : null);
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (clientProjects === null) {
        try {
          const fetched = await fetchProjects({ tag });
          if (!mounted) return;
          setClientProjects(fetched);
        } catch (e) {
          // swallow — UI will show no projects
          // eslint-disable-next-line no-console
          console.error('[projects page] client fallback fetch failed', e);
        }
      }
    }
    load();
    return () => { mounted = false; };
  }, [tag, clientProjects]);
  const effectiveProjects = clientProjects ?? projects;
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

        {effectiveProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {effectiveProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use gallery images if available, otherwise fallback to main image
  const images = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : project.image 
    ? [project.image] 
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="md:flex">
        {images.length > 0 && (
          <div className="md:w-1/3 relative group">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={assetUrl(images[currentImageIndex])}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation - only show if more than 1 image */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? 'bg-brand w-6' 
                            : 'bg-white/60 hover:bg-white/90'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-brand text-white text-sm font-medium shadow-lg">
                    Featured
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className={`p-6 ${images.length > 0 ? 'md:w-2/3' : 'w-full'}`}>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            {!images.length && project.featured && (
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
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm hover:bg-brand/10 hover:text-brand transition-colors duration-300"
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
                className="px-6 py-2 rounded-full bg-brand text-white hover:bg-brand/90 hover:shadow-lg transition-all duration-300"
              >
                View Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


