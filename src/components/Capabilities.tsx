import { useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/* ── Reel data ───────────────────────────────────────────────────────────────
   Set href to a real URL (Instagram, YouTube, etc.) when ready.
   Leave as '#' to keep play-on-click behaviour.                             */
type LocalReel = { id: string; label: string; video_url: string; href: string };

const LOCAL_REELS: LocalReel[] = [
  { id: 'v1', label: 'Camel',     video_url: '/videos/camel.mp4',   href: '#' },
  { id: 'v2', label: 'Fragrance', video_url: '/videos/frag.mp4',    href: '#' },
  { id: 'v3', label: 'Grandpa',   video_url: '/videos/grandpa.mp4', href: '#' },
  { id: 'v4', label: 'Grapo',     video_url: '/videos/grapo.mp4',   href: '#' },
  { id: 'v5', label: 'Laban',     video_url: '/videos/laban.mp4',   href: '#' },
  { id: 'v6', label: 'Nahdi',     video_url: '/videos/nahdi.mp4',   href: '#' },
  { id: 'v7', label: 'Onam',      video_url: '/videos/Onam.mp4',    href: '#' },
  { id: 'v8', label: 'Watch',     video_url: '/videos/watch.mp4',   href: '#' },
];

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Capabilities() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="works"
      style={{
        background: '#020202',
        padding: 'clamp(3rem,6vw,5rem) 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      {/* <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,92,255,0.1) 0%, transparent 70%)',
        }}
      /> */}

      {/* Header — padded for readability */}
      <div
        ref={ref}
        style={{
          position: 'relative', zIndex: 1,
          padding: '0 clamp(1.25rem,4vw,2.5rem)',
          marginBottom: 'clamp(2rem,4vw,3rem)',
        }}
      >
        <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          Selected Work
        </p>

        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', marginTop:'1rem' }}>
          <h2
            className={`reveal font-display font-bold leading-[1.07] tracking-tight text-white transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ fontSize:'clamp(2rem,4.5vw,3.75rem)', margin:0, transitionDelay:'80ms' }}
          >
            Stories in{' '}
            <em className="text-gradient-accent" style={{ fontStyle:'italic' }}>vertical</em>
            {' '}frames
          </h2>

          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', maxWidth:'36ch', lineHeight:1.65, margin:0 }}>
            AI-crafted reels built for Instagram, TikTok and Shorts — cinematic from the very first second.
          </p>
        </div>
      </div>

     {/* ── 4-column grid with side margins ── */}
<div
  className="reel-grid"
  style={{
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '2px',
    width: '90%',
    margin: '0 auto',
    padding: '4',
    alignItems: 'start',
  }}
>
        <style>{`
          @media(max-width:900px){ .reel-grid{ grid-template-columns:repeat(2,minmax(0,1fr))!important } }
          .reel-card:hover { transform:translateY(-6px)!important; border-color:rgba(124,92,255,0.45)!important; box-shadow:0 20px 60px rgba(124,92,255,0.2)!important; }
        `}</style>

        {LOCAL_REELS.map((reel, i) => (
          <ReelCard key={reel.id} reel={reel} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── Reel card ────────────────────────────────────────────────────────────── */
function ReelCard({ reel, index }: { reel: LocalReel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying]  = useState(false);
  const [failed,  setFailed]   = useState(false);

  const isExternal = reel.href.startsWith('http');
  const offsetStyle = index % 2 === 1 ? { marginTop: 'clamp(1.5rem,3vw,3rem)' } : {};

  const play  = () => { videoRef.current?.play().catch(() => {}); setPlaying(true); };
  const pause = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } setPlaying(false); };

  const cardStyle: React.CSSProperties = {
    display: 'block',
    textDecoration: 'none',
    position: 'relative',
    aspectRatio: '9/16',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.06)',
    background: '#0a0a0f',
    transition: 'transform 0.45s ease, border-color 0.3s, box-shadow 0.3s',
    ...offsetStyle,
  };

  const inner = (
    <>
      <video
        ref={videoRef}
        src={reel.video_url}
        muted loop playsInline preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }}
      />

      {failed && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'#17131f', color:'#fff', fontSize:'0.8rem', padding:'1rem', textAlign:'center' }}>
          Could not load video
        </div>
      )}

      {/* Gradient */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 35%,transparent 55%,rgba(0,0,0,0.82) 100%)' }} />

      {/* Top: label + index */}
      <div aria-hidden="true" style={{ position:'absolute', top:'1rem', left:'1rem', right:'1rem', display:'flex', alignItems:'center', justifyContent:'space-between', pointerEvents:'none' }}>
        <span style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'9999px', padding:'4px 12px', fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)', whiteSpace:'nowrap' }}>
          {reel.label}
        </span>
        <span style={{ fontFamily:"'Figtree',sans-serif", fontStyle:'italic', fontSize:'1.1rem', fontWeight:600, color:'rgba(160,140,255,0.95)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Play icon */}
      {!playing && !failed && (
        <span aria-hidden="true" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:56, height:56, borderRadius:'50%', background:'rgba(124,92,255,0.35)', border:'1px solid rgba(124,92,255,0.6)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
          <svg viewBox="0 0 24 24" width="22" height="22" style={{ marginLeft:3 }}>
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        </span>
      )}

      {/* Bottom title */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.25rem 1rem', pointerEvents:'none' }}>
        <h3 style={{ fontFamily:"'Figtree',sans-serif", fontWeight:700, fontSize:'clamp(0.85rem,1.5vw,1.1rem)', color:'#ffffff', margin:0, lineHeight:1.2 }}>
          {reel.label}
        </h3>
      </div>
    </>
  );

  /* External href → real link that opens in new tab */
  if (isExternal) {
    return (
      <a href={reel.href} target="_blank" rel="noopener noreferrer"
        className="reel-card" style={cardStyle}
        onMouseEnter={play} onMouseLeave={pause}>
        {inner}
      </a>
    );
  }

  /* '#' href → play/pause on hover & click, no navigation */
  return (
    <a href={reel.href} className="reel-card" style={cardStyle}
      onClick={e => { e.preventDefault(); playing ? pause() : play(); }}
      onMouseEnter={play} onMouseLeave={pause}>
      {inner}
    </a>
  );
}
