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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';
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
  logo?: string;
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
export async function createProjectApi(payload: Project | FormData) {
  const form = payload instanceof FormData ? payload : (() => {
    const fd = new FormData();
    Object.entries(payload as any).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) {
        fd.append(k, JSON.stringify(v));
      } else {
        fd.append(k, v as any);
      }
    });
    return fd;
  })();
  const res = await fetch(`${API_BASE}/projects/create`, { method: 'POST', headers: { Authorization: `Bearer ${authToken}` }, body: form });
  if (!res.ok) throw new Error('Failed to create project');
  return await res.json();
}

export async function updateProjectApi(id: string, payload: Partial<Project>) {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to update project');
  return await res.json();
}

export async function createExperienceApi(payload: Experience | FormData) {
  const form = payload instanceof FormData ? payload : (() => {
    const fd = new FormData();
    Object.entries(payload as any).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      fd.append(k, Array.isArray(v) ? JSON.stringify(v) : (v as any));
    });
    return fd;
  })();
  const res = await fetch(`${API_BASE}/experience/create`, { method: 'POST', headers: { Authorization: `Bearer ${authToken}` }, body: form });
  if (!res.ok) throw new Error('Failed to create experience');
  return await res.json();
}

export async function updateExperienceApi(id: string, payload: Partial<Experience>) {
  const res = await fetch(`${API_BASE}/experience/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('Failed to update experience');
  return await res.json();
}

// Chat
export type ConversationPreview = { peer: { _id: string; name: string; email: string }; lastMessage: any; unread: number };
export type ChatMessage = { _id: string; senderId: string; receiverId: string; message: string; createdAt: string };

export async function fetchConversations() {
  const res = await fetch(`${API_BASE}/chat/conversations`, { headers: { Authorization: `Bearer ${authToken}` } });
  if (!res.ok) throw new Error('Failed to load conversations');
  return (await res.json()) as ConversationPreview[];
}

export async function fetchMessages(peerUserId: string) {
  const res = await fetch(`${API_BASE}/chat/messages/${peerUserId}`, { headers: { Authorization: `Bearer ${authToken}` } });
  if (!res.ok) throw new Error('Failed to load messages');
  return (await res.json()) as ChatMessage[];
}

export async function sendMessageApi(receiverId: string, message: string) {
  const res = await fetch(`${API_BASE}/chat/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify({ receiverId, message }) });
  if (!res.ok) throw new Error('Failed to send message');
  return (await res.json()) as ChatMessage;
}

// Public GitHub API – recent repositories by user
export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export async function fetchGithubRepos(username: string, limit = 6) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${limit}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!res.ok) throw new Error('Failed to load GitHub repositories');
  return (await res.json()) as GitHubRepo[];
}

// Anonymous chat
export async function sendAnonymousMessage(name: string, message: string) {
  const visitorKey = typeof window !== 'undefined' ? localStorage.getItem('visitorKey') : null;
  const res = await fetch(`${API_BASE}/chat/anonymous/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, message, visitorKey }) });
  if (!res.ok) throw new Error('Failed to send');
  const data = await res.json();
  if (typeof window !== 'undefined') {
    if (data?.visitorKey) localStorage.setItem('visitorKey', data.visitorKey);
    if (data?.guestUserId) localStorage.setItem('guestUserId', data.guestUserId);
  }
  return data;
}

export async function getAnonymousHistory() {
  const visitorKey = typeof window !== 'undefined' ? localStorage.getItem('visitorKey') : null;
  const url = new URL(`${API_BASE}/chat/anonymous/history`);
  if (visitorKey) url.searchParams.set('visitorKey', visitorKey);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to load history');
  return await res.json();
}


