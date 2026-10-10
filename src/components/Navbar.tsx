import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Home',     active: true,  fn: () => { window.location.hash = ''; window.scrollTo({ top: 0 }); } },
    { label: 'About',    active: false, fn: onNavigateAbout },
    { label: 'Services', active: false, fn: onNavigateServices },
    { label: 'Work',     active: false, fn: onNavigateWork },
    { label: 'Contact',  active: false, fn: onNavigateContact },
  ];

  return (
    <>
      {/* ── Floating pill navbar — exact clone of reference ──────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
        {/*
          White/light pill with subtle border — matches the reference exactly.
          The pill has a frosted white look over the purple video.
        */}
        <nav className="flex w-full max-w-[660px] items-center justify-between rounded-full border border-white/30 bg-white/15 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-2xl">

          {/* Logo — icon + "AURA AI" wordmark */}
          <button
            onClick={() => { window.location.hash = ''; window.scrollTo({ top: 0 }); }}
            className="flex shrink-0 items-center gap-2 pl-1"
          >
            {/* Purple gem icon — matches the "◆ Haven" logo style */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-700 shadow-[0_0_8px_rgba(124,92,255,0.6)]">
              <div className="h-2 w-2 rounded-full bg-white/90" />
            </div>
            <span className="font-display text-[13px] font-bold tracking-tight text-white">
              AURA <span className="text-white/70 font-medium">AI</span>
            </span>
          </button>

          {/* Center nav links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map(link => (
              <li key={link.label}>
                <button
                  onClick={() => link.fn?.()}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    link.active
                      ? 'text-accent-300 hover:text-accent-200'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right CTA — dark purple pill, matches "Login" button exactly */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateContact?.()}
              className="hidden shrink-0 rounded-full bg-[#2d1b69] px-5 py-2 text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#3d2580] sm:inline-flex"
            >
              Start a Project
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen menu ─────────────────────────────── */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-ink-950/96 backdrop-blur-2xl transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
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
          {links.map((link, i) => (
            <button
              key={link.label}
              onClick={() => { link.fn?.(); setMenuOpen(false); }}
              className="font-display text-3xl font-medium tracking-tight text-white/90 transition-all duration-500 hover:text-white"
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
            className="mt-8 rounded-full bg-[#2d1b69] px-8 py-3 text-sm font-semibold text-white shadow-lg"
            style={{
              transitionDelay: menuOpen ? `${links.length * 60 + 200}ms` : '0ms',
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
