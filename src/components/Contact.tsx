import { useState } from 'react';
import { ArrowUpRight, Check, Upload } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface FormData {
  fullName: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  reference: string;
}

const projectTypes = [
  'AI Commercial',
  'Brand Film',
  'Product Video',
  'Social Media',
  'Music Video',
  'Concept Film',
  'AI Character',
  'Other',
];

const budgetRanges = [
  '$500–$1,500',
  '$1,500–$5,000',
  '$5,000–$10,000',
  '$10,000+',
];

const initialForm: FormData = {
  fullName: '',
  company: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  details: '',
  reference: '',
};

export default function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your name';
    if (!form.email.trim()) {
      e.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!form.projectType) e.projectType = 'Please select a project type';
    if (!form.budget) e.budget = 'Please select a budget range';
    if (!form.details.trim()) e.details = 'Please tell us about your project';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <section id="contact" className="relative border-t border-white/[0.04] py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-600/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-accent-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading */}
          <div ref={ref}>
            <p className={`reveal section-label transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}>
              Start a Project
            </p>
            <h2
              className={`reveal mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              Have an Idea?
              <br />
              Let's Make It <span className="text-gradient-accent">Real.</span>
            </h2>
            <p
              className={`reveal mt-6 text-lg leading-relaxed text-ink-200 transition-all duration-700 ${visible ? 'reveal-visible' : ''
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              Tell us what you're imagining. We'll turn the idea into a cinematic
              production plan.
            </p>

            {/* Quick info */}
            <div
              className={`reveal mt-12 space-y-5 transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Email</div>
                <div className="mt-1 text-base text-white">hello@auraai.studio</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Location</div>
                <div className="mt-1 text-base text-white">Remote · Worldwide</div>
              </div>
            </div>
          </div>

          {/* Right: form / success */}
          <div className={`reveal-scale ${visible ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-accent-500/20 bg-gradient-to-b from-accent-500/[0.08] to-ink-950 p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-500/30 bg-accent-500/10">
                  <Check className="h-8 w-8 text-accent-400" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">
                  Thanks — your project is on its way.
                </h3>
                <p className="mt-3 text-base text-ink-200">
                  Your project is on its way to our creative team. We'll be in touch
                  within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  className="mt-8 btn-secondary"
                >
                  <span>Send Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-white/[0.06] bg-ink-850/60 p-8 backdrop-blur-sm lg:p-10"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    value={form.fullName}
                    onChange={(v) => update('fullName', v)}
                    error={errors.fullName}
                    placeholder="Jane Doe"
                  />
                  <FormField
                    label="Company / Brand"
                    value={form.company}
                    onChange={(v) => update('company', v)}
                    placeholder="Acme Inc."
                  />
                </div>

                <FormField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                  placeholder="jane@acme.com"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Project Type"
                    value={form.projectType}
                    onChange={(v) => update('projectType', v)}
                    options={projectTypes}
                    error={errors.projectType}
                    placeholder="Select type"
                  />
                  <SelectField
                    label="Estimated Budget"
                    value={form.budget}
                    onChange={(v) => update('budget', v)}
                    options={budgetRanges}
                    error={errors.budget}
                    placeholder="Select range"
                  />
                </div>

                <FormField
                  label="Desired Timeline"
                  value={form.timeline}
                  onChange={(v) => update('timeline', v)}
                  placeholder="e.g. 2–3 weeks"
                />

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
                    Tell us about your project
                  </label>
                  <textarea
                    value={form.details}
                    onChange={(e) => update('details', e.target.value)}
                    rows={4}
                    placeholder="Describe your vision, goals, and any references..."
                    className={`w-full resize-none rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${errors.details ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
                      }`}
                  />
                  {errors.details && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.details}</p>
                  )}
                </div>

                <FormField
                  label="Reference / Website URL"
                  value={form.reference}
                  onChange={(v) => update('reference', v)}
                  placeholder="https://..."
                />

                {/* Upload brief */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
                    Upload Brief <span className="text-ink-500">(optional)</span>
                  </label>
                  <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/15 bg-ink-950/30 px-4 py-4 transition-colors hover:border-accent-500/30">
                    <Upload className="h-5 w-5 text-ink-400" />
                    <span className="text-sm text-ink-300">Drop a file or click to upload</span>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary group w-full justify-center">
                  <span>Send Project Inquiry</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
          }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-3 text-sm text-white transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
          } ${!value ? 'text-ink-500' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-900 text-white">
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

