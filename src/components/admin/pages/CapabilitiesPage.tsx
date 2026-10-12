import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Sparkles, Eye, EyeOff, Film, Code } from 'lucide-react';
import { supabase, type Capability } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

/* ── Extract the src URL from a Pinterest <iframe> embed code ─────────────── */
function extractSrc(raw: string): string | null {
  const m = raw.trim().match(/src=["']([^"']+)["']/i);
  if (m) return m[1];
  if (raw.trim().startsWith('http')) return raw.trim();
  return null;
}

/* ── Determine the media type label ──────────────────────────────────────── */
function mediaType(c: Capability): 'Pinterest' | 'Video' | 'Image' {
  if (c.embed_code) return 'Pinterest';
  if (c.video_url)  return 'Video';
  return 'Image';
}

const emptyForm = { label: '', embed_code: '', video_url: '', is_active: true };

export function CapabilitiesPage() {
  const { toast }   = useToast();
  const [caps, setCaps]           = useState<Capability[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId]       = useState<string | null>(null);
  const [form, setForm]           = useState(emptyForm);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

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
    setForm({
      label:      c.label,
      embed_code: c.embed_code ?? '',
      video_url:  c.video_url  ?? '',
      is_active:  c.is_active,
    });
    setEditId(c.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.label.trim()) { toast('Label is required', 'error'); return; }
    if (!form.embed_code.trim() && !form.video_url.trim()) {
      toast('Add either a Pinterest embed code or a Video URL', 'error'); return;
    }
    setSaving(true);

    const payload = {
      label:      form.label,
      image_url:  '',
      video_url:  form.video_url.trim()  || null,
      embed_code: form.embed_code.trim() || null,
      is_active:  form.is_active,
    };

    if (editId) {
      const { error } = await supabase
        .from('capabilities')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update', 'error'); setSaving(false); return; }
      toast('Reel updated');
    } else {
      const maxOrder = caps.length > 0 ? Math.max(...caps.map(c => c.sort_order)) : 0;
      const { error } = await supabase
        .from('capabilities')
        .insert({ ...payload, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to add reel', 'error'); setSaving(false); return; }
      toast('Reel added');
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
    const idx    = sorted.findIndex(x => x.id === c.id);
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
    toast('Reel deleted'); setDeleteId(null); load();
  }

  /* live preview src for the modal */
  const previewSrc = form.embed_code ? extractSrc(form.embed_code) : null;

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Capabilities"
        subtitle={`${caps.length} reel${caps.length === 1 ? '' : 's'} · scrolling gallery on the homepage`}
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Reel
          </Button>
        }
      />

      {/* Info banner */}
      <div className="mb-5 rounded-lg border border-accent-500/15 bg-accent-500/[0.06] px-4 py-3 text-xs text-accent-300">
        Each card is a <strong>9:16 reel</strong>. Paste a <strong>Pinterest embed code</strong> (e.g.{' '}
        <code className="rounded bg-white/5 px-1">{`<iframe src="https://assets.pinterest.com/ext/embed.html?id=…">`}</code>
        ) — or a direct <strong>.mp4 Video URL</strong>. Pinterest embed takes priority over Video URL.
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
                  <button onClick={() => moveOrder(c, -1)} disabled={i === 0}
                    className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors" title="Move up">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button onClick={() => moveOrder(c, 1)} disabled={i === caps.length - 1}
                    className="text-ink-500 hover:text-white disabled:opacity-25 transition-colors" title="Move down">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Media type icon */}
                <div className="flex h-[64px] w-[36px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-white/[0.06] bg-ink-900">
                  {c.embed_code
                    ? <Code className="h-4 w-4 text-accent-400" />
                    : <Film className="h-4 w-4 text-accent-400" />
                  }
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-sm font-semibold text-white">{c.label}</span>
                    <Badge variant={c.embed_code ? 'accent' : 'info'}>
                      {mediaType(c)}
                    </Badge>
                    <Badge variant={c.is_active ? 'success' : 'default'}>
                      {c.is_active ? 'Visible' : 'Hidden'}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-500">
                    {c.embed_code
                      ? (extractSrc(c.embed_code) ?? c.embed_code.slice(0, 60) + '…')
                      : (c.video_url ?? '—')
                    }
                  </p>
                </div>

                {/* Sort */}
                <div className="hidden shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 sm:flex">
                  <span className="text-xs font-medium text-ink-400">#{c.sort_order}</span>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => toggleActive(c)} title={c.is_active ? 'Hide' : 'Show'}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                      c.is_active ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'
                    }`}>
                    {c.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(c)} title="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(c.id)} title="Delete"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ─────────────────────────────────────── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Reel' : 'Add Reel'} size="lg">
        <div className="space-y-5">

          <Input
            label="Label"
            value={form.label}
            onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
            placeholder="e.g. Cinematic Worlds"
          />

          {/* Pinterest embed code — primary field */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
              <Code className="h-3.5 w-3.5 text-accent-400" />
              Pinterest Embed Code
              <span className="ml-1 rounded bg-accent-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-300 uppercase tracking-wide">
                Recommended
              </span>
            </label>
            <textarea
              rows={4}
              value={form.embed_code}
              onChange={e => setForm(f => ({ ...f, embed_code: e.target.value }))}
              placeholder={`<iframe src="https://assets.pinterest.com/ext/embed.html?id=1066368018038878527" height="900" width="450" frameborder="0" scrolling="no"></iframe>`}
              className="w-full resize-none rounded-lg border border-white/10 bg-ink-950/50 px-4 py-3 font-mono text-xs text-white placeholder:text-ink-600 focus:border-accent-500/40 focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-ink-500">
              Paste the full Pinterest <code className="text-ink-300">&lt;iframe&gt;</code> embed code from a Pin's share menu. Takes priority over Video URL.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-white/[0.06]" />
            <span className="text-xs text-ink-500">or</span>
            <div className="flex-1 border-t border-white/[0.06]" />
          </div>

          {/* Video URL fallback */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
              <Film className="h-3.5 w-3.5 text-ink-400" />
              Video URL
              <span className="ml-1 text-[10px] text-ink-500">(fallback if no embed code)</span>
            </label>
            <input
              type="url"
              value={form.video_url}
              onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))}
              placeholder="https://example.com/reel.mp4"
              className="w-full rounded-lg border border-white/10 bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-ink-500 focus:border-accent-500/40 focus:outline-none"
            />
          </div>

          {/* Live Pinterest preview */}
          {previewSrc && (
            <div className="flex items-start gap-4">
              <div
                className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900"
                style={{ width: 80, aspectRatio: '9/16' }}
              >
                <iframe
                  src={previewSrc}
                  title="Preview"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay"
                  className="h-full w-full"
                  style={{ width: '100%', height: '100%', border: 0 }}
                />
              </div>
              <div className="mt-1 space-y-1.5">
                <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <Code className="h-3 w-3 text-accent-400" /> Pinterest preview
                </p>
                <p className="text-xs text-ink-400">Renders live in 9:16 card</p>
                <p className="max-w-[180px] break-all text-[10px] text-ink-600">{previewSrc}</p>
              </div>
            </div>
          )}

          {/* Video URL preview */}
          {!previewSrc && form.video_url.trim() && (
            <div className="flex items-start gap-4">
              <div
                className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900"
                style={{ width: 80, aspectRatio: '9/16' }}
              >
                <video
                  key={form.video_url}
                  src={form.video_url}
                  autoPlay muted loop playsInline
                  className="h-full w-full object-cover"
                  onError={e => { (e.target as HTMLVideoElement).style.opacity = '0.2'; }}
                />
              </div>
              <div className="mt-1 space-y-1.5">
                <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <Film className="h-3 w-3 text-ink-400" /> Video preview
                </p>
                <p className="text-xs text-ink-400">▶ Autoplays muted</p>
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
