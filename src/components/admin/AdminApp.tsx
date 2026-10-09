import { useState } from 'react';
import { AdminShell, type AdminPage } from '@/components/admin/AdminShell';
import { ToastProvider } from '@/components/admin/Toast';
import { DashboardPage } from '@/components/admin/pages/DashboardPage';
import { ProjectsPage } from '@/components/admin/pages/ProjectsPage';
import { ServicesPage } from '@/components/admin/pages/ServicesPage';
import { PricingPage } from '@/components/admin/pages/PricingPage';
import { InquiriesPage } from '@/components/admin/pages/InquiriesPage';
import { TestimonialsPage } from '@/components/admin/pages/TestimonialsPage';
import { ContentPage } from '@/components/admin/pages/ContentPage';
import { SettingsPage } from '@/components/admin/pages/SettingsPage';

export function AdminApp({
  onExit,
  onLogout,
}: {
  onExit: () => void;
  onLogout: () => void;
}) {
  const [page, setPage] = useState<AdminPage>('dashboard');

  return (
    <ToastProvider>
      <AdminShell current={page} onNavigate={setPage} onExit={onExit} onLogout={onLogout}>
        {page === 'dashboard' && <DashboardPage onNavigate={setPage} />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'services' && <ServicesPage />}
        {page === 'pricing' && <PricingPage />}
        {page === 'inquiries' && <InquiriesPage />}
        {page === 'testimonials' && <TestimonialsPage />}
        {page === 'content' && <ContentPage />}
        {page === 'settings' && <SettingsPage />}
      </AdminShell>
    </ToastProvider>
  );
}
