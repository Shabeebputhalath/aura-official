import { createContext, useContext, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface AdminThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const Ctx = createContext<AdminThemeCtx>({ theme: 'dark', toggle: () => {} });

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem('aura_admin_theme') as Theme) || 'dark'; }
    catch { return 'dark'; }
  });

  function toggle() {
    setTheme(t => {
      const next: Theme = t === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('aura_admin_theme', next); } catch {}
      return next;
    });
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export function useAdminTheme() { return useContext(Ctx); }
