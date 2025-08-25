import Head from 'next/head';
import { ReactNode, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1220" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="container-responsive py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold">J</div>
                <Link href="/" className="font-semibold">JCREA</Link>
              </div>
              <button className="md:hidden rounded-full border px-4 py-1 text-sm" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
                Menu
              </button>
              <div className="hidden md:block flex-1" />
              <nav className="hidden md:flex items-center gap-2 text-sm bg-black text-white rounded-full px-3 py-1">
                <Link href="/" className="px-3 py-1 rounded-full bg-brand text-white">Home</Link>
                <Link href="#about" className="px-3 py-1 rounded-full hover:bg-white/10">About</Link>
                <Link href="#services" className="px-3 py-1 rounded-full hover:bg-white/10">Service</Link>
                <Link href="#experience" className="px-3 py-1 rounded-full hover:bg-white/10">Resume</Link>
                <Link href="#projects" className="px-3 py-1 rounded-full hover:bg-white/10">Project</Link>
                <Link href="/contact" className="px-3 py-1 rounded-full hover:bg-white/10">Contact</Link>
                <Link href="/chat" className="px-3 py-1 rounded-full hover:bg-white/10">Chat</Link>
              </nav>
            </div>
          </div>
          {open && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
              <div className="container-responsive py-3 flex flex-col gap-2 text-sm">
                <Link href="/" onClick={() => setOpen(false)} className="hover:text-brand">Home</Link>
                <Link href="#about" onClick={() => setOpen(false)} className="hover:text-brand">About</Link>
                <Link href="#services" onClick={() => setOpen(false)} className="hover:text-brand">Service</Link>
                <Link href="#experience" onClick={() => setOpen(false)} className="hover:text-brand">Resume</Link>
                <Link href="projects" onClick={() => setOpen(false)} className="hover:text-brand">Project</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-brand">Contact</Link>
                <Link href="/chat" onClick={() => setOpen(false)} className="hover:text-brand">chat</Link>
                {token && <Link href="/admin/projects/create" onClick={() => setOpen(false)} className="hover:text-brand">Create Project</Link>}
                {token && <Link href="/admin/experience/create" onClick={() => setOpen(false)} className="hover:text-brand">Create Experience</Link>}
                <div className="mt-2"><ThemeToggle /></div>
              </div>
            </div>
          )}
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 bg-[#1f1f22] text-white">
          <div className="container-responsive py-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-semibold">Lets Connect there</h3>
              <a href="/contact" className="hidden sm:inline-block bg-brand text-white px-5 py-2 rounded-full text-sm">Hire me ↗</a>
            </div>
            <hr className="my-6 border-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold">J</div>
                  <span className="font-medium">JCREA</span>
                </div>
                <p className="mt-3 text-white/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-3 flex gap-3 text-white/80">
                  <a href="#" aria-label="twitter">🐦</a>
                  <a href="#" aria-label="facebook">📘</a>
                  <a href="#" aria-label="instagram">📷</a>
                  <a href="#" aria-label="github">💻</a>
                </div>
              </div>
              <div>
                <h4 className="text-white/80">Navigation</h4>
                <ul className="mt-3 space-y-2">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="#about">About Us</Link></li>
                  <li><Link href="#services">Service</Link></li>
                  <li><Link href="#experience">Resume</Link></li>
                  <li><Link href="#projects">Project</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/80">Contact</h4>
                <ul className="mt-3 space-y-2 text-white/80">
                  <li>+92 777844366</li>
                  <li><a href="mailto:portfolio@example.com">portfolio@example.com</a></li>
                  <li><a href="https://portfolio-taupe-eta-78.vercel.app/" target="_blank" rel="noreferrer">portfolio.vercel.app</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/80">Get the latest information</h4>
                <form className="mt-3 flex items-center bg-white rounded-full overflow-hidden">
                  <input className="flex-1 px-4 py-2 text-gray-900 outline-none" placeholder="Email Address" />
                  <button className="bg-brand text-white px-4 py-2">↗</button>
                </form>
              </div>
            </div>
            <hr className="my-6 border-white/10" />
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-3">
              <p>Copyright© {new Date().getFullYear()} Jayesh. All Rights Reserved.</p>
              <div className="flex gap-4">
                <a href="#">User Terms & Conditions</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


