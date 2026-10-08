import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

export function Input({ label, error, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <div>
      {label && <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">{label}</label>}
      <input
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
          } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <div>
      {label && <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">{label}</label>}
      <textarea
        className={`w-full resize-none rounded-lg border bg-ink-950/50 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
          } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, error, className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div>
      {label && <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">{label}</label>}
      <select
        className={`w-full rounded-lg border bg-ink-950/50 px-4 py-2.5 text-sm text-white transition-colors focus:outline-none ${error ? 'border-red-500/50' : 'border-white/10 focus:border-accent-500/40'
          } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${checked ? 'bg-accent-500' : 'bg-ink-600'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`}
        />
      </button>
      {label && <span className="text-sm text-ink-200">{label}</span>}
    </label>
  );
}

