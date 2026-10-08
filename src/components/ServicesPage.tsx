import { useState } from 'react';
import { ArrowUpRight, Plus, Minus, Search, Compass, Lightbulb, Clapperboard, Wand2, Send } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Service {
  number: string;
  title: string;
  category: string;
  description: string;
  items: string[];
  image: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'AI COMMERCIALS',
    category: 'Commercials',
    description: 'Create cinematic advertisements that feel like blockbuster film moments. We direct AI to produce product spots, brand campaigns, and launch films with the polish of high-end commercial production.',
    items: ['Products', 'Brands', 'Campaigns', 'Launches'],
    image: 'https://images.pexels.com/photos/9703183/pexels-photo-9703183.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '02',
    title: 'AI BRAND FILMS',
    category: 'Brand Films',
    description: 'Build emotional and cinematic stories that communicate brand identity. These are films — not ads. They live on your homepage, in your presentations, and at the top of your sales funnel.',
    items: ['Brand Identity', 'Emotional Storytelling', 'Company Films', 'Heritage Films'],
    image: 'https://images.pexels.com/photos/17486300/pexels-photo-17486300.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '03',
    title: 'PRODUCT VIDEOS',
    category: 'Product',
    description: 'Create premium product visuals without the limitations of traditional physical production. No studio rentals, no shipping logistics — just your product in any environment you can imagine.',
    items: ['Product Demos', 'Lifestyle Films', 'Unboxing Videos', '360° Showcases'],
    image: 'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '04',
    title: 'SOCIAL MEDIA CONTENT',
    category: 'Social',
    description: 'Create high-impact AI videos optimized for every platform. We produce content designed to stop the scroll — vertically, horizontally, and everything in between.',
    items: ['Instagram', 'TikTok', 'YouTube', 'Shorts & Reels'],
    image: 'https://images.pexels.com/photos/6954104/pexels-photo-6954104.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '05',
    title: 'AI MUSIC VIDEOS',
    category: 'Music',
    description: 'Create surreal, cinematic, and experimental visuals for artists and musicians. Every beat gets its own world. Every lyric gets its own image.',
    items: ['Music Videos', 'Visual Albums', 'Lyric Videos', 'Live Visuals'],
    image: 'https://images.pexels.com/photos/7239914/pexels-photo-7239914.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '06',
    title: 'AI CHARACTERS & WORLDS',
    category: 'Characters',
    description: 'Create original characters, digital environments, and fantasy worlds. Build the cast, the sets, and the universe — all without a single physical constraint.',
    items: ['Original Characters', 'Digital Environments', 'Fantasy Worlds', 'Sci-Fi Environments', 'Virtual Locations'],
    image: 'https://images.pexels.com/photos/30547584/pexels-photo-30547584.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '07',
    title: 'CONCEPT & PRE-VISUALIZATION',
    category: 'Pre-Production',
    description: 'Turn scripts and ideas into visual concepts, storyboards, and cinematic previews before production. See your film before you make it.',
    items: ['Script to Visual', 'Storyboards', 'Cinematic Previews', 'Concept Art'],
    image: 'https://images.pexels.com/photos/8035294/pexels-photo-8035294.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    number: '08',
    title: 'POST-PRODUCTION',
    category: 'Post',
    description: 'Provide full post-production services — from raw footage to final delivery. Editing, color, sound, motion graphics, and everything in between.',
    items: ['Editing', 'Color Grading', 'Sound Design', 'Motion Graphics', 'Compositing', 'Upscaling', 'Final Formatting'],
    image: 'https://images.pexels.com/photos/39694504/pexels-photo-39694504.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const processSteps = [
  { number: '01', title: 'DISCOVER', description: 'We start with a conversation. What are you building? Who is it for? What should it feel like?', icon: Search },
  { number: '02', title: 'CONCEPT', description: 'We translate your vision into creative direction — mood boards, visual references, and a production plan.', icon: Compass },
  { number: '03', title: 'CREATE', description: 'AI generation begins. We direct, iterate, and generate visual material frame by frame.', icon: Lightbulb },
  { number: '04', title: 'REFINE', description: 'Editing, color grading, sound design, and motion graphics. The raw material becomes a film.', icon: Clapperboard },
  { number: '05', title: 'DELIVER', description: 'Final delivery in every format you need. Plus revision rounds to get it exactly right.', icon: Send },
];

const industries = [
  'Technology', 'Fashion', 'Automotive', 'Luxury',
  'Food & Beverage', 'Real Estate', 'Entertainment', 'E-commerce',
  'Startups',
];

const faqs = [
  {
    question: 'How long does production take?',
    answer: 'Most projects are delivered within 5–14 days depending on complexity. A single AI commercial can take as little as 3 days, while a multi-film campaign may take 2–3 weeks. We provide a specific timeline in your production plan.',
  },
  {
    question: 'How does pricing work?',
    answer: 'Pricing is project-based and depends on the number of videos, length, complexity, and deliverables. Our plans start at $499 for a single AI video and scale up to custom campaign pricing. You can view our plans on the Pricing page.',
  },
  {
    question: 'How many revisions are included?',
    answer: 'Each plan includes a set number of revision rounds (1–3 depending on tier). Additional revisions are available at an hourly rate. We aim to get it right in the concept stage so revisions are minimal.',
  },
  {
    question: 'Is all the content AI-generated?',
    answer: 'The visual material is primarily AI-generated under human creative direction. We combine AI generation with traditional post-production techniques — editing, color grading, sound design, and motion graphics — to deliver a polished final product.',
  },
  {
    question: 'Can you work with our existing brand assets?',
    answer: 'Yes. We can incorporate your brand colors, logos, fonts, and visual guidelines into the production. Share your brand kit and we will ensure the final films are consistent with your identity.',
  },
  {
    question: 'What video formats do you deliver?',
    answer: 'We deliver in any format you need — 16:9 for YouTube and web, 9:16 for Stories and TikTok, 1:1 for feed posts, and custom ratios for out-of-home or presentation use. All delivered in 4K or your preferred resolution.',
  },
  {
    question: 'Can you handle custom or unusual projects?',
    answer: 'Absolutely. If your project doesn\'t fit into a standard category, reach out through the contact form. We take on experimental, one-of-a-kind, and R&D projects regularly.',
  },
];

export default function ServicesPage({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <ServicesHero />
      <ServicesOverview />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
      <ServicesCTA onNavigateHome={onNavigateHome} />
    </div>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */

function ServicesHero() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/38059001/pexels-photo-38059001.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: visible ? 'scale(1)' : 'scale(1.05)', transition: 'transform 2s ease-out' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[18%] top-[40%] h-96 w-96 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-4xl">
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-200">Our Services</span>
          </div>

          <h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            From First Idea
            <br />
            to <span className="text-gradient-accent">Final Frame.</span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            We combine AI technology, cinematic storytelling, and creative direction to
            produce visual content for ambitious brands.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES OVERVIEW ────────────────────────────────────────────────── */

function ServicesOverview() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className="reveal section-label">Service Menu</p>
          <h2 className="reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ transitionDelay: '100ms' }}>
            Everything We <span className="text-gradient-accent">Produce.</span>
          </h2>
          <p className="reveal mt-6 text-lg text-ink-200" style={{ transitionDelay: '200ms' }}>
            Eight production capabilities, each led by creative direction and powered by AI.
            Click any service to explore the details.
          </p>
        </div>

        <div className="space-y-3">
          {services.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index, isExpanded, onToggle }: { service: Service; index: number; isExpanded: boolean; onToggle: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-2xl border bg-ink-850/40 backdrop-blur-sm transition-all duration-500 ${visible ? 'reveal-visible' : ''} ${isExpanded ? 'border-accent-500/20' : 'border-white/[0.06] hover:border-white/[0.12]'
        }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-6 p-6 text-left lg:p-8"
      >
        {/* Number */}
        <span className={`hidden font-display text-4xl font-bold transition-colors duration-500 sm:block lg:text-5xl ${isExpanded ? 'text-accent-400/40' : 'text-white/[0.08] group-hover:text-white/[0.15]'}`}>
          {service.number}
        </span>

        {/* Title + category */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-accent-400">{service.category}</span>
          </div>
          <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {service.title}
          </h3>
          {!isExpanded && (
            <p className="mt-2 hidden max-w-2xl truncate text-sm text-ink-400 sm:block">
              {service.description}
            </p>
          )}
        </div>

        {/* Toggle icon */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isExpanded ? 'border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-300 group-hover:text-white'}`}>
          {isExpanded ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="animate-fade-up px-6 pb-8 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Description + items */}
            <div>
              <p className="text-base leading-relaxed text-ink-200">{service.description}</p>
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">What We Produce</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-ink-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <a href="#contact" className="btn-primary group">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-video overflow-hidden border border-white/[0.06]">
              <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PROCESS ──────────────────────────────────────────────────────────── */

function ProcessSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>How We Work</p>
          <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            Five Steps from
            <br />
            <span className="text-gradient-accent">Idea to Delivery.</span>
          </h2>
        </div>

        {/* Process line */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`reveal relative transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Icon circle */}
                  <div className="relative z-10 mb-6 flex h-22 w-22 items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-ink-850 text-accent-400 transition-all duration-500 hover:border-accent-500/30 hover:bg-accent-500/5">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="font-display text-sm font-bold text-accent-400">{step.number}</span>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{step.description}</p>

                  {/* Arrow connector */}
                  {i < processSteps.length - 1 && (
                    <div className="absolute right-[-16px] top-[36px] hidden text-ink-600 lg:block">
                      <ArrowUpRight className="h-4 w-4 rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── INDUSTRIES ───────────────────────────────────────────────────────── */

function IndustriesSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>Industries</p>
          <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            Who We Work <span className="text-gradient-accent">With.</span>
          </h2>
          <p className={`reveal mt-6 text-lg text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            We produce visual content across industries — from tech startups to luxury fashion houses.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {industries.map((industry, i) => (
            <span
              key={industry}
              className={`reveal group rounded-full border border-white/[0.08] bg-ink-850/60 px-7 py-3.5 text-base font-medium text-ink-200 backdrop-blur-sm transition-all duration-500 hover:border-accent-500/20 hover:bg-accent-500/5 hover:text-white ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */

function FAQSection() {
  const { ref, visible } = useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-16">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>FAQ</p>
          <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            Questions, <span className="text-gradient-accent">Answered.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal overflow-hidden rounded-xl border bg-ink-850/40 transition-all duration-500 ${visible ? 'reveal-visible' : ''} ${isOpen ? 'border-accent-500/20' : 'border-white/[0.06]'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-display text-base font-semibold text-white lg:text-lg">{faq.question}</span>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-300'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      {isOpen && (
        <div className="animate-fade-up px-6 pb-6">
          <p className="text-base leading-relaxed text-ink-200">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

/* ── FINAL CTA ────────────────────────────────────────────────────────── */

function ServicesCTA({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/36356065/pexels-photo-36356065.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:px-10">
        <h2 className={`reveal font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          Have a Story to <span className="text-gradient-accent">Tell?</span>
        </h2>
        <p className={`reveal mt-6 text-lg text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          Tell us what you're imagining. We'll turn it into a production plan.
        </p>
        <div className={`reveal mt-10 flex justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <a href="#contact" onClick={onNavigateHome} className="btn-primary group text-base">
            <span>Start Your Project</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

