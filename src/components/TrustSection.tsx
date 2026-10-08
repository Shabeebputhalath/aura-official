import { useReveal } from '@/hooks/useReveal';
import { clientLogos } from '@/data/content';

export default function TrustSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-b border-white/[0.04] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          className={`reveal text-center text-sm font-medium uppercase tracking-[0.2em] text-ink-300 transition-all duration-700 ${visible ? 'reveal-visible' : ''
            }`}
          style={{ transitionDelay: '100ms' }}
        >
          Trusted by ambitious brands and creators
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
          {clientLogos.map((logo, i) => (
            <span
              key={logo}
              className={`reveal font-display text-lg font-semibold tracking-tight text-ink-400 transition-all duration-700 hover:text-ink-100 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

