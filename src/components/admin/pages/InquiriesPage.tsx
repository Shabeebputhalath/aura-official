import { useEffect, useState, useMemo } from 'react';
import { Search, Mail, ChevronDown } from 'lucide-react';
import { supabase, type Inquiry, type InquiryStatus } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Badge, StatusBadge } from '@/components/admin/Badge';
import { Select } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const statusOptions: { value: InquiryStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

export function InquiriesPage() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    setInquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) { toast('Failed to update status', 'error'); return; }
    toast('Status updated');
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: status as InquiryStatus } : i));
  }

  const filtered = useMemo(() => {
    return inquiries.filter(i => {
      const matchSearch = !search ||
        i.full_name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase()) ||
        i.company.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || i.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [inquiries, search, filterStatus]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Inquiries" subtitle={`${inquiries.length} total submissions`} />

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full rounded-lg border border-white/10 bg-ink-950/50 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-ink-500 focus:border-accent-500/40 focus:outline-none"
          />
        </div>
        <div className="sm:w-48">
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon={<Mail className="h-7 w-7" />} title="No inquiries found" message={search || filterStatus !== 'all' ? "Try adjusting your filters." : "Contact form submissions will appear here."} /></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((i) => (
            <Card key={i.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-accent-700/20 text-sm font-semibold text-accent-300">
                  {i.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-white">{i.full_name}</span>
                    <span className="hidden text-xs text-ink-500 sm:inline">· {i.email}</span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink-400">
                    {i.project_type} · {i.budget} · {new Date(i.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <div onClick={e => e.stopPropagation()}>
                    <Select
                      value={i.status}
                      onChange={e => updateStatus(i.id, e.target.value)}
                      className="w-32 py-1.5 text-xs"
                    >
                      {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </Select>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${expandedId === i.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {expandedId === i.id && (
                <div className="border-t border-white/[0.06] p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem label="Name" value={i.full_name} />
                    <DetailItem label="Company" value={i.company || '—'} />
                    <DetailItem label="Email" value={i.email} />
                    <DetailItem label="Project Type" value={i.project_type || '—'} />
                    <DetailItem label="Budget" value={i.budget || '—'} />
                    <DetailItem label="Timeline" value={i.timeline || '—'} />
                    <DetailItem label="Reference URL" value={i.reference_url || '—'} />
                    <DetailItem label="Date" value={new Date(i.created_at).toLocaleString()} />
                  </div>
                  <div className="mt-4">
                    <div className="text-xs font-medium uppercase tracking-wider text-ink-400">Message</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-200">{i.details}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-ink-500">{label}</div>
      <div className="mt-1 text-sm text-ink-100">{value}</div>
    </div>
  );
}

