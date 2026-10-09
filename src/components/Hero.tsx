import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* ── Background video ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.72) saturate(1.15)' }}
        >
          <source src="/Wildflowers_swaying_in_breeze_20261009072722.mp4" type="video/mp4" />
        </video>

        {/* Soft vignette — lighter so the video stays vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/35" />
        {/* Subtle purple/accent tint to tie into brand colour */}
        <div className="absolute inset-0 bg-accent-900/10 mix-blend-multiply" />
        {/* Bottom fade — only the last strip fades to site bg, grass stays visible */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
      </div>

      {/* ── Centered content ──────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 pt-36 text-center">

        {/* Badge pill — "We just raised 20M 🚀" style */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md animate-fade-down"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="text-sm font-medium text-white/90 tracking-wide">
            AI Video Production Studio&nbsp;✦
          </span>
        </div>

        {/* Headline — two lines, light + bold mix */}
        <h1
          className="animate-fade-up font-display leading-[1.08] tracking-tight text-white"
          style={{
            animationDelay: '0.2s',
            opacity: 0,
            animationFillMode: 'forwards',
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
          }}
        >
          <span className="font-light">Create with </span><span className="font-bold">AI.</span>
          <br />
          <span className="font-bold">Cinematically.</span>
        </h1>

        {/* Sub-copy — two-line centred, lighter weight */}
        <p
          className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/75 sm:text-lg animate-fade-up"
          style={{ animationDelay: '0.38s', opacity: 0, animationFillMode: 'forwards' }}
        >
          From concept to final frame, we craft cinematic AI videos that make
          <br className="hidden sm:block" />
          brands impossible to ignore.
        </p>

        {/* CTA row — filled pill + ghost text */}
        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up"
          style={{ animationDelay: '0.52s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {/* Filled pill */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl hover:shadow-black/25"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          {/* Ghost / text CTA */}
          <button className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="h-3 w-3 translate-x-px fill-white text-white" />
            </span>
            Watch Demo
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── //uppercase tracking-[0.3em] scroll*/}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <div className="relative h-11 w-px overflow-hidden bg-white/20">
          <div className="absolute inset-x-0 top-0 h-1/2 animate-[float_2s_ease-in-out_infinite] bg-gradient-to-b from-white/80 to-transparent" />
        </div>
        <span className="text-[10px] font-medium  text-white/40"></span> 
      </div>
    </section>
  );
}
