import { useState } from 'react';
import { User, Lock, Globe, Bell, Save } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import { Input, Textarea, Toggle } from '@/components/admin/FormFields';
import { PageHeader } from '@/components/admin/PageStates';
import { useToast } from '@/components/admin/Toast';

type Tab = 'profile' | 'security' | 'website' | 'notifications';

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function SettingsPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('profile');

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your admin account and website settings" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
        {/* Tabs */}
        <div className="space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${tab === t.id ? 'bg-gradient-to-r from-accent-500/15 to-transparent text-white' : 'text-ink-300 hover:bg-white/[0.03] hover:text-white'
                  }`}
              >
                <Icon className={`h-4 w-4 ${tab === t.id ? 'text-accent-400' : 'text-ink-400'}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {tab === 'profile' && <ProfileTab toast={toast} />}
          {tab === 'security' && <SecurityTab toast={toast} />}
          {tab === 'website' && <WebsiteTab toast={toast} />}
          {tab === 'notifications' && <NotificationsTab toast={toast} />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('admin@auraai.studio');
  const [bio, setBio] = useState('');

  return (
    <Card>
      <CardHeader title="Admin Profile" subtitle="Your account information" />
      <CardBody className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-xl font-bold text-white">A</div>
          <Button variant="secondary" size="sm">Upload Photo</Button>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <Textarea label="Bio" rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." />
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => toast('Profile saved')}><Save className="h-4 w-4" /> Save Profile</Button>
        </div>
      </CardBody>
    </Card>
  );
}

function SecurityTab({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [twoFA, setTwoFA] = useState(false);

  function handleSave() {
    if (!current || !newPass || !confirm) { toast('All fields are required', 'error'); return; }
    if (newPass !== confirm) { toast('Passwords do not match', 'error'); return; }
    toast('Password updated');
    setCurrent(''); setNewPass(''); setConfirm('');
  }

  return (
    <Card>
      <CardHeader title="Password & Security" subtitle="Change your password and security settings" />
      <CardBody className="space-y-5">
        <Input label="Current Password" type="password" value={current} onChange={e => setCurrent(e.target.value)} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="New Password" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
          <Input label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
            <div className="mt-0.5 text-xs text-ink-400">Add an extra layer of security to your account</div>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}><Save className="h-4 w-4" /> Update Password</Button>
        </div>
      </CardBody>
    </Card>
  );
}

function WebsiteTab({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [siteName, setSiteName] = useState('AURA AI');
  const [siteUrl, setSiteUrl] = useState('https://auraai.studio');
  const [maintenance, setMaintenance] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <Card>
      <CardHeader title="Website Settings" subtitle="General website configuration" />
      <CardBody className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Site Name" value={siteName} onChange={e => setSiteName(e.target.value)} />
          <Input label="Site URL" value={siteUrl} onChange={e => setSiteUrl(e.target.value)} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Maintenance Mode</div>
            <div className="mt-0.5 text-xs text-ink-400">Temporarily disable the public website</div>
          </div>
          <Toggle checked={maintenance} onChange={setMaintenance} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Analytics Tracking</div>
            <div className="mt-0.5 text-xs text-ink-400">Enable visitor analytics on the website</div>
          </div>
          <Toggle checked={analytics} onChange={setAnalytics} />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => toast('Website settings saved')}><Save className="h-4 w-4" /> Save Settings</Button>
        </div>
      </CardBody>
    </Card>
  );
}

function NotificationsTab({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [newInquiries, setNewInquiries] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <Card>
      <CardHeader title="Notification Settings" subtitle="Choose what alerts you receive" />
      <CardBody className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">New Inquiries</div>
            <div className="mt-0.5 text-xs text-ink-400">Get notified when a new contact form is submitted</div>
          </div>
          <Toggle checked={newInquiries} onChange={setNewInquiries} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Project Updates</div>
            <div className="mt-0.5 text-xs text-ink-400">Notifications for project status changes</div>
          </div>
          <Toggle checked={projectUpdates} onChange={setProjectUpdates} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
          <div>
            <div className="text-sm font-medium text-white">Weekly Report</div>
            <div className="mt-0.5 text-xs text-ink-400">Receive a weekly summary of dashboard activity</div>
          </div>
          <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={() => toast('Notification preferences saved')}><Save className="h-4 w-4" /> Save Preferences</Button>
        </div>
      </CardBody>
    </Card>
  );
}

