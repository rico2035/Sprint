import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    interval: 'forever',
    features: [
      'Create unlimited lean canvases',
      'AI-powered guided questions',
      'Basic canvas visualization',
      'Export as JSON',
      'Auto-save progress',
      'Email support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For serious entrepreneurs',
    price: 9.99,
    interval: 'one-time',
    features: [
      'Everything in Free',
      'Detailed business plan PDF',
      'Market analysis insights',
      'Financial projections',
      'Competitive analysis',
      'Priority AI processing',
      'Lifetime access to exports',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
];

export function Pricing() {
  const { setRoute, showPaywallModal } = useAppStore();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    if (plan.name === 'Free') {
      setRoute('sign-up');
    } else {
      showPaywallModal();
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-premium">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-ink-900/5 rounded-full text-sm font-medium text-ink-700 mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-6">
              Simple, transparent{' '}
              <span className="text-ink-500">pricing</span>
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed">
              Start for free and upgrade when you are ready for a detailed business plan. 
              No subscriptions, no hidden fees.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-ink-900 text-white text-sm font-medium rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`h-full bg-white rounded-3xl p-8 ${
                    plan.popular
                      ? 'shadow-elevated ring-2 ring-ink-900'
                      : 'shadow-card'
                  }`}
                >
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-ink-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-ink-600">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-bold text-ink-900">
                        ${plan.price}
                      </span>
                      <span className="text-ink-500">/{plan.interval}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-ink-900' : 'bg-green-100'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.popular ? 'text-white' : 'text-green-600'
                          }`} />
                        </div>
                        <span className="text-ink-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full justify-center py-4 h-auto text-base font-medium ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-ink-600">
              Have questions?{' '}
              <button 
                onClick={() => setRoute('sign-up')}
                className="text-ink-900 font-medium underline underline-offset-4 hover:text-ink-700 transition-colors"
              >
                Contact our team
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
