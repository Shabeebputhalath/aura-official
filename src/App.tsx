import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import WorkShowcase from '@/components/WorkShowcase';
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
import { Settings } from 'lucide-react';

type Route = 'home' | 'work' | 'about' | 'services' | 'contact' | 'admin';

interface NavHandlers {
  onNavigateWork: () => void;
  onNavigateAbout: () => void;
  onNavigateServices: () => void;
  onNavigateContact: () => void;
}

function App() {
  const [route, setRoute] = useState<Route>('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/work') setRoute('work');
      else if (hash === '#/about') setRoute('about');
      else if (hash === '#/services') setRoute('services');
      else if (hash === '#/contact') setRoute('contact');
      else if (hash === '#/admin') setRoute('admin');
      else setRoute('home');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  function navigate(r: Route) {
    if (r === 'home') window.location.hash = '';
    else if (r === 'work') window.location.hash = '/work';
    else if (r === 'about') window.location.hash = '/about';
    else if (r === 'services') window.location.hash = '/services';
    else if (r === 'contact') window.location.hash = '/contact';
    else if (r === 'admin') window.location.hash = '/admin';
    window.scrollTo({ top: 0 });
  }

  const navHandlers: NavHandlers = {
    onNavigateWork: () => navigate('work'),
    onNavigateAbout: () => navigate('about'),
    onNavigateServices: () => navigate('services'),
    onNavigateContact: () => navigate('contact'),
  };

  if (route === 'admin') {
    return <AdminApp onExit={() => navigate('home')} />;
  }

  if (route === 'work') {
    return (
      <div className="relative min-h-screen bg-ink-950">
        <Navbar {...navHandlers} />
        <WorkPage />
        <Footer />
        <AdminButton onClick={() => navigate('admin')} />
      </div>
    );
  }

  if (route === 'about') {
    return (
      <div className="relative min-h-screen bg-ink-950">
        <Navbar {...navHandlers} />
        <AboutPage onNavigateHome={() => navigate('home')} />
        <Footer />
        <AdminButton onClick={() => navigate('admin')} />
      </div>
    );
  }

  if (route === 'services') {
    return (
      <div className="relative min-h-screen bg-ink-950">
        <Navbar {...navHandlers} />
        <ServicesPage onNavigateHome={() => navigate('home')} />
        <Footer />
        <AdminButton onClick={() => navigate('admin')} />
      </div>
    );
  }

  if (route === 'contact') {
    return (
      <div className="relative min-h-screen bg-ink-950">
        <Navbar {...navHandlers} />
        <ContactPage onNavigateHome={() => navigate('home')} />
        <Footer />
        <AdminButton onClick={() => navigate('admin')} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-ink-950">
      <Navbar {...navHandlers} />
      <main>
        <Hero />
        <TrustSection />
        <About />
        <WorkShowcase onNavigateWork={() => navigate('work')} />
        <Services />
        <WhyAIHuman />
        <Process />
        <Capabilities />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <AdminButton onClick={() => navigate('admin')} />
    </div>
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

