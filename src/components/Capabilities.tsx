import { useReveal } from '@/hooks/useReveal';
import { capabilities } from '@/data/content';

export default function Capabilities() {
  const { ref, visible } = useReveal();
  const doubled = [...capabilities, ...capabilities];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-16 max-w-3xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Creative Capabilities
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Anything you can
            <br />
            <span className="text-gradient-accent">imagine, we can film.</span>
          </h2>
        </div>
      </div>

      {/* Scrolling gallery */}
      <div className="relative mask-fade-x">
        <div className="flex gap-5 animate-scroll-x" style={{ width: 'max-content' }}>
          {doubled.map((cap, i) => (
            <div
              key={`${cap.label}-${i}`}
              className="group relative h-72 w-64 shrink-0 overflow-hidden border border-white/[0.06] sm:h-80 sm:w-72"
            >
              <img
                src={cap.image}
                alt={cap.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-display text-sm font-semibold tracking-tight text-white">
                  {cap.label}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

