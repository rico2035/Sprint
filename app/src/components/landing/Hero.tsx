import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useWizardStore } from '@/store/wizardStore';

export function Hero() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { setRoute, showToast } = useAppStore();
  const { setBusinessIdea: setWizardIdea, initializeSteps } = useWizardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessIdea.trim()) {
      showToast('Please describe your business idea first', 'error');
      return;
    }

    if (businessIdea.trim().length < 10) {
      showToast('Please provide a bit more detail about your idea', 'error');
      return;
    }

    // Save business idea and start wizard
    setWizardIdea(businessIdea);
    initializeSteps();
    setRoute('wizard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1a1a1a 1px, transparent 1px),
              linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 section-padding w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-premium text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft text-sm font-medium text-ink-700">
              <Sparkles className="w-4 h-4 text-accent-orange" />
              AI-Powered Business Planning
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.1] mb-6"
          >
            Build your{' '}
            <span className="relative inline-block">
              <span className="relative z-10">lean business plan</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 -z-0 origin-left"
              />
            </span>
            <br />
            <span className="text-ink-500">in minutes, not days</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-ink-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Answer intelligent AI-guided questions and transform your idea into a 
            comprehensive lean canvas. Perfect for startups, side projects, and 
            new business ventures.
          </motion.p>

          {/* Input Form */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="relative">
              <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{
                  boxShadow: isHovered
                    ? '0 8px 40px rgba(0, 0, 0, 0.12)'
                    : '0 4px 24px rgba(0, 0, 0, 0.08)',
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  placeholder="Describe in simple words what you are trying to build..."
                  className="flex-1 px-5 py-4 bg-transparent text-ink-900 placeholder:text-ink-400 text-base sm:text-lg focus:outline-none min-w-0"
                />
                <Button
                  type="submit"
                  className="btn-primary whitespace-nowrap px-6 py-4 h-auto"
                >
                  <span className="hidden sm:inline">Start Building</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </form>

            {/* Helper Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-sm text-ink-500"
            >
              Try: "A meal planning app for busy professionals" or "AI-powered content creation tool for marketers"
            </motion.p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-ink-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cream-300 to-cream-400 border-2 border-white flex items-center justify-center text-xs font-medium text-ink-600"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm">Trusted by 10,000+ founders</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Free to start
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                No credit card required
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-200 to-transparent pointer-events-none" />
    </section>
  );
}
