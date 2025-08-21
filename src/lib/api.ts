export type Project = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image?: string;
  gallery?: string[];
  techStack?: string[];
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

export async function fetchProjects(params?: { tag?: string; featured?: boolean }) {
  const qs = new URLSearchParams();
  if (params?.tag) qs.set('tag', params.tag);
  if (typeof params?.featured === 'boolean') qs.set('featured', String(params.featured));
  const res = await fetch(`${API_BASE}/projects?${qs.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return (await res.json()) as Project[];
}

export async function fetchProject(slug: string) {
  const res = await fetch(`${API_BASE}/projects/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return (await res.json()) as Project;
}

export async function submitContact(payload: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return (await res.json()) as { message: string; id: string };
}


