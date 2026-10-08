import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Quote } from 'lucide-react';
import { supabase, type Testimonial } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = { client_name: '', company: '', position: '', quote: '', avatar_url: '', is_published: true };

export function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
    setTestimonials(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }
  function openEdit(t: Testimonial) {
    setForm({ client_name: t.client_name, company: t.company, position: t.position, quote: t.quote, avatar_url: t.avatar_url, is_published: t.is_published });
    setEditId(t.id); setModalOpen(true);
  }

  async function save() {
    if (!form.client_name.trim()) { toast('Name is required', 'error'); return; }
    if (editId) {
      const { error } = await supabase.from('testimonials').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId);
      if (error) { toast('Failed to update', 'error'); return; }
      toast('Testimonial updated');
    } else {
      const maxOrder = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.sort_order)) : 0;
      const { error } = await supabase.from('testimonials').insert({ ...form, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to create', 'error'); return; }
      toast('Testimonial created');
    }
    setModalOpen(false); load();
  }

  async function togglePublished(t: Testimonial) {
    await supabase.from('testimonials').update({ is_published: !t.is_published }).eq('id', t.id);
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    await supabase.from('testimonials').delete().eq('id', deleteId);
    toast('Testimonial deleted'); load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Testimonials" subtitle="Manage client testimonials" action={
        <Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Testimonial</Button>
      } />

      {testimonials.length === 0 ? (
        <Card><EmptyState icon={<Quote className="h-7 w-7" />} title="No testimonials yet" message="Add your first client testimonial." action={<Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Testimonial</Button>} /></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-6">
              <div className="flex items-start gap-4">
                <img src={t.avatar_url} alt="" className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-sm font-semibold text-white">{t.client_name}</h3>
                    <Badge variant={t.is_published ? 'success' : 'default'}>{t.is_published ? 'Published' : 'Hidden'}</Badge>
                  </div>
                  <p className="text-xs text-ink-400">{t.position}, {t.company}</p>
                </div>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-200">"{t.quote}"</p>
              <div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-4">
                <button onClick={() => togglePublished(t)} className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${t.is_published ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'}`}>
                  {t.is_published ? <span className="text-xs">●</span> : <span className="text-xs">○</span>}
                </button>
                <button onClick={() => openEdit(t)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(t.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Client Name" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} placeholder="Sarah Chen" />
            <Input label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="VOLT Industries" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Position" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder="VP of Marketing" />
            <Input label="Avatar URL" value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="https://..." />
          </div>
          <Textarea label="Testimonial" rows={4} value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="AURA AI transformed our campaign..." />
          <Toggle checked={form.is_published} onChange={v => setForm(f => ({ ...f, is_published: v }))} label="Published" />
          {form.avatar_url && (
            <div className="overflow-hidden rounded-full border border-white/10 w-fit">
              <img src={form.avatar_url} alt="Preview" className="h-16 w-16 object-cover" />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save}>{editId ? 'Save Changes' : 'Create Testimonial'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={doDelete} title="Delete Testimonial" message="Delete this testimonial?" />
    </div>
  );
}

