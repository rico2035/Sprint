import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setRoute, isAuthenticated } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How it Works', href: '#how-it-works' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-padding">
          <div className="container-premium">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  setRoute('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-9 h-9 bg-ink-900 rounded-xl flex items-center justify-center group-hover:shadow-glow-sm transition-shadow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-ink-900">Sprint</span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ink-900 transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {isAuthenticated ? (
                  <Button
                    onClick={() => setRoute('dashboard')}
                    className="btn-primary"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setRoute('sign-in')}
                      className="text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-cream-100"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => setRoute('sign-up')}
                      className="btn-primary"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-cream-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-ink-900" />
                ) : (
                  <Menu className="w-6 h-6 text-ink-900" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="section-padding py-4 bg-white/95 backdrop-blur-xl border-b border-ink-100 shadow-elevated">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-3 text-left text-base font-medium text-ink-700 hover:text-ink-900 hover:bg-cream-100 rounded-xl transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <hr className="my-2 border-ink-100" />
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      setRoute('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setRoute('sign-in');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-center text-ink-700"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        setRoute('sign-up');
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-primary w-full justify-center"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
