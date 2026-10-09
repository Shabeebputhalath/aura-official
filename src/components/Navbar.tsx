import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',     handler: null as null | (() => void) },
  { label: 'About',    handler: null as null | (() => void) },
  { label: 'Services', handler: null as null | (() => void) },
  { label: 'Work',     handler: null as null | (() => void) },
  { label: 'Contact',  handler: null as null | (() => void) },
];

interface NavbarProps {
  onNavigateWork?:     () => void;
  onNavigateAbout?:    () => void;
  onNavigateServices?: () => void;
  onNavigateContact?:  () => void;
}

export default function Navbar({
  onNavigateWork,
  onNavigateAbout,
  onNavigateServices,
  onNavigateContact,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Wire handlers
  navLinks[0].handler = () => { window.location.hash = ''; window.scrollTo({ top: 0 }); };
  navLinks[1].handler = onNavigateAbout ?? null;
  navLinks[2].handler = onNavigateServices ?? null;
  navLinks[3].handler = onNavigateWork ?? null;
  navLinks[4].handler = onNavigateContact ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Desktop: floating pill ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
        <nav
          className={`flex w-full max-w-2xl items-center justify-between gap-2 rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'bg-white/10 shadow-xl shadow-black/20 backdrop-blur-2xl border border-white/20'
              : 'bg-white/8 backdrop-blur-xl border border-white/15'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.location.hash = ''; window.scrollTo({ top: 0 }); }}
            className="group flex shrink-0 items-center gap-2"
          >
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-[2px] rounded-full bg-ink-950" />
              <div className="relative h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(124,92,255,0.9)]" />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              AURA<span className="text-accent-400"> AI</span>
            </span>
          </a>

          {/* Links — desktop only (lg+) */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => link.handler?.()}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Login / Start CTA */}
          <button
            onClick={() => onNavigateContact?.()}
            className="shrink-0 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-600 hover:shadow-accent-500/30"
          >
            Start a Project
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-8 w-8 items-center justify-center text-white transition-colors hover:text-accent-400 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen menu ─────────────────────────────── */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-ink-950/95 backdrop-blur-2xl transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div className={`relative flex h-full flex-col items-center justify-center gap-3 transition-all duration-700 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-5 flex h-10 w-10 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => { link.handler?.(); setMenuOpen(false); }}
              className="font-display text-3xl font-medium tracking-tight text-ink-100 transition-all duration-500 hover:text-white"
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 200}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => { onNavigateContact?.(); setMenuOpen(false); }}
            className="mt-8 rounded-full bg-accent-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-500"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60 + 200}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}
