export default function FinalCTA() {
  return (
    <section
      style={{
        background: '#050507',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      {/* ── Pill / banner container ─────────────────────────────── */}
      <div
        style={{
          maxWidth:      '1280px',
          margin:        '0 auto',
          position:      'relative',
          borderRadius:  '1rem',
          overflow:      'hidden',
          background:    '#0e0e14',
          border:        '1px solid rgba(124,92,255,0.12)',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          minHeight:     '160px',
          /* Subtle inner accent glow left side */
          boxShadow:     'inset 60px 0 80px rgba(124,92,255,0.06)',
        }}
      >
        {/* ── Left: text + button ──────────────────────────────── */}
        <div
          style={{
            padding:   'clamp(2rem, 4vw, 3rem) clamp(1.75rem, 4vw, 3rem)',
            flex:      '1 1 0',
            zIndex:    1,
          }}
        >
          {/* Headline — two lines, accent colour on second line */}
          <h2
            style={{
              fontFamily:    '"Figtree", sans-serif',
              fontWeight:    700,
              fontSize:      'clamp(1.5rem, 3.5vw, 2.5rem)',
              lineHeight:    1.12,
              letterSpacing: '-0.02em',
              color:         '#ffffff',
              margin:        0,
            }}
          >
            Start Your AI Film
            <br />
            <span
              style={{
                background:          'linear-gradient(90deg,#a89aff 0%,#7c5cff 60%)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip:      'text',
              }}
            >
              Journey Today
            </span>
          </h2>

          {/* Sub-copy */}
          <p
            style={{
              fontFamily:  '"Figtree", sans-serif',
              fontWeight:  400,
              fontSize:    '13px',
              lineHeight:  1.65,
              color:       'rgba(255,255,255,0.45)',
              marginTop:   '0.75rem',
              maxWidth:    '38ch',
            }}
          >
            Sign up now and experience the power of AI-driven cinematic
            production without any commitment.
          </p>

          {/* CTA button */}
          <a
            href="#contact"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              marginTop:      '1.25rem',
              borderRadius:   '0.5rem',
              background:     '#7c5cff',
              color:          '#ffffff',
              fontFamily:     '"Figtree", sans-serif',
              fontWeight:     600,
              fontSize:       '13px',
              padding:        '0.6rem 1.4rem',
              textDecoration: 'none',
              transition:     'background 0.2s, transform 0.2s',
              boxShadow:      '0 4px 20px rgba(124,92,255,0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget).style.background = '#6b4cf5';
              (e.currentTarget).style.transform  = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget).style.background = '#7c5cff';
              (e.currentTarget).style.transform  = 'translateY(0)';
            }}
          >
            Get Started
          </a>
        </div>

        {/* ── Right: purple 3D object image ───────────────────── */}
        <div
          style={{
            flexShrink:   0,
            width:        'clamp(160px, 22vw, 280px)',
            alignSelf:    'stretch',
            position:     'relative',
            overflow:     'hidden',
          }}
        >
          <img
            src="/purple.png"
            alt=""
            aria-hidden="true"
            style={{
              position:   'absolute',
              right:      '-5%',
              bottom:     '-5%',
              width:      '115%',
              height:     '115%',
              objectFit:  'contain',
              objectPosition: 'bottom right',
              /* Slight glow to blend with the dark bg */
              filter:     'drop-shadow(0 0 40px rgba(124,92,255,0.4))',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
