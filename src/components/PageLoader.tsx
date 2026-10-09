import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onFinish: () => void;
  stopScroll: () => void;
  startScroll: () => void;
}

export default function PageLoader({ onFinish, stopScroll, startScroll }: PageLoaderProps) {
  const [phase, setPhase] = useState<'enter' | 'draw' | 'shine' | 'ready' | 'exit'>('enter');
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    stopScroll();

    const tDraw  = setTimeout(() => setPhase('draw'),  120);
    const tShine = setTimeout(() => setPhase('shine'), 1100);
    const tReady = setTimeout(() => setPhase('ready'), 1900);
    const tExit  = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsRemoved(true);
        startScroll();
        onFinish();
      }, 700);
    }, 2400);

    return () => {
      clearTimeout(tDraw);
      clearTimeout(tShine);
      clearTimeout(tReady);
      clearTimeout(tExit);
    };
  }, [onFinish, stopScroll, startScroll]);

  const handleDismiss = () => {
    if (isExiting || isRemoved) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsRemoved(true);
      startScroll();
      onFinish();
    }, 450);
  };

  if (isRemoved) return null;

  const isDrawn = phase === 'draw' || phase === 'shine' || phase === 'ready';

  return (
    <>
      {/* Keyframe injected as a plain <style> tag — no JSX pragma needed */}
      <style>{`
        @keyframes smoothGleamSweep {
          0%   { transform: translateX(-160px) skewX(-20deg); opacity: 0; }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.9; }
          100% { transform: translateX(680px) skewX(-20deg); opacity: 0; }
        }
        .gleam-sweep {
          animation: smoothGleamSweep 1.05s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div
        onClick={handleDismiss}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070709] text-white overflow-hidden select-none cursor-pointer"
        style={{
          transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
          transition: 'transform 0.75s cubic-bezier(0.85, 0, 0.15, 1)',
        }}
      >
        {/* Cinematic vignette & ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,rgba(15,15,18,0.4)_50%,#070709_90%)]" />
          {/* Micro noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        </div>

        {/* Wordmark */}
        <div
          className="relative z-10 flex items-center justify-center px-4 transition-all duration-700"
          style={{
            opacity: isExiting ? 0 : 1,
            transform: isExiting
              ? 'scale(0.96) translateY(-12px)'
              : 'scale(1) translateY(0)',
          }}
        >
          <svg
            className="w-[210px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-auto overflow-visible"
            viewBox="0 0 630 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Platinum chrome specular gradient */}
              <linearGradient id="luxeSilver" gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="610" y2="100">
                <stop offset="0%"   stopColor="#7c5cff" />
                <stop offset="25%"  stopColor="#7c5cff" />
                <stop offset="50%"  stopColor="#9279f7" />
                <stop offset="75%"  stopColor="#7c5cff" />
                <stop offset="100%" stopColor="#9d85ff" />
              </linearGradient>
              {/* Specular light-sweep gradient */}
              <linearGradient id="shimmerBeam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="160" y2="114">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              {/* Soft ambient shadow */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            <g filter="url(#softGlow)">
              {/* A */}
              <path
                d="M 28 90 L 56 35 C 60 27 66 24 73 24 C 80 24 86 27 90 35 L 118 90"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: isDrawn ? 0 : 220,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
                }}
              />
              {/* Crossbar for first A */}
              <path
                d="M 44 68 L 102 68"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: isDrawn ? 0 : 80,
                  transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }}
              />

              {/* U */}
              <path
                d="M 148 24 L 148 64 C 148 78 159 90 174 90 C 189 90 200 78 200 64 L 200 24"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: isDrawn ? 0 : 220,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                }}
              />

              {/* R */}
              <path
                d="M 235 90 L 235 24 L 265 24 C 279 24 289 33 289 47 C 289 59 279 66 265 66 L 235 66 M 261 66 L 289 90"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 280,
                  strokeDashoffset: isDrawn ? 0 : 280,
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
                }}
              />

              {/* A (second) */}
              <path
                d="M 328 90 L 356 35 C 360 27 366 24 373 24 C 380 24 386 27 390 35 L 418 90"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: isDrawn ? 0 : 220,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
                }}
              />
              {/* Crossbar for second A */}
              <path
                d="M 344 68 L 402 68"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: isDrawn ? 0 : 80,
                  transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                }}
              />

              {/* · separator dot */}
              {/* <circle
                cx="441" cy="57" r="5.5"
                fill="url(#luxeSilver)"
                style={{
                  opacity: isDrawn ? 1 : 0,
                  transition: 'opacity 0.4s ease 0.48s',
                }}
              /> */}

              {/* A (in AI) */}
              <path
                d="M 464 90 L 492 35 C 496 27 502 24 509 24 C 516 24 522 27 526 35 L 554 90"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: isDrawn ? 0 : 220,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
                }}
              />
              {/* Crossbar for A in AI */}
              <path
                d="M 480 68 L 538 68"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: isDrawn ? 0 : 80,
                  transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                }}
              />

              {/* I */}
              <path
                d="M 592 24 L 592 90"
                stroke="url(#luxeSilver)" strokeWidth="11" strokeLinecap="round"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: isDrawn ? 0 : 120,
                  transition: 'stroke-dashoffset 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
                }}
              />
            </g>

            {/* Gleam sweep — only during shine / ready phases */}
            {/* {(phase === 'shine' || phase === 'ready') && (
              <rect
                x="0" y="0" width="150" height="114"
                fill="url(#shimmerBeam)"
                className="gleam-sweep pointer-events-none"
                style={{ mixBlendMode: 'overlay' }}
              />
            )} */}
          </svg>
        </div>

        {/* "Click to skip" hint — fades in after the draw completes */}
        <p
          className="absolute bottom-10 text-xs tracking-[0.25em] uppercase text-white/20 transition-opacity duration-700"
          style={{ opacity: phase === 'ready' && !isExiting ? 1 : 0 }}
        >
          Click anywhere to skip
        </p>
      </div>
    </>
  );
}
