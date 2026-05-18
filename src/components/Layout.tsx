import Head from 'next/head';
import { ReactNode, useEffect, useState, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Github,
  Linkedin,
  ChevronDown,
  Smartphone,
  Globe,
  Sparkles,
  Palette,
  TrendingUp,
  ShoppingCart,
  Shield,
  Database,
} from 'lucide-react';

type Props = {
  title?: string;
  children: ReactNode;
};

const servicesMega = [
  {
    href: '/ai',
    title: 'AI Studio',
    desc: 'LLMs, copilots, vision, robotics & MLOps — production AI.',
    icon: Sparkles,
    ring: 'from-emerald-500/40 to-cyan-500/10',
    featured: true,
  },
  {
    href: '/services#service-web-development',
    title: 'Web Development',
    desc: 'Responsive sites & web apps with Next.js & React.',
    icon: Globe,
    ring: 'from-cyan-500/30 to-cyan-400/5',
  },
  {
    href: '/services#service-frontend-development',
    title: 'Frontend & UI',
    desc: 'Interfaces, design systems, performance.',
    icon: Palette,
    ring: 'from-fuchsia-500/30 to-pink-500/5',
  },
  {
    href: '/services#service-backend-development',
    title: 'Backend & APIs',
    desc: 'Node, NestJS, secure APIs & data layers.',
    icon: Database,
    ring: 'from-emerald-500/30 to-teal-500/5',
  },
  {
    href: '/services#service-ecommerce-solutions',
    title: 'E-commerce',
    desc: 'Shopify, WordPress stores, checkout flows.',
    icon: ShoppingCart,
    ring: 'from-green-500/30 to-emerald-500/5',
  },
  {
    href: '/services#service-insurance-healthcare',
    title: 'Industry Solutions',
    desc: 'Healthcare, insurance & regulated domains.',
    icon: Shield,
    ring: 'from-sky-500/30 to-cyan-500/5',
  },
  {
    href: '/services#service-digital-publishing',
    title: 'Digital Publishing',
    desc: 'Content platforms & editorial workflows.',
    icon: TrendingUp,
    ring: 'from-orange-500/30 to-amber-500/5',
  },
  {
    href: '/services#service-creative-services',
    title: 'Creative & Media',
    desc: 'Video, branding, and campaign-ready assets.',
    icon: Smartphone,
    ring: 'from-rose-500/30 to-orange-500/5',
  },
];

export default function Layout({ title, children }: Props) {
  const router = useRouter();
  const siteTitle = title ? `${title} | XWS Solution` : 'XWS Solution | Software House Pakistan | Web, App & AI';
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/', label: 'Home', isExternal: false },
    { href: '/projects', label: 'Projects', isExternal: false },
    { href: '/company', label: 'Company', isExternal: false },
    { href: '/insights', label: 'Insights', isExternal: false },
    { href: '/career', label: 'Career', isExternal: false },
    { href: '/contact', label: 'Contact', isExternal: false },
    { href: '/chat', label: 'Chat', isExternal: false },
  ];

  useEffect(() => {
    navItems
      .filter((item) => !item.href.startsWith('/#') && !item.isExternal)
      .forEach((item) => {
        router.prefetch(item.href).catch(() => {});
      });
    router.prefetch('/services').catch(() => {});
    router.prefetch('/ai').catch(() => {});
  }, [router]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const isActiveRoute = (href: string) => {
    if (href === '/') return router.pathname === '/';
    if (href.startsWith('/#')) return router.pathname === '/' && router.asPath.includes(href.substring(1));
    return router.pathname.startsWith(href);
  };

  const handleNavigation = (href: string, isExternal: boolean) => {
    setOpen(false);
    setServicesOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (router.pathname === '/') {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        router.push('/').then(() => {
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        });
      }
      return;
    }

    if (!isExternal) {
      router.push(href);
    }
  };

  const linkBase =
    'text-sm font-medium text-[var(--xws-text-muted)] hover:text-[var(--xws-text-primary)] transition-colors relative';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[var(--xws-bg-canvas)] text-[var(--xws-text-primary)]">
        <header className="xws-site-header sticky top-0 z-50 border-b border-[var(--xws-border)] bg-[var(--xws-header-bg)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--xws-header-bg)]">
          <div className="container-responsive py-3.5">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                <Image
                  src="/xws-logo.png"
                  alt="XWS Solution logo"
                  width={44}
                  height={44}
                  className="rounded-xl ring-1 ring-[var(--xws-border)] shadow-xws-glow transition-transform group-hover:scale-[1.02]"
                  priority
                />
                <span className="font-semibold tracking-tight text-[var(--xws-text-primary)] hidden sm:inline">
                  XWS <span className="text-[var(--xws-accent)]">Solution</span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1 xws-nav-shell rounded-[var(--radius-pill)] px-2 py-1.5">
                <Link
                  href="/"
                  className={`${linkBase} px-3 py-2 rounded-[var(--radius-pill)] ${
                    router.pathname === '/' ? 'text-[var(--xws-accent)] bg-[var(--xws-accent-dim)]' : ''
                  }`}
                >
                  Home
                </Link>

                <div className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`${linkBase} flex items-center gap-1 px-3 py-2 rounded-[var(--radius-pill)] ${
                      router.pathname === '/services' || router.pathname.startsWith('/ai') || servicesOpen
                        ? 'text-[var(--xws-accent)] bg-[var(--xws-accent-dim)]'
                        : ''
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    <span
                      className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--xws-accent)] transition-opacity ${
                        router.pathname === '/services' || router.pathname.startsWith('/ai') ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {servicesOpen && (
                    <div
                      className="xws-mega-menu absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(100vw-2rem,44rem)] rounded-[var(--radius-dropdown)] p-4 z-[60]"
                      role="menu"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {servicesMega.map((item) => {
                          const Icon = item.icon;
                          const featured = 'featured' in item && item.featured;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className={`flex gap-3 rounded-xl p-3 transition-all group/item ${
                                featured
                                  ? 'bg-[var(--xws-accent-dim)] border border-[var(--xws-accent)]/35 hover:border-[var(--xws-accent)]'
                                  : 'border border-transparent hover:bg-white/[0.04] hover:border-[var(--xws-border)]'
                              }`}
                              role="menuitem"
                            >
                              <div
                                className={`w-11 h-11 rounded-lg bg-gradient-to-br ${item.ring} border border-[var(--xws-border)] flex items-center justify-center shrink-0 text-[var(--xws-accent)]`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 text-left">
                                <p className="font-semibold text-[var(--xws-text-primary)] text-sm group-hover/item:text-[var(--xws-accent)]">
                                  {item.title}
                                </p>
                                <p className="text-xs text-[var(--xws-text-muted)] line-clamp-2">{item.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="mt-3 block text-center text-sm font-medium text-[var(--xws-accent)] hover:underline py-2"
                      >
                        View all services →
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/solutions"
                  className={`${linkBase} px-3 py-2 rounded-[var(--radius-pill)] ${
                    router.pathname.startsWith('/solutions') ? 'text-[var(--xws-accent)] bg-[var(--xws-accent-dim)]' : ''
                  }`}
                >
                  Solutions
                </Link>

                {navItems.slice(1).map((item) => {
                  const active = isActiveRoute(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      className={`${linkBase} px-3 py-2 rounded-[var(--radius-pill)] ${
                        active ? 'text-[var(--xws-accent)] bg-[var(--xws-accent-dim)]' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handleNavigation('/#testimonials', false)}
                  className={`${linkBase} px-3 py-2 rounded-[var(--radius-pill)]`}
                >
                  Testimonials
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <ThemeToggle />
               
              </div>

              <div className="lg:hidden flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  className="p-2.5 rounded-xl border border-[var(--xws-border)] hover:bg-[var(--xws-bg-card)] transition-colors"
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center">
                    <span
                      className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                        open ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                        open ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                        open ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {open && (
              <div className="lg:hidden mt-4 pb-4 border-t border-[var(--xws-border)] pt-4 space-y-1">
                <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/services" className="block px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]" onClick={() => setOpen(false)}>
                  Services
                </Link>
                <Link href="/ai" className="block px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]" onClick={() => setOpen(false)}>
                  AI Studio
                </Link>
                <Link href="/solutions" className="block px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]" onClick={() => setOpen(false)}>
                  Solutions
                </Link>
                {navItems.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]"
                    onClick={() => setOpen(false)}
                    prefetch
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="block w-full text-left px-4 py-3 rounded-xl hover:bg-[var(--xws-bg-card)]"
                  onClick={() => handleNavigation('/#testimonials', false)}
                >
                  Testimonials
                </button>
                <Link
                  href="/contact"
                  className="block text-center mt-2 px-4 py-3 rounded-[var(--radius-pill)] bg-[var(--xws-accent)] text-[var(--xws-accent-contrast)] font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <section className="border-t border-[var(--xws-border)] bg-[var(--xws-bg-raised)] py-16 sm:py-20">
          <div className="container-responsive text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--xws-accent)] mb-3">
              Ready to elevate your digital presence?
            </h2>
            <p className="text-[var(--xws-text-muted)] mb-8">
              Share your project brief — we respond within one business day. Newsletter and product updates coming soon.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-[var(--radius-pill)] border border-[var(--xws-border)] bg-[var(--xws-bg-card)] max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/contact');
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-[var(--xws-text-primary)] placeholder:text-[var(--xws-text-faint)]"
                aria-label="Email for project inquiry"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--xws-accent)] text-[var(--xws-accent-contrast)] px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all shrink-0"
              >
                Start a project
                <span aria-hidden>→</span>
              </button>
            </form>
            <div className="flex justify-center gap-3 mt-8">
              <a
                href="https://github.com/Muhammad-Naveed704"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-text-muted)] hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/team-tech-wave-solution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-text-muted)] hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-[var(--xws-footer-bg)] text-white relative overflow-hidden border-t border-[var(--xws-border)]">
          <div className="absolute inset-0 pointer-events-none bg-xws-radial-green opacity-60" />
          <div className="absolute inset-0 pointer-events-none bg-xws-radial-blue" />
          <div className="container-responsive py-14 relative">
            <div className="flex flex-col lg:flex-row gap-10 lg:items-start lg:justify-between mb-12">
              <div className="max-w-md">
                <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                  <Image
                    src="/xws-logo.png"
                    alt="XWS Solution"
                    width={48}
                    height={48}
                    className="rounded-xl ring-1 ring-white/10"
                  />
                  <span className="font-semibold text-lg tracking-tight">
                    XWS <span className="text-[var(--xws-accent)]">Solution</span>
                  </span>
                </Link>
                <p className="text-white/70 text-sm leading-relaxed">
                  Software house in Pakistan — web apps, mobile, AI, cloud, and e-commerce. From discovery to production
                  with clear communication and measurable delivery.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {['Overview', 'Services', 'Projects', 'Contact', 'Insights'].map((label) => {
                  const href =
                    label === 'Overview'
                      ? '/'
                      : label === 'Services'
                        ? '/services'
                        : label === 'Projects'
                          ? '/projects'
                          : label === 'Contact'
                            ? '/contact'
                            : '/insights';
                  return (
                    <Link
                      key={label}
                      href={href}
                      className="px-4 py-2 rounded-[var(--radius-pill)] border border-white/15 text-white/80 hover:border-[var(--xws-accent)] hover:text-[var(--xws-accent)] transition-colors"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <hr className="border-white/10 mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Contact</p>
                <ul className="space-y-2 text-white/75">
                  <li>
                    <a href="mailto:mnaveed2862@gmail.com" className="hover:text-[var(--xws-accent)] transition-colors">
                      mnaveed2862@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+923442862704" className="hover:text-[var(--xws-accent)] transition-colors">
                      +92 344 2862704
                    </a>
                  </li>
                  <li>Karachi, Pakistan</li>
                </ul>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Navigation</p>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-white/70 hover:text-[var(--xws-accent)] transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className="text-white/70 hover:text-[var(--xws-accent)] transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai" className="text-white/70 hover:text-[var(--xws-accent)] transition-colors">
                      AI Studio
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Capabilities</p>
                <ul className="space-y-2 text-white/70">
                  <li>Next.js & React engineering</li>
                  <li>Mobile — Flutter & React Native</li>
                  <li>AI automation & integrations</li>
                  <li>DevOps & cloud (AWS, Vercel)</li>
                </ul>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Social</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/team-tech-wave-solution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[var(--xws-accent-dim)] hover:border-[var(--xws-accent)] transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-[var(--xws-accent)]" />
                  </a>
                  <a
                    href="https://github.com/Muhammad-Naveed704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[var(--xws-accent-dim)] hover:border-[var(--xws-accent)] transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-[var(--xws-accent)]" />
                  </a>
                </div>
              </div>
            </div>

            <hr className="border-white/10 my-10" />

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-white/55">
              <p className="flex items-center gap-2">
                <Image src="/favicon.png" alt="" width={20} height={20} className="rounded-md opacity-90" />
                © {new Date().getFullYear()} XWS Solution. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/privacy" className="hover:text-[var(--xws-accent)] transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-[var(--xws-accent)] transition-colors">
                  Terms
                </Link>
                <span className="text-white/40">Karachi · Remote worldwide</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
