import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import Services from '@/components/Services';
import WhyAIHuman from '@/components/WhyAIHuman';
import Process from '@/components/Process';
import Capabilities from '@/components/Capabilities';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WorkPage from '@/components/WorkPage';
import AboutPage from '@/components/AboutPage';
import ServicesPage from '@/components/ServicesPage';
import ContactPage from '@/components/ContactPage';
import { AdminApp } from '@/components/admin/AdminApp';
import AdminLogin, {
  getStoredSession,
  clearSession,
} from '@/components/admin/AdminLogin';
import PageLoader from '@/components/PageLoader';
import { Settings } from 'lucide-react';

type Route = 'home' | 'work' | 'about' | 'services' | 'contact' | 'admin';

interface NavHandlers {
  onNavigateWork: () => void;
  onNavigateAbout: () => void;
  onNavigateServices: () => void;
  onNavigateContact: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Navigate to /admin using real pathname; everything else uses hash routing */
function goToAdmin() {
  window.history.pushState({}, '', '/admin');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Navigate away from /admin back to the site */
function goHome() {
  window.history.pushState({}, '', '/');
  window.location.hash = '';
  window.scrollTo({ top: 0 });
}

/** True when the browser is currently on the /admin path */
function isAdminPath() {
  return window.location.pathname === '/admin';
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [route, setRoute] = useState<Route>(() =>
    isAdminPath() ? 'admin' : 'home'
  );
  const [adminAuthed, setAdminAuthed] = useState<boolean>(() => getStoredSession());

  // Skip the loader if landing directly on /admin
  const [loaderDone, setLoaderDone] = useState(() => isAdminPath());

  const stopScroll = useCallback(() => { document.body.style.overflow = 'hidden'; }, []);
  const startScroll = useCallback(() => { document.body.style.overflow = ''; }, []);

  // Listen for hash changes (public pages) AND popstate (/admin)
  useEffect(() => {
    const handleRoute = () => {
      if (isAdminPath()) {
        setRoute('admin');
        return;
      }
      const hash = window.location.hash;
      if      (hash === '#/work')     setRoute('work');
      else if (hash === '#/about')    setRoute('about');
      else if (hash === '#/services') setRoute('services');
      else if (hash === '#/contact')  setRoute('contact');
      else                            setRoute('home');
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate',   handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate',   handleRoute);
    };
  }, []);

  function navigate(r: Route) {
    if (r === 'admin') {
      goToAdmin();
      return;
    }
    if (isAdminPath()) {
      // Coming back from /admin — reset to root first
      window.history.pushState({}, '', '/');
    }
    if (r === 'home')     window.location.hash = '';
    else if (r === 'work')     window.location.hash = '/work';
    else if (r === 'about')    window.location.hash = '/about';
    else if (r === 'services') window.location.hash = '/services';
    else if (r === 'contact')  window.location.hash = '/contact';
    window.scrollTo({ top: 0 });
  }

  function handleLogout() {
    clearSession();
    setAdminAuthed(false);
    goHome();
  }

  const navHandlers: NavHandlers = {
    onNavigateWork:     () => navigate('work'),
    onNavigateAbout:    () => navigate('about'),
    onNavigateServices: () => navigate('services'),
    onNavigateContact:  () => navigate('contact'),
  };

  // ── Page loader ──────────────────────────────────────────────
  const loader = !loaderDone ? (
    <PageLoader
      onFinish={() => setLoaderDone(true)}
      stopScroll={stopScroll}
      startScroll={startScroll}
    />
  ) : null;

  // ── Admin route (/admin) ─────────────────────────────────────
  if (route === 'admin') {
    if (!adminAuthed) {
      return <AdminLogin onSuccess={() => setAdminAuthed(true)} />;
    }
    return (
      <AdminApp
        onExit={() => { goHome(); setRoute('home'); }}
        onLogout={handleLogout}
      />
    );
  }

  // ── Public routes (hash-based) ───────────────────────────────
  if (route === 'work') {
    return (
      <>
        {loader}
        <div className="relative min-h-screen bg-ink-950">
          <Navbar {...navHandlers} />
          <WorkPage />
          <Footer />
          <AdminButton onClick={() => navigate('admin')} />
        </div>
      </>
    );
  }

  if (route === 'about') {
    return (
      <>
        {loader}
        <div className="relative min-h-screen bg-ink-950">
          <Navbar {...navHandlers} />
          <AboutPage onNavigateHome={() => navigate('home')} />
          <Footer />
          <AdminButton onClick={() => navigate('admin')} />
        </div>
      </>
    );
  }

  if (route === 'services') {
    return (
      <>
        {loader}
        <div className="relative min-h-screen bg-ink-950">
          <Navbar {...navHandlers} />
          <ServicesPage onNavigateHome={() => navigate('home')} />
          <Footer />
          <AdminButton onClick={() => navigate('admin')} />
        </div>
      </>
    );
  }

  if (route === 'contact') {
    return (
      <>
        {loader}
        <div className="relative min-h-screen bg-ink-950">
          <Navbar {...navHandlers} />
          <ContactPage onNavigateHome={() => navigate('home')} />
          <Footer />
          <AdminButton onClick={() => navigate('admin')} />
        </div>
      </>
    );
  }

  // ── Home ─────────────────────────────────────────────────────
  return (
    <>
      {loader}
      <div className="relative min-h-screen bg-ink-950">
        <Navbar {...navHandlers} />
        <main>
          <Hero />
          <TrustSection />
          <About />
          <Capabilities />
          <Services />
          <WhyAIHuman />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Contact />
          <FinalCTA />
        </main>
        <Footer />
        <AdminButton onClick={() => navigate('admin')} />
      </div>
    </>
  );
}

function AdminButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-ink-300 backdrop-blur-xl transition-all duration-300 hover:border-accent-500/30 hover:text-accent-400"
      aria-label="Admin Dashboard"
      title="Admin Dashboard"
    >
      <Settings className="h-5 w-5" />
    </button>
  );
}

export default App;
