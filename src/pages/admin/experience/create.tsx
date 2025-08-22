import Layout from '@/components/Layout';
import { createExperienceApi, Experience } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function CreateExperiencePage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (p: Experience) => createExperienceApi(p),
    onSuccess: () => { toast.success('Experience created'); router.push('/') },
    onError: (e: any) => toast.error(e?.message || 'Failed to create experience'),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Experience = {
      company: String(fd.get('company') || ''),
      title: String(fd.get('title') || ''),
      period: String(fd.get('period') || ''),
      bullets: String(fd.get('bullets') || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      location: String(fd.get('location') || ''),
      website: String(fd.get('website') || ''),
    };
    mutation.mutate(payload);
  }

  return (
    <Layout title="Create Experience">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Create Experience</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-2xl">
          <input name="company" placeholder="Company" className="card px-4 py-3" required />
          <input name="title" placeholder="Title" className="card px-4 py-3" required />
          <input name="period" placeholder="Period (e.g., 2022 — Present)" className="card px-4 py-3" required />
          <textarea name="bullets" rows={6} placeholder={'One bullet per line'} className="card px-4 py-3" />
          <input name="location" placeholder="Location" className="card px-4 py-3" />
          <input name="website" placeholder="Website URL" className="card px-4 py-3" />
          <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
            {mutation.isPending ? 'Creating…' : 'Create'}
          </button>
          {mutation.isError && <p className="text-red-600 text-sm">Failed to create experience</p>}
        </form>
      </section>
    </Layout>
  );
}


