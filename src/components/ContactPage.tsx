import { useState, useRef } from 'react';
import {
  ArrowUpRight, ArrowLeft, ArrowRight, Check, Upload, Mail, Phone, MapPin,
  Instagram, Youtube, Linkedin, Sparkles, FileText, Clapperboard, X,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  duration: string;
  targetPlatform: string;
  referenceUrl: string;
  fileName: string;
  budget: string;
  timeline: string;
}

const initialForm: FormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  description: '',
  duration: '',
  targetPlatform: '',
  referenceUrl: '',
  fileName: '',
  budget: '',
  timeline: '',
};

const projectTypes = [
  'AI Commercial', 'Brand Film', 'Product Video', 'Social Media',
  'Music Video', 'Concept Film', 'AI Character / World', 'Other',
];

const budgetRanges = [
  'Under $500', '$500–$1,500', '$1,500–$5,000', '$5,000–$10,000', '$10,000+',
];

const timelines = ['ASAP', '1–2 weeks', '2–4 weeks', '1–2 months', 'Flexible'];

const platforms = ['YouTube', 'Instagram', 'TikTok', 'Website', 'Presentation', 'Other'];

const nextSteps = [
  { number: '01', title: 'YOU SEND THE IDEA', description: 'Tell us what you\'re imagining. Share your concept, references, and goals through the form above.', icon: FileText },
  { number: '02', title: 'WE BUILD THE PLAN', description: 'Our creative team reviews your project and develops a production approach within 24 hours.', icon: Sparkles },
  { number: '03', title: 'WE CREATE', description: 'We turn the concept into a polished cinematic experience. You get your film, delivered.', icon: Clapperboard },
];

const faqs = [
  { q: 'How quickly will you respond?', a: 'We review every inquiry within 24 hours. Most project plans are delivered within 1–2 business days, depending on complexity.' },
  { q: 'Do you work internationally?', a: 'Yes. We work with clients worldwide — from Kerala to New York. Our entire production process is remote and asynchronous.' },
  { q: 'Can I send a reference video?', a: 'Absolutely. Include a link in the reference field or attach a brief. References help us understand your vision faster.' },
  { q: 'Do you work with startups?', a: 'We do. Many of our clients are early-stage companies that need premium visual content without traditional production costs. We offer flexible packages for startups.' },
  { q: 'Can you work with an existing script?', a: 'Yes. If you have a script, treatment, or storyboard, share it in the project description or upload it with your brief. We\'ll build the production around it.' },
  { q: 'Do you offer custom packages?', a: 'Every project is unique. If our standard plans don\'t fit, select "Other" or describe your needs — we\'ll build a custom production plan and quote.' },
];

const totalSteps = 4;
const stepLabels = ['ABOUT YOU', 'YOUR PROJECT', 'PROJECT DETAILS', 'BUDGET & TIMELINE'];

export default function ContactPage({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-ink-950">
      {submitted ? (
        <SuccessState onBack={() => { setSubmitted(false); }} onHome={() => onNavigateHome?.()} />
      ) : (
        <>
          <ContactHero />
          <MultiStepForm onSubmitSuccess={() => setSubmitted(true)} />
          <ContactInfo />
          <NextSteps />
          <ContactFAQ />
        </>
      )}
    </div>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */

function ContactHero() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center overflow-hidden pt-24">
      {/* Animated cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-[30%] h-[400px] w-[400px] rounded-full bg-accent-600/12 blur-[140px] animate-pulse-slow" />
          <div className="absolute right-[15%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-accent-500/8 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-4xl">
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md animate-fade-down"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-200">Start a Project</span>
          </div>

          <h1
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Let's Make Something
            <br />
            <span className="text-gradient-accent">Impossible.</span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Have a campaign, product, film, or wild idea in mind? Tell us about it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── MULTI-STEP FORM ──────────────────────────────────────────────────── */

function MultiStepForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = 'Required';
      if (!form.email.trim()) {
        e.email = 'Required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        e.email = 'Enter a valid email';
      }
    } else if (s === 1) {
      if (!form.projectType) e.projectType = 'Please select a project type';
    } else if (s === 2) {
      if (!form.description.trim()) e.description = 'Tell us about your project';
    } else if (s === 3) {
      if (!form.budget) e.budget = 'Please select a budget';
      if (!form.timeline) e.timeline = 'Please select a timeline';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, totalSteps - 1));
      window.scrollTo({ top: window.scrollY + 200, behavior: 'smooth' });
    }
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      update('fileName', file.name);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const { error } = await supabase.from('inquiries').insert({
        full_name: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone || null,
        project_type: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        details: form.description,
        reference_url: form.referenceUrl || null,
        target_platform: form.targetPlatform || null,
        duration: form.duration || null,
        status: 'new',
      });
      if (error) throw error;
      setForm(initialForm);
      setStep(0);
      onSubmitSuccess();
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <section className="relative py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div ref={ref} className={`reveal-scale transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
          {/* Progress bar */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent-400">
              Step {step + 1} of {totalSteps} — {stepLabels[step]}
            </span>
            <span className="text-xs text-ink-400">{Math.round(progress)}% complete</span>
          </div>
          <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-white/[0.06] bg-ink-850/50 p-8 backdrop-blur-sm lg:p-10">
            {/* Step 0 — About You */}
            {step === 0 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">About You</h3>
                  <p className="mt-2 text-sm text-ink-400">Let's start with who you are.</p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormInput label="Full Name" value={form.fullName} onChange={(v) => update('fullName', v)} error={errors.fullName} placeholder="Jane Doe" />
                  <FormInput label="Company / Brand" value={form.company} onChange={(v) => update('company', v)} placeholder="Acme Inc." />
                </div>
                <FormInput label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} error={errors.email} placeholder="jane@acme.com" />
                <FormInput label="Phone / WhatsApp" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+1 555 000 0000 (optional)" />
              </div>
            )}

            {/* Step 1 — Your Project */}
            {step === 1 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Your Project</h3>
                  <p className="mt-2 text-sm text-ink-400">What are we creating together?</p>
                </div>
                <FormSelect
                  label="Project Type"
                  value={form.projectType}
                  onChange={(v) => update('projectType', v)}
                  options={projectTypes}
                  error={errors.projectType}
                  placeholder="Select a project type"
                />
                <FormSelect
                  label="Target Platform"
                  value={form.targetPlatform}
                  onChange={(v) => update('targetPlatform', v)}
                  options={platforms}
                  placeholder="Where will this live? (optional)"
                />
              </div>
            )}

            {/* Step 2 — Project Details */}
            {step === 2 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Project Details</h3>
                  <p className="mt-2 text-sm text-ink-400">The more we know, the better we can plan.</p>
                </div>
                <div>
                  <FormLabel label="Project Description" />
                  <textarea
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    rows={5}
                    placeholder="Describe your vision, goals, story, style, and any references..."
                    className={`w-full resize-none rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'}`}
                  />
                  {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormInput label="Desired Duration" value={form.duration} onChange={(v) => update('duration', v)} placeholder="e.g. 30 seconds, 2 minutes" />
                  <FormInput label="Reference Website" value={form.referenceUrl} onChange={(v) => update('referenceUrl', v)} placeholder="https://..." />
                </div>
                <div>
                  <FormLabel label="Upload Brief / Reference Files" />
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center gap-3 rounded-lg border border-dashed border-white/15 bg-ink-950/30 px-4 py-5 text-left transition-colors hover:border-accent-500/30"
                  >
                    <Upload className="h-5 w-5 shrink-0 text-ink-400" />
                    <span className="text-sm text-ink-300">
                      {form.fileName || 'Drop a file or click to upload'}
                    </span>
                    {form.fileName && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); update('fileName', ''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="ml-auto text-ink-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                  <p className="mt-2 text-xs text-ink-500">PDF, DOC, MOV, MP4, or images. Max 50MB.</p>
                </div>
              </div>
            )}

            {/* Step 3 — Budget & Timeline */}
            {step === 3 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Budget & Timeline</h3>
                  <p className="mt-2 text-sm text-ink-400">Help us scope the right production plan.</p>
                </div>
                <div>
                  <FormLabel label="Budget" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgetRanges.map((b) => (
                      <OptionCard key={b} label={b} selected={form.budget === b} onClick={() => update('budget', b)} />
                    ))}
                  </div>
                  {errors.budget && <p className="mt-2 text-xs text-red-400">{errors.budget}</p>}
                </div>
                <div>
                  <FormLabel label="Timeline" />
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {timelines.map((t) => (
                      <OptionCard key={t} label={t} selected={form.timeline === t} onClick={() => update('timeline', t)} />
                    ))}
                  </div>
                  {errors.timeline && <p className="mt-2 text-xs text-red-400">{errors.timeline}</p>}
                </div>
              </div>
            )}

            {/* Error */}
            {submitError && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${step === 0 ? 'cursor-not-allowed text-ink-600' : 'text-ink-300 hover:text-white'}`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              {step < totalSteps - 1 ? (
                <button type="button" onClick={next} className="btn-primary group">
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary group"
                >
                  <span>{submitting ? 'Sending...' : 'Send Project Inquiry'}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Step dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-accent-400' : i < step ? 'w-4 bg-accent-600/40' : 'w-4 bg-white/[0.08]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT INFO ─────────────────────────────────────────────────────── */

function ContactInfo() {
  const { ref, visible } = useReveal();

  const items = [
    { icon: Mail, label: 'Email', value: 'hello@aura-ai.com', href: 'mailto:hello@aura-ai.com' },
    { icon: Phone, label: 'WhatsApp', value: '+XX XXX XXX XXXX', href: '#' },
    { icon: MapPin, label: 'Studio', value: 'Kerala, India', href: '#' },
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-accent-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>Contact</p>
            <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              Direct <span className="text-gradient-accent">Lines.</span>
            </h2>
            <p className={`reveal mt-6 text-lg text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              Prefer to reach out directly? We're here. Drop a line, send a brief, or just say hello.
            </p>

            <div className="mt-12 space-y-6">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`reveal group flex items-center gap-5 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-ink-850/60 text-accent-400 transition-all duration-500 group-hover:border-accent-500/30 group-hover:bg-accent-500/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">{item.label}</div>
                      <div className="mt-1 text-base text-white transition-colors duration-300 group-hover:text-accent-300">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social links */}
          <div className={`reveal flex flex-col justify-center transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Follow the Studio</p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-ink-850/60 text-ink-200 transition-all duration-500 hover:border-accent-500/30 hover:bg-accent-500/10 hover:text-accent-400"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-ink-850/40 p-6">
              <p className="text-sm leading-relaxed text-ink-200">
                We typically respond within <span className="text-white font-medium">24 hours</span>.
                For urgent requests, mention "ASAP" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WHAT HAPPENS NEXT ────────────────────────────────────────────────── */

function NextSteps() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>What Happens Next</p>
          <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            From Idea to <span className="text-gradient-accent">Film.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`reveal group relative rounded-2xl border border-white/[0.06] bg-ink-850/40 p-8 backdrop-blur-sm transition-all duration-700 hover:border-white/[0.12] ${visible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-white/[0.08] transition-colors duration-500 group-hover:text-accent-500/20">
                    {step.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent-500/20 bg-accent-500/10 text-accent-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */

function ContactFAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-16">
          <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>FAQ</p>
          <h2 className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            Before You <span className="text-gradient-accent">Ask.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQRow key={i} faq={faq} index={i} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQRow({ faq, index, isOpen, onToggle, visible }: { faq: { q: string; a: string }; index: number; isOpen: boolean; onToggle: () => void; visible: boolean }) {
  return (
    <div
      className={`reveal overflow-hidden rounded-xl border bg-ink-850/40 transition-all duration-500 ${visible ? 'reveal-visible' : ''} ${isOpen ? 'border-accent-500/20' : 'border-white/[0.06]'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-6 text-left">
        <span className="font-display text-base font-semibold text-white lg:text-lg">{faq.q}</span>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-180 border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-300'}`}>
          {isOpen ? <X className="h-4 w-4" /> : <span className="text-lg leading-none">+</span>}
        </div>
      </button>
      {isOpen && (
        <div className="animate-fade-up px-6 pb-6">
          <p className="text-base leading-relaxed text-ink-200">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ── SUCCESS STATE ────────────────────────────────────────────────────── */

function SuccessState({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/15 blur-[140px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
          {/* Animated check */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent-500/30 bg-gradient-to-b from-accent-500/15 to-transparent">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
              <Check className="h-7 w-7 text-accent-300" />
            </div>
          </div>
        </div>

        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
          PROJECT <span className="text-gradient-accent">RECEIVED.</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-ink-200 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          Thanks for reaching out. Our creative team will review your project and
          get back to you shortly.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }} className="btn-primary group">
            <span>Back to AURA AI</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button onClick={onBack} className="btn-secondary">
            <span>Send Another Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FORM PRIMITIVES ──────────────────────────────────────────────────── */

function FormLabel({ label }: { label: string }) {
  return <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">{label}</label>;
}

function FormInput({
  label, value, onChange, error, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <FormLabel label={label} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function FormSelect({
  label, value, onChange, options, error, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; error?: string; placeholder?: string;
}) {
  return (
    <div>
      <FormLabel label={label} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'} ${!value ? 'text-ink-500' : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-900 text-white">{opt}</option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300 ${selected
          ? 'border-accent-500/40 bg-accent-500/10 text-white'
          : 'border-white/[0.08] bg-ink-950/40 text-ink-300 hover:border-white/[0.15] hover:text-white'
        }`}
    >
      {label}
      {selected && <Check className="mt-2 h-4 w-4 text-accent-400" />}
    </button>
  );
}

