import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { pricingPlans } from '@/data/content';

export default function Pricing() {
  const { ref, visible } = useReveal();

  return (
    <section id="pricing" className="relative border-y border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-16 text-center">
          <p className={`reveal section-label justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Pricing
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Choose Your <span className="text-gradient-accent">Production Level</span>
          </h2>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Custom note */}
        <p className={`reveal mt-14 text-center text-base text-ink-300 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          Need something completely custom? We can build a production package around your campaign.
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricingPlans)[number];
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal relative flex flex-col rounded-2xl border p-8 transition-all duration-700 ${plan.popular
          ? 'border-accent-500/40 bg-gradient-to-b from-accent-500/[0.08] to-ink-950 lg:-translate-y-4'
          : 'border-white/[0.06] bg-ink-850 hover:border-white/[0.12]'
        } ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-accent-500/30">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </div>
        </div>
      )}

      {/* Plan name */}
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-200">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-6">
        <span className="text-xs text-ink-300">Starting at</span>
        <div className="mt-1 font-display text-4xl font-bold tracking-tight text-white lg:text-5xl">
          {plan.price}
        </div>
      </div>

      {/* Tagline */}
      <p className="mt-3 text-sm text-ink-300">{plan.tagline}</p>

      {/* Divider */}
      <div className="my-7 h-px w-full bg-white/[0.06]" />

      {/* Features */}
      <ul className="flex flex-1 flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink-100">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? 'text-accent-400' : 'text-ink-400'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`mt-8 ${plan.popular ? 'btn-primary' : 'btn-secondary'} group w-full justify-center`}
      >
        <span>{plan.cta}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

