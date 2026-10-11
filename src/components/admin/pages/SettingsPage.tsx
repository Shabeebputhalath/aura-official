import { useState } from 'react';
import { Lock, Globe, Bell, Save, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Input, Toggle } from '@/components/admin/FormFields';
import { PageHeader } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

// --- Shared password hashing (same as AdminLogin.tsx) ---
async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(password));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Reads baseline password from .env → sessionStorage override → factory default
const PASS_HASH_KEY = 'aura_admin_pass_hash';
const ENV_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

function getStoredHash(): string | null {
  return sessionStorage.getItem(PASS_HASH_KEY);
}

async function getBaselineHash(): Promise<string> {
  const stored = getStoredHash();
  if (stored) return stored;
  return hashPassword(ENV_PASSWORD ?? 'aura123');
}

type Tab = 'security' | 'website' | 'notifications';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function SettingsPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('security');

  return (
    <div>
      <PageHeader title="Settings" subtitle="Security, site settings, and preferences" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
        {/* Sidebar tabs */}
        <div className="space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-accent-500/15 to-transparent text-white'
                    : 'text-ink-300 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${tab === t.id ? 'text-accent-400' : 'text-ink-400'}`}
                />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div>
          {tab === 'security' && <SecurityTab toast={toast} />}
          {tab === 'website' && <WebsiteTab toast={toast} />}
          {tab === 'notifications' && <NotificationsTab toast={toast} />}
        </div>
      </div>
    </div>
  );
}

// ── Security Tab ──────────────────────────────────────────────────────────────

function SecurityTab({
  toast,
}: {
  toast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!current || !newPass || !confirm) {
      toast('All fields are required', 'error');
      return;
    }
    if (newPass !== confirm) {
      toast('New passwords do not match', 'error');
      return;
    }
    if (newPass.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }

    setSaving(true);

    // Hash the current password and verify against env / sessionStorage hash
    const [currentHash, storedHash] = await Promise.all([
      hashPassword(current),
      getBaselineHash(),
    ]);

    if (currentHash !== storedHash) {
      toast('Current password is incorrect', 'error');
      setSaving(false);
      return;
    }

    // Hash and store the new password
    const newHash = await hashPassword(newPass);
    sessionStorage.setItem(PASS_HASH_KEY, newHash);

    setSaving(false);
    toast('Password updated — takes effect on next login');
    setCurrent('');
    setNewPass('');
    setConfirm('');
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Change Admin Password" subtitle="Update the password used to access this admin panel" />
        <CardBody className="space-y-5">
          <PasswordInput
            label="Current Password"
            value={current}
            onChange={setCurrent}
            show={showCurrent}
            onToggle={() => setShowCurrent(v => !v)}
            placeholder="Your current password"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <PasswordInput
              label="New Password"
              value={newPass}
              onChange={setNewPass}
              show={showNew}
              onToggle={() => setShowNew(v => !v)}
              placeholder="At least 6 characters"
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirm}
              onChange={setConfirm}
              show={showNew}
              onToggle={() => setShowNew(v => !v)}
              placeholder="Repeat new password"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Session Info" subtitle="Current login session details" />
        <CardBody>
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <div className="text-sm font-medium text-white">Session active</div>
              <div className="mt-0.5 text-xs text-ink-400">
                Auto-expires after 8 hours of inactivity or when the browser tab is closed.
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/10 bg-ink-950/50 px-4 py-3 pr-11 text-sm text-white placeholder:text-ink-500 focus:border-accent-500/40 focus:outline-none"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200 transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

// ── Website Tab ───────────────────────────────────────────────────────────────

function WebsiteTab({
  toast,
}: {
  toast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [siteName, setSiteName] = useState('AURA AI');
  const [siteUrl, setSiteUrl] = useState('https://auraai.studio');
  const [maintenance, setMaintenance] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  // Persist to localStorage (no DB table for these settings)
  function load() {
    try {
      const raw = localStorage.getItem('aura_site_settings');
      if (raw) {
        const d = JSON.parse(raw);
        if (d.siteName) setSiteName(d.siteName);
        if (d.siteUrl) setSiteUrl(d.siteUrl);
        if (typeof d.maintenance === 'boolean') setMaintenance(d.maintenance);
        if (typeof d.analytics === 'boolean') setAnalytics(d.analytics);
      }
    } catch { /* ignore */ }
  }

  useState(() => { load(); });

  function handleSave() {
    try {
      localStorage.setItem('aura_site_settings', JSON.stringify({ siteName, siteUrl, maintenance, analytics }));
      toast('Website settings saved');
    } catch {
      toast('Failed to save settings', 'error');
    }
  }

  return (
    <Card>
      <CardHeader title="Website Settings" subtitle="General site configuration (stored locally)" />
      <CardBody className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Site Name"
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
          />
          <Input
            label="Site URL"
            value={siteUrl}
            onChange={e => setSiteUrl(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Maintenance Mode</div>
            <div className="mt-0.5 text-xs text-ink-400">Displays a maintenance banner on the website</div>
          </div>
          <Toggle checked={maintenance} onChange={setMaintenance} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Analytics Tracking</div>
            <div className="mt-0.5 text-xs text-ink-400">Enable visitor analytics on the public website</div>
          </div>
          <Toggle checked={analytics} onChange={setAnalytics} />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

// ── Notifications Tab ─────────────────────────────────────────────────────────

function NotificationsTab({
  toast,
}: {
  toast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [newInquiries, setNewInquiries] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  function load() {
    try {
      const raw = localStorage.getItem('aura_notification_prefs');
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.newInquiries === 'boolean') setNewInquiries(d.newInquiries);
        if (typeof d.projectUpdates === 'boolean') setProjectUpdates(d.projectUpdates);
        if (typeof d.weeklyReport === 'boolean') setWeeklyReport(d.weeklyReport);
      }
    } catch { /* ignore */ }
  }

  useState(() => { load(); });

  function handleSave() {
    try {
      localStorage.setItem('aura_notification_prefs', JSON.stringify({ newInquiries, projectUpdates, weeklyReport }));
      toast('Notification preferences saved');
    } catch {
      toast('Failed to save preferences', 'error');
    }
  }

  return (
    <Card>
      <CardHeader title="Notification Preferences" subtitle="Choose what alerts you receive (stored locally)" />
      <CardBody className="space-y-4">
        {[
          {
            label: 'New Inquiries',
            description: 'Get notified when a new contact form is submitted',
            value: newInquiries,
            onChange: setNewInquiries,
          },
          {
            label: 'Project Updates',
            description: 'Notifications for project status changes',
            value: projectUpdates,
            onChange: setProjectUpdates,
          },
          {
            label: 'Weekly Report',
            description: 'Receive a weekly summary of dashboard activity',
            value: weeklyReport,
            onChange: setWeeklyReport,
          },
        ].map(pref => (
          <div
            key={pref.label}
            className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
          >
            <div>
              <div className="text-sm font-medium text-white">{pref.label}</div>
              <div className="mt-0.5 text-xs text-ink-400">{pref.description}</div>
            </div>
            <Toggle checked={pref.value} onChange={pref.onChange} />
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={handleSave}>
            <Save className="h-4 w-4" /> Save Preferences
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
