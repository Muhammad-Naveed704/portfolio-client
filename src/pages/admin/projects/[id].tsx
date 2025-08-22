import Layout from '@/components/Layout';
import { Project, updateProjectApi, fetchProjects } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useMemo } from 'react';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const q = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
    enabled: Boolean(id),
  });
  const current = useMemo(() => q.data?.find((p: any) => p._id === id) as Project | undefined, [q.data, id]);

  const mutation = useMutation({
    mutationFn: async (p: Partial<Project>) => updateProjectApi(String(id), p),
    onSuccess: (data) => router.push(`/projects/${data.slug}`),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Partial<Project> = {
      title: String(fd.get('title') || ''),
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
    <Layout title="Edit Project">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Edit Project</h1>
        {!current && <p className="mt-4">Loading…</p>}
        {current && (
          <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-2xl">
            <input name="title" defaultValue={current.title} placeholder="Title" className="card px-4 py-3" required />
            <textarea name="description" defaultValue={current.description} rows={3} placeholder="Short description" className="card px-4 py-3" required />
            <textarea name="longDescription" defaultValue={current.longDescription} rows={6} placeholder="Long description" className="card px-4 py-3" />
            <input name="image" defaultValue={current.image} placeholder="Image URL" className="card px-4 py-3" />
            <input name="techStack" defaultValue={(current.techStack || []).join(', ')} placeholder="Tech stack (comma separated)" className="card px-4 py-3" />
            <input name="tags" defaultValue={(current.tags || []).join(', ')} placeholder="Tags (comma separated)" className="card px-4 py-3" />
            <input name="githubUrl" defaultValue={current.githubUrl} placeholder="GitHub URL" className="card px-4 py-3" />
            <input name="liveUrl" defaultValue={current.liveUrl} placeholder="Live URL" className="card px-4 py-3" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={Boolean(current.featured)} /> Featured</label>
            <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
              {mutation.isPending ? 'Saving…' : 'Save changes'}
            </button>
            {mutation.isError && <p className="text-red-600 text-sm">Failed to update project</p>}
          </form>
        )}
      </section>
    </Layout>
  );
}


