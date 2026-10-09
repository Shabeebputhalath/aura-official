import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Quote, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { supabase, type Testimonial } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = {
  client_name: '', company: '', position: '', quote: '', avatar_url: '', is_published: true,
};

export function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) toast('Failed to load testimonials', 'error');
    setTestimonials(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }
  function openEdit(t: Testimonial) {
    setForm({
      client_name: t.client_name, company: t.company, position: t.position,
      quote: t.quote, avatar_url: t.avatar_url, is_published: t.is_published,
    });
    setEditId(t.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.client_name.trim()) { toast('Client name is required', 'error'); return; }
    if (!form.quote.trim()) { toast('Testimonial quote is required', 'error'); return; }
    setSaving(true);
    if (editId) {
      const { error } = await supabase
        .from('testimonials')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update testimonial', 'error'); setSaving(false); return; }
      toast('Testimonial updated');
    } else {
      const maxOrder = testimonials.length > 0
        ? Math.max(...testimonials.map(t => t.sort_order))
        : 0;
      const { error } = await supabase
        .from('testimonials')
        .insert({ ...form, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to create testimonial', 'error'); setSaving(false); return; }
      toast('Testimonial created');
    }
    setSaving(false);
    setModalOpen(false);
    load();
  }

  async function togglePublished(t: Testimonial) {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_published: !t.is_published, updated_at: new Date().toISOString() })
      .eq('id', t.id);
    if (error) { toast('Failed to update', 'error'); return; }
    load();
  }

  async function moveOrder(t: Testimonial, dir: -1 | 1) {
    const sorted = [...testimonials].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex(x => x.id === t.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    const [r1, r2] = await Promise.all([
      supabase.from('testimonials').update({ sort_order: other.sort_order }).eq('id', t.id),
      supabase.from('testimonials').update({ sort_order: t.sort_order }).eq('id', other.id),
    ]);
    if (r1.error || r2.error) { toast('Reorder failed', 'error'); return; }
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', deleteId);
    if (error) { toast('Delete failed', 'error'); setDeleteId(null); return; }
    toast('Testimonial deleted');
    setDeleteId(null);
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle={`${testimonials.length} testimonial${testimonials.length === 1 ? '' : 's'}`}
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Testimonial
          </Button>
        }
      />

      {testimonials.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Quote className="h-7 w-7" />}
            title="No testimonials yet"
            message="Add your first client testimonial to display on the website."
            action={
              <Button variant="primary" onClick={openAdd}>
                <Plus className="h-4 w-4" /> Add Testimonial
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <Card key={t.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Reorder */}
                <div className="flex flex-col gap-1 pt-0.5">
                  <button
                    onClick={() => moveOrder(t, -1)}
                    disabled={i === 0}
                    className="text-ink-600 hover:text-ink-300 disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveOrder(t, 1)}
                    disabled={i === testimonials.length - 1}
                    className="text-ink-600 hover:text-ink-300 disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Avatar */}
                {t.avatar_url ? (
                  <img
                    src={t.avatar_url}
                    alt={t.client_name}
                    className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-accent-700/20 text-sm font-semibold text-accent-300">
                    {t.client_name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-white">{t.client_name}</h3>
                    <Badge variant={t.is_published ? 'success' : 'default'}>
                      {t.is_published ? 'Published' : 'Hidden'}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {t.position}{t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-200">
                "{t.quote}"
              </blockquote>

              {/* Actions */}
              <div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => togglePublished(t)}
                  title={t.is_published ? 'Hide testimonial' : 'Publish testimonial'}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                    t.is_published
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                      : 'border-white/10 text-ink-400 hover:text-white'
                  }`}
                >
                  {t.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Edit Testimonial' : 'Add Testimonial'}
        size="lg"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Client Name"
              value={form.client_name}
              onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
              placeholder="Sarah Chen"
            />
            <Input
              label="Company"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="VOLT Industries"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Position / Title"
              value={form.position}
              onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
              placeholder="VP of Marketing"
            />
            <Input
              label="Avatar URL"
              value={form.avatar_url}
              onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          {/* Avatar preview */}
          {form.avatar_url && (
            <div className="flex items-center gap-3">
              <img
                src={form.avatar_url}
                alt="Preview"
                className="h-14 w-14 rounded-full border border-white/10 object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-xs text-ink-400">Avatar preview</span>
            </div>
          )}

          <Textarea
            label="Testimonial Quote"
            rows={4}
            value={form.quote}
            onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
            placeholder="What the client said about working with AURA AI..."
          />
          <Toggle
            checked={form.is_published}
            onChange={v => setForm(f => ({ ...f, is_published: v }))}
            label="Published (visible on website)"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Testimonial'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Testimonial"
        message="Delete this testimonial? It will be removed from the website immediately."
      />
    </div>
  );
}
