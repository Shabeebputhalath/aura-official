import { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useLiquidReveal } from '@/hooks/useLiquidReveal';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  useLiquidReveal({
    baseSrc:   '/after.jpg',
    brushSrc:  '/before.png',
    containerRef,
    canvasRef,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* z:0 — base image */}
      <img
        src="/after.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}
        draggable={false}
      />

      {/* z:1 — liquid canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* z:2 — gradient overlays */}
      <div
        aria-hidden="true"
        style={{ zIndex: 2 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        style={{ zIndex: 2 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent"
      />

      {/* z:10 — hero content — all black */}
      <div
        className="relative flex min-h-screen flex-col items-center justify-start px-4"
        style={{ zIndex: 10 }}
      >
        <div
          className="flex flex-col items-center text-center"
          style={{ paddingTop: 'clamp(120px, 26vh, 220px)' }}
        >

          {/* Badge pill — black border + black text */}
          <div
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-black/8 px-4 py-1.5 shadow-sm backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="text-[13px] font-medium text-black/80 tracking-wide">
              AI Video Production Studio&nbsp;✦
            </span>
          </div>

          {/* Headline — black */}
          <h1
            className="animate-fade-up font-display tracking-[-0.02em] text-black"
            style={{
              animationDelay: '0.15s',
              opacity: 0,
              animationFillMode: 'forwards',
              fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
              lineHeight: 1.06,
            }}
          >
            <span style={{ fontWeight: 550 }}>Design with </span>
            <span style={{ fontWeight: 900 }}>AURA.</span>
          </h1>

          {/* Sub-copy — black */}
          <p
            className="mt-5 animate-fade-up font-body text-black/65"
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

          {/* CTAs */}
          <div
            className="mt-9 flex animate-fade-up flex-row items-center justify-center gap-6"
            style={{ animationDelay: '0.42s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* Filled black pill */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-px hover:bg-ink-800 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Ghost black "Watch Demo" */}
            <button className="inline-flex items-center gap-2 text-[14px] font-medium text-black/80 transition-all duration-200 hover:text-black">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/25 bg-black/8 backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 translate-x-px fill-black text-black" />
              </span>
              Watch Demo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
