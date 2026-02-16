import Layout from '@/components/Layout';
import { login } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { setAuthToken } from '@/lib/api';
import { useRouter } from 'next/router';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SecretAdminLogin() {
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
      // Redirect to admin dashboard
      router.push('/xws-admin/dashboard');
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
    <Layout title="Admin Access">
      <section className="container-responsive py-12 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-purple-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg">
              XS
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
              <p className="text-gray-600 dark:text-gray-400">Secure access to admin dashboard</p>
          </div>
          <div className="card p-8 shadow-xl">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Don't have an account?{' '}
                <Link href="/xws-admin/register" className="text-brand hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="admin@xws.com" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                  required 
                />
              </div>
              <button 
                disabled={mutation.isPending} 
                className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-brand to-purple-600 text-white font-semibold disabled:opacity-60 hover:shadow-lg transition-all duration-300"
              >
                {mutation.isPending ? 'Signing in…' : 'Sign in'}
              </button>
              {mutation.isError && (
                <p className="text-red-600 dark:text-red-400 text-sm text-center">Login failed. Please check your credentials.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
