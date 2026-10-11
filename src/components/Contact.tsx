import { useState } from 'react';
import { Check, Paperclip } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const interests = [
  'AI Commercial',
  'Brand Film',
  'Product Video',
  'Social Media',
  'Music Video',
  'Other',
];

interface FormState {
  name: string;
  email: string;
  project: string;
}

const empty: FormState = { name: '', email: '', project: '' };

export default function Contact() {
  const [selected, setSelected]     = useState<string[]>([]);
  const [form, setForm]             = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  function toggleTag(tag: string) {
    setSelected(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.from('inquiries').insert({
      full_name:    form.name,
      email:        form.email,
      project_type: selected.join(', ') || 'General',
      details:      form.project,
      budget: '', timeline: '', reference_url: '', company: '',
      status: 'new',
    });
    setSubmitting(false);
    if (err) { setError('Something went wrong. Please try again.'); return; }
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden">

      {/* ── Full-bleed video — visible on BOTH sides ─────────────── */}
      <div className="absolute inset-0">
        <video
          autoPlay loop muted playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src="/Purple_liquid_flows_on_black_20260921175622.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark scrim so form text stays readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ── Brand label top-left ─────────────────────────────────── */}
      <div className="absolute left-8 top-8 z-10 sm:left-12 sm:top-10">
        {/* <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          AURA AI
        </span> */}
      </div>

      {/* ── Left headline + email — visible over video ───────────── */}
      <div className="absolute bottom-10 left-8 z-10 sm:bottom-14 sm:left-12 lg:bottom-16 lg:left-16">
        <h2
          className="font-display font-bold leading-[1.05] tracking-tight text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '10ch' }}
        >
          Have a project?
          <br />
          We would love
          to help.
        </h2>
        <p className="mt-6 text-sm text-white/50">hello@auraai.studio</p>
      </div>

      {/* ── Centered form panel — floating on top of the full video ─ */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-24 lg:justify-end lg:pr-16 xl:pr-24">
        <div
          className="w-full max-w-xl overflow-hidden"
          style={{
            background:   'rgba(10,10,10,0.82)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: '1.25rem',
            border:       '1px solid rgba(255,255,255,0.07)',
            minHeight:    '88vh',
            display:      'flex',
            flexDirection:'column',
          }}
        >
          {submitted ? (
            /* ── Success ── */
            <div className="flex flex-col items-center gap-5 px-8 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Request received.</h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/50">
                Thanks for reaching out — we'll be in touch within 24 hours.
              </p>
              <button
                onClick={() => { setForm(empty); setSelected([]); setSubmitted(false); }}
                className="mt-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/8"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">

              {/* Mini nav */}
              <div className="flex items-center justify-end gap-6 border-b border-white/[0.07] px-7 py-4">
                <span className="cursor-pointer text-[12px] text-white/35 transition-colors hover:text-white/60">Works</span>
                <span className="cursor-pointer text-[12px] text-white/35 transition-colors hover:text-white/60">About</span>
                <span className="text-[12px] font-semibold text-white">Contacts</span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between gap-8 px-7 py-8">

                {/* Interested in */}
                <div>
                  <p className="mb-3.5 text-[12px] text-white/45">I'm interested in…</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="rounded-full px-3.5 py-1 text-[12px] font-medium transition-all duration-150"
                        style={{
                          border:     `1px solid ${selected.includes(tag) ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.15)'}`,
                          background: selected.includes(tag) ? 'rgba(255,255,255,0.1)' : 'transparent',
                          color:      selected.includes(tag) ? '#ffffff' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Underline inputs */}
                <div className="flex flex-col gap-0">
                  {[
                    { key: 'name',    type: 'text',  ph: 'Your name',                    req: true  },
                    { key: 'email',   type: 'email', ph: 'Your email',                   req: true  },
                    { key: 'project', type: 'text',  ph: 'Tell us about your project',   req: false },
                  ].map(field => (
                    <div key={field.key} className="border-b border-white/[0.1] py-3.5">
                      <input
                        type={field.type}
                        required={field.req}
                        value={form[field.key as keyof FormState]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.ph}
                        className="w-full bg-transparent text-[14px] text-white placeholder:text-white/28 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Attachment */}
                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-white/40 transition-colors hover:text-white/65">
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>Add attachment</span>
                  <input type="file" className="sr-only" />
                </label>

                {error && <p className="text-xs text-red-400">{error}</p>}

                {/* Submit */}
                <div className="pb-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-black transition-all duration-200 hover:bg-white/90 disabled:opacity-50"
                  >
                    {submitting ? 'Sending…' : 'Sent request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
