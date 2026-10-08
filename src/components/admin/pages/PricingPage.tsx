import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, DollarSign, GripVertical } from 'lucide-react';
import { supabase, type PricingPlan } from '@/lib/supabase';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Badge } from '@/components/admin/Badge';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader, EmptyState, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

const emptyForm = {
  name: '', price: '', tagline: '', features: [''], cta_text: '', is_popular: false, is_enabled: true,
};

export function PricingPage() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('pricing_plans').select('*').order('sort_order', { ascending: true });
    setPlans(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setEditId(null); setModalOpen(true); }
  function openEdit(p: PricingPlan) {
    setForm({ name: p.name, price: p.price, tagline: p.tagline, features: p.features.length ? p.features : [''], cta_text: p.cta_text, is_popular: p.is_popular, is_enabled: p.is_enabled });
    setEditId(p.id); setModalOpen(true);
  }

  async function save() {
    if (!form.name.trim()) { toast('Name is required', 'error'); return; }
    const features = form.features.filter(f => f.trim());
    const payload = { ...form, features };
    if (editId) {
      const { error } = await supabase.from('pricing_plans').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId);
      if (error) { toast('Failed to update', 'error'); return; }
      toast('Plan updated');
    } else {
      const maxOrder = plans.length > 0 ? Math.max(...plans.map(p => p.sort_order)) : 0;
      const { error } = await supabase.from('pricing_plans').insert({ ...payload, sort_order: maxOrder + 1 });
      if (error) { toast('Failed to create', 'error'); return; }
      toast('Plan created');
    }
    setModalOpen(false); load();
  }

  async function togglePopular(p: PricingPlan) {
    if (!p.is_popular) {
      await supabase.from('pricing_plans').update({ is_popular: false }).neq('id', p.id);
    }
    await supabase.from('pricing_plans').update({ is_popular: !p.is_popular }).eq('id', p.id);
    load();
  }

  async function toggleEnabled(p: PricingPlan) {
    await supabase.from('pricing_plans').update({ is_enabled: !p.is_enabled }).eq('id', p.id);
    load();
  }

  async function doDelete() {
    if (!deleteId) return;
    await supabase.from('pricing_plans').delete().eq('id', deleteId);
    toast('Plan deleted'); load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Pricing" subtitle="Manage your pricing plans" action={
        <Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Plan</Button>
      } />

      {plans.length === 0 ? (
        <Card><EmptyState icon={<DollarSign className="h-7 w-7" />} title="No pricing plans yet" message="Add your first pricing plan." action={<Button variant="primary" onClick={openAdd}><Plus className="h-4 w-4" /> Add Plan</Button>} /></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className={`p-6 ${p.is_popular ? 'border-accent-500/30' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                    {p.is_popular && <Badge variant="accent"><Star className="h-3 w-3" /> Popular</Badge>}
                  </div>
                  <div className="mt-2 font-display text-3xl font-bold text-white">{p.price}</div>
                  <p className="mt-1 text-xs text-ink-400">{p.tagline}</p>
                </div>
                <Badge variant={p.is_enabled ? 'success' : 'default'}>{p.is_enabled ? 'Enabled' : 'Disabled'}</Badge>
              </div>

              <ul className="mt-5 space-y-2">
                {p.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-300">
                    <span className="mt-0.5 text-accent-400">✓</span> {f}
                  </li>
                ))}
                {p.features.length > 4 && <li className="text-xs text-ink-500">+ {p.features.length - 4} more</li>}
              </ul>

              <div className="mt-5 border-t border-white/[0.06] pt-4 text-xs font-medium text-ink-400">CTA: {p.cta_text}</div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => togglePopular(p)} className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.is_popular ? 'border-accent-500/30 bg-accent-500/10 text-accent-400' : 'border-white/10 text-ink-400 hover:text-white'}`} title="Toggle popular">
                  <Star className="h-4 w-4" />
                </button>
                <button onClick={() => toggleEnabled(p)} className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${p.is_enabled ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-ink-400 hover:text-white'}`} title="Toggle enabled">
                  {p.is_enabled ? <span className="text-xs">●</span> : <span className="text-xs">○</span>}
                </button>
                <button onClick={() => openEdit(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 hover:text-white"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(p.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Plan' : 'Add Plan'} size="lg">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Plan Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="STARTER" />
            <Input label="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="$499" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Tagline" value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="For creators..." />
            <Input label="CTA Text" value={form.cta_text} onChange={e => setForm(f => ({ ...f, cta_text: e.target.value }))} placeholder="Get Started" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">Features</label>
            <div className="space-y-2">
              {form.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={feat}
                    onChange={e => setForm(f => ({ ...f, features: f.features.map((x, idx) => idx === i ? e.target.value : x) }))}
                    className="w-full rounded-lg border border-white/10 bg-ink-950/50 px-4 py-2 text-sm text-white placeholder:text-ink-500 focus:border-accent-500/40 focus:outline-none"
                    placeholder="Feature description"
                  />
                  {form.features.length > 1 && (
                    <button onClick={() => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 text-red-300"><Trash2 className="h-4 w-4" /></button>
                  )}
                </div>
              ))}
              <button onClick={() => setForm(f => ({ ...f, features: [...f.features, ''] }))} className="text-xs font-medium text-accent-400 hover:text-accent-300">+ Add Feature</button>
            </div>
          </div>
          <div className="flex gap-8">
            <Toggle checked={form.is_popular} onChange={v => setForm(f => ({ ...f, is_popular: v }))} label="Most Popular" />
            <Toggle checked={form.is_enabled} onChange={v => setForm(f => ({ ...f, is_enabled: v }))} label="Enabled" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save}>{editId ? 'Save Changes' : 'Create Plan'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={doDelete} title="Delete Plan" message="Delete this pricing plan?" />
    </div>
  );
}

