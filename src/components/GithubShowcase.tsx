import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos, GitHubRepo } from '@/lib/api';

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Latest on <span className="text-brand">GitHub</span></h2>
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-sm rounded-full border px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">View Profile ↗</a>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {curated.map((r) => (
          <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-lg transition-all">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-between">
              <h3 className="font-semibold truncate mr-3">{r.name}</h3>
              <span className="text-xs text-gray-500">{new Date(r.updated_at).toLocaleDateString()}</span>
            </div>
            {r.description && <p className="relative mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{r.description}</p>}
            <div className="relative mt-3 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">★ {r.stargazers_count}</span>
              <span className="inline-flex items-center gap-1">⑂ {r.forks_count}</span>
              {r.language && <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">{r.language}</span>}
            </div>
          </a>
        ))}
        {curated.length === 0 && (
          <div className="text-sm text-gray-500">Loading repositories…</div>
        )}
      </div>
    </section>
  );
}


