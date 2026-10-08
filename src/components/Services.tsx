import {
  Film,
  Clapperboard,
  Package,
  Smartphone,
  Music,
  Lightbulb,
  Users,
  Scissors,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { services } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Film,
  Clapperboard,
  Package,
  Smartphone,
  Music,
  Lightbulb,
  Users,
  Scissors,
};

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="relative border-y border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-16 max-w-3xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            What We Create
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Full-service AI
            <br />
            <span className="text-gradient-accent">video production.</span>
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Film;
            return (
              <ServiceCard key={service.title} service={service} Icon={Icon} index={i} visible={visible} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  Icon,
  index,
  visible,
}: {
  service: { title: string; description: string };
  Icon: LucideIcon;
  index: number;
  visible: boolean;
}) {
  const { ref, visible: cardVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal group relative bg-ink-950 p-8 transition-all duration-700 hover:bg-ink-900 ${cardVisible || visible ? 'reveal-visible' : ''
        }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {/* Icon */}
      <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:border-accent-500/30 group-hover:bg-accent-500/10">
        <Icon className="h-5 w-5 text-ink-200 transition-colors duration-500 group-hover:text-accent-400" />
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight text-white">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-300">
        {service.description}
      </p>

      {/* Hover arrow */}
      <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span>Learn More</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent-500 to-transparent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

