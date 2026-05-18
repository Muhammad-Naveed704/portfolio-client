"use client";
import { Project } from '@/lib/api';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  projects: Project[];
  /** When true, section title block is omitted (parent page provides heading). */
  hideIntro?: boolean;
};

export default function FeaturedProjects({ projects, hideIntro }: Props) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <section className={`${hideIntro ? 'py-4' : 'container-responsive py-16'}`} id="projects">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3 text-[var(--xws-text-primary)]">Featured projects</h2>
          <p className="text-[var(--xws-text-muted)]">No featured projects available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={hideIntro ? 'py-0' : 'container-responsive py-16'} id="projects">
      {!hideIntro && (
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--xws-text-primary)]">
              Featured <span className="text-brand">Projects</span>
            </h2>
            <p className="text-[var(--xws-text-muted)] max-w-2xl mx-auto">
              Explore my latest work and creative solutions that showcase my expertise in modern web development
            </p>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            index={index}
            isHovered={hoveredProject === project.slug}
            onHover={() => setHoveredProject(project.slug)}
            onLeave={() => setHoveredProject(null)}
          />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--xws-border)] bg-[var(--xws-bg-card)] text-[var(--xws-text-primary)] font-semibold hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-all duration-300"
        >
          View All Projects
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  project: Project; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
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
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="bg-[var(--xws-bg-card)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xws-glow transition-all duration-500 border border-[var(--xws-border)]">
        {/* Image Section with Slider */}
        <div className="relative h-64 overflow-hidden">
          {images.length > 0 ? (
            <>
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
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? 'bg-brand w-6' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand text-white text-sm font-medium shadow-lg">
                    Featured
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-[var(--xws-text-primary)] group-hover:text-brand transition-colors duration-300">
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.div>
          </div>

          <p className="text-[var(--xws-text-muted)] mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 rounded-full bg-[var(--xws-bg-raised)] border border-[var(--xws-border)] text-sm font-medium text-[var(--xws-text-secondary)] hover:border-brand hover:text-brand transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-3 py-1 rounded-full bg-[var(--xws-bg-raised)] border border-[var(--xws-border)] text-sm font-medium text-[var(--xws-text-faint)]">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-full bg-brand text-white text-center font-medium hover:bg-brand/90 transition-all duration-300 hover:shadow-lg"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-full border border-[var(--xws-border)] text-center font-medium text-[var(--xws-text-primary)] hover:bg-[var(--xws-accent-dim)] transition-all duration-300"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
