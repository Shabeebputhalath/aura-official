import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#/about' },
  { label: 'Services', href: '#/services' },
  { label: 'Work', href: '#/work' },
  { label: 'Contact', href: '#/contact' },
];

export default function Navbar({ onNavigateWork, onNavigateAbout, onNavigateServices, onNavigateContact }: { onNavigateWork?: () => void; onNavigateAbout?: () => void; onNavigateServices?: () => void; onNavigateContact?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-[2px] rounded-full bg-ink-950" />
              <div className="relative h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              AURA<span className="text-accent-400"> AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isWorkLink = link.label === 'Work' && onNavigateWork;
              const isAboutLink = link.label === 'About' && onNavigateAbout;
              const isServicesLink = link.label === 'Services' && onNavigateServices;
              const isContactLink = link.label === 'Contact' && onNavigateContact;
              if (isWorkLink || isAboutLink || isServicesLink || isContactLink) {
                const handler = isWorkLink ? onNavigateWork! : isAboutLink ? onNavigateAbout! : isServicesLink ? onNavigateServices! : onNavigateContact!;
                return (
                  <li key={link.label.toLowerCase()}>
                    <button
                      onClick={handler}
                      className="group relative text-sm font-medium text-ink-200 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-full" />
                    </button>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative text-sm font-medium text-ink-200 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-primary hidden sm:inline-flex">
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-accent-400 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        <div
          className={`absolute inset-0 bg-ink-950/95 backdrop-blur-2xl transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`relative flex h-full flex-col items-center justify-center gap-2 transition-all duration-700 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-5 flex h-10 w-10 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          {navLinks.map((link, i) => {
            const isWorkLink = link.label === 'Work' && onNavigateWork;
            const isAboutLink = link.label === 'About' && onNavigateAbout;
            const isServicesLink = link.label === 'Services' && onNavigateServices;
            const isContactLink = link.label === 'Contact' && onNavigateContact;
            if (isWorkLink || isAboutLink || isServicesLink || isContactLink) {
              const handler = isWorkLink ? onNavigateWork! : isAboutLink ? onNavigateAbout! : isServicesLink ? onNavigateServices! : onNavigateContact!;
              return (
                <button
                  key={`${link.label.toLowerCase()}-mobile`}
                  onClick={() => { handler(); setMenuOpen(false); }}
                  className="font-display text-3xl font-medium tracking-tight text-ink-100 transition-all duration-500 hover:text-white"
                  style={{
                    transitionDelay: menuOpen ? `${i * 60 + 200}ms` : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  {link.label}
                </button>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl font-medium tracking-tight text-ink-100 transition-all duration-500 hover:text-white"
                style={{
                  transitionDelay: menuOpen ? `${i * 60 + 200}ms` : '0ms',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-8"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60 + 200}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}

