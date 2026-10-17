export default function FinalCTA() {
  return (
    <section
      style={{
        background: '#050507',
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      {/* ── Banner card ─────────────────────────────────────────── */}
      <div
        style={{
          maxWidth:       '1320px',
          margin:         '0 auto',
          position:       'relative',
          borderRadius:   '1.25rem',
          overflow:       'hidden',
          background:     'linear-gradient(135deg, #0e0c1a 0%, #100e1e 60%, #0a0a12 100%)',
          border:         '1px solid rgba(124,92,255,0.18)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          minHeight:      'clamp(180px, 22vw, 260px)',
          /* Purple glow — left and right */
          boxShadow:      'inset 80px 0 120px rgba(124,92,255,0.08), inset -40px 0 80px rgba(124,92,255,0.05), 0 0 60px rgba(124,92,255,0.06)',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          aria-hidden="true"
          style={{
            position:    'absolute',
            inset:       0,
            backgroundImage:
              'linear-gradient(rgba(124,92,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents:  'none',
          }}
        />

        {/* ── Left: text + button ──────────────────────────────── */}
        <div
          style={{
            padding:  'clamp(2rem, 4vw, 3.5rem) clamp(2rem, 4vw, 3.5rem)',
            flex:     '1 1 0',
            zIndex:   1,
            minWidth: 0,
          }}
        >
          {/* Headline */}
          <h2
            style={{
              fontFamily:    '"Figtree", sans-serif',
              fontWeight:    700,
              fontSize:      'clamp(1.75rem, 3.8vw, 3rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.025em',
              color:         '#ffffff',
              margin:        0,
            }}
          >
            Start Your AI Film
            <br />
            <span
              style={{
                background:           'linear-gradient(90deg, #a89aff 0%, #7c5cff 55%, #6b4cf5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              Journey Today
            </span>
          </h2>

          {/* Sub-copy */}
          <p
            style={{
              fontFamily: '"Figtree", sans-serif',
              fontWeight: 400,
              fontSize:   'clamp(13px, 1.2vw, 15px)',
              lineHeight: 1.7,
              color:      'rgba(255,255,255,0.48)',
              marginTop:  '1rem',
              maxWidth:   '42ch',
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
              gap:            '0.5rem',
              marginTop:      '1.5rem',
              borderRadius:   '0.6rem',
              background:     '#7c5cff',
              color:          '#ffffff',
              fontFamily:     '"Figtree", sans-serif',
              fontWeight:     600,
              fontSize:       'clamp(13px, 1.1vw, 15px)',
              padding:        'clamp(0.6rem, 1vw, 0.8rem) clamp(1.25rem, 2vw, 1.75rem)',
              textDecoration: 'none',
              transition:     'background 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow:      '0 6px 28px rgba(124,92,255,0.4)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background  = '#6b4cf5';
              el.style.transform   = 'translateY(-2px)';
              el.style.boxShadow   = '0 10px 36px rgba(124,92,255,0.55)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background  = '#7c5cff';
              el.style.transform   = 'translateY(0)';
              el.style.boxShadow   = '0 6px 28px rgba(124,92,255,0.4)';
            }}
          >
            Get Started
          </a>
        </div>

        {/* ── Right: purple 3D object ───────────────────────────── */}
        <div
          style={{
            flexShrink: 0,
            /* Width scales with viewport — much bigger than before */
            width:      'clamp(220px, 30vw, 420px)',
            alignSelf:  'stretch',
            position:   'relative',
            overflow:   'visible',
          }}
        >
          <img
            src="/purple.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              position:       'absolute',
              right:          'clamp(-40px, -5%, -20px)',
              /* Vertically centred, slightly overflowing top & bottom */
              top:            '50%',
              transform:      'translateY(-50%)',
              /* Height-driven sizing — bigger than the card so it overflows */
              height:         'clamp(200px, 28vw, 380px)',
              width:          'auto',
              objectFit:      'contain',
              filter:         'drop-shadow(0 0 60px rgba(124,92,255,0.5)) drop-shadow(0 0 120px rgba(107,76,245,0.25))',
              pointerEvents:  'none',
              userSelect:     'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
