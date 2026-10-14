import {
  Film, Clapperboard, Package, Smartphone,
  Music, Lightbulb, Users, Scissors,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { services } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Film, Clapperboard, Package, Smartphone,
  Music, Lightbulb, Users, Scissors,
};

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="services"
      style={{
        background: '#050507',
        padding: 'clamp(4rem,8vw,7rem) 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div ref={ref} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)', maxWidth: '36rem' }}>
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            What We Create
          </p>
          <h2
            className={`reveal mt-6 font-display font-bold leading-tight tracking-tight text-white transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', transitionDelay: '80ms' }}
          >
            Full-service AI{' '}
            <span className="text-gradient-accent">video production.</span>
          </h2>
        </div>

        {/* ── Grid ───────────────────────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap:                 '1rem',
          }}
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Film;
            return (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                Icon={Icon}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Single service card — cloned from reference ─────────────────── */
function ServiceCard({
  title, description, Icon, index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
      style={{
        transitionDelay: `${(index % 4) * 90}ms`,
        position:        'relative',
        borderRadius:    '1rem',
        padding:         '1.75rem 1.5rem 1.75rem',
        display:         'flex',
        flexDirection:   'column',
        gap:             '1.1rem',
        overflow:        'hidden',
        cursor:          'default',

        /* Deep ink card background — site palette */
        background:   'linear-gradient(145deg, #0e0e14 0%, #0a0a0f 100%)',

        /* Subtle accent border */
        border:       '1px solid rgba(124,92,255,0.1)',

        /* Faint inner accent glow at bottom-right */
        boxShadow:    'inset 0 -40px 60px rgba(124,92,255,0.05), inset 40px 0 60px rgba(124,92,255,0.03)',
      }}
    >
      {/* ── Icon box ─────────────────────────────────────────── */}
      {/*
        Reference: square rounded tile, slightly lighter navy,
        blue-purple accent icon with sparkle/grid shape
      */}
      <div
        style={{
          width:           52,
          height:          52,
          borderRadius:    '0.65rem',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
          background:      'linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(107,76,245,0.08) 100%)',
          border:          '1px solid rgba(124,92,255,0.2)',
          /* Accent glow behind icon */
          boxShadow:       '0 0 16px rgba(124,92,255,0.18)',
        }}
      >
        <Icon
          size={22}
          style={{
            color: '#a89aff',     /* accent-300 — site palette */
            filter: 'drop-shadow(0 0 6px rgba(124,92,255,0.6))',
          }}
        />
      </div>

      {/* ── Title ────────────────────────────────────────────── */}
      <h3
        style={{
          fontFamily:    '"Figtree", sans-serif',
          fontWeight:    600,
          fontSize:      '1.05rem',
          lineHeight:    1.3,
          letterSpacing: '-0.01em',
          color:         '#ffffff',
          margin:        0,
        }}
      >
        {title}
      </h3>

      {/* ── Description ──────────────────────────────────────── */}
      <p
        style={{
          fontFamily: '"Figtree", sans-serif',
          fontWeight: 400,
          fontSize:   '13px',
          lineHeight: 1.65,
          color:      'rgba(180,174,230,0.6)',
          margin:     0,
        }}
      >
        {description}
      </p>

      {/* ── Subtle corner glow ───────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          top:          0,
          right:        0,
          width:        80,
          height:       80,
          borderRadius: '0 1rem 0 80px',
          background:   'radial-gradient(circle at top right, rgba(124,92,255,0.1), transparent 70%)',
          pointerEvents:'none',
        }}
      />
    </div>
  );
}
