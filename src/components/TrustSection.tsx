import { clientLogos } from '@/data/content';

/* Triple the list — animation translates exactly 1/3 so the loop is invisible */
const tripled = [...clientLogos, ...clientLogos, ...clientLogos];

export default function TrustSection() {
  return (
    <section className="relative border-b border-white/[0.04] py-14 overflow-hidden">

      <style>{`
        @keyframes marquee-x {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .marquee-inner {
          display:   flex;
          width:     max-content;
          animation: marquee-x 28s linear infinite;
          will-change: transform;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Label */}
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
        Trusted by Ambitious Brands and Creators
      </p>

      {/* Overflow container with edge fades */}
      <div className="relative overflow-hidden">

        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{ width: '8rem', background: 'linear-gradient(to right, #050507 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{ width: '8rem', background: 'linear-gradient(to left, #050507 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Moving track */}
        <div className="marquee-inner">
          {tripled.map((logo, i) => (
            <span
              key={i}
              style={{
                fontFamily:    '"Figtree", sans-serif',
                fontWeight:    700,
                fontSize:      '13px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'rgba(154,154,171,0.50)',
                padding:       '0 2.75rem',
                whiteSpace:    'nowrap',
                transition:    'color 0.2s',
                cursor:        'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = 'rgba(154,154,171,0.50)'; }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
