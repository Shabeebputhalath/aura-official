import { useEffect, useState, useMemo } from 'react';
import { Search, Mail, ChevronDown, Trash2, ExternalLink, Phone, Clock, DollarSign, Monitor } from 'lucide-react';
import { supabase, type Inquiry, type InquiryStatus } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Badge, StatusBadge } from '@/components/admin/Badge';
import { Select } from '@/components/admin/FormFields';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const statusOptions: { value: InquiryStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
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
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast('Failed to load inquiries', 'error');
    setInquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: InquiryStatus) {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) { toast('Failed to update status', 'error'); return; }
    toast('Status updated');
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  }

  async function doDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', deleteId);
    if (error) { toast('Delete failed', 'error'); setDeleteId(null); return; }
    toast('Inquiry deleted');
    setDeleteId(null);
    setExpandedId(null);
    load();
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return inquiries.filter(i => {
      const matchSearch =
        !q ||
        i.full_name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.company || '').toLowerCase().includes(q) ||
        (i.project_type || '').toLowerCase().includes(q);
      const matchStatus = filterStatus === 'all' || i.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [inquiries, search, filterStatus]);

  // Status count badges
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    inquiries.forEach(i => { map[i.status] = (map[i.status] ?? 0) + 1; });
    return map;
  }, [inquiries]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Inquiries"
        subtitle={`${inquiries.length} total · ${counts['new'] ?? 0} new`}
      />

      {/* Status summary pills */}
      {inquiries.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {statusOptions.slice(1).map(s => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(filterStatus === s.value ? 'all' : s.value)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${
                filterStatus === s.value
                  ? 'border-accent-500/40 bg-accent-500/15 text-accent-300'
                  : 'border-white/[0.06] text-ink-400 hover:text-white'
              }`}
            >
              {s.label}
              {counts[s.value] !== undefined && (
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                  {counts[s.value]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Search + filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, company, or project type..."
            className="w-full rounded-lg border border-white/10 bg-ink-950/50 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-ink-500 focus:border-accent-500/40 focus:outline-none"
          />
        </div>
        <div className="sm:w-44">
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {statusOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Mail className="h-7 w-7" />}
            title="No inquiries found"
            message={
              search || filterStatus !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Contact form submissions will appear here.'
            }
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(i => (
            <Card key={i.id} className="overflow-hidden">
              {/* Row header */}
              <button
                onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-accent-700/20 text-sm font-semibold text-accent-300">
                  {i.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm font-semibold text-white">{i.full_name}</span>
                    {i.company && (
                      <span className="hidden text-xs text-ink-500 sm:inline">· {i.company}</span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink-400">
                    {i.email}
                    {i.project_type && ` · ${i.project_type}`}
                    {i.budget && ` · ${i.budget}`}
                    {' · '}
                    {new Date(i.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {/* Status select — stop propagation so it doesn't toggle expand */}
                  <div onClick={e => e.stopPropagation()}>
                    <Select
                      value={i.status}
                      onChange={e => updateStatus(i.id, e.target.value as InquiryStatus)}
                      className="w-34 py-1.5 text-xs"
                    >
                      {statusOptions.slice(1).map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </Select>
                  </div>
                  {/* Delete button */}
                  <div onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setDeleteId(i.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${
                      expandedId === i.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded detail */}
              {expandedId === i.id && (
                <div className="border-t border-white/[0.06] bg-white/[0.01] p-5">
                  {/* Status badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <StatusBadge status={i.status} />
                    <span className="text-xs text-ink-500">
                      Submitted {new Date(i.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Grid of fields */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem label="Full Name" value={i.full_name} />
                    <DetailItem label="Email" value={i.email} isEmail />
                    {i.company && <DetailItem label="Company" value={i.company} />}
                    {i.phone && (
                      <DetailItem
                        label="Phone / WhatsApp"
                        value={i.phone}
                        icon={<Phone className="h-3.5 w-3.5" />}
                      />
                    )}
                    {i.project_type && <DetailItem label="Project Type" value={i.project_type} />}
                    {i.budget && (
                      <DetailItem
                        label="Budget"
                        value={i.budget}
                        icon={<DollarSign className="h-3.5 w-3.5" />}
                      />
                    )}
                    {i.timeline && (
                      <DetailItem
                        label="Timeline"
                        value={i.timeline}
                        icon={<Clock className="h-3.5 w-3.5" />}
                      />
                    )}
                    {i.target_platform && (
                      <DetailItem
                        label="Target Platform"
                        value={i.target_platform}
                        icon={<Monitor className="h-3.5 w-3.5" />}
                      />
                    )}
                    {i.duration && <DetailItem label="Duration" value={i.duration} />}
                  </div>

                  {/* Message */}
                  {i.details && (
                    <div className="mt-5">
                      <div className="text-xs font-medium uppercase tracking-wider text-ink-500">
                        Message
                      </div>
                      <p className="mt-2 rounded-lg border border-white/[0.04] bg-ink-950/40 p-4 text-sm leading-relaxed text-ink-200">
                        {i.details}
                      </p>
                    </div>
                  )}

                  {/* Reference URL */}
                  {i.reference_url && i.reference_url !== 'null' && (
                    <div className="mt-4">
                      <div className="text-xs font-medium uppercase tracking-wider text-ink-500">
                        Reference URL
                      </div>
                      <a
                        href={i.reference_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-1.5 text-sm text-accent-400 hover:text-accent-300 transition-colors"
                      >
                        {i.reference_url}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-3">
                      <a
                        href={`mailto:${i.email}`}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-ink-300 transition-colors hover:text-white hover:bg-white/[0.03]"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Reply by Email
                      </a>
                    </div>
                    <button
                      onClick={() => setDeleteId(i.id)}
                      className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete Inquiry
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Inquiry"
        message="Permanently delete this inquiry? This cannot be undone."
      />
    </div>
  );
}

function DetailItem({
  label,
  value,
  isEmail = false,
  icon,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink-500">
        {icon}
        {label}
      </div>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="mt-1 block text-sm text-accent-400 hover:text-accent-300 transition-colors"
        >
          {value}
        </a>
      ) : (
        <div className="mt-1 text-sm text-ink-100">{value}</div>
      )}
    </div>
  );
}
