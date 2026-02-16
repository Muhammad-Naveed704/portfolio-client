import Layout from '@/components/Layout';
import { register } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin', // Default to admin for registration
  });

  const mutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string; role?: string }) => {
      // Create FormData for registration (avatar is now optional)
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('email', payload.email);
      formData.append('password', payload.password);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api'}/auth/register`, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || error?.data?.message || 'Registration failed');
      }
      
      const data = await res.json();
      
      // After registration, user needs to manually update role to admin in database
      if (payload.role === 'admin') {
        toast.info('User registered successfully! Please update role to "admin" in database to access admin features.');
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success('Registration successful! Please login.');
      router.push('/xws-admin/login');
    },
    onError: (e: any) => {
      toast.error(e?.message || 'Registration failed');
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    mutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
  }

  return (
    <Layout title="Admin Registration">
      <section className="container-responsive py-12 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-purple-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg">
              XS
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Registration</h1>
            <p className="text-gray-600 dark:text-gray-400">Create a new admin account</p>
          </div>
          
          <div className="card p-8 shadow-xl">
            <Link 
              href="/xws-admin/login" 
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>

            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@xws.com" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                    required 
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand" 
                    required 
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> After registration, you may need to update your role to "admin" in the database to access admin features.
                </p>
              </div>

              <button 
                type="submit"
                disabled={mutation.isPending}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-brand to-purple-600 text-white font-semibold disabled:opacity-60 hover:shadow-lg transition-all duration-300"
              >
                {mutation.isPending ? 'Registering...' : 'Register Admin Account'}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/xws-admin/login" className="text-brand hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
