/**
 * Hero section — WeHexa reference, converted from the provided HTML.
 * Nav is NOT rendered here — it lives in Navbar.tsx (rendered by App.tsx).
 * Background: /nature.png (center bottom / cover).
 */
export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        :root{--lime:#d6f53b;--ink:#15171a}
        .wh-btn{display:inline-flex;align-items:center;gap:10px;border-radius:10px;font-family:'Manrope',system-ui,sans-serif;font-weight:700;font-size:13.5px;text-decoration:none;color:var(--ink);cursor:pointer;border:0;transition:transform .15s}
        .wh-btn:hover{transform:translateY(-1px)}
        .wh-btn.lime{background:#7c5cff;padding:6px 6px 6px 16px;color:#fff}
        .wh-btn.white{background:#fff;padding:6px 6px 6px 16px;color:#0a0a0f}
        .wh-ico{width:32px;height:32px;border-radius:8px;background:#0a0a0f;display:grid;place-items:center;flex:none}
        .wh-btn.lime .wh-ico{background:rgba(255,255,255,0.18);border:none}
        .wh-btn.white .wh-ico{background:#0a0a0f;border:none}
        .wh-avs{display:flex}
        .wh-avs span{width:20px;height:20px;border-radius:50%;border:2px solid #fff;margin-left:-6px;display:block}
        .wh-avs span:first-child{margin-left:0}
        .wh-avs span:nth-child(1){background:radial-gradient(circle at 50% 38%,#f1c7a1 0 28%,transparent 30%),#3a2a22}
        .wh-avs span:nth-child(2){background:radial-gradient(circle at 50% 38%,#e3b18a 0 28%,transparent 30%),#c0463a}
        .wh-avs span:nth-child(3){background:radial-gradient(circle at 50% 38%,#f4d2b5 0 28%,transparent 30%),#e7a53a}
        @media(prefers-reduced-motion:reduce){.wh-btn{transition:none}}
      `}</style>

      <section
        style={{
          position:      'relative',
          width:         '100%',
          minHeight:     '100vh',
          overflow:      'hidden',
          background:    '#2c78d8 url("/nature.png") center bottom / cover no-repeat',
          paddingTop:    'env(safe-area-inset-top, 0px)',
          fontFamily:    "'Manrope',system-ui,-apple-system,'Segoe UI',Arial,sans-serif",
          WebkitFontSmoothing: 'antialiased',
          color:         '#fff',
        } as React.CSSProperties}
      >
        {/* ── Light overlay over bg image ── */}
        <div style={{
          position:      'absolute',
          inset:         0,
          zIndex:        1,
          pointerEvents: 'none',
          background:    'rgba(0, 0, 0, 0.29)',
        }} aria-hidden="true" />

        {/* ── Black shadow fade at the bottom edge ── */}
        <div style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '120px',
          zIndex:        2,
          pointerEvents: 'none',
          background:    'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 100%)',
        }} aria-hidden="true" />

        {/* Hero content */}
        <div
          style={{
            position:       'relative',
            zIndex:         4,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            textAlign:      'center',
            minHeight:      '100vh',
            padding:        '80px 24px clamp(3rem,8vh,5rem)',
          }}
        >

          {/* ── Badge ───────────────────────────────────────────── */}
          <div
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              background:    'rgba(255,255,255,0.93)',
              color:         '#15171a',
              borderRadius:  '999px',
              padding:       '5px 14px 5px 5px',
              fontSize:      '9.5px',
              fontWeight:    800,
              letterSpacing: '.2px',
              textTransform: 'uppercase',
            } as React.CSSProperties}
          >
            <div className="wh-avs">
              <span /><span /><span />
            </div>
            5000+ Business Scaled Their Intelligent Tech
          </div>

          {/* ── Headline ──────────────────────────────────────────── */}
          <h1
            style={{
              margin:        '22px 0 0',
              fontWeight:    800,
              fontSize:      'clamp(34px,5.2vw,60px)',
              lineHeight:    1.12,
              letterSpacing: '-1.6px',
              maxWidth:      '760px',
              color:         '#fff',
              textShadow:    '0 2px 24px rgba(20,70,150,0.18)',
            }}
          >
            We create AI Videos and Visual Stories that fuel your growth
          </h1>

          {/* ── Sub-copy ──────────────────────────────────────────── */}
          <p
            style={{
              margin:     '22px 0 0',
              maxWidth:   '520px',
              fontSize:   'clamp(12.5px,1.15vw,14px)',
              lineHeight: 1.55,
              fontWeight: 500,
              color:      'rgba(255,255,255,0.92)',
            }}
          >
           From cinematic AI-generated videos to immersive visual storytelling. We bridge the gap between creative imagination and stunning digital experiences.
           Do you like this personality?
          </p>

          {/* ── CTA row ───────────────────────────────────────────── */}
          <div
            style={{
              display:        'flex',
              gap:            '12px',
              marginTop:      '26px',
              flexWrap:       'wrap',
              justifyContent: 'center',
            }}
          >
            {/* Book a Call — accent purple */}
            <a className="wh-btn lime" href="#contact">
              Book a Call
              <span className="wh-ico">
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>

            {/* View Our Work — white */}
            <a className="wh-btn white" href="#works">
              View Our Work
              <span className="wh-ico">
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path d="M3 11L11 3M5 3h6v6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
