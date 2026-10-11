import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Capability } from '@/lib/supabase';
import { capabilities as staticCaps } from '@/data/content';

// Fallback static data (image-only, no video)
const fallback: Capability[] = staticCaps.map((c, i) => ({
  id: String(i),
  label: c.label,
  image_url: c.image,
  video_url: null,
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
        <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
          {doubled.map((cap, i) => (
            <ReelCard key={`${cap.id}-${i}`} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Single reel card ──────────────────────────────────────────────────────── */
function ReelCard({ cap }: { cap: Capability }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const hasVideo = Boolean(cap.video_url);

  function handleMouseEnter() {
    setHovered(true);
    if (hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {/* autoplay blocked — silent */});
    }
  }

  function handleMouseLeave() {
    setHovered(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className="group relative w-52 shrink-0 overflow-hidden border border-white/[0.06] sm:w-60 cursor-pointer"
      style={{ aspectRatio: '9 / 16' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Poster image (always rendered, fades out when video plays) ── */}
      <img
        src={cap.image_url}
        alt={cap.label}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
        style={{
          opacity: hasVideo && hovered && videoReady ? 0 : 1,
          transform: !hasVideo && hovered ? 'scale(1.08)' : 'scale(1)',
        }}
        loading="lazy"
      />

      {/* ── Video (only rendered if video_url exists) ── */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={cap.video_url!}
          poster={cap.image_url || undefined}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered && videoReady ? 1 : 0 }}
        />
      )}

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />

      {/* ── Play indicator pill — shown on hover for video cards ── */}
      {hasVideo && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ opacity: hovered ? 0 : 1, transform: hovered ? 'translate(-50%,-50%) scale(0.8)' : 'translate(-50%,-50%) scale(1)' }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md">
            <svg className="h-4 w-4 translate-x-px fill-white text-white" viewBox="0 0 16 16">
              <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
            </svg>
          </div>
        </div>
      )}

      {/* ── Label ── */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="font-display text-sm font-semibold tracking-tight text-white drop-shadow-sm">
          {cap.label}
        </span>
      </div>

      {/* ── Hover ring ── */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 ring-1 ring-inset ring-accent-500/30" />
      </div>
    </div>
  );
}
