import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative border-y border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: content */}
          <div ref={ref} className="flex flex-col justify-center">
            <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
              About the Studio
            </p>
            <h2
              className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              We Make Ideas
              <br />
              Look <span className="text-gradient-accent">Impossible.</span>
            </h2>

            <p
              className={`reveal mt-8 text-lg leading-relaxed text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              AURA AI is a creative technology studio where artificial intelligence
              meets filmmaking. We combine AI, film, design, technology, and
              storytelling to create visual experiences that would traditionally
              require large production teams and budgets.
            </p>

            <p
              className={`reveal mt-4 text-lg leading-relaxed text-ink-300 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              Our team of directors, designers, and AI specialists work together to
              craft every project with intention — from the first concept sketch to
              the final color grade.
            </p>

            <div
              className={`reveal mt-10 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <a href="#contact" className="btn-secondary group">
                <span>Meet the Studio</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right: cinematic image */}
          <div className={`reveal-scale relative ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.06]">
              <img
                src="https://images.pexels.com/photos/23384400/pexels-photo-23384400.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="AURA AI studio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block">
              <div className="glass-dark rounded-xl p-5">
                <div className="font-display text-3xl font-bold text-white">2024</div>
                <div className="mt-1 text-xs text-ink-300">Studio Founded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

