import { useEffect, useState } from 'react';
import { Film, CheckCircle2, Mail, DollarSign, ArrowUpRight, Plus, Settings, FileText } from 'lucide-react';
import { supabase, type Project, type Inquiry } from '@/lib/supabase';
import { Card, CardBody, CardHeader } from '@/components/admin/Card';
import { Badge, StatusBadge } from '@/components/admin/Badge';
import { LoadingSpinner } from '@/components/admin/PageStates';
import { useReveal, useCountUp } from '@/hooks/useReveal';
import type { AdminPage } from '@/components/admin/AdminShell';

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  contactInquiries: number;
  monthlyRevenue: number;
}

function StatCard({ icon, label, value, prefix, color, index }: { icon: React.ReactNode; label: string; value: number; prefix?: string; color: string; index: number }) {
  const { ref, visible } = useReveal();
  const count = useCountUp(value, 1500, visible);

  return (
    <div
      ref={ref}
      className={`reveal rounded-xl border border-white/[0.06] bg-ink-850/60 p-6 backdrop-blur-sm transition-all duration-700 ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${color}`}>{icon}</div>
        <ArrowUpRight className="h-4 w-4 text-ink-600" />
      </div>
      <div className="mt-4 font-display text-3xl font-bold tracking-tight text-white">
        {prefix}{count.toLocaleString()}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
    </div>
  );
}

export function DashboardPage({ onNavigate }: { onNavigate: (page: AdminPage) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [projectsRes, inquiriesRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
      ]);

      const projects = projectsRes.data ?? [];
      const inquiries = inquiriesRes.data ?? [];

      setStats({
        totalProjects: projects.length,
        publishedProjects: projects.filter((p) => p.published).length,
        contactInquiries: inquiries.filter((i) => i.status === 'new').length,
        monthlyRevenue: 12497,
      });
      setRecentProjects(projects.slice(0, 4));
      setRecentInquiries(inquiries.slice(0, 4));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;

  const quickActions = [
    { label: 'Add Project', icon: Plus, page: 'projects' as AdminPage },
    { label: 'View Inquiries', icon: Mail, page: 'inquiries' as AdminPage },
    { label: 'Edit Content', icon: FileText, page: 'content' as AdminPage },
    { label: 'Settings', icon: Settings, page: 'settings' as AdminPage },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-400">Welcome back — here's what's happening at AURA AI.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Film className="h-5 w-5 text-accent-400" />} label="Total Projects" value={stats?.totalProjects ?? 0} color="border-accent-500/20 bg-accent-500/10" index={0} />
        <StatCard icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />} label="Published Projects" value={stats?.publishedProjects ?? 0} color="border-emerald-500/20 bg-emerald-500/10" index={1} />
        <StatCard icon={<Mail className="h-5 w-5 text-sky-400" />} label="New Inquiries" value={stats?.contactInquiries ?? 0} color="border-sky-500/20 bg-sky-500/10" index={2} />
        <StatCard icon={<DollarSign className="h-5 w-5 text-amber-400" />} label="Monthly Revenue" value={stats?.monthlyRevenue ?? 0} prefix="$" color="border-amber-500/20 bg-amber-500/10" index={3} />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 mb-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-ink-400">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => onNavigate(action.page)}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-850/60 px-4 py-3.5 text-sm font-medium text-ink-200 transition-all duration-300 hover:border-accent-500/20 hover:bg-ink-800 hover:text-white"
              >
                <Icon className="h-4 w-4 text-ink-400 transition-colors group-hover:text-accent-400" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Projects + Inquiries */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader title="Recent Projects" action={
            <button onClick={() => onNavigate('projects')} className="text-xs font-medium text-accent-400 hover:text-accent-300">View all →</button>
          } />
          <CardBody className="space-y-3">
            {recentProjects.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-400">No projects yet.</p>
            ) : (
              recentProjects.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 transition-colors hover:bg-white/[0.03]">
                  <img src={p.image_url} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{p.title}</div>
                    <div className="truncate text-xs text-ink-400">{p.client} · {p.category}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {p.featured && <Badge variant="accent">Featured</Badge>}
                    <Badge variant={p.published ? 'success' : 'default'}>{p.published ? 'Published' : 'Draft'}</Badge>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader title="Recent Inquiries" action={
            <button onClick={() => onNavigate('inquiries')} className="text-xs font-medium text-accent-400 hover:text-accent-300">View all →</button>
          } />
          <CardBody className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-400">No inquiries yet.</p>
            ) : (
              recentInquiries.map((i) => (
                <div key={i.id} className="flex items-center gap-4 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 transition-colors hover:bg-white/[0.03]">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{i.full_name}</div>
                    <div className="truncate text-xs text-ink-400">{i.project_type} · {i.budget}</div>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

