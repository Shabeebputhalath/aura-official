import { useEffect, useState } from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { supabase, type SiteContent } from '@/lib/supabase';
import { Card, CardBody, CardHeader } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Input, Textarea } from '@/components/admin/FormFields';
import { PageHeader, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

type SectionId = 'hero' | 'stats' | 'about' | 'footer' | 'social';

const sections: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Statistics' },
  { id: 'about', label: 'About' },
  { id: 'footer', label: 'Footer' },
  { id: 'social', label: 'Social Links' },
];

export function ContentPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [contentMap, setContentMap] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_content').select('*');
      const map: Record<string, Record<string, unknown>> = {};
      (data ?? []).forEach((item: SiteContent) => { map[item.section] = item.data; });
      setContentMap(map);
      setLoading(false);
    }
    load();
  }, []);

  function updateField(section: string, field: string, value: unknown) {
    setContentMap(prev => ({
      ...prev,
      [section]: { ...(prev[section] ?? {}), [field]: value },
    }));
  }

  async function save() {
    setSaving(true);
    const section = activeSection;
    const data = contentMap[section];
    if (!data) { setSaving(false); return; }
    const { error } = await supabase.from('site_content').update({ data, updated_at: new Date().toISOString() }).eq('section', section);
    if (error) { toast('Failed to save', 'error'); setSaving(false); return; }
    toast('Content saved');
    setSaving(false);
  }

  if (loading) return <LoadingSpinner />;

  const data = contentMap[activeSection] ?? {};

  return (
    <div>
      <PageHeader title="Website Content" subtitle="Edit important homepage content" action={
        <Button variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
      } />

      {/* Section tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${activeSection === s.id
                ? 'bg-gradient-to-r from-accent-500/15 to-transparent text-white border border-accent-500/20'
                : 'border border-white/[0.06] text-ink-300 hover:text-white hover:bg-white/[0.02]'
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader title={sections.find(s => s.id === activeSection)?.label ?? ''} />
        <CardBody className="space-y-5">
          {activeSection === 'hero' && <HeroEditor data={data} update={updateField} />}
          {activeSection === 'stats' && <StatsEditor data={data} update={updateField} />}
          {activeSection === 'about' && <AboutEditor data={data} update={updateField} />}
          {activeSection === 'footer' && <FooterEditor data={data} update={updateField} />}
          {activeSection === 'social' && <SocialEditor data={data} update={updateField} />}
        </CardBody>
      </Card>
    </div>
  );
}

type EditorProps = { data: Record<string, unknown>; update: (section: string, field: string, value: unknown) => void };

function HeroEditor({ data, update }: EditorProps) {
  const indicators = (data.indicators as string[]) ?? [];
  return (
    <div className="space-y-5">
      <Input label="Badge" value={(data.badge as string) ?? ''} onChange={e => update('hero', 'badge', e.target.value)} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Headline Line 1" value={(data.headline1 as string) ?? ''} onChange={e => update('hero', 'headline1', e.target.value)} />
        <Input label="Headline Line 2" value={(data.headline2 as string) ?? ''} onChange={e => update('hero', 'headline2', e.target.value)} />
      </div>
      <Textarea label="Subheading" rows={2} value={(data.subheading as string) ?? ''} onChange={e => update('hero', 'subheading', e.target.value)} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Primary CTA" value={(data.primaryCta as string) ?? ''} onChange={e => update('hero', 'primaryCta', e.target.value)} />
        <Input label="Secondary CTA" value={(data.secondaryCta as string) ?? ''} onChange={e => update('hero', 'secondaryCta', e.target.value)} />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">Credibility Indicators</label>
        <div className="space-y-2">
          {indicators.map((ind, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={ind}
                onChange={e => { const next = [...indicators]; next[i] = e.target.value; update('hero', 'indicators', next); }}
                className="w-full rounded-lg border border-white/10 bg-ink-950/50 px-4 py-2 text-sm text-white focus:border-accent-500/40 focus:outline-none"
              />
              <button onClick={() => update('hero', 'indicators', indicators.filter((_, idx) => idx !== i))} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 text-red-300"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => update('hero', 'indicators', [...indicators, ''])} className="text-xs font-medium text-accent-400 hover:text-accent-300">+ Add Indicator</button>
        </div>
      </div>
    </div>
  );
}

function StatsEditor({ data, update }: EditorProps) {
  const stats = (data as unknown as Array<Record<string, unknown>>) ?? [];
  return (
    <div className="space-y-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Input label="Value" type="number" value={String(stat.value ?? '')} onChange={e => { const next = [...stats]; next[i] = { ...stat, value: Number(e.target.value) }; update('stats', '', next); }} />
            <Input label="Suffix" value={(stat.suffix as string) ?? ''} onChange={e => { const next = [...stats]; next[i] = { ...stat, suffix: e.target.value }; update('stats', '', next); }} />
            <Input label="Label" value={(stat.label as string) ?? ''} onChange={e => { const next = [...stats]; next[i] = { ...stat, label: e.target.value }; update('stats', '', next); }} />
          </div>
          <button onClick={() => update('stats', '', stats.filter((_, idx) => idx !== i))} className="mt-3 text-xs font-medium text-red-400 hover:text-red-300">Remove</button>
        </div>
      ))}
      <button onClick={() => update('stats', '', [...stats, { value: 0, suffix: '', label: 'New Stat' }])} className="text-xs font-medium text-accent-400 hover:text-accent-300">+ Add Stat</button>
    </div>
  );
}

function AboutEditor({ data, update }: EditorProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Heading Line 1" value={(data.heading1 as string) ?? ''} onChange={e => update('about', 'heading1', e.target.value)} />
        <Input label="Heading Line 2" value={(data.heading2 as string) ?? ''} onChange={e => update('about', 'heading2', e.target.value)} />
      </div>
      <Textarea label="Paragraph 1" rows={3} value={(data.paragraph1 as string) ?? ''} onChange={e => update('about', 'paragraph1', e.target.value)} />
      <Textarea label="Paragraph 2" rows={3} value={(data.paragraph2 as string) ?? ''} onChange={e => update('about', 'paragraph2', e.target.value)} />
      <Input label="CTA Text" value={(data.ctaText as string) ?? ''} onChange={e => update('about', 'ctaText', e.target.value)} />
    </div>
  );
}

function FooterEditor({ data, update }: EditorProps) {
  return (
    <div className="space-y-5">
      <Textarea label="Description" rows={2} value={(data.description as string) ?? ''} onChange={e => update('footer', 'description', e.target.value)} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Email" value={(data.email as string) ?? ''} onChange={e => update('footer', 'email', e.target.value)} />
        <Input label="Location" value={(data.location as string) ?? ''} onChange={e => update('footer', 'location', e.target.value)} />
      </div>
      <Input label="Copyright Text" value={(data.copyright as string) ?? ''} onChange={e => update('footer', 'copyright', e.target.value)} />
    </div>
  );
}

function SocialEditor({ data, update }: EditorProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Instagram URL" value={(data.instagram as string) ?? ''} onChange={e => update('social', 'instagram', e.target.value)} />
        <Input label="YouTube URL" value={(data.youtube as string) ?? ''} onChange={e => update('social', 'youtube', e.target.value)} />
        <Input label="LinkedIn URL" value={(data.linkedin as string) ?? ''} onChange={e => update('social', 'linkedin', e.target.value)} />
        <Input label="X (Twitter) URL" value={(data.twitter as string) ?? ''} onChange={e => update('social', 'twitter', e.target.value)} />
      </div>
    </div>
  );
}

