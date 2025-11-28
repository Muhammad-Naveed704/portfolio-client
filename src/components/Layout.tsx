import Head from 'next/head';
import { ReactNode, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthToken } from '@/hooks/useAuth';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  const { token } = useAuthToken();
  const router = useRouter();
  const siteTitle = title ? `${title} | Muhammad Naveed` : 'Muhammad Naveed | MERN Stack Developer';
  const [open, setOpen] = useState(false);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', isExternal: false },
    { href: '/services', label: 'Service', isExternal: false },
    { href: '/#experience', label: 'Resume', isExternal: false },
    { href: '/projects', label: 'Project', isExternal: false },
    { href: '/contact', label: 'Contact', isExternal: false },
    { href: '/chat', label: 'Chat', isExternal: false },
  ];

  // Check if a nav item is active
  const isActiveRoute = (href: string) => {
    if (href === '/') return router.pathname === '/';
    if (href.startsWith('/#')) return router.pathname === '/' && router.asPath.includes(href.substring(1));
    return router.pathname.startsWith(href);
  };

  // Handle navigation with smooth scrolling for hash links
  const handleNavigation = (href: string, isExternal: boolean) => {
    setOpen(false);
    
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (router.pathname === '/') {
        // Already on home page, just scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Navigate to home page first, then scroll
        router.push('/').then(() => {
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      }
      return;
    }
    
    // Regular navigation
    if (!isExternal) {
      router.push(href);
    }
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1220" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="container-responsive py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand/80 text-white flex items-center justify-center font-bold">
                  MN
                </div>
                <Link href="/" className="font-semibold text-gray-900 dark:text-white hover:text-brand transition-colors">
                  Muhammad Naveed
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href, item.isExternal)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActiveRoute(item.href)
                          ? 'bg-brand text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-white dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-3">
                <ThemeToggle />
                <button 
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                  onClick={() => setOpen(!open)} 
                  aria-label="Toggle Menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center">
                    <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                    <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {open && (
              <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href, item.isExternal)}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActiveRoute(item.href)
                          ? 'bg-brand text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {/* Admin Links for Mobile */}
                  {token && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                      <button
                        onClick={() => handleNavigation('/admin/projects/create', false)}
                        className="text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Create Project
                      </button>
                      <button
                        onClick={() => handleNavigation('/admin/experience/create', false)}
                        className="text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Create Experience
                      </button>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>
        </header>
        
        <main className="flex-1">{children}</main>
        
        <footer className="mt-16 bg-gray-900 text-white">
          <div className="container-responsive py-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold">Let's Connect</h3>
              <Link 
                href="/contact" 
                className="hidden sm:inline-block bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
              >
                Hire me 
              </Link>
            </div>
            
            <hr className="border-white/10 mb-8" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand/80 text-white flex items-center justify-center font-bold">
                    MN
                  </div>
                  <span className="font-medium">Muhammad Naveed</span>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">
                  MERN Stack Developer passionate about creating modern web applications with clean code and exceptional user experiences.
                </p>
                <div className="flex gap-3 text-white/80">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Twitter">
                    🐦
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Facebook">
                    📘
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Instagram">
                    📷
                  </a>
                  <a href="https://github.com/Muhammad-Naveed704" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="GitHub">
                    💻
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2">
                  {navItems.slice(0, 5).map((item) => (
                    <li key={item.href}>
                      <button
                        onClick={() => handleNavigation(item.href, item.isExternal)}
                        className="text-white/70 hover:text-brand transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-white/70">
                  <li>+92 3442862704</li>
                  <li>
                    <a href="mailto:mnaveed2862@example.com" className="hover:text-brand transition-colors">
                      mnaveed2862@example.com
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://portfolio-taupe-eta-78.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-brand transition-colors"
                    >
                      portfolio.vercel.app
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
                <form className="flex bg-white rounded-full overflow-hidden">
                  <input 
                    className="flex-1 px-4 py-2 text-gray-900 outline-none text-sm" 
                    placeholder="Email Address"
                    type="email"
                  />
                  <button 
                    type="submit"
                    className="bg-brand hover:bg-brand/90 text-white px-4 py-2 transition-colors duration-300"
                  >
                    ↗
                  </button>
                </form>
              </div>
            </div>
            
            <hr className="border-white/10 my-8" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-3">
              <p>Copyright© {new Date().getFullYear()} XWS Solutions All Rights Reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


