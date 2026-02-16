import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import { useAuthToken } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const router = useRouter();
  const { token } = useAuthToken();
  const [mounted, setMounted] = useState(false);
  const userRole = mounted ? localStorage.getItem('userRole') : null;
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    setMounted(true);
    if (!token) {
      router.push('/xws-admin/login');
    } else if (!isAdmin) {
      router.push('/');
    }
  }, [token, isAdmin, router, mounted]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }
    router.push('/xws-admin/login');
  };

  if (!mounted || !token || !isAdmin) {
    return (
      <Layout title="Admin Dashboard">
        <div className="container-responsive py-12">
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </Layout>
    );
  }

  const adminMenuItems = [
    {
      title: 'Projects',
      description: 'Manage portfolio projects',
      icon: Briefcase,
      href: '/xws-admin/projects',
      color: 'from-blue-500 to-cyan-500',
      actions: [
        { label: 'Create', href: '/xws-admin/projects/create', icon: Plus },
        { label: 'View All', href: '/admin/projects', icon: Eye },
      ]
    },
    {
      title: 'Experience',
      description: 'Manage work experience',
      icon: FileText,
      href: '/xws-admin/experience',
      color: 'from-purple-500 to-pink-500',
      actions: [
        { label: 'Create', href: '/admin/experience/create', icon: Plus },
        { label: 'View All', href: '/admin/experience', icon: Eye },
      ]
    },
    {
      title: 'Messages',
      description: 'View contact messages',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'from-green-500 to-emerald-500',
      actions: [
        { label: 'View All', href: '/admin/messages', icon: Eye },
      ]
    },
    {
      title: 'Chat',
      description: 'Manage chat conversations',
      icon: MessageSquare,
      href: '/chat',
      color: 'from-orange-500 to-red-500',
      actions: [
        { label: 'Open Chat', href: '/chat', icon: Eye },
      ]
    },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Admin Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6 hover:border-brand transition-all duration-300 hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.actions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand hover:text-white transition-colors text-sm font-medium"
                      >
                        <ActionIcon className="w-3.5 h-3.5" />
                        {action.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Projects</p>
            <p className="text-3xl font-bold">-</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Messages</p>
            <p className="text-3xl font-bold">-</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Active Users</p>
            <p className="text-3xl font-bold">-</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
