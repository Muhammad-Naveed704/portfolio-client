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
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

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
  const res = await fetch(`${API_BASE}/contact/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return (await res.json()) as { message: string; id: string };
}

export type Experience = {
  _id?: string;
  company: string;
  title: string;
  period: string;
  bullets: string[];
  location?: string;
  website?: string;
  order?: number;
};

export async function fetchExperience() {
  const res = await fetch(`${API_BASE}/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return (await res.json()) as Experience[];
}

// Auth
export async function login(payload: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Invalid credentials');
  return await res.json();
}

export async function register(payload: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to register');
  return await res.json();
}

// Admin protected APIs
export async function createProjectApi(payload: Project) {
  const res = await fetch(`${API_BASE}/projects/create`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to create project');
  return await res.json();
}

export async function updateProjectApi(id: string, payload: Partial<Project>) {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to update project');
  return await res.json();
}

export async function createExperienceApi(payload: Experience) {
  const res = await fetch(`${API_BASE}/experience/create`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to create experience');
  return await res.json();
}

export async function updateExperienceApi(id: string, payload: Partial<Experience>) {
  const res = await fetch(`${API_BASE}/experience/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to update experience');
  return await res.json();
}


