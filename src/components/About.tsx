import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   Count-up hook — fires once when `active` becomes true
───────────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ─────────────────────────────────────────────────────────────────
   Per-stat component — each has its own staggered delay + countup
───────────────────────────────────────────────────────────────── */
function StatItem({
  value, suffix, label, active, delay,
}: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(id);
  }, [active, delay]);
  const count = useCountUp(value, 2000, go);

  return (
    <div
      className="flex flex-col"
      style={{
        opacity:   active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {/* Giant number */}
      <span
        style={{
          fontFamily:    '"Figtree", sans-serif',
          fontWeight:    400,
          fontSize:      'clamp(4rem, 8.5vw, 7.5rem)',
          lineHeight:    1,
          letterSpacing: '-0.02em',
          color:         '#ffffff',
        }}
      >
        {count}{suffix}
      </span>
      {/* Small label */}
      <span
        style={{
          fontFamily:    '"Figtree", sans-serif',
          fontWeight:    400,
          fontSize:      '12px',
          lineHeight:    1,
          letterSpacing: '0.02em',
          color:         'rgba(255,255,255,0.42)',
          marginTop:     '14px',
        }}
      >
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { value: 58,  suffix: '+', label: 'Satisfied Clients'    },
  { value: 123, suffix: '+', label: 'Projects'             },
  { value: 7,   suffix: '+', label: 'Different Industries' },
  { value: 322, suffix: '+', label: 'Collaborators'        },
];

/* ─────────────────────────────────────────────────────────────────
   IntersectionObserver helper
───────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────────
   About section
───────────────────────────────────────────────────────────────── */
export default function About() {
  const { ref: topRef,  visible: topVis  } = useInView(0.12);
  const { ref: statRef, visible: statVis } = useInView(0.1);

  return (
    <section
      id="about"
      style={{
        background:  '#000000',
        /* Short gap after hero — hero already fades to ink-950 at its
           bottom edge, so 1px of black closes the seam cleanly */
        marginTop:   '1px',
      }}
    >

      {/* ══════════════════════════════════════════════════════
          TOP BLOCK
          Left  ≈55%  — big headline
          Right ≈45%  — small para + pill button,
                         offset down so it aligns with
                         the LOWER portion of the headline
      ════════════════════════════════════════════════════════ */}
      <div
        ref={topRef}
        style={{
          maxWidth:      '1320px',
          margin:        '0 auto',
          padding:       'clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,3.5rem) clamp(3.5rem,7vw,6rem)',
        }}
      >
        <div
          style={{
            display:             'grid',
            /* headline takes ~55%, para takes ~45% */
            gridTemplateColumns: '1.2fr 1fr',
            gap:                 'clamp(2rem,5vw,6rem)',
            alignItems:          'start',
          }}
          className="block lg:grid"   /* stack on mobile */
        >

          {/* ── LEFT: headline ── */}
          <div
            // style={{
            //   opacity:   topVis ? 1 : 0,
            //   transform: topVis ? 'translateY(0)' : 'translateY(24px)',
            //   transition:'opacity 0.8s ease, transform 0.8s ease',
            // }}
          >
            <h2
              style={{
                fontFamily:    '"Figtree", sans-serif',
                fontWeight:    400,
                fontSize:      'clamp(2rem, 4.8vw, 4.2rem)',
                lineHeight:    1.05,
                letterSpacing: '-0.02em',
                color:         '#ffffff',
                margin:        0,
              }}
            >
              AURA AI founded   {' '}
              <span
                style={{
                  /* Accent gradient — site palette */
                  background:          'linear-gradient(90deg, #a89aff 0%, #7c5cff 50%, #6b4cf5 100%)',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip:      'text',
                  /* Soft glow behind the name */
                  filter:              'drop-shadow(0 0 18px rgba(124,92,255,0.55))',
                  /* Italic for a signature feel */
                  fontStyle:           'italic',
                }}
              >
                Swalih Parathakkad
              </span>
              , delivers premium AI video{' '}services.
            </h2>
          </div>

          {/* ── RIGHT: para + button ── */}
          {/*
              The reference shows the right block starting at
              roughly the midpoint of the headline's height.
              paddingTop pushes it down to recreate that offset.
          */}
          <div
            style={{
              paddingTop:    'clamp(1.5rem, 4vw, 4rem)',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'flex-start',
              gap:           '1.75rem',
              opacity:       topVis ? 1 : 0,
              transform:     topVis ? 'translateY(0)' : 'translateY(24px)',
              transition:    'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
            }}
          >
            {/* Small paragraph — exactly as in reference */}
            <p
              style={{
                fontFamily:  '"Figtree", sans-serif',
                fontWeight:  400,
                fontSize:    '13.5px',
                lineHeight:  1.78,
                color:       'rgba(255,255,255,0.48)',
                margin:      0,
                maxWidth:    '44ch',
              }}
            >
              AURA AI is a creative technology studio where artificial
              intelligence meets filmmaking. We combine AI, film, design,
              technology, and storytelling to create visual experiences that
              would traditionally require large production teams and budgets.
              Our directors and AI specialists craft every project from first
              concept sketch to final color grade.
            </p>

            {/* Minimal pill button */}
            <a
              href="#contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                borderRadius:   '9999px',
                border:         '1px solid rgba(255,255,255,0.25)',
                padding:        '0.55rem 1.5rem',
                fontSize:       '13px',
                fontWeight:     400,
                fontFamily:     '"Figtree", sans-serif',
                color:          '#ffffff',
                textDecoration: 'none',
                transition:     'background 0.2s ease, color 0.2s ease',
                background:     'transparent',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = '#ffffff';
                el.style.color      = '#000000';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = 'transparent';
                el.style.color      = '#ffffff';
              }}
            >
              Schedule a call
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STATS ROW
          Reference: large gap above, 4 stats spread full width,
          huge light numbers, tiny labels, no dividers
      ════════════════════════════════════════════════════════ */}
      <div
        ref={statRef}
        style={{
          maxWidth: '1320px',
          margin:   '0 auto',
          padding:  '0 clamp(1.25rem,4vw,3.5rem) clamp(4rem,8vw,7rem)',
        }}
      >
        {/* Visible spacer — the large blank space before stats */}
        <div style={{ height: 'clamp(2.5rem,5vw,4rem)' }} />

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap:                 'clamp(1.5rem,3vw,2rem)',
          }}
          /* 2 cols on mobile */
          className="grid-cols-2 sm:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <StatItem
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              active={statVis}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
