import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createProjectApi } from '@/lib/api';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProject() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const token = mounted ? localStorage.getItem('authToken') : null;
  const userRole = mounted ? localStorage.getItem('userRole') : null;
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    setMounted(true);
    if (!token || !isAdmin) {
      router.push('/xws-admin/login');
    }
  }, [token, isAdmin, router, mounted]);

  const mutation = useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      toast.success('Project created successfully');
      router.push('/xws-admin/dashboard');
    },
    onError: (e: any) => toast.error(e?.message || 'Failed to create project'),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const formData = new FormData();
    
    formData.append('title', String(fd.get('title') || ''));
    formData.append('slug', String(fd.get('slug') || ''));
    formData.append('description', String(fd.get('description') || ''));
    formData.append('longDescription', String(fd.get('longDescription') || ''));
    
    if (fd.get('githubUrl')) formData.append('githubUrl', String(fd.get('githubUrl')));
    if (fd.get('liveUrl')) formData.append('liveUrl', String(fd.get('liveUrl')));
    if (fd.get('featured')) formData.append('featured', String(fd.get('featured')));
    
    const tags = String(fd.get('tags') || '').split(',').map(t => t.trim()).filter(Boolean);
    if (tags.length) formData.append('tags', JSON.stringify(tags));
    
    const techStack = String(fd.get('techStack') || '').split(',').map(t => t.trim()).filter(Boolean);
    if (techStack.length) formData.append('techStack', JSON.stringify(techStack));
    
    const image = fd.get('image') as File;
    if (image && image.size > 0) formData.append('image', image);

    mutation.mutate(formData);
  }

  if (!mounted || !token || !isAdmin) {
    return (
      <Layout title="Create Project">
        <div className="container-responsive py-12">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Create Project">
      <div className="container-responsive py-8">
        <Link 
          href="/xws-admin/dashboard" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Project</h1>
          
          <form onSubmit={onSubmit} className="card p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input 
                name="title" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
              <input 
                name="slug" 
                required 
                placeholder="my-awesome-project"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
              <textarea 
                name="description" 
                required 
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
              <textarea 
                name="longDescription" 
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
              <input 
                name="image" 
                type="file" 
                accept="image/*"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
              <input 
                name="githubUrl" 
                type="url"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live URL</label>
              <input 
                name="liveUrl" 
                type="url"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
              <input 
                name="tags" 
                placeholder="react, nextjs, typescript"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack (comma separated)</label>
              <input 
                name="techStack" 
                placeholder="React, Next.js, TypeScript"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input 
                  name="featured" 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-brand focus:ring-brand"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={mutation.isPending}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-brand to-purple-600 text-white font-semibold disabled:opacity-60 hover:shadow-lg transition-all"
            >
              {mutation.isPending ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
