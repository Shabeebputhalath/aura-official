import { useEffect, useState, useCallback } from 'react';
import { Trash2, Save, RefreshCw } from 'lucide-react';
import { supabase, type SiteContent } from '@/lib/supabase';
import { Card, CardBody, CardHeader } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Input, Textarea } from '@/components/admin/FormFields';
import { PageHeader, LoadingSpinner } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

type SectionId = 'hero' | 'stats' | 'about' | 'footer' | 'social';

const sections: { id: SectionId; label: string; description: string }[] = [
  { id: 'hero', label: 'Hero', description: 'Main headline, badge, and CTA buttons' },
  { id: 'stats', label: 'Statistics', description: 'Animated numbers shown below the hero' },
  { id: 'about', label: 'About', description: 'About section headings and paragraphs' },
  { id: 'footer', label: 'Footer', description: 'Contact details, copyright, and location' },
  { id: 'social', label: 'Social Links', description: 'Social media profile URLs' },
];

// Default content for each section — used when a section row doesn't exist yet
const defaults: Record<SectionId, unknown> = {
  hero: {
    badge: 'AI Video Production Studio',
    headline1: 'AI-Powered Films.',
    headline2: 'Human-Level Creativity.',
    subheading: 'From concept to final frame, we create cinematic AI videos that make brands impossible to ignore.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Work',
    indicators: ['AI Films', 'Commercials', 'Product Videos', 'Social Content'],
  },
  stats: [
    { value: 10, suffix: 'x', label: 'Faster Ideation' },
    { value: 50, suffix: '+', label: 'Creative Projects' },
    { value: 100, suffix: '+', label: 'AI Films Created' },
    { value: 0, suffix: '', label: 'Global Creative Reach', text: 'Global' },
  ],
  about: {
    heading1: 'We Make Ideas',
    heading2: 'Look Impossible.',
    paragraph1: 'AURA AI is a creative technology studio where artificial intelligence meets filmmaking.',
    paragraph2: 'Our team of directors, designers, and AI specialists work together to craft every project with intention.',
    ctaText: 'Meet the Studio',
  },
  footer: {
    description: 'AI-powered cinematic production for brands, creators, and ambitious ideas.',
    email: 'hello@auraai.studio',
    location: 'Remote · Worldwide',
    copyright: '© 2026 AURA AI. All rights reserved.',
  },
  social: { instagram: '#', youtube: '#', linkedin: '#', twitter: '#' },
};

export function ContentPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [contentMap, setContentMap] = useState<Record<string, unknown>>({});
  const [dirtyMap, setDirtyMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) { toast('Failed to load content', 'error'); }
      const map: Record<string, unknown> = {};
      // Pre-fill with defaults so editors always have data to display
      sections.forEach(s => { map[s.id] = defaults[s.id]; });
      (data ?? []).forEach((item: SiteContent) => { map[item.section] = item.data; });
      setContentMap(map);
      setLoading(false);
    }
    load();
  }, []);

  // Update a field inside a section's data object
  const updateField = useCallback((section: string, field: string, value: unknown) => {
    setContentMap(prev => {
      const current = prev[section];
      // Stats section data IS the array itself, not a keyed object
      if (section === 'stats') {
        return { ...prev, [section]: value };
      }
      return {
        ...prev,
        [section]: { ...(current as Record<string, unknown> ?? {}), [field]: value },
      };
    });
    setDirtyMap(prev => ({ ...prev, [section]: true }));
  }, []);

  async function save() {
    setSaving(true);
    const section = activeSection;
    const data = contentMap[section];

    // Use upsert so it works whether the row exists or not
    const { error } = await supabase
      .from('site_content')
      .upsert(
        { section, data: data as Record<string, unknown>, updated_at: new Date().toISOString() },
        { onConflict: 'section' }
      );

    if (error) {
      toast('Failed to save content', 'error');
      setSaving(false);
      return;
    }
    toast(`${sections.find(s => s.id === section)?.label} content saved`);
    setDirtyMap(prev => ({ ...prev, [section]: false }));
    setSaving(false);
  }

  async function resetSection() {
    const section = activeSection;
    const data = defaults[section];
    const { error } = await supabase
      .from('site_content')
      .upsert(
        { section, data: data as Record<string, unknown>, updated_at: new Date().toISOString() },
        { onConflict: 'section' }
      );
    if (error) { toast('Reset failed', 'error'); return; }
    setContentMap(prev => ({ ...prev, [section]: data }));
    setDirtyMap(prev => ({ ...prev, [section]: false }));
    toast(`${sections.find(s => s.id === section)?.label} reset to defaults`);
  }

  if (loading) return <LoadingSpinner />;

  const data = (contentMap[activeSection] ?? defaults[activeSection]) as Record<string, unknown>;
  const isDirty = dirtyMap[activeSection] ?? false;

  return (
    <div>
      <PageHeader
        title="Website Content"
        subtitle="Edit homepage content that renders on the public website"
        action={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={resetSection} title="Reset to defaults">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : isDirty ? 'Save Changes*' : 'Save Changes'}
            </Button>
          </div>
        }
      />

      {/* Section tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeSection === s.id
                ? 'bg-gradient-to-r from-accent-500/15 to-transparent text-white border border-accent-500/20'
                : 'border border-white/[0.06] text-ink-300 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            {s.label}
            {dirtyMap[s.id] && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
            )}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader
          title={sections.find(s => s.id === activeSection)?.label ?? ''}
          subtitle={sections.find(s => s.id === activeSection)?.description}
        />
        <CardBody className="space-y-5">
          {activeSection === 'hero' && (
            <HeroEditor data={data} update={updateField} />
          )}
          {activeSection === 'stats' && (
            <StatsEditor
              stats={(contentMap['stats'] as Array<Record<string, unknown>>) ?? []}
              update={updateField}
            />
          )}
          {activeSection === 'about' && (
            <AboutEditor data={data} update={updateField} />
          )}
          {activeSection === 'footer' && (
            <FooterEditor data={data} update={updateField} />
          )}
          {activeSection === 'social' && (
            <SocialEditor data={data} update={updateField} />
          )}
        </CardBody>
      </Card>

      {isDirty && (
        <div className="mt-4 flex items-center justify-end gap-3 rounded-lg border border-accent-500/20 bg-accent-500/5 px-4 py-3">
          <span className="text-xs text-accent-300">You have unsaved changes.</span>
          <Button variant="primary" onClick={save} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Now'}
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Section Editors ──────────────────────────────────────────────────────────

type UpdateFn = (section: string, field: string, value: unknown) => void;

function HeroEditor({ data, update }: { data: Record<string, unknown>; update: UpdateFn }) {
  const indicators = (data.indicators as string[]) ?? [];
  return (
    <div className="space-y-5">
      <Input
        label="Badge Text"
        value={(data.badge as string) ?? ''}
        onChange={e => update('hero', 'badge', e.target.value)}
        placeholder="AI Video Production Studio"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Headline Line 1"
          value={(data.headline1 as string) ?? ''}
          onChange={e => update('hero', 'headline1', e.target.value)}
          placeholder="AI-Powered Films."
        />
        <Input
          label="Headline Line 2"
          value={(data.headline2 as string) ?? ''}
          onChange={e => update('hero', 'headline2', e.target.value)}
          placeholder="Human-Level Creativity."
        />
      </div>
      <Textarea
        label="Subheading"
        rows={2}
        value={(data.subheading as string) ?? ''}
        onChange={e => update('hero', 'subheading', e.target.value)}
        placeholder="From concept to final frame..."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Primary CTA"
          value={(data.primaryCta as string) ?? ''}
          onChange={e => update('hero', 'primaryCta', e.target.value)}
          placeholder="Start a Project"
        />
        <Input
          label="Secondary CTA"
          value={(data.secondaryCta as string) ?? ''}
          onChange={e => update('hero', 'secondaryCta', e.target.value)}
          placeholder="Explore Our Work"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-300">
          Credibility Indicators
        </label>
        <div className="space-y-2">
          {indicators.map((ind, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={ind}
                onChange={e => {
                  const next = [...indicators];
                  next[i] = e.target.value;
                  update('hero', 'indicators', next);
                }}
                className="w-full rounded-lg border border-white/10 bg-ink-950/50 px-4 py-2.5 text-sm text-white focus:border-accent-500/40 focus:outline-none"
                placeholder="e.g. AI Films"
              />
              <button
                onClick={() => update('hero', 'indicators', indicators.filter((_, idx) => idx !== i))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 text-red-300 hover:bg-red-500/10 transition-colors"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => update('hero', 'indicators', [...indicators, ''])}
            className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors"
          >
            + Add Indicator
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsEditor({
  stats,
  update,
}: {
  stats: Array<Record<string, unknown>>;
  update: UpdateFn;
}) {
  const setStats = (next: Array<Record<string, unknown>>) =>
    update('stats', '', next);

  return (
    <div className="space-y-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Input
              label="Value"
              type="number"
              value={String(stat.value ?? '')}
              onChange={e => {
                const next = [...stats];
                next[i] = { ...stat, value: Number(e.target.value) };
                setStats(next);
              }}
            />
            <Input
              label="Suffix"
              value={(stat.suffix as string) ?? ''}
              placeholder="+ or x"
              onChange={e => {
                const next = [...stats];
                next[i] = { ...stat, suffix: e.target.value };
                setStats(next);
              }}
            />
            <Input
              label="Label"
              value={(stat.label as string) ?? ''}
              placeholder="Creative Projects"
              onChange={e => {
                const next = [...stats];
                next[i] = { ...stat, label: e.target.value };
                setStats(next);
              }}
            />
          </div>
          <button
            onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
            className="mt-3 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            Remove stat
          </button>
        </div>
      ))}
      <button
        onClick={() => setStats([...stats, { value: 0, suffix: '', label: 'New Stat' }])}
        className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors"
      >
        + Add Stat
      </button>
    </div>
  );
}

function AboutEditor({ data, update }: { data: Record<string, unknown>; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Heading Line 1"
          value={(data.heading1 as string) ?? ''}
          onChange={e => update('about', 'heading1', e.target.value)}
          placeholder="We Make Ideas"
        />
        <Input
          label="Heading Line 2"
          value={(data.heading2 as string) ?? ''}
          onChange={e => update('about', 'heading2', e.target.value)}
          placeholder="Look Impossible."
        />
      </div>
      <Textarea
        label="Paragraph 1"
        rows={3}
        value={(data.paragraph1 as string) ?? ''}
        onChange={e => update('about', 'paragraph1', e.target.value)}
      />
      <Textarea
        label="Paragraph 2"
        rows={3}
        value={(data.paragraph2 as string) ?? ''}
        onChange={e => update('about', 'paragraph2', e.target.value)}
      />
      <Input
        label="CTA Button Text"
        value={(data.ctaText as string) ?? ''}
        onChange={e => update('about', 'ctaText', e.target.value)}
        placeholder="Meet the Studio"
      />
    </div>
  );
}

function FooterEditor({ data, update }: { data: Record<string, unknown>; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <Textarea
        label="Studio Description"
        rows={2}
        value={(data.description as string) ?? ''}
        onChange={e => update('footer', 'description', e.target.value)}
        placeholder="AI-powered cinematic production for brands, creators, and ambitious ideas."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Contact Email"
          value={(data.email as string) ?? ''}
          onChange={e => update('footer', 'email', e.target.value)}
          placeholder="hello@auraai.studio"
        />
        <Input
          label="Location"
          value={(data.location as string) ?? ''}
          onChange={e => update('footer', 'location', e.target.value)}
          placeholder="Remote · Worldwide"
        />
      </div>
      <Input
        label="Copyright Text"
        value={(data.copyright as string) ?? ''}
        onChange={e => update('footer', 'copyright', e.target.value)}
        placeholder="© 2026 AURA AI. All rights reserved."
      />
    </div>
  );
}

function SocialEditor({ data, update }: { data: Record<string, unknown>; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-ink-400">Enter full URLs including https://. Use # as a placeholder if the link isn't ready.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Instagram URL"
          value={(data.instagram as string) ?? ''}
          onChange={e => update('social', 'instagram', e.target.value)}
          placeholder="https://instagram.com/auraai"
        />
        <Input
          label="YouTube URL"
          value={(data.youtube as string) ?? ''}
          onChange={e => update('social', 'youtube', e.target.value)}
          placeholder="https://youtube.com/@auraai"
        />
        <Input
          label="LinkedIn URL"
          value={(data.linkedin as string) ?? ''}
          onChange={e => update('social', 'linkedin', e.target.value)}
          placeholder="https://linkedin.com/company/auraai"
        />
        <Input
          label="X (Twitter) URL"
          value={(data.twitter as string) ?? ''}
          onChange={e => update('social', 'twitter', e.target.value)}
          placeholder="https://x.com/auraai"
        />
      </div>
    </div>
  );
}
