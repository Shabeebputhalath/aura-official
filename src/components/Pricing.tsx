import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/* ── Plans data — AURA AI content ──────────────────────────────── */
const plans = [
  {
    tier:     'STARTER',
    price:    { monthly: '$499', yearly: '$399' },
    billing:  { monthly: 'Billed per project', yearly: 'Billed yearly' },
    features: [
      '1 AI video',
      'Up to 30 seconds',
      'Creative concept',
      'AI generation',
      'Basic editing',
      '1 revision',
      'Social media delivery',
    ],
    cta:     'Get Started',
    popular: false,
  },
  {
    tier:     'STUDIO',
    price:    { monthly: '$1,499', yearly: '$1,199' },
    billing:  { monthly: 'Billed Monthly', yearly: 'Billed Yearly' },
    features: [
      'Up to 3 AI videos',
      'Up to 60 seconds each',
      'Creative direction',
      'Storyboarding',
      'Advanced AI generation',
      'Cinematic editing',
      'Sound design',
      '2 revisions',
      'Multiple aspect ratios',
    ],
    cta:     'Get Started',
    popular: true,
  },
  {
    tier:     'SIGNATURE',
    price:    { monthly: '$3,999+', yearly: '$3,299+' },
    billing:  { monthly: 'Billed Monthly', yearly: 'Billed Yearly' },
    features: [
      'Custom campaign',
      'Multiple videos',
      'Full creative direction',
      'Advanced cinematic AI',
      'Custom characters/worlds',
      'Professional sound design',
      'Motion graphics',
      'Color grading',
      'Multiple revisions',
      'Dedicated support',
    ],
    cta:     'Get Started',
    popular: false,
  },
];

/* ── Toggle switch component ────────────────────────────────────── */
function Toggle({ yearly, onToggle }: { yearly: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span style={{ fontSize: 13, color: yearly ? 'rgba(255,255,255,0.45)' : '#fff', fontWeight: 500 }}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={yearly}
        style={{
          position:     'relative',
          width:        44,
          height:       24,
          borderRadius: 9999,
          background:   '#7c5cff',
          border:       'none',
          cursor:       'pointer',
          transition:   'background 0.2s',
          flexShrink:   0,
        }}
      >
        <span
          style={{
            position:     'absolute',
            top:          3,
            left:         yearly ? 23 : 3,
            width:        18,
            height:       18,
            borderRadius: 9999,
            background:   '#fff',
            transition:   'left 0.2s ease',
            display:      'block',
          }}
        />
      </button>
      <span style={{ fontSize: 13, color: yearly ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
        Yearly
      </span>
    </div>
  );
}

/* ── Feature row ────────────────────────────────────────────────── */
function Feature({ text, popular }: { text: string; popular: boolean }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      {/* Outline circle check icon */}
      <svg
        width="16" height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ flexShrink: 0, marginTop: 2 }}
      >
        <circle cx="8" cy="8" r="7" stroke={popular ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)'} strokeWidth="1.2" />
        <path d="M5 8l2 2 4-4" stroke={popular ? '#000' : 'rgba(255,255,255,0.7)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 13, lineHeight: 1.55, color: popular ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)' }}>
        {text}
      </span>
    </li>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function Pricing() {
  const { ref, visible } = useReveal();
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      style={{ background: '#0a0a0a', padding: 'clamp(4rem,8vw,7rem) 0' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div ref={ref} style={{ marginBottom: '2.5rem' }}>
          <h2
            className={`reveal transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{
              fontFamily:    '"Figtree", sans-serif',
              fontWeight:    700,
              fontSize:      'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         '#ffffff',
              margin:        0,
            }}
          >
            Affordable Plans for<br />
            <span style={{ color: '#7c5cff' }}>Every Need</span>
          </h2>

          <p
            className={`reveal transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{
              marginTop:   '1rem',
              fontSize:    13,
              lineHeight:  1.7,
              color:       'rgba(255,255,255,0.45)',
              maxWidth:    '52ch',
              transitionDelay: '80ms',
            }}
          >
            Choose the perfect plan for your AI video projects, from startups to enterprises.
            Our pricing tiers are designed to offer flexibility and value, ensuring you get
            the most out of our cinematic AI production.
          </p>
        </div>

        {/* ── Toggle ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '2rem' }}>
          <Toggle yearly={yearly} onToggle={() => setYearly(v => !v)} />
        </div>

        {/* ── Cards grid ─────────────────────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap:                 '1rem',
            alignItems:          'stretch',
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {plans.map((plan, i) => (
            <PlanCard key={plan.tier} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────────────── */}
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          Need something completely custom? We can build a production package around your campaign.
        </p>
      </div>
    </section>
  );
}

/* ── Individual card ────────────────────────────────────────────── */
function PlanCard({
  plan, yearly, index,
}: {
  plan: typeof plans[number];
  yearly: boolean;
  index: number;
}) {
  const { ref, visible } = useReveal();
  const price   = yearly ? plan.price.yearly   : plan.price.monthly;
  const billing = yearly ? plan.billing.yearly : plan.billing.monthly;

  /* Colour tokens per card type */
  const bg            = plan.popular ? '#7c5cff'              : '#111114';
  const border        = plan.popular ? 'transparent'          : '1px solid rgba(255,255,255,0.08)';
  const tierColor     = plan.popular ? 'rgba(0,0,0,0.55)'     : 'rgba(255,255,255,0.35)';
  const priceColor    = plan.popular ? '#000000'               : '#ffffff';
  const billingColor  = plan.popular ? 'rgba(0,0,0,0.6)'      : 'rgba(255,255,255,0.4)';
  const dividerColor  = plan.popular ? 'rgba(0,0,0,0.15)'     : 'rgba(255,255,255,0.07)';

  return (
    <div
      ref={ref}
      className={`reveal transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
      style={{
        transitionDelay:  `${index * 100}ms`,
        background:       bg,
        border:           border,
        borderRadius:     '1rem',
        padding:          '1.75rem 1.5rem 1.5rem',
        display:          'flex',
        flexDirection:    'column',
        position:         'relative',
        /* Popular card slightly taller via extra top padding */
        paddingTop:       plan.popular ? '2rem' : '1.75rem',
      }}
    >
      {/* Tier label */}
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: tierColor }}>
        {plan.tier}
      </span>

      {/* Price */}
      <div style={{ marginTop: '1rem' }}>
        <span
          style={{
            fontFamily:    '"Figtree", sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(2rem, 4vw, 2.75rem)',
            lineHeight:    1,
            letterSpacing: '-0.03em',
            color:         priceColor,
          }}
        >
          {price}
          <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: 0 }}>/m</span>
        </span>
      </div>

      {/* Billing line */}
      <p style={{ marginTop: '0.4rem', fontSize: 12, color: billingColor }}>{billing}</p>

      {/* Divider */}
      <div style={{ height: 1, background: dividerColor, margin: '1.25rem 0' }} />

      {/* Features */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, padding: 0, margin: 0, listStyle: 'none' }}>
        {plan.features.map(f => (
          <Feature key={f} text={f} popular={plan.popular} />
        ))}
      </ul>

      {/* CTA button */}
      <button
        onClick={() => { window.location.hash = '/contact'; }}
        style={{
          marginTop:    '1.75rem',
          width:        '100%',
          padding:      '0.75rem',
          borderRadius: '0.5rem',
          fontSize:     13,
          fontWeight:   500,
          cursor:       'pointer',
          transition:   'opacity 0.2s, transform 0.2s',
          /* Popular = solid black; others = ghost */
          background:   plan.popular ? '#000000'    : 'transparent',
          color:        plan.popular ? '#ffffff'    : plan.tier === 'STARTER' ? 'rgba(255,255,255,0.6)' : '#7c5cff',
          border:       plan.popular ? 'none'       : `1px solid ${plan.tier === 'STARTER' ? 'rgba(255,255,255,0.15)' : 'rgba(124,92,255,0.4)'}`,
        }}
        onMouseEnter={e => { (e.currentTarget).style.opacity = '0.82'; }}
        onMouseLeave={e => { (e.currentTarget).style.opacity = '1'; }}
      >
        {plan.cta}
      </button>
    </div>
  );
}
