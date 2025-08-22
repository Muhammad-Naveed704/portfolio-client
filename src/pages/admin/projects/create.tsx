import Layout from '@/components/Layout';
import { createProjectApi, Project } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function CreateProjectPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (p: Project) => createProjectApi(p),
    onSuccess: (data) => { toast.success('Project created'); router.push(`/projects/${data.slug}`) },
    onError: (e: any) => toast.error(e?.message || 'Failed to create project'),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Project = {
      title: String(fd.get('title') || ''),
      slug: String(fd.get('slug') || ''),
      description: String(fd.get('description') || ''),
      longDescription: String(fd.get('longDescription') || ''),
      image: String(fd.get('image') || ''),
      techStack: String(fd.get('techStack') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      tags: String(fd.get('tags') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      githubUrl: String(fd.get('githubUrl') || ''),
      liveUrl: String(fd.get('liveUrl') || ''),
      featured: Boolean(fd.get('featured')),
    };
    mutation.mutate(payload);
  }

  return (
    <Layout title="Create Project">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Create Project</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-2xl">
          <input name="title" placeholder="Title" className="card px-4 py-3" required />
          <input name="slug" placeholder="Slug (unique)" className="card px-4 py-3" required />
          <textarea name="description" rows={3} placeholder="Short description" className="card px-4 py-3" required />
          <textarea name="longDescription" rows={6} placeholder="Long description" className="card px-4 py-3" />
          <input name="image" placeholder="Image URL" className="card px-4 py-3" />
          <input name="techStack" placeholder="Tech stack (comma separated)" className="card px-4 py-3" />
          <input name="tags" placeholder="Tags (comma separated)" className="card px-4 py-3" />
          <input name="githubUrl" placeholder="GitHub URL" className="card px-4 py-3" />
          <input name="liveUrl" placeholder="Live URL" className="card px-4 py-3" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> Featured</label>
          <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
            {mutation.isPending ? 'Creating…' : 'Create'}
          </button>
          {mutation.isError && <p className="text-red-600 text-sm">Failed to create project</p>}
        </form>
      </section>
    </Layout>
  );
}


