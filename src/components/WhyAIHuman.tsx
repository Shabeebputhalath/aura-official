import { useReveal, useCountUp } from '@/hooks/useReveal';

const stats = [
  { value: 10,  suffix: '×', label: 'Faster Ideation'       },
  { value: 50,  suffix: '+', label: 'Creative Projects'     },
  { value: 100, suffix: '+', label: 'AI Films Created'      },
  { value: 0,   suffix: '',  label: 'Global Creative Reach', text: 'Global' },
];

const pillars = [
  'AI Generation',
  'Creative Direction',
  'Storytelling',
  'Cinematography',
  'Editing',
  'Sound Design',
  'Human Artistic Judgment',
];

function StatItem({
  stat, start, index,
}: {
  stat: typeof stats[number];
  start: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 2000, start);
  return (
    <div
      className="reveal border-l border-white/10 pl-5 transition-all duration-700"
      style={{ transitionDelay: `${index * 100}ms`, opacity: 0, transform: 'translateY(20px)' }}
    >
      <div className="font-display text-4xl font-bold tracking-tight text-white lg:text-5xl">
        {stat.text ? stat.text : (
          <>{count}<span className="text-accent-400">{stat.suffix}</span></>
        )}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
        {stat.label}
      </div>
    </div>
  );
}

export default function WhyAIHuman() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-12 lg:py-16" style={{ background: '#050507' }}>

      {/* ── Wider outer wrapper — small gutters so card fills screen ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-2 sm:px-4 lg:px-5">

        {/* ── Rounded card — bg.png fills it ──────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '1.5rem',
            border:       '1px solid rgba(124,92,255,0.18)',
            boxShadow:    '0 0 80px rgba(124,92,255,0.1)',
            /* Taller card */
            minHeight:    'clamp(500px, 60vw, 780px)',
          }}
        >
          {/* bg.png — full bleed, no scale distortion */}
          <div className="absolute inset-0">
            <img
              src="/bg.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
              style={{ opacity: 0.92 }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-ink-950/38" />
          </div>

          {/* ── Content grid ─────────────────────────────────────── */}
          <div className="relative z-10 grid h-full grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">

            {/* LEFT — aura.png centred both axes */}
            <div
              ref={ref}
              className={`reveal-scale  items-center justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            >
              <img
                src="/aura.png"
                alt="AURA AI studio"
                loading="lazy"
                style={{
                  display:      'block',
                  margin:       '0 auto',
                  width:        '100%',
                  maxWidth:     '520px',
                  height:       'auto',
                  objectFit:    'contain',
                  filter:       'drop-shadow(0 0 40px rgba(124,92,255,0.35))',
                  borderRadius: '1rem',
                }}
              />
            </div>

            {/* RIGHT — text + pillars + stats */}
            <div className="flex flex-col justify-center">

              {/* <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
                The AURA Approach
              </p>

              <h2
                className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: '100ms' }}
              >
                AI Gives Us Speed.
                <br />
                <span className="text-gradient-accent">Human Creativity</span>
                <br />
                Gives It Meaning.
              </h2>

              <p
                className={`reveal mt-6 text-lg leading-relaxed text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: '200ms' }}
              >
                We don't just press generate. We combine AI with the full toolkit of
                traditional filmmaking — directing every shot, crafting every cut, and
                shaping every story with human artistic intent.
              </p> */}

              {/* Pillars */}
              {/* <div
                className={`reveal mt-8 flex flex-wrap gap-2.5 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: '300ms' }}
              >
                {pillars.map(p => (
                  <span
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-ink-200 transition-colors duration-300 hover:border-accent-500/30 hover:text-white"
                  >
                    {p}
                  </span>
                ))}
              </div> */}

              {/* Stats */}
              <div
                className={`reveal mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: '400ms' }}
              >
                {stats.map((stat, i) => (
                  <StatItem key={stat.label} stat={stat} start={visible} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
