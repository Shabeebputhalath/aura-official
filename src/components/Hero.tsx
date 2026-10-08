import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/35161171/pexels-photo-35161171.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: 'scale(1.05)' }}
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      {/* Floating light orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[30%] h-96 w-96 rounded-full bg-accent-600/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-[15%] top-[50%] h-80 w-80 rounded-full bg-accent-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[40%] h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-200">
              AI Video Production Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            AI-Powered Films.
            <br />
            <span className="text-gradient-accent">Human-Level Creativity.</span>
          </h1>

          {/* Supporting text */}
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            From concept to final frame, we create cinematic AI videos that make
            brands impossible to ignore.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <a href="#contact" className="btn-primary group">
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#work" className="btn-secondary group">
              <Play className="h-4 w-4 fill-current" />
              <span>Explore Our Work</span>
            </a>
          </div>

          {/* Credibility indicators */}
          <div
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-ink-300 animate-fade-up"
            style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {['AI Films', 'Commercials', 'Product Videos', 'Social Content'].map((item, i) => (
              <span key={item} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-ink-500" />}
                <span className="transition-colors duration-300 hover:text-white">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-400">Scroll</span>
        <div className="relative h-12 w-px overflow-hidden bg-ink-700">
          <div className="absolute inset-x-0 top-0 h-1/2 animate-[float_2s_ease-in-out_infinite] bg-gradient-to-b from-accent-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}

