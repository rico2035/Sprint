import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { WizardContainer } from '@/components/wizard/WizardContainer';
import { CanvasGrid } from '@/components/canvas/CanvasGrid';
import { AuthForm } from '@/components/auth/AuthForms';
import { PaywallModal } from '@/components/shared/PaywallModal';
import { Toast } from '@/components/shared/Toast';
import { useAppStore } from '@/store/appStore';
import { useCanvasStore } from '@/store/canvasStore';
import './App.css';

// Landing Page Component
function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
}

// Main App Component
function App() {
  const { currentRoute, setRoute, isAuthenticated, showToast } = useAppStore();
  const { currentCanvas, createCanvas } = useCanvasStore();

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sprint-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        useAppStore.getState().setUser(user);
      } catch {
        // Invalid saved user, ignore
      }
    }
  }, []);

  // Save user session when authenticated
  useEffect(() => {
    const user = useAppStore.getState().user;
    if (user) {
      localStorage.setItem('sprint-user', JSON.stringify(user));
    }
  }, [isAuthenticated]);

  // Handle route protection
  const renderRoute = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;

      case 'sign-in':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthForm mode="sign-in" />
          </motion.div>
        );

      case 'sign-up':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthForm mode="sign-up" />
          </motion.div>
        );

      case 'wizard':
        // If not authenticated, redirect to sign up
        if (!isAuthenticated) {
          // Save the business idea for after signup
          const businessIdea = useWizardStore.getState().businessIdea;
          if (businessIdea) {
            localStorage.setItem('wizard-business-idea', businessIdea);
          }
          setRoute('sign-up');
          showToast('Please create an account to continue', 'info');
          return null;
        }
        
        // Create a new canvas if none exists
        if (!currentCanvas) {
          const businessIdea = useWizardStore.getState().businessIdea;
          createCanvas(
            businessIdea ? `${businessIdea.slice(0, 30)}...` : 'My Business Plan',
            businessIdea
          );
        }
        
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WizardContainer />
          </motion.div>
        );

      case 'canvas':
        // If not authenticated, redirect to sign in
        if (!isAuthenticated) {
          setRoute('sign-in');
          showToast('Please sign in to view your canvas', 'info');
          return null;
        }
        
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CanvasGrid />
          </motion.div>
        );

      case 'dashboard':
        // Redirect to canvas for now
        setRoute('canvas');
        return null;

      case 'pricing':
        setRoute('landing');
        // Scroll to pricing section
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return <LandingPage />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <AnimatePresence mode="wait">
        {renderRoute()}
      </AnimatePresence>
      
      {/* Global UI Elements */}
      <PaywallModal />
      <Toast />
    </div>
  );
}

// Import for wizard store
import { useWizardStore } from '@/store/wizardStore';

export default App;
