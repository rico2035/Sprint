import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, FileText, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';

export function PaywallModal() {
  const { showPaywall, hidePaywallModal, showToast } = useAppStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast('Payment successful! You now have Pro access.', 'success');
    hidePaywallModal();
    setIsProcessing(false);
  };

  const features = [
    {
      icon: FileText,
      title: 'Detailed Business Plan PDF',
      description: 'Export a comprehensive 20+ page business plan with executive summary, market analysis, and financial projections.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get intelligent market analysis, competitive insights, and growth recommendations powered by advanced AI.',
    },
    {
      icon: Shield,
      title: 'Lifetime Access',
      description: 'One-time payment for lifetime access to all Pro features and future updates.',
    },
  ];

  return (
    <AnimatePresence>
      {showPaywall && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hidePaywallModal}
            className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-3xl shadow-elevated z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={hidePaywallModal}
              className="absolute top-4 right-4 p-2 hover:bg-cream-100 rounded-xl transition-colors z-10"
            >
              <X className="w-5 h-5 text-ink-500" />
            </button>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              {/* Header */}
              <div className="bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 px-8 py-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/10 mb-4">
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Pro
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Get Your Detailed Business Plan
                </h2>
                <p className="text-white/70 max-w-md mx-auto">
                  Export a comprehensive PDF with market analysis, financial projections, and actionable insights.
                </p>
              </div>

              {/* Features */}
              <div className="p-8">
                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-ink-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-ink-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="bg-cream-100 rounded-2xl p-6 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-ink-900">$9.99</span>
                    <span className="text-ink-500">one-time</span>
                  </div>
                  <p className="text-sm text-ink-600">
                    No subscription. Lifetime access.
                  </p>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full btn-primary justify-center py-4 h-auto text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Upgrade to Pro
                    </>
                  )}
                </Button>

                {/* Guarantee */}
                <p className="text-center text-sm text-ink-500 mt-4">
                  30-day money-back guarantee. No questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
