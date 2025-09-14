"use client";
import Link from 'next/link';
import { Project } from '@/lib/api';
import Image from 'next/image';
import { assetUrl } from '@/lib/url';

type Props = { projects: Project[] };

export default function PortfolioShowcase({ projects }: Props) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags || []))).slice(0, 6);
  return (
    <section className="container-responsive py-16" id="portfolio">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold leading-tight">
            Lets have a look at
            <br className="hidden sm:block" />
            <span className="text-3xl sm:text-4xl">
              my <span className="text-brand">Portfolio</span>
            </span>
          </h2>
        </div>
        <Link href="/projects" className="px-4 py-2 rounded-full bg-brand text-white text-sm">
          See All
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">No projects available.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <div className="grid auto-cols-[80%] sm:auto-cols-[50%] lg:auto-cols-[33%] grid-flow-col gap-4">
            {projects.map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                {p.image ? (
                  <div className="relative w-full h-56">
                    <Image
                      src={assetUrl(p.image)}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => console.error(`Failed to load image for project: ${p.title}`)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="w-10 h-10 rounded-full bg-black/80 text-white grid place-items-center hover:bg-brand"
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="w-6 h-1 rounded bg-brand" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {tags.map((t) => (
            <span key={t} className="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
              {t}
            </span>
          ))}
        </div>
      )}

      {projects[0] && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold">{projects[0].title}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {projects[0].description}
          </p>
          <Link
            href={`/projects/${projects[0].slug}`}
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Details ↗
          </Link>
        </div>
      )}
    </section>
  );
}


