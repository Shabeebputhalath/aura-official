import { useState } from 'react';
import { AdminShell, type AdminPage } from '@/components/admin/AdminShell';
import { AdminThemeProvider } from '@/components/admin/AdminTheme';
import { ToastProvider } from '@/components/admin/Toast';
import { DashboardPage } from '@/components/admin/pages/DashboardPage';
import { ServicesPage } from '@/components/admin/pages/ServicesPage';
import { PricingPage } from '@/components/admin/pages/PricingPage';
import { InquiriesPage } from '@/components/admin/pages/InquiriesPage';
import { TestimonialsPage } from '@/components/admin/pages/TestimonialsPage';
import { CapabilitiesPage } from '@/components/admin/pages/CapabilitiesPage';
import { ContentPage } from '@/components/admin/pages/ContentPage';
import { SettingsPage } from '@/components/admin/pages/SettingsPage';

// ProjectsPage kept as import for future use:
// import { ProjectsPage } from '@/components/admin/pages/ProjectsPage';

export function AdminApp({
  onExit,
  onLogout,
}: {
  onExit: () => void;
  onLogout: () => void;
}) {
  const [page, setPage] = useState<AdminPage>('dashboard');

  return (
    <AdminThemeProvider>
      <ToastProvider>
        <AdminShell current={page} onNavigate={setPage} onExit={onExit} onLogout={onLogout}>
          {page === 'dashboard'    && <DashboardPage onNavigate={setPage} />}
          {page === 'capabilities' && <CapabilitiesPage />}
          {page === 'services'     && <ServicesPage />}
          {page === 'pricing'      && <PricingPage />}
          {page === 'inquiries'    && <InquiriesPage />}
          {page === 'testimonials' && <TestimonialsPage />}
          {page === 'content'      && <ContentPage />}
          {page === 'settings'     && <SettingsPage />}
        </AdminShell>
      </ToastProvider>
    </AdminThemeProvider>
  );
}
