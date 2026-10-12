import { Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

const cols = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',   href: '#/about' },
      { label: 'Careers',    href: '#careers' },
      { label: 'FAQs',       href: '#faqs' },
      { label: 'Contact',    href: '#contact' },
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
      { label: 'hello@auraai.studio',  href: 'mailto:hello@auraai.studio' },
      { label: '+91 000 000 0000',     href: 'tel:+910000000000' },
      { label: 'Remote · Worldwide',   href: '#' },
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
    <footer className="relative overflow-hidden bg-ink-950">

      {/* ── 5-column link grid ────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-16 sm:px-12 lg:px-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {cols.map(col => (
            <div key={col.heading}>
              {/* Column heading */}
              <h4 className="mb-5 text-[15px] font-semibold text-white">
                {col.heading}
              </h4>
              {/* Links */}
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

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className="mt-14 border-t border-white/[0.08]" />

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Left — address + copyright */}
          <div className="space-y-1.5">
            <p className="text-[14px] leading-relaxed text-ink-200">
              AURA AI Studio · Kerala, India · Remote · Worldwide.
            </p>
            <p className="text-[13px] text-ink-400">
              © 2026 AURA AI. All rights reserved.
            </p>
          </div>

          {/* Right — social icon circles */}
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

      {/* ── Giant watermark ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-0 select-none overflow-hidden text-center font-display font-bold leading-none tracking-tight text-white/[0.04]"
        style={{
          fontSize:     'clamp(5rem, 17vw, 15rem)',
          marginTop:    '-0.05em',
          paddingBottom:'0.05em',
          letterSpacing:'-0.02em',
        }}
      >
        AURA AI
      </div>
    </footer>
  );
}
