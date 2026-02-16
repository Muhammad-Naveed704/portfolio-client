import Layout from '@/components/Layout';
import { login } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { setAuthToken } from '@/lib/api';
import { useRouter } from 'next/router';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (form: { email: string; password: string }) => login(form),
    onSuccess: (data) => {
      // Handle ApiResponse structure: { data: { user, accessToken }, message, success }
      const responseData = data?.data || data;
      const token = responseData?.accessToken || responseData?.token;
      const user = responseData?.user;
      
      setAuthToken(token);
      if (typeof window !== 'undefined') {
        if (token) localStorage.setItem('authToken', token);
        if (user?.id || user?._id) localStorage.setItem('userId', user.id || user._id);
        if (user?.name) localStorage.setItem('userName', user.name);
        if (user?.role) localStorage.setItem('userRole', user.role);
      }
      toast.success('Logged in');
      router.push('/');
    },
    onError: (e: any) => toast.error(e?.message || 'Login failed'),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const t = localStorage.getItem('authToken');
      if (t) setAuthToken(t);
    }
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutation.mutate({ email: String(fd.get('email') || ''), password: String(fd.get('password') || '') });
  }

  return (
    <Layout title="AdminLogin">
      <section className="container-responsive py-12">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-sm">
          <input name="email" type="email" placeholder="Email" className="card px-4 py-3" required />
          <input name="password" type="password" placeholder="Password" className="card px-4 py-3" required />
          <button disabled={mutation.isPending} className="px-5 py-3 rounded-full bg-brand text-white disabled:opacity-60">
            {mutation.isPending ? 'Signing in…' : 'Sign in'}
          </button>
          {mutation.isError && <p className="text-red-600 text-sm">Login failed</p>}
        </form>
      </section>
    </Layout>
  );
}


