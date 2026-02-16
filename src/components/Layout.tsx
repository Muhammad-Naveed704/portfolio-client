import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthToken } from '@/hooks/useAuth';
import { Github, Linkedin } from 'lucide-react';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  const { token } = useAuthToken();
  const router = useRouter();
  const siteTitle = title ? `${title} | Xws Solution` : 'Xws Solution | Digital Engineering Studio';
  const [open, setOpen] = useState(false);

  // Navigation items (public routes only - secret admin routes hidden)
  const navItems = [
    { href: '/', label: 'Home', isExternal: false },
    { href: '/services', label: 'Services', isExternal: false },
    { href: '/ai', label: 'AI Studio', isExternal: false },
    { href: '/solutions', label: 'Solutions', isExternal: false },
    { href: '/projects', label: 'Projects', isExternal: false },
    { href: '/company', label: 'Company', isExternal: false },
    { href: '/insights', label: 'Insights', isExternal: false },
    { href: '/career', label: 'Career', isExternal: false },
    { href: '/contact', label: 'Contact', isExternal: false },
    { href: '/chat', label: 'Chat', isExternal: false },
    // Secret admin routes: /xws-admin/* (not shown in navigation)
  ];

  useEffect(() => {
    navItems
      .filter((item) => !item.href.startsWith('/#') && !item.isExternal)
      .forEach((item) => {
        router.prefetch(item.href).catch(() => {});
      });
  }, [router]);

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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="container-responsive py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand to-brand/70 text-white flex items-center justify-center font-semibold tracking-wide shadow-md">
                  Xws
                </div>
                <Link href="/" className="font-semibold text-gray-900 dark:text-white hover:text-brand transition-colors">
                   Solutions
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                  {navItems.map((item) => {
                    const isHashLink = item.href.startsWith('/#');
                    const active = isActiveRoute(item.href);
                    const classes = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-brand text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-white dark:hover:bg-gray-700'
                    }`;

                    if (isHashLink) {
                      return (
                        <button
                          key={item.href}
                          onClick={() => handleNavigation(item.href, item.isExternal)}
                          className={classes}
                        >
                          {item.label}
                        </button>
                      );
                    }

                    return (
                      <Link key={item.href} href={item.href} className={classes} prefetch>
                        {item.label}
                      </Link>
                    );
                  })}
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
                  {navItems.map((item) => {
                    const isHashLink = item.href.startsWith('/#');
                    const active = isActiveRoute(item.href);
                    const classes = `text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-brand text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-brand hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`;

                    if (isHashLink) {
                      return (
                        <button
                          key={item.href}
                          onClick={() => handleNavigation(item.href, item.isExternal)}
                          className={classes}
                        >
                          {item.label}
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={classes}
                        onClick={() => setOpen(false)}
                        prefetch
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    className="text-center mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-brand to-brand/80 text-white font-semibold"
                  >
                    Start a Project
                  </Link>
                  
                  {/* Secret admin routes not shown in navigation */}
                </nav>
              </div>
            )}
          </div>
        </header>
        
        <main className="flex-1">{children}</main>
        
        <footer className="mt-16 bg-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,.25),_transparent_55%)] pointer-events-none" />
          <div className="container-responsive py-16 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
              <div>
                <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-2">Xws Solution</p>
                <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
                  Building intelligent products<br className="hidden sm:block" /> that scale from prototype to production.
                </h3>
              </div>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-[0_10px_30px_rgba(14,165,233,.35)]"
              >
                Book a Strategy Call
                <span className="text-lg">↗</span>
              </Link>
            </div>
            
            <hr className="border-white/10 mb-10" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand to-brand/60 text-white flex items-center justify-center font-semibold">
                    XS
                  </div>
                  <span className="font-medium">Xws Solution</span>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Full-spectrum digital engineering team delivering AI, product, and platform solutions for companies that ship fast and operate at scale.
                </p>
                <div className="flex gap-3 text-white/80">
                 
                  <a 
                    href="https://www.linkedin.com/company/team-tech-wave-solution" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand hover:text-white flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/Muhammad-Naveed704" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand hover:text-white flex items-center justify-center transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2">
                  {navItems.map((item) => (
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
                <h4 className="text-white font-semibold mb-3">Studio</h4>
                <ul className="space-y-2 text-white/70">
                  <li>AI & Robotics Engineering</li>
                  <li>Product & Platform Delivery</li>
                  <li>CI/CD & Production Ops</li>
                  <li>Email & Communication Systems</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-white/70">
                  <li>mnaveed2862@gmail.com</li>
                  <li>+923442862704</li>
                  <li>Karachi</li>
                </ul>
              </div>
            </div>
            
            <hr className="border-white/10 my-10" />
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-start lg:items-center justify-between text-xs text-white/70">
              <p>© {new Date().getFullYear()} Xws Solution. Engineered with care for production-grade launches.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <button
                  onClick={() => handleNavigation('/privacy', false)}
                  className="hover:text-brand transition-colors text-left"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavigation('/terms', false)}
                  className="hover:text-brand transition-colors text-left"
                >
                  Terms of Service
                </button>
                <span className="text-white/60">Security & Compliance · SOC2-ready</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


