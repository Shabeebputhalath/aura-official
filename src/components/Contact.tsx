import { useState } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

/* ── Kept for future use ─────────────────────────────────────────────────────
const interests = [
  'AI Commercial', 'Brand Film', 'Product Video',
  'Social Media',  'Music Video', 'Other',
];
// Left half: Rounded founder image
// <div className="absolute inset-y-0 left-0 w-1/2 flex items-center"
//      style={{ padding: '1.25rem 0.625rem 1.25rem 1.25rem' }}>
//   <img src="/MeettheFounder.png" alt="AURA AI"
//        className="w-full rounded-2xl object-cover object-center"
//        style={{ height: '89vh', maxHeight: '89vh' }} />
// </div>
// Full-bleed video background
// <div className="absolute inset-0">
//   <video autoPlay loop muted playsInline className="h-full w-full object-cover">
//     <source src="/Purple_liquid_flows_on_black_20260921175622.mp4" type="video/mp4" />
//   </video>
//   <div className="absolute inset-0 bg-black/30" />
// </div>
// Brand label top-left
// <div className="absolute left-8 top-8 z-10 sm:left-12 sm:top-10">
//   <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">AURA AI</span>
// </div>
// Left headline + email over video
// <div className="absolute bottom-10 left-8 z-10 sm:bottom-14 sm:left-12 lg:bottom-16 lg:left-16">
//   <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '10ch' }}>
//     Have a project?<br />We would love to help.
//   </h2>
//   <p className="mt-6 text-sm text-white/50">hello@auraai.studio</p>
// </div>
// Mini nav inside form panel
// <div className="flex items-center justify-end gap-6 border-b border-white/[0.07] px-7 py-4">
//   <span>Works</span><span>About</span><span>Contacts</span>
// </div>
─────────────────────────────────────────────────────────────────────────── */

interface FormState {
  firstName: string; lastName: string;
  email: string;     phone: string;
  message: string;
}
const empty: FormState = { firstName:'', lastName:'', email:'', phone:'', message:'' };

/* colour tokens */
const C = {
  bg:       '#000000',
  cardBg:   '#0c0a21',
  cardBord: '#1b1937',
  inputBg:  '#13112d',
  inputBord:'#28254d',
  txtaBg:   '#15123a',
  text:     '#e8e6f5',
  muted:    '#c3c1d8',
  purple:   '#a57cf7',
} as const;

export default function Contact() {
  const [form, setForm]             = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) return;
    setSubmitting(true); setError(null);
    const { error: err } = await supabase.from('inquiries').insert({
      full_name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email, phone: form.phone || null,
      project_type: 'General', details: form.message,
      budget:'', timeline:'', reference_url:'', company:'', status:'new',
    });
    setSubmitting(false);
    if (err) { setError('Something went wrong. Please try again.'); return; }
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      style={{
        position:   'relative',
        width:      '100%',
        background: C.bg,
        fontFamily: '"Figtree","Inter",system-ui,sans-serif',
        color:      C.text,
        overflow:   'hidden',
        padding:    'clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,4rem)',
      }}
    >

      {/* ── Scoped styles ─────────────────────────────────────── */}
      <style>{`
        .ct-input,.ct-textarea{
          width:100%;box-sizing:border-box;
          background:${C.inputBg};border:1px solid ${C.inputBord};
          border-radius:8px;color:${C.muted};
          font:400 14px/1.5 "Figtree","Inter",sans-serif;
          outline:none;transition:border-color .15s,box-shadow .15s;
        }
        .ct-input{height:44px;padding:0 14px;}
        .ct-textarea{height:120px;padding:12px 14px;resize:none;background:${C.txtaBg};}
        .ct-input:focus,.ct-textarea:focus{
          border-color:#7c5cf0;
          box-shadow:0 0 0 3px rgba(124,92,240,.2);
        }
        .ct-input::placeholder,.ct-textarea::placeholder{color:rgba(195,193,216,.45);opacity:1;}
        .ct-submit{transition:filter .15s,transform .15s;}
        .ct-submit:hover{filter:brightness(1.1);transform:translateY(-1px);}
        .ct-infocard{transition:border-color .2s,background .2s;}
        .ct-infocard:hover{border-color:rgba(165,124,247,.35)!important;background:rgba(165,124,247,.05)!important;}
        @media(max-width:768px){
          .ct-cols{grid-template-columns:1fr!important;}
          .ct-h1{font-size:clamp(2rem,8vw,3rem)!important;white-space:normal!important;margin-left:0!important;margin-right:0!important;}
          .ct-row{flex-direction:column!important;}
          .ct-info{flex-direction:column!important;}
        }
      `}</style>

      {/* ── Full-screen radial glow + grid ────────────────────── */}
      <div aria-hidden="true" style={{
        position:'absolute',inset:0,pointerEvents:'none',
        background:`
          radial-gradient(ellipse 70% 80% at 60% 40%, rgba(40,24,96,.45), transparent 65%),
          radial-gradient(ellipse 40% 50% at 10% 80%, rgba(100,48,200,.2), transparent 60%),
          repeating-linear-gradient(90deg,rgba(255,255,255,.013) 0 1px,transparent 1px 60px),
          repeating-linear-gradient(0deg,rgba(255,255,255,.008) 0 1px,transparent 1px 60px)
        `,
      }}/>

      {/* ── Ring — top right (full width positioned) ──────────── */}
      <div aria-hidden="true" style={{
        position:'absolute',right:'-4%',top:'-8%',
        width:'clamp(280px,30vw,480px)',height:'clamp(280px,30vw,480px)',
        pointerEvents:'none',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 281 281">
          <defs>
            <linearGradient id="ct-gr" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="281">
              <stop offset="0"   stopColor="#a47cf8"/>
              <stop offset=".5"  stopColor="#7240e0"/>
              <stop offset="1"   stopColor="#3a1a9a" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <circle cx="140" cy="140" r="120" fill="none" stroke="url(#ct-gr)" strokeWidth="28"/>
        </svg>
      </div>

      {/* ── Ring — bottom left ────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position:'absolute',left:'-6%',bottom:'-10%',
        width:'clamp(240px,26vw,420px)',height:'clamp(240px,26vw,420px)',
        pointerEvents:'none',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 281 281">
          <defs>
            <linearGradient id="ct-gl" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="281">
              <stop offset="0"   stopColor="#4a24c0" stopOpacity="0"/>
              <stop offset=".5"  stopColor="#6a3de0"/>
              <stop offset="1"   stopColor="#a98af9"/>
            </linearGradient>
          </defs>
          <circle cx="60" cy="200" r="120" fill="none" stroke="url(#ct-gl)" strokeWidth="28"/>
        </svg>
      </div>

      {/* ── Ring — mid left (extra depth) ────────────────────── */}
      <div aria-hidden="true" style={{
        position:'absolute',left:'-2%',top:'30%',
        width:'clamp(160px,18vw,280px)',height:'clamp(160px,18vw,280px)',
        pointerEvents:'none',opacity:0.45,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 281 281">
          <circle cx="10" cy="140" r="100" fill="none" stroke="#7c5cff" strokeWidth="20" strokeOpacity="0.35"/>
        </svg>
      </div>

      {/* ── Max-width content wrapper ─────────────────────────── */}
      <div style={{ position:'relative',zIndex:1,maxWidth:'1280px',margin:'0 auto',width:'100%' }}>

        {submitted ? (
          /* ── Success ── */
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',
            gap:'1.5rem',padding:'6rem 1rem',textAlign:'center' }}>
            <span style={{ width:72,height:72,borderRadius:'50%',
              background:'rgba(124,92,255,0.15)',border:'1px solid rgba(124,92,255,0.35)',
              display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Check style={{ width:32,height:32,color:C.purple }}/>
            </span>
            <h3 style={{ fontSize:'2rem',fontWeight:700,color:'#fff',margin:0 }}>Message Sent!</h3>
            <p style={{ fontSize:'16px',color:C.muted,maxWidth:'36ch',lineHeight:1.65,margin:0 }}>
              Thanks for reaching out — we'll get back to you within one business day.
            </p>
            <button onClick={() => { setForm(empty); setSubmitted(false); }}
              style={{ marginTop:'0.5rem',padding:'0.75rem 2rem',borderRadius:8,
                border:`1px solid ${C.cardBord}`,background:'transparent',
                color:C.muted,fontSize:14,cursor:'pointer',fontFamily:'inherit' }}>
              Send another
            </button>
          </div>
        ) : (
          /* ── Two-column layout: heading left, form right ── */
          <div className="ct-cols" style={{
            display:'grid',
            gridTemplateColumns:'1fr 1.1fr',
            gap:'clamp(2rem,5vw,6rem)',
            alignItems:'start',
          }}>

            {/* ── LEFT: heading + sub + info cards ── */}
            <div style={{ paddingTop:'clamp(1rem,3vw,3rem)' }}>

              {/* Eyebrow */}
              <div style={{ display:'flex',alignItems:'center',gap:'0.6rem',marginBottom:'1.25rem' }}>
                <span style={{ width:'2rem',height:'1px',background:C.purple,opacity:.7 }}/>
                <span style={{ fontSize:12,fontWeight:600,letterSpacing:'0.16em',
                  textTransform:'uppercase',color:C.purple }}>Contact</span>
              </div>

              {/* H1 */}
              <h1 className="ct-h1" style={{
                fontWeight:300,
                fontSize:'clamp(2.5rem,5vw,4.5rem)',
                lineHeight:1.1,
                letterSpacing:'.2px',
                margin:'0 0 1.5rem',
                background:'linear-gradient(180deg,#ffffff 20%,#c9c0ef 100%)',
                WebkitBackgroundClip:'text',backgroundClip:'text',
                WebkitTextFillColor:'transparent',
                filter:'drop-shadow(0 0 20px rgba(167,139,250,.5))',
              }}>
                Get in Touch<br/>with Us
              </h1>

              {/* Sub */}
              <p style={{ fontSize:'clamp(14px,1.2vw,16px)',lineHeight:1.7,color:C.muted,
                maxWidth:'44ch',margin:'0 0 2.5rem' }}>
                Have questions or need AI solutions? Let us know by filling out
                the form, and we'll be in touch!
              </p>

              {/* Info cards */}
              <div className="ct-info" style={{ display:'flex',gap:16 }}>
                {[
                  {
                    label:'Email', val:'hello@auraai.studio',
                    icon:<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v.3l-10 6.2L2 5.8v-.3Zm0 3.65V18.5A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5V9.15l-9.47 5.9a1 1 0 0 1-1.06 0L2 9.15Z"/>
                    </svg>,
                  },
                  {
                    label:'Phone', val:'+91 000 000 0000',
                    icon:<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"/>
                    </svg>,
                  },
                ].map(card => (
                  <div key={card.label} className="ct-infocard" style={{
                    flex:1,padding:'1rem 1.25rem',
                    background:C.cardBg,border:`1px solid ${C.cardBord}`,borderRadius:12,
                  }}>
                    <div style={{ display:'flex',alignItems:'center',gap:8,
                      marginBottom:8,color:'#fff',fontSize:14,fontWeight:600 }}>
                      <span style={{ color:C.purple,display:'flex' }}>{card.icon}</span>
                      {card.label}
                    </div>
                    <div style={{ fontSize:14,color:C.muted }}>{card.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: form card ── */}
            <div style={{
              background:C.cardBg,border:`1px solid ${C.cardBord}`,borderRadius:16,
              padding:'clamp(1.5rem,3vw,2.5rem)',
              boxShadow:'0 0 60px rgba(124,92,255,0.08)',
            }}>
              <h3 style={{ fontSize:'clamp(1.1rem,2vw,1.4rem)',fontWeight:600,
                color:'#fff',margin:'0 0 1.75rem',letterSpacing:'-0.01em' }}>
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>

                {/* Row 1 */}
                <div className="ct-row" style={{ display:'flex',gap:12 }}>
                  {[
                    { k:'firstName',id:'fn',label:'First name',type:'text', ph:'Your first name',req:true  },
                    { k:'lastName', id:'ln',label:'Last name', type:'text', ph:'Your last name', req:false },
                  ].map(f => (
                    <div key={f.k} style={{ flex:1,minWidth:0 }}>
                      <label htmlFor={f.id} style={{ display:'block',fontSize:12,fontWeight:500,
                        color:'rgba(241,239,250,.7)',marginBottom:6,letterSpacing:'0.04em',
                        textTransform:'uppercase' }}>
                        {f.label}
                      </label>
                      <input id={f.id} className="ct-input" type={f.type} required={f.req}
                        placeholder={f.ph} value={form[f.k as keyof FormState]}
                        onChange={set(f.k as keyof FormState)}/>
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="ct-row" style={{ display:'flex',gap:12 }}>
                  {[
                    { k:'email',id:'em',label:'Email',type:'email',ph:'you@company.com',    req:true  },
                    { k:'phone',id:'ph',label:'Phone',type:'tel',  ph:'+1 (000) 000-0000', req:false },
                  ].map(f => (
                    <div key={f.k} style={{ flex:1,minWidth:0 }}>
                      <label htmlFor={f.id} style={{ display:'block',fontSize:12,fontWeight:500,
                        color:'rgba(241,239,250,.7)',marginBottom:6,letterSpacing:'0.04em',
                        textTransform:'uppercase' }}>
                        {f.label}
                      </label>
                      <input id={f.id} className="ct-input" type={f.type} required={f.req}
                        placeholder={f.ph} value={form[f.k as keyof FormState]}
                        onChange={set(f.k as keyof FormState)}/>
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="ct-msg" style={{ display:'block',fontSize:12,fontWeight:500,
                    color:'rgba(241,239,250,.7)',marginBottom:6,letterSpacing:'0.04em',
                    textTransform:'uppercase' }}>
                    Message
                  </label>
                  <textarea id="ct-msg" className="ct-textarea" required
                    placeholder="Hi, I'm interested in AI video production..."
                    value={form.message} onChange={set('message')}/>
                </div>

                {error && <p style={{ fontSize:13,color:'#f87171',margin:0 }}>{error}</p>}

                {/* Submit */}
                <button type="submit" className="ct-submit" disabled={submitting} style={{
                  display:'block',width:'100%',height:48,marginTop:4,
                  border:0,borderRadius:8,
                  cursor:submitting?'not-allowed':'pointer',
                  font:'600 15px/48px "Figtree","Inter",sans-serif',
                  color:'#fff',
                  background:'linear-gradient(180deg,#9468f2 0%,#a98af9 100%)',
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,.18),0 0 28px rgba(139,92,246,.3)',
                  opacity:submitting?.7:1,
                }}>
                  {submitting ? 'Sending…' : 'Submit form'}
                </button>

              </form>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
