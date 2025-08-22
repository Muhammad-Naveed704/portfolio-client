import Layout from '@/components/Layout';
import { submitContact } from '@/lib/api';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await submitContact({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        message: String(formData.get('message') || ''),
      });
      setOk(res.message);
      toast.success('Message sent');
      form.reset();
    } catch (e: any) {
      const msg = e?.message || 'Failed to send';
      setErr(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Contact">
      <section className="container-responsive py-12" id="contact">
        <h1 className="text-3xl font-bold">Get in touch</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
          Tell me about your project. I usually respond within 24 hours.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-4 max-w-xl">
          <input name="name" required placeholder="Name" className="card px-4 py-3" />
          <input name="email" type="email" required placeholder="Email" className="card px-4 py-3" />
          <textarea name="message" required rows={6} placeholder="Message" className="card px-4 py-3" />
          <button disabled={loading} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
            {loading ? 'Sending…' : 'Send message'}
          </button>
          {ok && <p className="text-green-600">{ok}</p>}
          {err && <p className="text-red-600">{err}</p>}
        </form>
      </section>
    </Layout>
  );
}


