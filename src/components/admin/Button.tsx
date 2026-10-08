import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:shadow-lg hover:shadow-accent-500/25',
  secondary: 'border border-white/10 bg-white/[0.02] text-ink-100 hover:border-white/20 hover:bg-white/5',
  ghost: 'text-ink-300 hover:bg-white/5 hover:text-white',
  danger: 'border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
};

export function Button({ variant = 'secondary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

