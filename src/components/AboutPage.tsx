import { ArrowUpRight, Check, X, Users, Film, Sparkles, Layers } from 'lucide-react';
import { useReveal, useCountUp } from '@/hooks/useReveal';

const teamMembers = [
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    description: 'Former commercial director turned AI storytelling pioneer. Leads creative vision across every project.',
    image: 'https://images.pexels.com/photos/1265718/pexels-photo-1265718.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Sofia Rivera',
    role: 'AI Director',
    description: 'Bridges the gap between technology and artistry. Directs AI generation like a cinematographer directs a camera.',
    image: 'https://images.pexels.com/photos/7389823/pexels-photo-7389823.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Daniel Park',
    role: 'Art Director',
    description: 'Obsessed with visual aesthetics. Ensures every frame meets the standard of fine-art photography.',
    image: 'https://images.pexels.com/photos/39350596/pexels-photo-39350596.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Amara Okafor',
    role: 'Motion Designer',
    description: 'Brings static AI imagery to life with motion, rhythm, and cinematic flow.',
    image: 'https://images.pexels.com/photos/36388512/pexels-photo-36388512.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Editor & Post-Production',
    description: 'Crafts the final cut. Where pacing, sound, and color converge into a finished film.',
    image: 'https://images.pexels.com/photos/19826583/pexels-photo-19826583.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Elena Volkov',
    role: 'Producer',
    description: 'Keeps every project on track. Manages timelines, client relationships, and creative deliverables.',
    image: 'https://images.pexels.com/photos/19080880/pexels-photo-19080880.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const principles = [
  {
    number: '01',
    title: 'IMAGINATION',
    description: 'We begin with ideas that don\'t fit inside conventional production limitations. Every project starts with a question: what would this look like if anything were possible?',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'TECHNOLOGY',
    description: 'We use the latest AI tools to turn ambitious concepts into visual reality. But technology is a tool — not the final product. It serves the story, not the other way around.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'CRAFT',
    description: 'Every frame is refined through human storytelling, direction, editing, and design. AI generates possibilities. We select, shape, and polish until the work feels intentional.',
    icon: Film,
  },
];

const capabilities = [
  'AI Film Production',
  'Commercials',
  'Brand Films',
  'Product Visualization',
  'AI Characters',
  'Virtual Worlds',
  'Motion Design',
  'Post-Production',
  'Social Content',
];

const traditionalPoints = [
  'Large crews and overhead',
  'Expensive location shoots',
  'Long production cycles',
  'Physical and logistical limitations',
];

const auraPoints = [
  'Rapid visual exploration',
  'Unlimited creative worlds',
  'Flexible, scalable production',
  'Human-directed AI filmmaking',
];

export default function AboutPage({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <AboutHero />
      <OurStory />
      <Philosophy />
      <Comparison />
      <CapabilitiesSection />
      <NumbersSection />
      <TeamSection />
      <AboutCTA onNavigateHome={onNavigateHome} />
    </div>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */

function AboutHero() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/32321598/pexels-photo-32321598.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: visible ? 'scale(1)' : 'scale(1.05)', transition: 'transform 2s ease-out' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[45%] h-96 w-96 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-4xl">
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-200">
              About AURA AI
            </span>
          </div>

          <h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            We Make Ideas
            <br />
            Look <span className="text-gradient-accent">Impossible.</span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            We combine artificial intelligence, filmmaking, design, and human creativity to
            create visual experiences beyond traditional production.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── OUR STORY ────────────────────────────────────────────────────────── */

function OurStory() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <div className="lg:col-span-7">
            <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
              Our Story
            </p>
            <h2
              className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              A New Kind of
              <br />
              <span className="text-gradient-accent">Production Studio.</span>
            </h2>

            <div className={`reveal mt-8 space-y-6 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              <p className="text-lg leading-relaxed text-ink-200">
                AI is changing filmmaking. Not by replacing creativity, but by removing the
                constraints that kept ideas trapped in pitch decks and storyboards. A concept
                that once required a crew of thirty, a location scout, and a six-week shoot can
                now be explored in an afternoon — and refined over a week instead of a season.
              </p>
              <p className="text-lg leading-relaxed text-ink-200">
                But the tool alone doesn't make the film. AURA AI was founded on a simple
                premise: AI generation without creative direction is just content. AI generation
                <em className="text-white"> with</em> creative direction is filmmaking.
              </p>
              <p className="text-lg leading-relaxed text-ink-200">
                We are directors, designers, editors, and technologists who happen to use AI
                as our primary production tool. We approach every project the way a film
                studio would — with creative briefs, storyboards, color scripts, sound design,
                and revision rounds. The difference is that our camera can go anywhere, our
                sets are unlimited, and our production cycle is measured in days, not months.
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <div className={`reveal relative aspect-[4/5] overflow-hidden border border-white/[0.06] transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
              <img
                src="https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Creative production"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-400">The Studio</p>
                <p className="mt-2 text-sm text-ink-100">Where AI meets creative direction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PHILOSOPHY ───────────────────────────────────────────────────────── */

function Philosophy() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Philosophy
          </p>
          <h2
            className={`reveal mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            Technology Creates Possibility.
            <br />
            <span className="text-gradient-accent">Creativity Creates Meaning.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className={`reveal group relative rounded-2xl border border-white/[0.06] bg-ink-850/40 p-8 backdrop-blur-sm transition-all duration-700 hover:border-white/[0.12] ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-white/[0.08] transition-colors duration-500 group-hover:text-accent-500/20">
                    {p.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent-500/20 bg-accent-500/10 text-accent-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── COMPARISON ───────────────────────────────────────────────────────── */

function Comparison() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            What Makes Us Different
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            A Different Way of
            <br />
            <span className="text-gradient-accent">Making Things.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Traditional */}
          <div
            className={`reveal rounded-2xl border border-white/[0.06] bg-ink-900/40 p-8 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-500">
              Traditional Production
            </p>
            <ul className="mt-8 space-y-5">
              {traditionalPoints.map((point) => (
                <li key={point} className="flex items-center gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-600 text-ink-500">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-base text-ink-400">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AURA AI */}
          <div
            className={`reveal relative rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/[0.06] to-transparent p-8 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-400">
                AURA AI
              </p>
            </div>
            <ul className="mt-8 space-y-5">
              {auraPoints.map((point) => (
                <li key={point} className="flex items-center gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-base text-white">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CAPABILITIES ─────────────────────────────────────────────────────── */

function CapabilitiesSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Capabilities
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            What We <span className="text-gradient-accent">Create.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {capabilities.map((cap, i) => (
            <span
              key={cap}
              className={`reveal rounded-full border border-white/[0.08] bg-ink-850/60 px-6 py-3 text-sm font-medium text-ink-200 backdrop-blur-sm transition-all duration-500 hover:border-accent-500/20 hover:bg-accent-500/5 hover:text-white ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NUMBERS ──────────────────────────────────────────────────────────── */

function NumbersSection() {
  const { ref, visible } = useReveal();

  const stats = [
    { value: 50, suffix: '+', label: 'Creative Projects' },
    { value: 100, suffix: '+', label: 'Films & Visuals' },
    { value: 10, suffix: '×', label: 'Faster Ideation' },
    { value: 0, suffix: '', label: 'Global Creative Reach', text: '∞' },
  ];

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, visible }: { stat: { value: number; suffix: string; label: string; text?: string }; index: number; visible: boolean }) {
  const { ref } = useReveal();
  const count = useCountUp(stat.value, 1800, visible);

  return (
    <div
      ref={ref}
      className={`reveal text-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="font-display text-5xl font-bold tracking-tight text-white lg:text-6xl">
        {stat.text ?? count}
        {stat.suffix && <span className="text-accent-400">{stat.suffix}</span>}
      </div>
      <div className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-ink-400">
        {stat.label}
      </div>
    </div>
  );
}

/* ── TEAM ─────────────────────────────────────────────────────────────── */

function TeamSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            The Studio
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            The People Behind
            <br />
            <span className="text-gradient-accent">the Frames.</span>
          </h2>
          <p
            className={`reveal mt-6 text-lg text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            A small team of directors, designers, and technologists who treat AI like a camera —
            a tool in service of a bigger vision.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className={`reveal group relative overflow-hidden border border-white/[0.06] bg-ink-850/40 transition-all duration-700 hover:border-white/[0.12] ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/20" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold tracking-tight text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-accent-400">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ────────────────────────────────────────────────────────── */

function AboutCTA({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/35161189/pexels-photo-35161189.jpeg?auto=compress&cs=tinysrgb&w=1920"
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
          Let's Create Something
          <br />
          <span className="text-gradient-accent">Nobody Has Seen Before.</span>
        </h2>
        <div className={`reveal mt-10 flex justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          <a href="#contact" onClick={onNavigateHome} className="btn-primary group text-base">
            <span>Start a Project</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

