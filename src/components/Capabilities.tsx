import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { supabase, type Capability } from '@/lib/supabase';
import { capabilities as staticCaps } from '@/data/content';

/* ── Fallback static data ─────────────────────────────────────────────────── */
const fallback: Capability[] = staticCaps.map((c, i) => ({
  id: String(i), label: c.label, image_url: c.image,
  video_url: null, embed_code: null, instagram_embed: null,
  sort_order: i + 1, is_active: true, created_at: '', updated_at: '',
}));

/* ── Static local reels (public/videos/) ─────────────────────────────────
   Set href to a real URL (Instagram, YouTube, etc.) when ready.
   Leave as '#' to keep the card as play-only (no navigation).           ── */
const LOCAL_REELS: (Capability & { href: string })[] = [
  { id:'v1', label:'Camel',     image_url:'', video_url:'/videos/camel.mp4',   embed_code:null, instagram_embed:null, sort_order:1, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v2', label:'Fragrance', image_url:'', video_url:'/videos/frag.mp4',    embed_code:null, instagram_embed:null, sort_order:2, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v3', label:'Grandpa',   image_url:'', video_url:'/videos/grandpa.mp4', embed_code:null, instagram_embed:null, sort_order:3, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v4', label:'Grapo',     image_url:'', video_url:'/videos/grapo.mp4',   embed_code:null, instagram_embed:null, sort_order:4, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v5', label:'Laban',     image_url:'', video_url:'/videos/laban.mp4',   embed_code:null, instagram_embed:null, sort_order:5, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v6', label:'Nahdi',     image_url:'', video_url:'/videos/nahdi.mp4',   embed_code:null, instagram_embed:null, sort_order:6, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v7', label:'Onam',      image_url:'', video_url:'/videos/Onam.mp4',    embed_code:null, instagram_embed:null, sort_order:7, is_active:true, created_at:'', updated_at:'', href:'#' },
  { id:'v8', label:'Watch',     image_url:'', video_url:'/videos/watch.mp4',   embed_code:null, instagram_embed:null, sort_order:8, is_active:true, created_at:'', updated_at:'', href:'#' },
];

/* ── Pinterest src builder ───────────────────────────────────────────────── */
function buildPinterestSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  const src = match ? match[1] : trimmed.startsWith('http') ? trimmed : null;
  if (!src) return null;
  try {
    const url = new URL(src);
    url.searchParams.set('autoplay', '1');
    return url.toString();
  } catch {
    return src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
  }
}

/* ── Extract Instagram reel URL from blockquote embed code ──────────────── */
function extractInstagramUrl(raw: string): string | null {
  const m = raw.match(/data-instgrm-permalink=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

/* ── Load the Instagram embed.js once ───────────────────────────────────── */
let igScriptLoaded = false;
function loadInstagramScript() {
  if (igScriptLoaded) {
    // Re-process any new blockquotes
    if ((window as unknown as Record<string, unknown>).instgrm) {
      ((window as unknown as Record<string, { Embeds: { process(): void } }>).instgrm).Embeds.process();
    }
    return;
  }
  igScriptLoaded = true;
  const s = document.createElement('script');
  s.src = 'https://www.instagram.com/embed.js';
  s.async = true;
  document.body.appendChild(s);
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Capabilities() {
  const { ref, visible } = useReveal();
  const [items, setItems] = useState<Capability[]>(LOCAL_REELS);

  useEffect(() => {
    supabase
      .from('capabilities')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(data);
          if (data.some(d => d.instagram_embed)) {
            setTimeout(loadInstagramScript, 100);
          }
        }
        // If DB is empty, LOCAL_REELS stay as default
      });
  }, []);

  return (
    <section
      id="works"
      style={{ background: '#000000', padding: 'clamp(4rem,8vw,7rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,92,255,0.12) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={ref} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
            Selected Work
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginTop: '1rem' }}>
            <h2
              className={`reveal font-display font-bold leading-[1.07] tracking-tight text-white transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
              style={{ fontSize: 'clamp(2rem,4.5vw,3.75rem)', margin: 0, transitionDelay: '80ms' }}
            >
              Stories in{' '}
              <em className="text-gradient-accent" style={{ fontStyle: 'italic' }}>vertical</em>{' '}frames
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', maxWidth: '36ch', lineHeight: 1.65 }}>
              AI-crafted reels built for Instagram, TikTok and Shorts — cinematic from the very first second.
            </p>
          </div>
        </div>

        {/* 4-column reel grid */}
        <div
          className="reel-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(0.75rem,1.5vw,1.25rem)', alignItems: 'start' }}
        >
          <style>{`
            @media(max-width:900px){ .reel-grid{ grid-template-columns:repeat(2,1fr)!important } }
            @media(max-width:520px){ .reel-grid{ grid-template-columns:repeat(2,1fr)!important } }
            .reel-card:hover { transform:translateY(-8px)!important; border-color:rgba(124,92,255,0.45)!important; box-shadow:0 20px 60px rgba(124,92,255,0.2)!important; }
            .reel-card:hover .reel-poster { transform:scale(1.05)!important; }
          `}</style>

          {items.map((cap, i) => (
            <ReelCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reel card ────────────────────────────────────────────────────────────── */
function ReelCard({ cap, index }: { cap: Capability; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const igRef    = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const embedSrc  = cap.embed_code     ? buildPinterestSrc(cap.embed_code) : null;
  const igUrl     = cap.instagram_embed ? extractInstagramUrl(cap.instagram_embed) : null;
  const hasIG     = Boolean(igUrl);
  const hasEmbed  = Boolean(embedSrc) && !hasIG;
  const hasVideo  = Boolean(cap.video_url) && !hasEmbed && !hasIG;

  // Process Instagram embed when component mounts
  useEffect(() => {
    if (hasIG && igRef.current) {
      setTimeout(() => {
        if ((window as unknown as Record<string, unknown>).instgrm) {
          ((window as unknown as Record<string, { Embeds: { process(): void } }>).instgrm).Embeds.process();
        } else {
          loadInstagramScript();
        }
      }, 300);
    }
  }, [hasIG]);

  const play = () => {
    if (hasVideo && videoRef.current) { videoRef.current.play().catch(() => {}); setPlaying(true); }
  };
  const stop = () => {
    if (hasVideo && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false); }
  };

  const offsetStyle = index % 2 === 1 ? { marginTop: 'clamp(1.5rem,3vw,3rem)' } : {};

  const href = (cap as Capability & { href?: string }).href ?? '#';
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="reel-card"
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={!isExternal ? (e) => { e.preventDefault(); playing ? stop() : play(); } : undefined}
      style={{
        display: 'block',
        textDecoration: 'none',
        position: 'relative', aspectRatio: '9/16', cursor: 'pointer',
        overflow: 'hidden', borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#0a0a0f',
        transition: 'transform 0.45s ease, border-color 0.3s, box-shadow 0.3s',
        ...offsetStyle,
      }}
    >
      {/* ── Instagram embed ── */}
      {hasIG && (
        <div
          ref={igRef}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Instagram iframe embed — rendered via embed.js */}
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={igUrl!}
            data-instgrm-version="14"
            style={{
              background: '#000', border: 0, margin: 0,
              width: '100%', minWidth: '100%',
              position: 'absolute', inset: 0,
            }}
          />
          {/* Shield to block Instagram UI overlays */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'transparent', pointerEvents: 'none' }} aria-hidden="true" />
        </div>
      )}

      {/* ── Pinterest embed ── */}
      {hasEmbed && (
        <>
          <iframe
            src={embedSrc!} title={cap.label} frameBorder="0" scrolling="no"
            allow="autoplay; fullscreen; encrypted-media" allowFullScreen loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent', pointerEvents: 'all' }} aria-hidden="true" />
        </>
      )}

      {/* ── Video ── */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={cap.video_url!}
          muted loop playsInline preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* ── Fallback image ── */}
      {!hasIG && !hasEmbed && !hasVideo && (
        <img
          src={cap.image_url} alt={cap.label} loading="lazy"
          className="reel-poster"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease, opacity 0.4s', opacity: playing ? 0 : 1 }}
        />
      )}

      {/* ── Poster (fades when video plays) ── */}
      {hasVideo && (
        <img
          src={cap.image_url} alt="" className="reel-poster"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s', opacity: playing ? 0 : 1, pointerEvents: 'none' }}
        />
      )}

      {/* ── Gradient overlay ── */}
      {!hasIG && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.82) 100%)',
        }} />
      )}

      {/* ── Top: category + number ── */}
      {!hasIG && (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <span style={{
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '9999px', padding: '4px 12px',
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap',
          }}>
            {cap.label}
          </span>
          <span style={{ fontFamily: "'Figtree',sans-serif", fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 600, color: 'rgba(124,92,255,0.85)' }}>
            0{index + 1}
          </span>
        </div>
      )}

      {/* ── Play icon ── */}
      {!hasIG && !hasEmbed && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(124,92,255,0.35)', border: '1px solid rgba(124,92,255,0.6)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: playing ? 0 : 1, transition: 'opacity 0.3s', pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 24 24" width="22" height="22" style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        </div>
      )}

      {/* ── Bottom title ── */}
      {!hasIG && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1rem', pointerEvents: 'none' }}>
          <h3 style={{ fontFamily: "'Figtree',sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem,1.5vw,1.1rem)', color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
            {cap.label}
          </h3>
        </div>
      )}
    </a>
  );
}
