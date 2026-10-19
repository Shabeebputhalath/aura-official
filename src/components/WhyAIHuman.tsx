import { useReveal, useCountUp } from '@/hooks/useReveal';

const stats = [
  { value: 10,  suffix: '×', label: 'Faster Ideation'       },
  { value: 50,  suffix: '+', label: 'Creative Projects'     },
  { value: 100, suffix: '+', label: 'AI Films Created'      },
  { value: 0,   suffix: '',  label: 'Global Creative Reach', text: 'Global' },
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
      className="reveal border-l border-white/20 pl-5 transition-all duration-700"
      style={{ transitionDelay: `${index * 100}ms`, opacity: 0, transform: 'translateY(20px)' }}
    >
      <div className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
        {stat.text ? stat.text : (
          <>{count}<span className="text-accent-400">{stat.suffix}</span></>
        )}
      </div>
      <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/50">
        {stat.label}
      </div>
    </div>
  );
}

export default function WhyAIHuman() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-12 lg:py-16" style={{ background: '#050507' }}>
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-2 sm:px-4 lg:px-5">

        {/* ── Full-width card ──────────────────────────────────────── */}
        <div
          ref={ref}
          className="relative overflow-hidden"
          style={{
            borderRadius: '1.5rem',
            border:       '1px solid rgba(124,92,255,0.18)',
            boxShadow:    '0 0 80px rgba(124,92,255,0.1)',
            minHeight:    'clamp(420px, 55vw, 680px)',
          }}
        >
          {/* ── Video — full width, fills entire card ── */}
          <video
            src="/producer.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              objectPosition: 'center center',
              display:    'block',
            }}
          />

          {/* ── Dark gradient overlay — bottom for stats readability ── */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)',
              zIndex:     1,
            }}
            aria-hidden="true"
          />

          {/* ── Stats bar — pinned to the bottom ── */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              padding:         'clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,4vw,3rem)',
              display:         'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap:             'clamp(1rem,2vw,2rem)',
            }}
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} start={visible} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
