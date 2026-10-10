import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ── Background video ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.82) saturate(1.2)' }}
        >
          <source src="/Wildflowers_swaying_in_breeze_20261009072722.mp4" type="video/mp4" />
        </video>

        {/* Very light top vignette — keeps navbar area readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        {/* Bottom shadow fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
      </div>

      {/* ── Hero content — positioned at ~38% from top like the reference ── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4">

        {/*
          Spacer pushes content down past the navbar.
          Reference image: badge sits at ~28% viewport height.
          pt-[26vh] achieves this across screen sizes.
        */}
        <div className="flex flex-col items-center text-center" style={{ paddingTop: 'clamp(120px, 26vh, 220px)' }}>

          {/* ── Badge pill ─────────────────────────────────────────── */}
          {/*
            Reference: small pill, very light gray/white frosted background,
            thin border, small text, emoji at the end.
            Sits centered just above the headline.
          */}
          <div
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 shadow-sm backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="text-[13px] font-medium text-white/90 tracking-wide">
              AI Video Production Studio&nbsp;✦
            </span>
          </div>

          {/* ── Headline ───────────────────────────────────────────── */}
          {/*
            Reference: ONE visual line — light "Design" (font-light/300)
            immediately followed by bold "with ease." (font-bold/700).
            No line break. Very large. Pure white. Tight leading.
          */}
          <h1
            className="animate-fade-up font-display tracking-[-0.02em] text-black"
            style={{
              animationDelay: '0.15s',
              opacity: 0,
              animationFillMode: 'forwards',
              fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
              lineHeight: 1.06,
              fontWeight: 300,
            }}
          >
            {/* "Create with" — light */}
            <span style={{ fontWeight: 700 }}>Create with </span>
            {/* "AI." — bold, same size */}
            <span style={{ fontWeight: 700 }}>AI.</span>
          </h1>

          {/* ── Sub-copy ───────────────────────────────────────────── */}
          {/*
            Reference: two short centered lines, smaller text, white/75 opacity.
            "Design smarter with AI that understands you."
            "So you can take a breath."
          */}
          <p
            className="mt-5 animate-fade-up font-body text-black/80"
            style={{
              animationDelay: '0.28s',
              opacity: 0,
              animationFillMode: 'forwards',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              lineHeight: 1.65,
            }}
          >
            From concept to final frame, we craft cinematic AI videos<br />
            that make brands impossible to ignore.
          </p>

          {/* ── CTA row ────────────────────────────────────────────── */}
          {/*
            Reference layout (left → right):
            [  Get Started →  ]   Watch Demo
            White filled pill  |  plain text + no border
            They sit on the same horizontal baseline, gap ~24px.
          */}
          <div
            className="mt-9 flex animate-fade-up flex-row items-center justify-center gap-6"
            style={{ animationDelay: '0.42s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* White filled pill — "Get Started →" */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-black/15 transition-all duration-250 hover:-translate-y-px hover:bg-white/95 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
            </a>

            {/* Plain text "Watch Demo" — no box, no border */}
            <button className="inline-flex items-center gap-2 text-[14px] font-medium text-black/90 transition-all duration-250 hover:text-black">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 translate-x-px fill-white text-black" />
              </span>
              Watch Demo
            </button>
          </div>

        </div>{/* end content block */}
      </div>

      {/* ── Scroll line indicator ─────────────────────────────────── */}
      {/*<div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
        <div className="relative h-10 w-px overflow-hidden bg-white/20">
          <div
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent"
            style={{ animation: 'float 2s ease-in-out infinite' }}
          />
        </div>
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/35">
          Scroll
        </span>
      </div>*/}
    </section>
  );
}
