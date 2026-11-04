import { useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

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

/*
  Height pattern (matching the reference — middle cards tallest):
  index:   0      1      2      3      4      5      6      7
  scale:  0.82   0.92   1.00   0.96   0.92   1.00   0.90   0.84
  rotate: -3°   -1.5°   0°     1°    -1°     0°     1.5°   3°
*/
const CARD_META = [
  { scale: 0.82, rotate: -3   },
  { scale: 0.92, rotate: -1.5 },
  { scale: 1.00, rotate:  0   },
  { scale: 0.96, rotate:  1   },
  { scale: 0.92, rotate: -1   },
  { scale: 1.00, rotate:  0   },
  { scale: 0.90, rotate:  1.5 },
  { scale: 0.84, rotate:  3   },
];

/* Base card height in px — reference-style portrait */
const BASE_H = 480;

export default function Capabilities() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="works"
      style={{
        background:  '#000000',
        padding:     'clamp(3rem,6vw,5rem) 0 clamp(3rem,6vw,5rem)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        ref={ref}
        style={{
          padding:      '0 clamp(1.25rem,4vw,3rem)',
          marginBottom: 'clamp(2rem,4vw,3.5rem)',
          position:     'relative',
          zIndex:       1,
        }}
      >
        <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          Selected Work
        </p>

        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end',
          justifyContent:'space-between', gap:'1rem', marginTop:'1rem' }}>
          <h2
            className={`reveal font-display font-bold leading-[1.07] tracking-tight text-white transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
            style={{ fontSize:'clamp(2rem,4.5vw,3.75rem)', margin:0, transitionDelay:'80ms' }}
          >
            Stories in{' '}
            <em className="text-gradient-accent" style={{ fontStyle:'italic' }}>vertical</em>
            {' '}frames
          </h2>

          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)',
            maxWidth:'38ch', lineHeight:1.65, margin:0 }}>
            AI-crafted reels for Instagram, TikTok and Shorts —
            cinematic from the very first second.
          </p>
        </div>
      </div>

      {/* ── Horizontal card strip ── */}
      <style>{`
        @keyframes reel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reel-strip {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 1vw, 12px);
          padding: 2rem clamp(1.25rem,4vw,3rem) 2.5rem;
          overflow: visible;
          width: max-content;
          animation: reel-scroll 28s linear infinite;
          will-change: transform;
        }
        .reel-strip-outer {
          overflow: hidden;
        }
        .reel-strip-outer:hover .reel-strip {
          animation-play-state: paused;
        }

        .rc-wrap {
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(.22,1,.36,1);
          transform-origin: bottom center;
        }
        .rc-wrap:hover {
          transform: scale(1.04) translateY(-8px) rotate(0deg) !important;
          z-index: 10;
        }

        .rc-card {
          position: relative;
          width: clamp(120px, 14vw, 190px);
          border-radius: 1.25rem;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          display: block;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.45);
          transition: box-shadow 0.4s ease;
        }
        .rc-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.65);
        }

        .rc-card video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rc-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.18);
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .rc-card:hover .rc-play { opacity: 0; }

        .rc-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 0.875rem 0.875rem;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.72));
          pointer-events: none;
        }

        @media(max-width:640px) {
          .rc-card { width: clamp(100px, 36vw, 150px) !important; }
        }
      `}</style>

      {/* Outer overflow-hidden wrapper — strip scrolls inside */}
      <div className="reel-strip-outer">
        {/* Doubled list for seamless loop */}
        <div className="reel-strip">
          {[...LOCAL_REELS, ...LOCAL_REELS].map((reel, i) => {
            const meta   = CARD_META[i % CARD_META.length] ?? { scale: 1, rotate: 0 };
            const height = Math.round(BASE_H * meta.scale);
            return (
              <div
                key={`${reel.id}-${i}`}
                className="rc-wrap"
                style={{ transform: `rotate(${meta.rotate}deg)` }}
              >
                <ReelCard reel={reel} height={height} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Individual card ─────────────────────────────────────────────────────── */
function ReelCard({ reel, height }: { reel: LocalReel; height: number }) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed,  setFailed]  = useState(false);
  const isExternal = reel.href.startsWith('http');

  const play  = () => { videoRef.current?.play().catch(() => {}); setPlaying(true); };
  const pause = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    setPlaying(false);
  };

  const inner = (
    <>
      {/* Video */}
      {!failed ? (
        <video
          ref={videoRef}
          src={reel.video_url}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
      ) : (
        <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center',
          justifyContent:'center', background:'#1a1a1a', color:'rgba(255,255,255,0.4)',
          fontSize:'11px', textAlign:'center', padding:'1rem' }}>
          Video unavailable
        </div>
      )}

      {/* Play button — fades on hover via CSS */}
      {!playing && !failed && (
        <div className="rc-play">
          <div style={{
            width:44, height:44, borderRadius:'50%',
            background:'rgba(255,255,255,0.2)',
            backdropFilter:'blur(6px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'1px solid rgba(255,255,255,0.35)',
          }}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginLeft:2 }}>
              <path d="M8 5v14l11-7z" fill="white"/>
            </svg>
          </div>
        </div>
      )}

      {/* Label at bottom */}
      <div className="rc-label">
        <span style={{
          fontFamily:    '"Figtree",sans-serif',
          fontSize:      '12px',
          fontWeight:    600,
          color:         '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {reel.label}
        </span>
      </div>
    </>
  );

  const cardProps = {
    className: 'rc-card',
    style:     { height } as React.CSSProperties,
    onMouseEnter: play,
    onMouseLeave: pause,
  };

  if (isExternal) {
    return (
      <a href={reel.href} target="_blank" rel="noopener noreferrer" {...cardProps}>
        {inner}
      </a>
    );
  }

  return (
    <a
      href={reel.href}
      onClick={e => { e.preventDefault(); playing ? pause() : play(); }}
      {...cardProps}
    >
      {inner}
    </a>
  );
}
