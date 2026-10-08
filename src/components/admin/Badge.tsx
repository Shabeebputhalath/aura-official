interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  children: React.ReactNode;
}

const variants: Record<string, string> = {
  default: 'border-white/10 bg-white/[0.03] text-ink-200',
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  error: 'border-red-500/20 bg-red-500/10 text-red-300',
  info: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
  accent: 'border-accent-500/20 bg-accent-500/10 text-accent-300',
};

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    new: { variant: 'info', label: 'New' },
    contacted: { variant: 'warning', label: 'Contacted' },
    in_progress: { variant: 'accent', label: 'In Progress' },
    completed: { variant: 'success', label: 'Completed' },
    archived: { variant: 'default', label: 'Archived' },
  };
  const config = map[status] ?? { variant: 'default' as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

