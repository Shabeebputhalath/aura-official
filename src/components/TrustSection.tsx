/* ── 3 real logos × 8 copies = 24 items
   Translate -50% = back to item 13 which is identical to item 1
   Result: zero blank space, perfectly seamless on any screen width  ── */
const LOGOS = [
  { src: '/laban.png', alt: 'Laban' },
  { src: '/grapo.png', alt: 'Grapo' },
  { src: '/nahdi.png', alt: 'Nahdi' },
  { src: '/fizz.png', alt: 'Fizz' },

];

const ITEMS = [
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
  ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,
];

export default function TrustSection() {
  return (
    <section className="relative border-b border-white/[0.04] overflow-hidden" style={{ paddingBlock: '1.25rem' }}>

      <style>{`
        @keyframes tm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tm-track {
          display:     flex;
          width:       max-content;
          align-items: center;
          animation:   tm-scroll 14s linear infinite;
          will-change: transform;
        }
        .tm-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Heading */}
      <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
        Trusted by Ambitious Brands and Creators
      </p>

      {/* Track wrapper with edge fades */}
      <div className="relative overflow-hidden" style={{ margin: '0 clamp(4rem, 15vw, 18rem)' }}>

        {/* Left fade */}
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{ width:'4rem', background:'linear-gradient(to right,#050507,transparent)' }} />

        {/* Right fade */}
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{ width:'4rem', background:'linear-gradient(to left,#050507,transparent)' }} />

        {/* Scrolling strip */}
        <div className="tm-track">
          {ITEMS.map((logo, i) => (
            <div
              key={i}
              style={{ padding: '0 3rem', flexShrink: 0, display: 'flex', alignItems: 'center' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                draggable={false}
                style={{
                  height:     '30px',
                  width:      'auto',
                  objectFit:  'contain',
                  filter:     'brightness(0) invert(1)',
                  opacity:    0.5,
                  transition: 'opacity 0.2s',
                  userSelect: 'none',
                  display:    'block',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.5'; }}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
