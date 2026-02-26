import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Guided Questions',
    description: 'Our intelligent AI asks contextual questions based on your business idea, helping you think through every aspect of your venture.',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FileText,
    title: 'Beautiful Canvas Export',
    description: 'Generate a professional, visually stunning lean canvas that you can share with investors, co-founders, and stakeholders.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Complete your entire lean canvas in under 15 minutes. No more staring at blank pages or getting stuck on sections.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your business ideas are encrypted and secure. We never share your data with third parties or use it to train models.',
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Collaboration Ready',
    description: 'Share your canvas with team members, get feedback, and iterate together in real-time.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Get AI-powered market analysis, competitive insights, and financial projections with the Pro plan.',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/50 to-transparent rounded-full blur-3xl" />
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
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-6">
              Everything you need to{' '}
              <span className="text-ink-500">validate your idea</span>
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed">
              Sprint combines the proven lean canvas methodology with cutting-edge AI 
              to help you build comprehensive business plans faster than ever before.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-ink-700" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-ink-900 mb-3 group-hover:text-ink-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-ink-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-ink-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
