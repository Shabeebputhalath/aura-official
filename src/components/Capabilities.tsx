import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Capability } from '@/lib/supabase';
import { capabilities as staticCaps } from '@/data/content';

// Fallback static data shaped to match the DB type
const fallback: Capability[] = staticCaps.map((c, i) => ({
  id: String(i),
  label: c.label,
  image_url: c.image,
  sort_order: i + 1,
  is_active: true,
  created_at: '',
  updated_at: '',
}));

export default function Capabilities() {
  const { ref, visible } = useReveal();
  const [items, setItems] = useState<Capability[]>(fallback);

  useEffect(() => {
    supabase
      .from('capabilities')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setItems(data);
      });
  }, []);

  // Double the list for the infinite scroll effect
  const doubled = [...items, ...items];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={ref} className="mb-16 max-w-3xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Creative Capabilities
          </p>
          <h2
            className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            Anything you can
            <br />
            <span className="text-gradient-accent">imagine, we can film.</span>
          </h2>
        </div>
      </div>

      {/* Infinite scroll gallery */}
      <div className="relative mask-fade-x">
        <div className="flex gap-5 animate-scroll-x" style={{ width: 'max-content' }}>
          {doubled.map((cap, i) => (
            <div
              key={`${cap.id}-${i}`}
              className="group relative w-56 shrink-0 overflow-hidden border border-white/[0.06] sm:w-64"
              style={{ aspectRatio: '9 / 16' }}
            >
              <img
                src={cap.image_url}
                alt={cap.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-display text-sm font-semibold tracking-tight text-white">
                  {cap.label}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
