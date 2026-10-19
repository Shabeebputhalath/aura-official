import { Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

const cols = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  href: '#/about' },
      { label: 'Careers',   href: '#careers' },
      { label: 'FAQs',      href: '#faqs' },
      { label: 'Contact',   href: '#contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'AI Commercials', href: '#/services' },
      { label: 'Brand Films',    href: '#/services' },
      { label: 'Product Videos', href: '#/services' },
      { label: 'Social Content', href: '#/services' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog',         href: '#blog' },
      { label: 'Newsletter',   href: '#newsletter' },
      { label: 'Case Studies', href: '#/work' },
      { label: 'White Paper',  href: '#whitepaper' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy',           href: '#privacy' },
      { label: 'Security',          href: '#security' },
      { label: 'Terms of Use',      href: '#terms' },
      { label: 'Acceptance Policy', href: '#policy' },
      { label: 'Cookies',           href: '#cookies' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'hello@auraai.studio', href: 'mailto:hello@auraai.studio' },
      { label: '+91 000 000 0000',    href: 'tel:+910000000000' },
      { label: 'Remote · Worldwide',  href: '#' },
    ],
  },
];

const socials = [
  { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
  { Icon: Twitter,   label: 'X',         href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Youtube,   label: 'YouTube',   href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0812 0%, #0d0a1a 40%, #080610 100%)' }}>

      {/* ── Purple shadow glows ───────────────────────────────────
          Two layered radial blooms using the site accent palette.
          Positioned behind everything (z-0) near the watermark.   */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Primary large bloom — centre-bottom */}
        <div
          className="absolute"
          style={{
            bottom:  '-10%',
            left:    '50%',
            transform: 'translateX(-50%)',
            width:   '900px',
            height:  '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(107,76,245,0.28) 0%, rgba(124,92,255,0.12) 45%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Secondary tighter bloom — slightly left */}
        <div
          className="absolute"
          style={{
            bottom:  '-5%',
            left:    '38%',
            transform: 'translateX(-50%)',
            width:   '500px',
            height:  '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(143,125,255,0.22) 0%, rgba(107,76,245,0.08) 60%, transparent 80%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── 5-column link grid ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-16 sm:px-12 lg:px-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="mb-5 text-[15px] font-semibold text-white">
                {col.heading}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-ink-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="mt-14 border-t border-white/[0.08]" />

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-[14px] leading-relaxed text-ink-200">
              AURA AI Studio · Kerala, India · Remote · Worldwide.
            </p>
            <p className="text-[13px] text-ink-400">
              © 2026 AURA AI. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-ink-300 transition-all duration-200 hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-accent-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant watermark ──────────────────────────────────────────
          Clipped at the bottom exactly like the reference image.
          Uses a subtle accent purple tint to catch the glow.        */}
      <div
        aria-hidden="true"
        className="relative z-[1] select-none whitespace-nowrap text-center font-display font-bold leading-none tracking-tight"
        style={{
          fontSize:      'clamp(5.5rem, 19vw, 17rem)',
          letterSpacing: '-0.03em',
          color:         'rgba(124,92,255,0.13)',
          marginTop:     '0.1em',
          paddingBottom: '1.5rem',
          overflow:      'visible',
        }}
      >
        AURA AI
      </div>
    </footer>
  );
}
