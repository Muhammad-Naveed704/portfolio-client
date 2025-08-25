import { Project } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';


type Props = { project: Project };

export default function ProjectCard({ project }: Props) {

  

  return (
    <motion.div
      className="card overflow-hidden hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
  
      {project.image && (
        <Image src={assetUrl(project.image)} alt={project.title} fill className="w-full h-48 object-cover" />
      )}
      <Link href={`/projects/${project.slug}`} className="block p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          {project.featured && <span className="text-xs px-2 py-1 rounded bg-brand/10 text-brand">Featured</span>}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{project.description}</p>
        {project.techStack && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
