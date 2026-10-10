import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Sparkles, Eye, EyeOff } from 'lucide-react';
import { supabase, type Capability } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = { label: '', image_url: '', is_active: true };

export function CapabilitiesPage() {
  const { toast } = useToast();
  const [caps, setCaps] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) toast('Failed to load capabilities', 'error');
    setCaps(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  }

  function openEdit(c: Capability) {
    setForm({ label: c.label, image_url: c.image_url, is_active: c.is_active });
    setEditId(c.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.label.trim()) { toast('Label is required', 'error'); return; }
    if (!form.image_url.trim()) { toast('Image URL is required', 'error'); return; }
    setSaving(true);

    if (editId) {
      const { error } = await supabase
        .from('capabilities')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update capability', 'error'); setSaving(false); return; }
      toast('Capability updated');
    } else {
      const maxOrder = caps.length > 0 ? Math.max(...caps.map(c => c.sort_order)) : 0;
      const { error } = await supabase
        .from('capabilities')
        .insert({ ...form, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to add capability', 'error'); setSaving(false); return; }
      toast('Capability added');
    }

    setSaving(false);
    setModalOpen(false);
    load();
  }

  async function toggleActive(c: Capability) {
    const { error } = await supabase
      .from('capabilities')
      .update({ is_active: !c.is_active, updated_at: new Date().toISOString() })
      .eq('id', c.id);
    if (error) { toast('Failed to update', 'error'); return; }
    load();
  }

  async function moveOrder(c: Capability, dir: -1 | 1) {
    const sorted = [...caps].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex(x => x.id === c.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    const [r1, r2] = await Promise.all([
      supabase.from('capabilities').update({ sort_order: other.sort_order }).eq('id', c.id),
      supabase.from('capabilities').update({ sort_order: c.sort_order }).eq('id', other.id),
    ]);
    if (r1.error || r2.error) { toast('Reorder failed', 'error'); return; }
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from('capabilities').delete().eq('id', deleteId);
    if (error) { toast('Delete failed', 'error'); setDeleteId(null); return; }
    toast('Capability deleted');
    setDeleteId(null);
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Capabilities"
        subtitle={`${caps.length} item${caps.length === 1 ? '' : 's'} · shown in the scrolling gallery on the homepage`}
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Capability
          </Button>
        }
      />

      {/* Preview hint */}
      <div className="mb-5 rounded-lg border border-accent-500/15 bg-accent-500/[0.06] px-4 py-3 text-xs text-accent-300">
        These appear in the horizontal scroll gallery on the homepage. Each card uses a 9:16 (Instagram Reel) aspect ratio. Drag to reorder using the arrows.
      </div>

      {caps.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Sparkles className="h-7 w-7" />}
            title="No capabilities yet"
            message="Add your first capability to populate the scrolling gallery."
            action={
              <Button variant="primary" onClick={openAdd}>
                <Plus className="h-4 w-4" /> Add Capability
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {caps.map((c, i) => (
            <Card key={c.id} className="p-3">
              <div className="flex items-center gap-4">
                {/* Reorder */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveOrder(c, -1)}
                    disabled={i === 0}
                    className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveOrder(c, 1)}
                    disabled={i === caps.length - 1}
                    className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Thumbnail — 9:16 mini preview */}
                <div
                  className="relative shrink-0 overflow-hidden rounded-lg border border-white/[0.06]"
                  style={{ width: 36, height: 64 }}
                >
                  <img
                    src={c.image_url}
                    alt={c.label}
                    className="h-full w-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).style.opacity = '0.2';
                    }}
                  />
                  {!c.is_active && (
                    <div className="absolute inset-0 bg-ink-950/60" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-white">{c.label}</span>
                    <Badge variant={c.is_active ? 'success' : 'default'}>
                      {c.is_active ? 'Visible' : 'Hidden'}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-500">{c.image_url}</p>
                </div>

                {/* Sort order badge */}
                <div className="hidden shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 sm:flex">
                  <span className="text-xs font-medium text-ink-400">#{c.sort_order}</span>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => toggleActive(c)}
                    title={c.is_active ? 'Hide from website' : 'Show on website'}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                      c.is_active
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 text-ink-400 hover:text-white'
                    }`}
                  >
                    {c.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => openEdit(c)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Grid preview of active cards */}
      {caps.filter(c => c.is_active).length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-500">
            Live preview — active cards ({caps.filter(c => c.is_active).length})
          </p>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {caps.filter(c => c.is_active).map(c => (
              <div
                key={c.id}
                className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.06]"
                style={{ width: 90, aspectRatio: '9/16' }}
              >
                <img
                  src={c.image_url}
                  alt={c.label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-[9px] font-semibold text-white">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Edit Capability' : 'Add Capability'}
      >
        <div className="space-y-5">
          <Input
            label="Label"
            value={form.label}
            onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
            placeholder="e.g. Cinematic Worlds"
          />
          <Input
            label="Image URL"
            value={form.image_url}
            onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
            placeholder="https://images.pexels.com/..."
          />

          {/* Live image preview */}
          {form.image_url && (
            <div className="flex items-start gap-4">
              <div
                className="relative shrink-0 overflow-hidden rounded-lg border border-white/[0.06]"
                style={{ width: 60, aspectRatio: '9/16' }}
              >
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                />
              </div>
              <p className="mt-1 text-xs text-ink-400">
                9:16 preview — this is how the card will look in the gallery.
              </p>
            </div>
          )}

          <Toggle
            checked={form.is_active}
            onChange={v => setForm(f => ({ ...f, is_active: v }))}
            label="Visible on website"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Capability'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Capability"
        message="Remove this item from the scrolling gallery? This cannot be undone."
      />
    </div>
  );
}
