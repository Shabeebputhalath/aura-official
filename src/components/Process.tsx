import { useReveal } from '@/hooks/useReveal';
import { processSteps } from '@/data/content';

export default function Process() {
  const { ref, visible } = useReveal();

  return (
    <section id="process" className="relative border-y border-white/[0.04] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900/50 to-ink-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={ref} style={{ marginBottom:'5rem', padding:'0 clamp(0.5rem,2vw,1.5rem)' }}>
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Our Process
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            From Idea to
            <br />
            <span className="text-gradient-accent">Final Frame.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ink-600 to-transparent lg:left-1/2" />

          {processSteps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const { ref, visible } = useReveal();
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal relative flex flex-col gap-6 pb-20 last:pb-0 lg:flex-row lg:items-center ${isLeft ? '' : 'lg:flex-row-reverse'
        } ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Content side */}
      <div className="lg:w-1/2 lg:px-12">
        <div className="group relative rounded-lg border border-white/[0.06] bg-ink-850 p-8 transition-all duration-500 hover:border-accent-500/20 hover:bg-ink-800">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl font-bold tracking-tight text-ink-700 transition-colors duration-500 group-hover:text-accent-600/50">
              {step.number}
            </span>
            <h3 className="font-display text-xl font-semibold tracking-tight text-white">
              {step.title}
            </h3>
          </div>
          <p className="mt-4 text-base leading-relaxed text-ink-200">
            {step.description}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-0 top-8 z-10 -translate-x-1/2 lg:left-1/2">
        <div className="relative flex h-4 w-4 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-accent-500/20 animate-pulse-slow" />
          <div className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(124,92,255,0.6)]" />
        </div>
      </div>

      {/* Empty spacer side */}
      <div className="hidden lg:block lg:w-1/2" />
    </div>
  );
}

