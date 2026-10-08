import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/18545013/pexels-photo-18545013.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:px-10">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
          Your Next Campaign
          <br />
          Could Look Like <span className="text-gradient-accent">This.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-200 sm:text-xl">
          Let's create something people haven't seen before.
        </p>
        <div className="mt-10 flex justify-center">
          <a href="#contact" className="btn-primary group text-base">
            <span>Start Your Project</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

