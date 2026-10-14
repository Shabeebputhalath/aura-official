import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Capability } from '@/lib/supabase';
import { capabilities as staticCaps } from '@/data/content';

/* ── Fallback static data ─────────────────────────────────────────────────── */
const fallback: Capability[] = staticCaps.map((c, i) => ({
  id: String(i),
  label: c.label,
  image_url: c.image,
  video_url: null,
  embed_code: null,
  sort_order: i + 1,
  is_active: true,
  created_at: '',
  updated_at: '',
}));

/* ── Extract & enhance src from a Pinterest <iframe> embed code ───────────── */
function buildPinterestSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let src = '';
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  if (match) src = match[1];
  else if (trimmed.startsWith('http')) src = trimmed;
  else return null;

  // Append autoplay=1 so Pinterest plays the video automatically
  try {
    const url = new URL(src);
    url.searchParams.set('autoplay', '1');
    return url.toString();
  } catch {
    return src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
  }
}

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
            Our Projects
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

      {/* ── Infinite scroll gallery ──────────────────────────────── */}
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

/* ── Single reel card ─────────────────────────────────────────────────────── */
function ReelCard({ cap }: { cap: Capability }) {
  const embedSrc    = cap.embed_code ? buildPinterestSrc(cap.embed_code) : null;
  const hasEmbed    = Boolean(embedSrc);
  const hasVideo    = Boolean(cap.video_url) && !hasEmbed;
  const hasFallback = !hasEmbed && !hasVideo;

  return (
    <div
      className="group relative w-52 shrink-0 overflow-hidden border border-white/[0.06] sm:w-60"
      style={{ aspectRatio: '9 / 16' }}
    >
      {/* ── Pinterest embed — autoplay, pointer-events none so scroll works ── */}
      {hasEmbed && (
        <>
          <iframe
            src={embedSrc!}
            title={cap.label}
            frameBorder="0"
            scrolling="no"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              pointerEvents: 'none',
            }}
          />
          {/* Transparent shield — blocks the Pinterest "Save" badge entirely */}
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'transparent', pointerEvents: 'all' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Video (mp4) — autoplays always ── */}
      {hasVideo && (
        <video
          src={cap.video_url!}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* ── Fallback: static image ── */}
      {hasFallback && (
        <img
          src={cap.image_url}
          alt={cap.label}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* ── Gradient overlay ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/5 to-transparent" />

      {/* ── Label ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
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
