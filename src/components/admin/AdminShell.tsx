import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Film, Layers, DollarSign, Mail, Quote,
  FileText, Settings, Search, Bell, Menu, X, ArrowLeft, LogOut,
  Sparkles, Sun, Moon,
} from 'lucide-react';
import { useAdminTheme } from '@/components/admin/AdminTheme';

export type AdminPage =
  | 'dashboard' | 'projects' | 'services' | 'pricing'
  | 'inquiries' | 'testimonials' | 'capabilities' | 'content' | 'settings';

interface NavItem { id: AdminPage; label: string; icon: typeof LayoutDashboard; }

const navItems: NavItem[] = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'projects',     label: 'Projects',     icon: Film },
  { id: 'services',     label: 'Services',     icon: Layers },
  { id: 'pricing',      label: 'Pricing',      icon: DollarSign },
  { id: 'inquiries',    label: 'Inquiries',    icon: Mail },
  { id: 'testimonials', label: 'Testimonials', icon: Quote },
  { id: 'capabilities', label: 'Capabilities', icon: Sparkles },
  { id: 'content',      label: 'Content',      icon: FileText },
  { id: 'settings',     label: 'Settings',     icon: Settings },
];

// ── Theme token maps ──────────────────────────────────────────────────────────
// All colour tokens for dark and light admin themes in one place.
const T = {
  dark: {
    shell:       'bg-[#0a0a0f]',
    sidebar:     'bg-[#0d0d14]/80 border-white/[0.04]',
    topbar:      'bg-[#0d0d14]/60 border-white/[0.04]',
    main:        'bg-[#0a0a0f]',
    logoText:    'text-white',
    logoSub:     'text-[#4a4a6a]',
    navActive:   'bg-gradient-to-r from-accent-500/15 to-transparent text-white',
    navInactive: 'text-[#8888aa] hover:bg-white/[0.03] hover:text-white',
    navIcon:     'text-accent-400',
    navIconDef:  'text-[#4a4a6a] group-hover:text-[#8888aa]',
    exitBtn:     'text-[#8888aa] hover:bg-white/[0.03] hover:text-white',
    logoutBtn:   'text-red-400/70 hover:bg-red-500/[0.06] hover:text-red-400',
    searchBg:    'border-white/[0.06] bg-[#0a0a0f]/50 text-white placeholder:text-[#4a4a6a] focus:border-accent-500/40',
    notifBtn:    'border-white/[0.06] bg-white/[0.02] text-[#8888aa] hover:text-white',
    profileName: 'text-white',
    profileSub:  'text-[#4a4a6a]',
    themeBtnBg:  'bg-white/[0.04] border-white/[0.06] text-[#8888aa] hover:bg-white/[0.08] hover:text-white',
    themeLabel:  'text-[#8888aa]',
    divider:     'border-white/[0.04]',
    scrollbar:   '',
  },
  light: {
    shell:       'bg-[#f4f4f8]',
    sidebar:     'bg-white/90 border-[#e2e2ea]',
    topbar:      'bg-white/80 border-[#e2e2ea]',
    main:        'bg-[#f4f4f8]',
    logoText:    'text-[#1a1a2e]',
    logoSub:     'text-[#9999bb]',
    navActive:   'bg-gradient-to-r from-accent-500/10 to-transparent text-[#1a1a2e]',
    navInactive: 'text-[#6666aa] hover:bg-accent-500/[0.05] hover:text-[#1a1a2e]',
    navIcon:     'text-accent-500',
    navIconDef:  'text-[#aaaacc] group-hover:text-[#6666aa]',
    exitBtn:     'text-[#6666aa] hover:bg-[#ebebf5] hover:text-[#1a1a2e]',
    logoutBtn:   'text-red-400 hover:bg-red-50 hover:text-red-500',
    searchBg:    'border-[#dddde8] bg-white text-[#1a1a2e] placeholder:text-[#aaaacc] focus:border-accent-500/50',
    notifBtn:    'border-[#dddde8] bg-white text-[#6666aa] hover:text-[#1a1a2e]',
    profileName: 'text-[#1a1a2e]',
    profileSub:  'text-[#9999bb]',
    themeBtnBg:  'bg-[#ebebf5] border-[#dddde8] text-[#6666aa] hover:bg-[#e0e0f0] hover:text-[#1a1a2e]',
    themeLabel:  'text-[#6666aa]',
    divider:     'border-[#e2e2ea]',
    scrollbar:   'scrollbar-light',
  },
} as const;

type ThemeTokens = Record<keyof typeof T.dark, string>;

export function AdminShell({
  current, onNavigate, onExit, onLogout, children,
}: {
  current: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onExit: () => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useAdminTheme();
  const tk: ThemeTokens = T[theme];
  const isDark = theme === 'dark';

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`flex items-center justify-between px-6 py-5 border-b ${tk.divider}`}>
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 opacity-80" />
            <div className={`absolute inset-[2px] rounded-full ${isDark ? 'bg-ink-950' : 'bg-white'}`} />
            <div className="relative h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
          </div>
          <div>
            <div className={`font-display text-base font-semibold tracking-tight ${tk.logoText}`}>
              AURA<span className="text-accent-400"> AI</span>
            </div>
            <div className={`text-[10px] font-medium uppercase tracking-[0.2em] ${tk.logoSub}`}>
              Admin Panel
            </div>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)} className={`${tk.exitBtn} lg:hidden`}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? tk.navActive : tk.navInactive}`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-accent-400" />
              )}
              <Icon className={`h-5 w-5 transition-colors ${active ? tk.navIcon : tk.navIconDef}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className={`border-t ${tk.divider} p-3 space-y-1`}>
        <button
          onClick={onExit}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${tk.exitBtn}`}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Website
        </button>
        <button
          onClick={onLogout}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${tk.logoutBtn}`}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${tk.shell}`}>
      {/* Desktop sidebar */}
      <aside className={`hidden w-64 shrink-0 border-r backdrop-blur-xl lg:block ${tk.sidebar}`}>
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className={`relative h-full w-64 border-r animate-slide-right ${tk.sidebar}`}>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className={`flex items-center justify-between border-b px-6 py-4 backdrop-blur-xl ${tk.topbar}`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className={`${tk.exitBtn} lg:hidden`}
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a4a6a]" />
              <input
                type="text"
                placeholder="Search..."
                className={`w-56 rounded-lg border py-2 pl-9 pr-4 text-sm transition-all focus:outline-none focus:w-72 ${tk.searchBg}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ── Theme toggle ─────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <span className={`hidden text-xs font-medium sm:inline ${tk.themeLabel}`}>
                {isDark ? 'Dark' : 'Light'}
              </span>
              <button
                onClick={toggle}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 ${tk.themeBtnBg}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            {/* Notifications */}
            <button className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${tk.notifBtn}`}>
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-sm font-semibold text-white">
                A
              </div>
              <div className="hidden sm:block">
                <div className={`text-sm font-medium ${tk.profileName}`}>Admin</div>
                <div className={`text-xs ${tk.profileSub}`}>admin@auraai.studio</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-y-auto px-6 py-8 lg:px-8 transition-colors duration-300 ${tk.main}`}>
          {/* Inject light-mode text overrides as a scoped wrapper */}
          <div
            className={`mx-auto max-w-6xl ${!isDark ? 'admin-light' : ''}`}
            data-admin-theme={theme}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
