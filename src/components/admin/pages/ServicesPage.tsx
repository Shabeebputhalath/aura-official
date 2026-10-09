import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Layers } from 'lucide-react';
import { supabase, type Service } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Select, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const iconOptions = [
  'Film', 'Clapperboard', 'Package', 'Smartphone', 'Music',
  'Lightbulb', 'Users', 'Scissors', 'Sparkles', 'Wand2', 'Globe', 'Layers',
];

const emptyForm = { name: '', description: '', icon: 'Film', is_active: true };

export function ServicesPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) toast('Failed to load services', 'error');
    setServices(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }
  function openEdit(s: Service) {
    setForm({ name: s.name, description: s.description, icon: s.icon, is_active: s.is_active });
    setEditId(s.id);
    setModalOpen(true);
  }

  async function save() {
    if (!form.name.trim()) { toast('Name is required', 'error'); return; }
    setSaving(true);
    if (editId) {
      const { error } = await supabase
        .from('services')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', editId);
      if (error) { toast('Failed to update service', 'error'); setSaving(false); return; }
      toast('Service updated');
    } else {
      const maxOrder = services.length > 0 ? Math.max(...services.map(s => s.display_order)) : 0;
      const { error } = await supabase
        .from('services')
        .insert({ ...form, display_order: maxOrder + 1 });
      if (error) { toast('Failed to create service', 'error'); setSaving(false); return; }
      toast('Service created');
    }
    setSaving(false);
    setModalOpen(false);
    load();
  }

  async function toggleActive(s: Service) {
    const { error } = await supabase
      .from('services')
      .update({ is_active: !s.is_active, updated_at: new Date().toISOString() })
      .eq('id', s.id);
    if (error) { toast('Failed to update', 'error'); return; }
    load();
  }

  async function moveOrder(s: Service, dir: -1 | 1) {
    const sorted = [...services].sort((a, b) => a.display_order - b.display_order);
    const idx = sorted.findIndex(x => x.id === s.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    const [r1, r2] = await Promise.all([
      supabase.from('services').update({ display_order: other.display_order }).eq('id', s.id),
      supabase.from('services').update({ display_order: s.display_order }).eq('id', other.id),
    ]);
    if (r1.error || r2.error) { toast('Reorder failed', 'error'); return; }
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from('services').delete().eq('id', deleteId);
    if (error) { toast('Delete failed', 'error'); setDeleteId(null); return; }
    toast('Service deleted');
    setDeleteId(null);
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle={`${services.length} service${services.length === 1 ? '' : 's'}`}
        action={
          <Button variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        }
      />

      {services.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Layers className="h-7 w-7" />}
            title="No services yet"
            message="Add your first service offering to display on the website."
            action={
              <Button variant="primary" onClick={openAdd}>
                <Plus className="h-4 w-4" /> Add Service
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-center gap-4">
                {/* Reorder arrows */}
                <div className="hidden flex-col gap-1 sm:flex">
                  <button
                    onClick={() => moveOrder(s, -1)}
                    disabled={i === 0}
                    className="text-ink-500 hover:text-white disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveOrder(s, 1)}
                    disabled={i === services.length - 1}
                    className="text-ink-500 hover:text-white disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Order badge + icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-ink-300">
                  <span className="text-xs font-medium text-ink-400">{s.display_order}</span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-sm font-semibold text-white">{s.name}</h3>
                    <Badge variant={s.is_active ? 'success' : 'default'}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-ink-400">{s.description}</p>
                  <p className="mt-0.5 text-xs text-ink-600">Icon: {s.icon}</p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => toggleActive(s)}
                    title={s.is_active ? 'Deactivate' : 'Activate'}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                      s.is_active
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 text-ink-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm">{s.is_active ? '●' : '○'}</span>
                  </button>
                  <button
                    onClick={() => openEdit(s)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(s.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Edit Service' : 'Add Service'}
      >
        <div className="space-y-5">
          <Input
            label="Service Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="AI Commercials"
          />
          <Textarea
            label="Description"
            rows={3}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Cinematic advertisements for brands and campaigns..."
          />
          <Select
            label="Icon"
            value={form.icon}
            onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
          >
            {iconOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
          <Toggle
            checked={form.is_active}
            onChange={v => setForm(f => ({ ...f, is_active: v }))}
            label="Active (visible on website)"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={doDelete}
        title="Delete Service"
        message="Delete this service offering? It will be removed from the website immediately."
      />
    </div>
  );
}
