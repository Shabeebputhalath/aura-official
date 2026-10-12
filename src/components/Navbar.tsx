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
      {/* ── Floating pill — solid black, white text ─────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
        <nav className="flex w-full max-w-[660px] items-center justify-between rounded-full bg-black px-3 py-2 shadow-xl shadow-black/30">

          {/* Logo */}
          <button
            onClick={() => { window.location.hash = ''; window.scrollTo({ top: 0 }); }}
            className="flex shrink-0 items-center gap-2 pl-1"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-700 shadow-[0_0_8px_rgba(124,92,255,0.6)]">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <span className="font-display text-[13px] font-bold tracking-tight text-white">
              AURA <span className="font-medium text-white/60">AI</span>
            </span>
          </button>

          {/* Center links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map(link => (
              <li key={link.label}>
                <button
                  onClick={() => link.fn?.()}
                  className={` px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    link.active
                      ? ' text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right CTA + mobile hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateContact?.()}
              className="hidden shrink-0 rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-black shadow-sm transition-all duration-200 hover:bg-white/90 sm:inline-flex"
            >
              Start a Project
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
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
          className={`absolute inset-0 bg-black/96 backdrop-blur-2xl transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
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
              className="font-display text-3xl font-medium tracking-tight text-white/80 transition-all duration-500 hover:text-white"
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
            className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black"
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
