import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos, GitHubRepo } from '@/lib/api';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Calendar, Code, ExternalLink } from 'lucide-react';

export default function GithubShowcase() {
  const username = 'Muhammad-Naveed704';
  const q = useQuery({ queryKey: ['gh', username], queryFn: () => fetchGithubRepos(username, 30) });
  const repos = (q.data || []) as GitHubRepo[];

  // Curate: prefer non-forks with most stars; allow hand-picked repo names to bubble to top
  const preferred = ['E-commerce-website'];
  const curated: GitHubRepo[] = useMemo(() => {
    const list = repos.filter((r) => !r.fork);
    const byStars = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const preferredRepos = byStars.filter((r) => preferred.includes(r.name));
    const rest = byStars.filter((r) => !preferred.includes(r.name));
    return [...preferredRepos, ...rest].slice(0, 6);
  }, [repos]);

  return (
    <section className="container-responsive py-16" id="github">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Latest on <span className="text-brand">GitHub</span></h2>
          <p className="text-gray-600 dark:text-gray-400">Explore my open-source contributions and projects</p>
        </div>
        <motion.a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-brand hover:to-purple-600 hover:text-white transition-all font-semibold shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-4 h-4" />
          View Profile
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {curated.map((r, index) => (
          <motion.a
            key={r.id}
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, borderColor: 'rgb(14, 165, 233)' }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/10 to-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate mb-2 group-hover:text-brand transition-colors flex items-center gap-2">
                    {r.name}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">
                      {new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 group-hover:from-brand group-hover:to-purple-600 transition-all duration-300 shadow-lg">
                  <Github className="w-6 h-6 text-brand group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Description */}
              {r.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-5 leading-relaxed min-h-[2.5rem]">
                  {r.description}
                </p>
              )}

              {/* Footer stats */}
              <div className="flex items-center justify-between pt-5 border-t-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {r.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <GitFork className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    {r.forks_count}
                  </span>
                </div>
                {r.language && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 text-brand text-xs font-bold border-2 border-brand/20 shadow-sm">
                    <Code className="w-3.5 h-3.5" />
                    {r.language}
                  </span>
                )}
              </div>
            </div>
          </motion.a>
        ))}
        {curated.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Github className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Loading repositories…</p>
          </div>
        )}
      </div>
    </section>
  );
}
