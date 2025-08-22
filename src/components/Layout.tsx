import Head from 'next/head';
import { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useAuthToken } from '@/hooks/useAuth';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  const { token } = useAuthToken();
  const siteTitle = title ? `${title} | Muhammad Naveed` : 'Muhammad Naveed | MERN Stack Developer';
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1220" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container-responsive py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">MN.</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/projects" className="hover:text-brand">Projects</Link>
              <Link href="/contact" className="hover:text-brand">Contact</Link>
              {token && <Link href="/admin/projects/create" className="hover:text-brand">Create Project</Link>}
              {token && <Link href="/admin/experience/create" className="hover:text-brand">Create Experience</Link>}
              <Link href="/chat" className="hover:text-brand">Chat</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="container-responsive py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Muhammad Naveed. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-brand" href="https://github.com/Muhammad-Naveed704" target="_blank" rel="noreferrer">GitHub</a>
              <a className="hover:text-brand" href="https://www.linkedin.com/in/muhammad-naveed-598197230/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="hover:text-brand" href="/Muhammad%20Naveed%20SW%20ENG.pdf" target="_blank" rel="noreferrer">Download CV</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


