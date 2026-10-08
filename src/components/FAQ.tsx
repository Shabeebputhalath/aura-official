import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { faqItems } from '@/data/content';

export default function FAQ() {
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-16 text-center">
          <p className={`reveal section-label justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            FAQ
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Questions, <span className="text-gradient-accent">Answered.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`reveal transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-base font-medium tracking-tight transition-colors duration-300 lg:text-lg ${isOpen ? 'text-white' : 'text-ink-100 group-hover:text-white'
                      }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen
                        ? 'border-accent-500/40 bg-accent-500/10 rotate-45'
                        : 'border-white/10 bg-white/[0.02]'
                      }`}
                  >
                    <Plus className={`h-4 w-4 transition-colors duration-300 ${isOpen ? 'text-accent-400' : 'text-ink-300'}`} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-base leading-relaxed text-ink-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

