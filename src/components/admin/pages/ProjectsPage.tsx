import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, ArrowUp, ArrowDown, Film, Code, X } from 'lucide-react';
import { supabase, type Project } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

/* ── Extract src + inject autoplay=1 from Pinterest embed code ────────────── */
function buildPinterestSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let src = '';
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  if (match) src = match[1];
  else if (trimmed.startsWith('http')) src = trimmed;
  else return null;

  try {
    const url = new URL(src);
    url.searchParams.set('autoplay', '1');
    return url.toString();
  } catch {
    return src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
  }
}

const emptyForm = {
  title: '', client: '', category: '', description: '',
  image_url: '', project_url: '', embed_code: '',
  featured: false, published: true,
};

export function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId]       = useState<string | null>(null);
  const [form, setForm]           = useState(emptyForm);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('projects').select('*').order('sort_order', { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }

  function openEdit(p: Project) {
    setForm({
      title: p.title, client: p.client, category: p.category,
      description: p.description, image_url: p.image_url,
      project_url: p.project_url, embed_code: p.embed_code ?? '',
      featured: p.featured, published: p.published,
    });
    setEditId(p.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.title.trim()) { toast('Title is required', 'error'); return; }
    setSaving(true);
    const payload = {
      title: form.title, client: form.client, category: form.category,
      description: form.description,
      // If embed code is set, image_url is not needed
      image_url:   form.embed_code.trim() ? '' : form.image_url,
      project_url: form.project_url,
      embed_code:  form.embed_code.trim() || null,
      featured: form.featured, published: form.published,
    };
    if (editId) {
      const { error } = await supabase
        .from('projects')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update project', 'error'); setSaving(false); return; }
      toast('Project updated');
    } else {
      const maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.sort_order)) : 0;
      const { error } = await supabase
        .from('projects')
        .insert({ ...payload, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to create project', 'error'); setSaving(false); return; }
      toast('Project created');
    }
    setSaving(false); setModalOpen(false); load();
  }

  async function toggleField(p: Project, field: 'featured' | 'published') {
    const { error } = await supabase
      .from('projects')
      .update({ [field]: !p[field], updated_at: new Date().toISOString() })
      .eq('id', p.id);
    if (error) { toast('Update failed', 'error'); return; }
    load();
  }

  async function moveOrder(p: Project, dir: -1 | 1) {
    const sorted = [...projects].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex(x => x.id === p.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    await Promise.all([
      supabase.from('projects').update({ sort_order: other.sort_order }).eq('id', p.id),
      supabase.from('projects').update({ sort_order: p.sort_order }).eq('id', other.id),
    ]);
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteId);
    if (error) { toast('Delete failed', 'error'); return; }
    toast('Project deleted'); setDeleteId(null); load();
  }

  /* Derive live preview src immediately when embed code is pasted */
  const previewSrc = form.embed_code.trim() ? buildPinterestSrc(form.embed_code) : null;

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Manage your AI video showcase projects"
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Project
          </Button>
        }
      />

      {projects.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Film className="h-7 w-7" />}
            title="No projects yet"
            message="Add your first AI video project to showcase on the website."
            action={<Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Project</Button>}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-center gap-4">
                {/* Reorder */}
                <div className="hidden flex-col gap-1 sm:flex">
                  <button onClick={() => moveOrder(p, -1)} disabled={i === 0}
                    className="text-ink-500 hover:text-white disabled:opacity-30 transition-colors">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button onClick={() => moveOrder(p, 1)} disabled={i === projects.length - 1}
                    className="text-ink-500 hover:text-white disabled:opacity-30 transition-colors">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Thumbnail / embed badge */}
                {p.embed_code ? (
                  <div className="flex h-16 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-accent-500/20 bg-accent-500/10">
                    <Code className="h-5 w-5 text-accent-400" />
                    <span className="text-[9px] font-medium text-accent-300 uppercase tracking-wide">Pinterest</span>
                  </div>
                ) : (
                  <img src={p.image_url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-display text-sm font-semibold text-white">{p.title}</h3>
                    {p.embed_code && <Badge variant="accent"><Code className="h-2.5 w-2.5" /> Pinterest</Badge>}
                    {p.featured && <Badge variant="accent"><Star className="h-3 w-3" /> Featured</Badge>}
                    <Badge variant={p.published ? 'success' : 'default'}>
                      {p.published ? <><Eye className="h-3 w-3" /> Published</> : <><EyeOff className="h-3 w-3" /> Draft</>}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-ink-400">{p.client} · {p.category}</p>
                  <p className="mt-1 truncate text-xs text-ink-500">{p.description}</p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => toggleField(p, 'featured')}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.featured ? 'border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-400 hover:text-white'}`}
                    title="Toggle featured"><Star className="h-4 w-4" /></button>
                  <button onClick={() => toggleField(p, 'published')}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.published ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'}`}
                    title="Toggle published">
                    {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => openEdit(p)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setDeleteId(p.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ─────────────────────────────────────── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Project' : 'Add Project'} size="lg">
        <div className="space-y-5">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Title" value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="NEON FUTURE" />
            <Input label="Client / Brand" value={form.client}
              onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="VOLT Industries" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Category" value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Brand Film" />
            <Input label="Project URL" value={form.project_url}
              onChange={e => setForm(f => ({ ...f, project_url: e.target.value }))} placeholder="https://..." />
          </div>

          {/* ── Pinterest embed code — PRIMARY ── */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
              <Code className="h-3.5 w-3.5 text-accent-400" />
              Pinterest Embed Code
              <span className="ml-1 rounded bg-accent-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-300 uppercase tracking-wide">
                Recommended
              </span>
            </label>
            <textarea
              rows={3}
              value={form.embed_code}
              onChange={e => setForm(f => ({ ...f, embed_code: e.target.value }))}
              placeholder={`<iframe src="https://assets.pinterest.com/ext/embed.html?id=1066368018038878527" height="900" width="450" frameborder="0" scrolling="no"></iframe>`}
              className="w-full resize-none rounded-lg border border-white/10 bg-ink-950/50 px-4 py-3 font-mono text-xs text-white placeholder:text-ink-600 focus:border-accent-500/40 focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-ink-500">
              Paste Pinterest <code className="text-ink-300">&lt;iframe&gt;</code> embed code. The video plays automatically — no thumbnail needed.
            </p>
          </div>

          {/* ── LIVE VIDEO PREVIEW — full-size, shown immediately ── */}
          {previewSrc && (
            <div className="rounded-xl border border-accent-500/20 bg-ink-900 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_6px_rgba(124,92,255,0.8)]" />
                  <span className="text-xs font-medium text-accent-300">Live Pinterest Preview — playing now</span>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, embed_code: '' }))}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-ink-400 hover:bg-white/10 hover:text-white transition-colors"
                  title="Clear embed code"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Pinterest iframe — proportional 9:16, large enough to see the video */}
              <div className="flex items-start justify-center gap-6 p-4">
                <div
                  className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black flex-shrink-0"
                  style={{ width: 220, aspectRatio: '9/16' }}
                >
                  <iframe
                    key={previewSrc}          /* remount when src changes */
                    src={previewSrc}
                    title="Pinterest preview"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; fullscreen; encrypted-media"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
                  />
                  {/* Label overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-6">
                    <p className="text-[11px] font-semibold text-white truncate">
                      {form.title || 'Project title'}
                    </p>
                  </div>
                </div>

                {/* Info panel beside the preview */}
                <div className="flex flex-col gap-3 pt-1">
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
                    <p className="text-xs font-medium text-emerald-300">✓ Video detected</p>
                    <p className="mt-0.5 text-xs text-ink-400">Autoplays on the website</p>
                  </div>
                  <div className="space-y-1 text-xs text-ink-500">
                    <p>• No thumbnail required</p>
                    <p>• Renders at 9:16 ratio</p>
                    <p>• Starts from the beginning</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Image URL — only shown when NO embed code ── */}
          {!form.embed_code.trim() && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-white/[0.06]" />
                <span className="text-xs text-ink-500">or use image thumbnail</span>
                <div className="flex-1 border-t border-white/[0.06]" />
              </div>
              <Input
                label="Thumbnail / Image URL"
                value={form.image_url}
                onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                placeholder="https://images.pexels.com/..."
              />
              {form.image_url && (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <img src={form.image_url} alt="Preview" className="h-40 w-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                </div>
              )}
            </>
          )}

          <Textarea label="Description" rows={3} value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Cinematic futuristic campaign..." />

          <div className="flex gap-8">
            <Toggle checked={form.featured} onChange={v => setForm(f => ({ ...f, featured: v }))} label="Featured" />
            <Toggle checked={form.published} onChange={v => setForm(f => ({ ...f, published: v }))} label="Published" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}
