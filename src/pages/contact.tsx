import Layout from '@/components/Layout';
import { submitContact } from '@/lib/api';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

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
      setTimeout(() => router.push('/thank-you'), 0);
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
      <section className="container-responsive py-10" id="contact">
        <div className="rounded-3xl bg-purple-50 dark:bg-gray-900/40 border border-purple-100 dark:border-gray-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300">Get in touch</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">We are here for you! How can we help?</p>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-md">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Name</label>
                  <input name="name" required className="w-full rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white px-4 py-3" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <input name="email" type="email" required className="w-full rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white px-4 py-3" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Message</label>
                  <textarea name="message" rows={6} required className="w-full rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white px-4 py-3" />
                </div>
                <button disabled={loading} className="mt-2 inline-block rounded-full bg-purple-600 text-white px-6 py-3 disabled:opacity-60">
                  {loading ? 'Sending…' : 'Submit'}
                </button>
                {ok && <p className="text-green-600">{ok}</p>}
                {err && <p className="text-red-600">{err}</p>}
              </form>
            </div>
            <div className="grid gap-6">
              <div className="relative mx-auto w-64 h-64 rounded-3xl bg-white shadow-sm border border-purple-100 grid place-items-center">
                <span className="text-purple-600 font-semibold">CONTACT US</span>
              </div>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>📍 545 Movie Island, IL 9891</li>
                <li>📞 +2034 4040 3030</li>
                <li>✉ hello@gmail.com</li>
              </ul>
              <div className="flex gap-3 text-purple-600">
                <a href="#" aria-label="facebook">ⓕ</a>
                <a href="#" aria-label="instagram">◎</a>
                <a href="#" aria-label="linkedin">in</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


