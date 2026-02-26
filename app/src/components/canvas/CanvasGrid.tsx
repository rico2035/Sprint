import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Megaphone, 
  BarChart3, 
  DollarSign, 
  TrendingUp,
  FileJson,
  FileText,
  Edit2,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/store/canvasStore';
import { useAppStore } from '@/store/appStore';
import { sectionMetadata, CanvasSection } from '@/lib/canvas-data';
import type { CanvasSectionType } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  Target,
  Megaphone,
  BarChart3,
  DollarSign,
  TrendingUp,
};

export function CanvasGrid() {
  const { currentCanvas, hasUnsavedChanges, saveCanvas } = useCanvasStore();
  const { setRoute, showPaywallModal, showToast } = useAppStore();

  if (!currentCanvas) {
    return (
      <div className="min-h-screen bg-cream-200 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-600 mb-4">No canvas found</p>
          <Button onClick={() => setRoute('landing')} className="btn-primary">
            Create New Canvas
          </Button>
        </div>
      </div>
    );
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(currentCanvas, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentCanvas.title.replace(/\s+/g, '-').toLowerCase()}-lean-canvas.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Canvas exported as JSON', 'success');
  };

  const handleExportPDF = () => {
    showPaywallModal();
  };

  const handleEditSection = () => {
    showToast('Edit mode coming soon', 'info');
  };

  const getSectionData = (section: CanvasSectionType) => {
    return currentCanvas[section];
  };

  const renderSectionContent = (section: CanvasSectionType) => {
    const data = getSectionData(section);
    if (!data) return <p className="text-ink-400 text-sm italic">Not filled yet</p>;

    switch (section) {
      case 'problem': {
        const problemData = data as { topProblems?: string[] };
        return (
          <div className="space-y-2">
            {problemData.topProblems && problemData.topProblems.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Problems</p>
                <ul className="space-y-1">
                  {problemData.topProblems.map((problem: string, i: number) => (
                    <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                      <span className="text-accent-red mt-0.5">•</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'solution': {
        const solutionData = data as { keyFeatures?: string[] };
        return (
          <div className="space-y-2">
            {solutionData.keyFeatures && solutionData.keyFeatures.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Key Features</p>
                <ul className="space-y-1">
                  {solutionData.keyFeatures.map((feature: string, i: number) => (
                    <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'uniqueValueProposition': {
        const uvpData = data as { headline?: string; subheadline?: string };
        return (
          <div className="space-y-2">
            {uvpData.headline && (
              <p className="text-sm font-medium text-ink-900">{uvpData.headline}</p>
            )}
            {uvpData.subheadline && (
              <p className="text-sm text-ink-600">{uvpData.subheadline}</p>
            )}
          </div>
        );
      }

      case 'unfairAdvantage': {
        const advantageData = data as { advantages?: string[] };
        return (
          <div className="space-y-2">
            {advantageData.advantages && advantageData.advantages.length > 0 && (
              <ul className="space-y-1">
                {advantageData.advantages.map((advantage: string, i: number) => (
                  <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">•</span>
                    {advantage}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }

      case 'keyMetrics': {
        const metricsData = data as { kpis?: string[] };
        return (
          <div className="space-y-2">
            {metricsData.kpis && metricsData.kpis.length > 0 && (
              <ul className="space-y-1">
                {metricsData.kpis.map((kpi: string, i: number) => (
                  <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                    <span className="text-accent-pink mt-0.5">•</span>
                    {kpi}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }

      case 'channels': {
        const channelsData = data as { acquisition?: string[] };
        return (
          <div className="space-y-2">
            {channelsData.acquisition && channelsData.acquisition.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Acquisition</p>
                <ul className="space-y-1">
                  {channelsData.acquisition.map((channel: string, i: number) => (
                    <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                      <span className="text-accent-teal mt-0.5">•</span>
                      {channel}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'customerSegments': {
        const segmentsData = data as { targetCustomers?: string[] };
        return (
          <div className="space-y-2">
            {segmentsData.targetCustomers && segmentsData.targetCustomers.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Target Customers</p>
                <ul className="space-y-1">
                  {segmentsData.targetCustomers.map((customer: string, i: number) => (
                    <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                      <span className="text-accent-blue mt-0.5">•</span>
                      {customer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'costStructure': {
        const costData = data as { fixedCosts?: string[] };
        return (
          <div className="space-y-2">
            {costData.fixedCosts && costData.fixedCosts.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Fixed Costs</p>
                <ul className="space-y-1">
                  {costData.fixedCosts.map((cost: string, i: number) => (
                    <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                      <span className="text-accent-yellow mt-0.5">•</span>
                      {cost}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'revenueStreams': {
        const revenueData = data as { revenueModel?: string; pricing?: string };
        return (
          <div className="space-y-2">
            {revenueData.revenueModel && (
              <div>
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Revenue Model</p>
                <p className="text-sm text-ink-700">{revenueData.revenueModel}</p>
              </div>
            )}
            {revenueData.pricing && (
              <div className="mt-2">
                <p className="text-xs font-medium text-ink-500 uppercase mb-1">Pricing</p>
                <p className="text-sm text-ink-700">{revenueData.pricing}</p>
              </div>
            )}
          </div>
        );
      }

      default:
        return <p className="text-ink-400 text-sm italic">Not filled yet</p>;
    }
  };

  const sections: CanvasSectionType[] = [
    CanvasSection.CUSTOMER_SEGMENTS,
    CanvasSection.PROBLEM,
    CanvasSection.UNIQUE_VALUE_PROPOSITION,
    CanvasSection.SOLUTION,
    CanvasSection.UNFAIR_ADVANTAGE,
    CanvasSection.CHANNELS,
    CanvasSection.KEY_METRICS,
    CanvasSection.COST_STRUCTURE,
    CanvasSection.REVENUE_STREAMS,
  ];

  return (
    <div className="min-h-screen bg-cream-200 pt-20 pb-12">
      <div className="section-padding">
        <div className="container-premium max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <button
                  onClick={() => setRoute('landing')}
                  className="flex items-center gap-2 text-ink-600 hover:text-ink-900 transition-colors mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Home
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
                  {currentCanvas.title}
                </h1>
                <p className="text-ink-600 mt-1">
                  {currentCanvas.completionPercentage}% complete
                </p>
              </div>

              <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                  <span className="text-sm text-accent-orange">Unsaved changes</span>
                )}
                <Button
                  variant="outline"
                  onClick={() => saveCanvas()}
                  className="btn-secondary"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportJSON}
                  className="btn-secondary"
                >
                  <FileJson className="w-4 h-4" />
                  JSON
                </Button>
                <Button
                  onClick={handleExportPDF}
                  className="btn-primary"
                >
                  <FileText className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-2 bg-ink-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentCanvas.completionPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Canvas Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {sections.map((section, index) => {
              const meta = sectionMetadata[section];
              const Icon = iconMap[meta.icon] || Lightbulb;

              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={cn(
                    'bg-white rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden',
                    section === 'channels' || section === 'costStructure' ? 'lg:col-span-2' : '',
                    section === 'keyMetrics' || section === 'revenueStreams' ? 'lg:col-span-3' : ''
                  )}
                >
                  {/* Card Header */}
                  <div className={cn('px-4 py-3 flex items-center justify-between', meta.bgColor)}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Icon className={cn('w-4 h-4', meta.color)} />
                      </div>
                      <h3 className="font-semibold text-ink-900 text-sm">{meta.title}</h3>
                    </div>
                    <button
                      onClick={() => handleEditSection()}
                      className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-ink-500" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 min-h-[120px]">
                    {renderSectionContent(section)}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
