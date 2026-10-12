import { useReveal } from '@/hooks/useReveal';
import { useEffect, useRef, useState } from 'react';

/* ── Count-up hook ─────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

/* ── Stat item ─────────────────────────────────────────────────────────────── */
function Stat({
  value, suffix, label, active, delay,
}: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div
      className="reveal flex flex-col gap-3 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className="font-display font-bold leading-none tracking-tight text-white"
        style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
      >
        {count}{suffix}
      </span>
      <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/40">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { value: 58,  suffix: '+', label: 'Satisfied Clients'   },
  { value: 123, suffix: '+', label: 'Projects'            },
  { value: 7,   suffix: '+', label: 'Different Industries'},
  { value: 322, suffix: '+', label: 'Collaborators'       },
];

export default function About() {
  const { ref: topRef, visible: topVisible } = useReveal();
  const { ref: statRef, visible: statVisible } = useReveal();

  return (
    <section
      id="about"
      className="relative bg-ink-950"
      style={{ background: '#080808' }}
    >
      {/* ── Top content — headline left, copy+CTA right ─────────── */}
      <div
        ref={topRef}
        className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16"
        style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-32">

          {/* Left — big headline */}
          <div className="flex items-start">
            <h2
              className={`reveal font-display font-bold leading-[1.05] tracking-tight text-white transition-all duration-700 ${topVisible ? 'reveal-visible' : ''}`}
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', maxWidth: '14ch' }}
            >
              As your dedicated partner we extend our services to clients and agencies.
            </h2>
          </div>

          {/* Right — paragraph + button */}
          <div
            className={`reveal flex flex-col items-start justify-center gap-8 transition-all duration-700 ${topVisible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            <p className="text-[15px] leading-[1.75] text-white/55" style={{ maxWidth: '52ch' }}>
              AURA AI is a creative technology studio where artificial intelligence meets filmmaking.
              We combine AI, film, design, technology, and storytelling to create visual experiences
              that would traditionally require large production teams and budgets.
              Our team of directors, designers, and AI specialists craft every project with intention —
              from the first concept sketch to the final color grade.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/30 px-7 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-white hover:text-black"
            >
              Schedule a call
            </a>
          </div>
        </div>
      </div>

      {/* ── Thin divider ────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] border-t border-white/[0.06] px-6 sm:px-10 lg:px-16" />

      {/* ── Stats row ───────────────────────────────────────────── */}
      <div
        ref={statRef}
        className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16"
        style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-0">
          {stats.map((s, i) => (
            <div key={s.label} className="relative flex flex-col">
              {/* Vertical divider between items (not before the first) */}
              {i > 0 && (
                <div className="absolute left-0 top-0 hidden h-full w-px bg-white/[0.07] sm:block" />
              )}
              <div className={`sm:pl-${i > 0 ? '10' : '0'} flex flex-col`}
                style={{ paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0' }}>
                <Stat
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  active={statVisible}
                  delay={i * 100}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
