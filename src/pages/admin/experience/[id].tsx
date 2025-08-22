import Layout from '@/components/Layout';
import { Experience, updateExperienceApi } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

export default function EditExperiencePage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [item, setItem] = useState<Experience | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';
      const res = await fetch(`${base}/experience/${id}`);
      if (res.ok) setItem(await res.json());
    }
    load();
  }, [id]);

  const mutation = useMutation({
    mutationFn: async (p: Partial<Experience>) => updateExperienceApi(String(id), p),
    onSuccess: () => router.push('/'),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Partial<Experience> = {
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
    <Layout title="Edit Experience">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Edit Experience</h1>
        {!item && <p className="mt-4">Loading…</p>}
        {item && (
          <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-2xl">
            <input name="company" defaultValue={item.company} placeholder="Company" className="card px-4 py-3" required />
            <input name="title" defaultValue={item.title} placeholder="Title" className="card px-4 py-3" required />
            <input name="period" defaultValue={item.period} placeholder="Period" className="card px-4 py-3" required />
            <textarea name="bullets" defaultValue={(item.bullets || []).join('\n')} rows={6} placeholder={'One bullet per line'} className="card px-4 py-3" />
            <input name="location" defaultValue={item.location} placeholder="Location" className="card px-4 py-3" />
            <input name="website" defaultValue={item.website} placeholder="Website URL" className="card px-4 py-3" />
            <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
              {mutation.isPending ? 'Saving…' : 'Save changes'}
            </button>
            {mutation.isError && <p className="text-red-600 text-sm">Failed to update experience</p>}
          </form>
        )}
      </section>
    </Layout>
  );
}


