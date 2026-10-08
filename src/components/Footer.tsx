import { Instagram, Youtube, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  { label: 'Work', href: '#/work' },
  { label: 'Services', href: '#/services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#/about' },
  { label: 'Contact', href: '#/contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'X', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="group flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 opacity-80" />
                <div className="absolute inset-[2px] rounded-full bg-ink-950" />
                <div className="relative h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                AURA<span className="text-accent-400"> AI</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              AI-powered cinematic production for brands, creators, and ambitious
              ideas.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-ink-300 transition-all duration-300 hover:border-accent-500/30 hover:bg-accent-500/10 hover:text-accent-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-200 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
              Contact
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3 text-sm text-ink-200">
                <Mail className="h-4 w-4 text-ink-400" />
                <span>hello@auraai.studio</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-200">
                <MapPin className="h-4 w-4 text-ink-400" />
                <span>Remote · Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-ink-400">© 2026 AURA AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-ink-400 transition-colors duration-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-ink-400 transition-colors duration-300 hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
