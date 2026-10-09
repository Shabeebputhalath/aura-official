import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Film,
  Layers,
  DollarSign,
  Mail,
  Quote,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ArrowLeft,
  LogOut,
} from 'lucide-react';

export type AdminPage =
  | 'dashboard'
  | 'projects'
  | 'services'
  | 'pricing'
  | 'inquiries'
  | 'testimonials'
  | 'content'
  | 'settings';

interface NavItem {
  id: AdminPage;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Film },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'inquiries', label: 'Inquiries', icon: Mail },
  { id: 'testimonials', label: 'Testimonials', icon: Quote },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AdminShell({
  current,
  onNavigate,
  onExit,
  onLogout,
  children,
}: {
  current: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onExit: () => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 opacity-80" />
            <div className="absolute inset-[2px] rounded-full bg-ink-950" />
            <div className="relative h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
          </div>
          <div>
            <div className="font-display text-base font-semibold tracking-tight text-white">
              AURA<span className="text-accent-400"> AI</span>
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-500">Admin Panel</div>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)} className="text-ink-400 lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${active
                  ? 'bg-gradient-to-r from-accent-500/15 to-transparent text-white'
                  : 'text-ink-300 hover:bg-white/[0.03] hover:text-white'
                }`}
            >
              {active && <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-accent-400" />}
              <Icon className={`h-5 w-5 transition-colors ${active ? 'text-accent-400' : 'text-ink-400 group-hover:text-ink-200'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Exit to site */}
      <div className="border-t border-white/[0.04] p-3 space-y-1">
        <button
          onClick={onExit}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-300 transition-all duration-300 hover:bg-white/[0.03] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Website
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400/70 transition-all duration-300 hover:bg-red-500/[0.06] hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-ink-950">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.04] bg-ink-900/50 backdrop-blur-xl lg:block">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative h-full w-64 border-r border-white/[0.04] bg-ink-900 animate-slide-right">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-white/[0.04] bg-ink-900/30 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="text-ink-300 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-56 rounded-lg border border-white/[0.06] bg-ink-950/50 py-2 pl-9 pr-4 text-sm text-white placeholder:text-ink-500 transition-all focus:outline-none focus:border-accent-500/40 focus:w-72"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-ink-300 transition-colors hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            </button>
            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-sm font-semibold text-white">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-white">Admin</div>
                <div className="text-xs text-ink-400">admin@auraai.studio</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

