import { useReveal, useCountUp } from '@/hooks/useReveal';

const stats = [
  { value: 10, suffix: '×', label: 'Faster Ideation' },
  { value: 50, suffix: '+', label: 'Creative Projects' },
  { value: 100, suffix: '+', label: 'AI Films Created' },
  { value: 0, suffix: '', label: 'Global Creative Reach', text: 'Global' },
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
  stat,
  start,
  index,
}: {
  stat: (typeof stats)[number];
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
        {stat.text ? (
          stat.text
        ) : (
          <>
            {count}
            <span className="text-accent-400">{stat.suffix}</span>
          </>
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
    <section className="relative py-16 lg:py-24" style={{ background: '#050507' }}>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ── Rounded card with bg.png as background ─────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '1.5rem',
            border:       '1px solid rgba(124,92,255,0.15)',
            boxShadow:    '0 0 60px rgba(124,92,255,0.08)',
          }}
        >
          {/* bg.png fills the card */}
          <div className="absolute inset-0">
            <img
              src="/bg.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
              style={{ opacity: 0.9 }}
              draggable={false}
            />
            {/* Subtle dark scrim so text stays readable */}
            <div className="absolute inset-0 bg-ink-950/40" />
          </div>

          {/* Content sits on top of the bg image */}
          <div className="relative z-10 grid grid-cols-1 gap-16 p-8 sm:p-12 lg:grid-cols-2 lg:gap-20 lg:p-16">
          {/* Left: cinematic visual */}
          <div ref={ref} className={`reveal-scale relative ${visible ? 'reveal-visible' : ''}`}>
            <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.06]">
              <img
                src="/aura.png"
                alt="AURA AI studio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-lg p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-500/30 bg-accent-500/10">
                    <div className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(124,92,255,0.8)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AI × Human Direction</div>
                    <div className="text-xs text-ink-300">Every frame, intentionally crafted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col justify-center">
            <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
              The AURA Approach
            </p>
            <h2
              className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              AI Gives Us Speed.
              <br />
              <span className="text-gradient-accent">Human Creativity</span>
              <br />
              Gives It Meaning.
            </h2>

            <p
              className={`reveal mt-6 text-lg leading-relaxed text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              We don't just press generate. We combine AI with the full toolkit of
              traditional filmmaking — directing every shot, crafting every cut, and
              shaping every story with human artistic intent.
            </p>

            {/* Pillars */}
            <div
              className={`reveal mt-8 flex flex-wrap gap-2.5 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              {pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-ink-200 transition-colors duration-300 hover:border-accent-500/30 hover:text-white"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`reveal mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '400ms' }}
            >
              {stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} start={visible} index={i} />
              ))}
            </div>
          </div>
          </div>{/* end content z-10 */}
        </div>{/* end rounded card */}
      </div>{/* end max-w-7xl */}
    </section>
  );
}

