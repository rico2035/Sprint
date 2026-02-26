import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Lightbulb, Layout, Download } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Describe Your Idea',
    description: 'Start by describing your business idea in simple words. Our AI analyzes your input and prepares personalized questions.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Answer AI Questions',
    description: 'Go through 9 sections of intelligent, contextual questions. Get suggestions and guidance every step of the way.',
  },
  {
    number: '03',
    icon: Layout,
    title: 'Review Your Canvas',
    description: 'See your complete lean canvas come to life. Edit, refine, and perfect each section until you are satisfied.',
  },
  {
    number: '04',
    icon: Download,
    title: 'Export & Share',
    description: 'Export as JSON for free, or upgrade to Pro for a detailed PDF business plan with market analysis.',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-padding">
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
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-6">
              From idea to{' '}
              <span className="text-ink-500">business plan</span> in 4 steps
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed">
              Our AI-powered wizard guides you through the proven lean canvas methodology, 
              making business planning simple and effective.
            </p>
          </motion.div>

          {/* Steps */}
          <div ref={ref} className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-ink-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: parseInt(step.number) * 0.1,
                    ease: 'easeOut'
                  }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-flex mb-6">
                      <div className="w-20 h-20 bg-ink-900 rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-ink-900">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-ink-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-ink-600 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              { value: '15', label: 'Minutes average completion' },
              { value: '10K+', label: 'Business plans created' },
              { value: '9', label: 'Canvas sections covered' },
              { value: '98%', label: 'User satisfaction rate' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-2xl shadow-soft"
              >
                <div className="text-3xl lg:text-4xl font-bold text-ink-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-ink-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
