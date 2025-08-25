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
    const bullets = String(fd.get('bullets') || '').split('\n').map((s) => s.trim()).filter(Boolean);
    fd.set('bullets', JSON.stringify(bullets));
    mutation.mutate(fd as any);
  }

  return (
    <Layout title="Create Experience">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Create Experience</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-2xl">
          <input name="company" placeholder="Company" className="card px-4 py-3" required />
          <input name="title" placeholder="Title" className="card px-4 py-3" required />
          <input name="period" placeholder="Period (e.g., 2022 — Present)" className="card px-4 py-3" required />
          <textarea name="bullets" rows={6} placeholder={'One bullet per line'} className="card px-4 py-3" />
          <input name="location" placeholder="Location" className="card px-4 py-3" />
          <input name="website" placeholder="Website URL" className="card px-4 py-3" />
          <div className="card px-4 py-3">
            <label className="block text-sm mb-2">Company logo</label>
            <input type="file" name="logo" accept="image/*" className="block w-full text-sm" />
          </div>
          <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
            {mutation.isPending ? 'Creating…' : 'Create'}
          </button>
          {mutation.isError && <p className="text-red-600 text-sm">Failed to create experience</p>}
        </form>
      </section>
    </Layout>
  );
}


