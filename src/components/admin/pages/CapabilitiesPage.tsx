import { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Sparkles, Eye, EyeOff, Film, Image } from 'lucide-react';
import { supabase, type Capability } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = { label: '', image_url: '', video_url: '', is_active: true };

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

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }

  function openEdit(c: Capability) {
    setForm({ label: c.label, image_url: c.image_url, video_url: c.video_url ?? '', is_active: c.is_active });
    setEditId(c.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.label.trim()) { toast('Label is required', 'error'); return; }
    if (!form.image_url.trim()) { toast('Image URL (thumbnail) is required', 'error'); return; }
    setSaving(true);
    const payload = {
      label: form.label,
      image_url: form.image_url,
      video_url: form.video_url.trim() || null,
      is_active: form.is_active,
    };
    if (editId) {
      const { error } = await supabase
        .from('capabilities')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update', 'error'); setSaving(false); return; }
      toast('Capability updated');
    } else {
      const maxOrder = caps.length > 0 ? Math.max(...caps.map(c => c.sort_order)) : 0;
      const { error } = await supabase
        .from('capabilities')
        .insert({ ...payload, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to add capability', 'error'); setSaving(false); return; }
      toast('Capability added');
    }
    setSaving(false); setModalOpen(false); load();
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
    toast('Capability deleted'); setDeleteId(null); load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Capabilities"
        subtitle={`${caps.length} item${caps.length === 1 ? '' : 's'} · scrolling reel gallery on the homepage`}
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Reel
          </Button>
        }
      />

      <div className="mb-5 rounded-lg border border-accent-500/15 bg-accent-500/[0.06] px-4 py-3 text-xs text-accent-300">
        Each card is a 9:16 reel. Add a <strong>Video URL</strong> to play a video on the card — or leave it blank to show the image only. The image always acts as the thumbnail/poster.
      </div>

      {caps.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Sparkles className="h-7 w-7" />}
            title="No reels yet"
            message="Add your first reel to populate the scrolling gallery."
            action={<Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Reel</Button>}
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {caps.map((c, i) => (
            <Card key={c.id} className="p-3">
              <div className="flex items-center gap-3">
                {/* Reorder */}
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveOrder(c, -1)} disabled={i === 0} className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => moveOrder(c, 1)} disabled={i === caps.length - 1} className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors"><ArrowDown className="h-4 w-4" /></button>
                </div>

                {/* 9:16 thumbnail */}
                <div className="relative shrink-0 overflow-hidden rounded-lg border border-white/[0.06]" style={{ width: 36, height: 64 }}>
                  <img src={c.image_url} alt={c.label} className="h-full w-full object-cover" />
                  {!c.is_active && <div className="absolute inset-0 bg-ink-950/60" />}
                  {/* Video indicator */}
                  {c.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/60">
                        <Film className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-white">{c.label}</span>
                    {/* Media type badge */}
                    {c.video_url
                      ? <Badge variant="accent"><Film className="h-2.5 w-2.5" /> Video</Badge>
                      : <Badge variant="default"><Image className="h-2.5 w-2.5" /> Image</Badge>
                    }
                    <Badge variant={c.is_active ? 'success' : 'default'}>{c.is_active ? 'Visible' : 'Hidden'}</Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-600">
                    {c.video_url ? c.video_url : c.image_url}
                  </p>
                </div>

                <div className="hidden shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 sm:flex">
                  <span className="text-xs font-medium text-ink-400">#{c.sort_order}</span>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => toggleActive(c)} title={c.is_active ? 'Hide' : 'Show'} className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${c.is_active ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'}`}>
                    {c.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(c)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDeleteId(c.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Live preview strip */}
      {caps.filter(c => c.is_active).length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-500">
            Live preview — {caps.filter(c => c.is_active).length} active reels
          </p>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {caps.filter(c => c.is_active).map(c => (
              <PreviewCard key={c.id} cap={c} />
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Reel' : 'Add Reel'} size="lg">
        <div className="space-y-5">
          <Input
            label="Label"
            value={form.label}
            onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
            placeholder="e.g. Cinematic Worlds"
          />

          {/* Image URL */}
          <Input
            label="Thumbnail / Image URL"
            value={form.image_url}
            onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
            placeholder="https://images.pexels.com/..."
          />

          {/* Video URL */}
          <div>
            <Input
              label="Video URL (optional)"
              value={form.video_url}
              onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))}
              placeholder="https://... .mp4 or hosted video URL"
            />
            <p className="mt-1.5 text-xs text-ink-500">
              Leave blank to show the image only. Supported: direct .mp4 links, Cloudinary, Supabase Storage, etc.
            </p>
          </div>

          {/* Live preview */}
          {(form.image_url || form.video_url) && (
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.06]" style={{ width: 80, aspectRatio: '9/16' }}>
                {form.video_url ? (
                  <video
                    src={form.video_url}
                    poster={form.image_url || undefined}
                    autoPlay muted loop playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src={form.image_url} alt="Preview" className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 px-1.5 pb-1.5 text-[8px] font-semibold text-white leading-tight">{form.label || 'Label'}</p>
              </div>
              <div className="mt-1 space-y-1">
                <p className="text-xs font-medium text-white">9:16 Preview</p>
                <p className="text-xs text-ink-400">{form.video_url ? '▶ Video will autoplay muted' : '🖼 Image mode'}</p>
              </div>
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
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Reel'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Reel"
        message="Remove this reel from the gallery? This cannot be undone."
      />
    </div>
  );
}

/* Small preview card used in the live preview strip */
function PreviewCard({ cap }: { cap: Capability }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.06]" style={{ width: 90, aspectRatio: '9/16' }}>
      {cap.video_url ? (
        <video
          ref={videoRef}
          src={cap.video_url}
          poster={cap.image_url || undefined}
          autoPlay muted loop playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img src={cap.image_url} alt={cap.label} className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
      {cap.video_url && (
        <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Film className="h-2.5 w-2.5 text-white" />
        </div>
      )}
      <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-[9px] font-semibold text-white leading-tight">{cap.label}</p>
    </div>
  );
}
