import Layout from '@/components/Layout';
import type { GetServerSideProps } from 'next';

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type Props = { messages: Message[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';
  const key = process.env.ADMIN_API_KEY;
  if (!key) return { notFound: true } as any;
  const res = await fetch(`${API_BASE}/contact`, { headers: { 'x-api-key': key } });
  if (!res.ok) return { notFound: true } as any;
  const messages = (await res.json()) as Message[];
  return { props: { messages } };
};

export default function AdminMessages({ messages }: Props) {
  return (
    <Layout title="Admin | Messages">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
        <div className="mt-6 grid gap-4">
          {messages.map((m) => (
            <div key={m._id} className="card p-5">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(m.createdAt).toLocaleString()}</span>
                <a className="text-brand" href={`mailto:${m.email}`}>{m.email}</a>
              </div>
              <h3 className="mt-1 font-medium">{m.name}</h3>
              <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-200">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p>No messages yet.</p>}
        </div>
      </section>
    </Layout>
  );
}


