import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, ArrowUp, ArrowDown, Film } from 'lucide-react';
import { supabase, type Project } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = {
  title: '', client: '', category: '', description: '', image_url: '', project_url: '',
  featured: false, published: true,
};

export function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  }

  function openEdit(p: Project) {
    setForm({
      title: p.title, client: p.client, category: p.category, description: p.description,
      image_url: p.image_url, project_url: p.project_url, featured: p.featured, published: p.published,
    });
    setEditId(p.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.title.trim()) { toast('Title is required', 'error'); return; }
    if (editId) {
      const { error } = await supabase.from('projects').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId);
      if (error) { toast('Failed to update project', 'error'); return; }
      toast('Project updated');
    } else {
      const maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.sort_order)) : 0;
      const { error } = await supabase.from('projects').insert({ ...form, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to create project', 'error'); return; }
      toast('Project created');
    }
    setModalOpen(false);
    load();
  }

  async function toggleField(p: Project, field: 'featured' | 'published') {
    const { error } = await supabase.from('projects').update({ [field]: !p[field], updated_at: new Date().toISOString() }).eq('id', p.id);
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
    toast('Project deleted');
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Projects" subtitle="Manage your AI video showcase projects" action={
        <Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Project</Button>
      } />

      {projects.length === 0 ? (
        <Card><EmptyState icon={<Film className="h-7 w-7" />} title="No projects yet" message="Add your first AI video project to showcase on the website." action={<Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Project</Button>} /></Card>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="hidden flex-col gap-1 sm:flex">
                  <button onClick={() => moveOrder(p, -1)} disabled={i === 0} className="text-ink-500 hover:text-white disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => moveOrder(p, 1)} disabled={i === projects.length - 1} className="text-ink-500 hover:text-white disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                </div>
                <img src={p.image_url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-sm font-semibold text-white">{p.title}</h3>
                    {p.featured && <Badge variant="accent"><Star className="h-3 w-3" /> Featured</Badge>}
                    <Badge variant={p.published ? 'success' : 'default'}>{p.published ? <><Eye className="h-3 w-3" /> Published</> : <><EyeOff className="h-3 w-3" /> Draft</>}</Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-ink-400">{p.client} · {p.category}</p>
                  <p className="mt-1 truncate text-xs text-ink-500">{p.description}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => toggleField(p, 'featured')} className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.featured ? 'border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-400 hover:text-white'}`} title="Toggle featured">
                    <Star className="h-4 w-4" />
                  </button>
                  <button onClick={() => toggleField(p, 'published')} className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.published ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'}`} title="Toggle published">
                    {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => openEdit(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setDeleteId(p.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Project' : 'Add Project'} size="lg">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="NEON FUTURE" />
            <Input label="Client / Brand" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="VOLT Industries" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Brand Film" />
            <Input label="Project URL" value={form.project_url} onChange={e => setForm(f => ({ ...f, project_url: e.target.value }))} placeholder="https://..." />
          </div>
          <Input label="Thumbnail / Video URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://images.pexels.com/..." />
          <Textarea label="Description" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Cinematic futuristic campaign..." />
          <div className="flex gap-8">
            <Toggle checked={form.featured} onChange={v => setForm(f => ({ ...f, featured: v }))} label="Featured" />
            <Toggle checked={form.published} onChange={v => setForm(f => ({ ...f, published: v }))} label="Published" />
          </div>
          {form.image_url && (
            <div className="overflow-hidden rounded-lg border border-white/10">
              <img src={form.image_url} alt="Preview" className="h-40 w-full object-cover" />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save}>{editId ? 'Save Changes' : 'Create Project'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={doDelete} title="Delete Project" message="Are you sure you want to delete this project? This action cannot be undone." />
    </div>
  );
}

