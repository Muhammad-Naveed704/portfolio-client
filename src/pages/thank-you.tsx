import Layout from '@/components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ThankYou() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push('/'), 4000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <Layout title="Thank you">
      <section className="container-responsive py-16">
        <div className="card p-10 text-center">
          <div className="mx-auto w-64 h-40 grid place-items-center">
            <span className="text-4xl text-purple-600 font-bold">THANK YOU</span>
          </div>
          <h1 className="text-xl font-semibold">Thank you</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">your email successfully send</p>
          <a href="/" className="mt-6 inline-block px-6 py-2 rounded-full bg-purple-600 text-white">Back to home</a>
        </div>
      </section>
    </Layout>
  );
}


