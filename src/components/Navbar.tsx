import { useEffect, useState } from 'react';

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
  const [menuOpen,   setMenuOpen]   = useState(false);
  // true = scrolled past hero → black navbar
  const [pastHero,   setPastHero]   = useState(false);

  /* Detect when user scrolls past the hero (≈ 90vh) */
  useEffect(() => {
    const check = () => {
      const threshold = window.innerHeight * 0.85;
      setPastHero(window.scrollY > threshold);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Home',     fn: () => { window.location.hash = ''; window.scrollTo({ top: 0 }); } },
    { label: 'About',    fn: onNavigateAbout    },
    { label: 'Work',     fn: onNavigateWork     },
    { label: 'Services', fn: onNavigateServices },
    { label: 'Contact',  fn: onNavigateContact  },
  ];

  /* ── Colour tokens ──────────────────────────────────────────
     Hero   (pastHero=false): white pill bg, dark text
     Scroll (pastHero=true):  black pill bg, white text        */
  const pillBg   = pastHero ? 'rgba(10,10,15,0.95)'   : 'rgba(255,255,255,0.92)';
  const linkCol  = pastHero ? 'rgba(255,255,255,0.75)' : '#15171a';
  const linkHov  = pastHero ? '#ffffff'                : '#000000';
  const burgerBg = pastHero ? '#ffffff'                : '#15171a';
  const burgerIc = pastHero ? '#0a0a0f'                : '#ffffff';
  const ctaBg    = '#7c5cff';   /* accent — same in both states */

  return (
    <>
      <style>{`
        .wh-nav-links-outer {
          display:flex; gap:34px;
          position:absolute; left:50%; transform:translateX(-50%);
        }
        @media(max-width:820px){ .wh-nav-links-outer{ display:none!important } }
        .wh-mob-btn{ display:none!important }
        @media(max-width:820px){
          .wh-mob-btn{ display:flex!important }
          .wh-cta-btn{ display:none!important }
        }
        /* mobile overlay */
        .wh-mob-overlay {
          position:fixed; inset:0; z-index:200;
          background:rgba(10,10,15,0.97);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center; gap:1.5rem;
        }
        .wh-mob-link {
          font-family:'Figtree',system-ui,sans-serif;
          font-weight:700; font-size:clamp(1.75rem,6vw,2.5rem);
          color:rgba(255,255,255,.8); background:none; border:none;
          cursor:pointer; letter-spacing:-.02em; transition:color .2s;
        }
        .wh-mob-link:hover{ color:#fff }
      `}</style>

      {/* ── Fixed pill header ─────────────────────────────────── */}
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100,
                       padding:'10px clamp(0.75rem,3vw,1.5rem)',
                       transition:'background 0.3s' }}>
        <div
          style={{
            maxWidth:            '1180px',
            margin:              '8px auto 0',
            height:              '58px',
            padding:             '0 10px 0 18px',
            display:             'flex',
            alignItems:          'center',
            justifyContent:      'space-between',
            background:          pillBg,
            backdropFilter:      'blur(14px)',
            WebkitBackdropFilter:'blur(14px)',
            borderRadius:        '14px',
            border:              pastHero
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.06)',
            position:            'relative',
            transition:          'background 0.35s, border 0.35s',
          } as React.CSSProperties}
        >

          {/* Logo — testaura.png */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.location.hash = ''; window.scrollTo({ top:0 }); }}
            aria-label="AURA AI"
            style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}
          >
            <img
              src="/test.png"
              alt="AURA AI"
              style={{ height:'34px', width:'auto', display:'block' }}
            />
          </a>

          {/* Centre nav links */}
          <nav className="wh-nav-links-outer" aria-label="Main">
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => link.fn?.()}
                style={{
                  background:  'none', border:'none', cursor:'pointer',
                  fontSize:    '13.5px', fontWeight:600,
                  fontFamily:  "'Figtree',system-ui,sans-serif",
                  color:       linkCol,
                  padding:     '4px 2px',
                  transition:  'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = linkHov; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = linkCol; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>

            {/* Contact Us — accent purple, always */}
            <button
              className="wh-cta-btn"
              onClick={() => onNavigateContact?.()}
              style={{
                display:      'inline-flex', alignItems:'center', gap:'8px',
                background:   ctaBg, color:'#fff',
                border:       'none', borderRadius:'10px',
                padding:      '7px 8px 7px 16px',
                fontFamily:   "'Figtree',system-ui,sans-serif",
                fontWeight:   700, fontSize:'13px',
                cursor:       'pointer', transition:'background 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#6b4cf5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ctaBg; }}
            >
              Contact Us
              <span style={{
                display:'flex', alignItems:'center', justifyContent:'center',
                width:28, height:28, borderRadius:'7px',
                background:'rgba(255,255,255,0.15)', flexShrink:0,
              }}>
                <svg width="12" height="12" viewBox="0 0 14 14">
                  <path d="M3 11L11 3M5 3h6v6" fill="none" stroke="#fff"
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="wh-mob-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                display:'flex', alignItems:'center', justifyContent:'center',
                width:38, height:38, borderRadius:'10px',
                background: burgerBg, border:'none', cursor:'pointer', flexShrink:0,
                transition:'background 0.35s',
              }}
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect width="16" height="2" rx="1" fill={burgerIc}/>
                <rect y="5"  width="16" height="2" rx="1" fill={burgerIc}/>
                <rect y="10" width="16" height="2" rx="1" fill={burgerIc}/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────── */}
      {menuOpen && (
        <div className="wh-mob-overlay">
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position:'absolute', top:20, right:20,
              background:'rgba(255,255,255,0.1)', border:'none',
              borderRadius:'50%', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1 1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {links.map(link => (
            <button
              key={link.label}
              className="wh-mob-link"
              onClick={() => { link.fn?.(); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => { onNavigateContact?.(); setMenuOpen(false); }}
            style={{
              marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'8px',
              background: ctaBg, color:'#fff', border:'none', borderRadius:'10px',
              padding:'10px 10px 10px 22px',
              fontFamily:"'Figtree',system-ui,sans-serif", fontWeight:700, fontSize:'15px',
              cursor:'pointer',
            }}
          >
            Contact Us
            <span style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:32, height:32, borderRadius:'8px',
              background:'rgba(255,255,255,0.15)',
            }}>
              <svg width="13" height="13" viewBox="0 0 14 14">
                <path d="M3 11L11 3M5 3h6v6" fill="none" stroke="#fff"
                      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
