import type { CanvasSectionType, SectionMeta } from '@/types';
import { 
  Users, 
  AlertTriangle, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Megaphone, 
  BarChart3, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

export const CanvasSection = {
  PROBLEM: 'problem',
  SOLUTION: 'solution',
  KEY_METRICS: 'keyMetrics',
  UNIQUE_VALUE_PROPOSITION: 'uniqueValueProposition',
  UNFAIR_ADVANTAGE: 'unfairAdvantage',
  CHANNELS: 'channels',
  CUSTOMER_SEGMENTS: 'customerSegments',
  COST_STRUCTURE: 'costStructure',
  REVENUE_STREAMS: 'revenueStreams',
} as const;

export const sectionMetadata: Record<CanvasSectionType, SectionMeta> = {
  [CanvasSection.CUSTOMER_SEGMENTS]: {
    id: CanvasSection.CUSTOMER_SEGMENTS,
    title: 'Customer Segments',
    icon: 'Users',
    color: 'text-accent-blue',
    bgColor: 'bg-blue-50',
    questions: [
      'Who is your target audience?',
      'Who are you trying to help?',
      'Which customers will you serve?',
    ],
    description: 'Define the different groups of people or organizations your business aims to reach and serve.',
    order: 1,
  },
  [CanvasSection.PROBLEM]: {
    id: CanvasSection.PROBLEM,
    title: 'Problem',
    icon: 'AlertTriangle',
    color: 'text-accent-red',
    bgColor: 'bg-red-50',
    questions: [
      'What problems does your audience face?',
      'What are their biggest unmet needs?',
      'What are they struggling with?',
    ],
    description: 'List the top 1-3 problems your target customers face that your business will solve.',
    order: 2,
  },
  [CanvasSection.UNIQUE_VALUE_PROPOSITION]: {
    id: CanvasSection.UNIQUE_VALUE_PROPOSITION,
    title: 'Unique Value Proposition',
    icon: 'Sparkles',
    color: 'text-accent-green',
    bgColor: 'bg-green-50',
    questions: [
      'Why should a customer choose you?',
      'What makes you unique?',
      'Why your business and not one of the others?',
    ],
    description: 'A clear, compelling message that explains why your solution is different and worth buying.',
    order: 3,
  },
  [CanvasSection.SOLUTION]: {
    id: CanvasSection.SOLUTION,
    title: 'Solution',
    icon: 'Lightbulb',
    color: 'text-accent-purple',
    bgColor: 'bg-purple-50',
    questions: [
      'What features will solve their problem?',
      'What solutions will meet their needs?',
      'What can you build to make their lives easier?',
    ],
    description: 'Outline the key features and capabilities that solve the identified problems.',
    order: 4,
  },
  [CanvasSection.UNFAIR_ADVANTAGE]: {
    id: CanvasSection.UNFAIR_ADVANTAGE,
    title: 'Unfair Advantage',
    icon: 'Target',
    color: 'text-accent-orange',
    bgColor: 'bg-orange-50',
    questions: [
      'What will increase your chances of success?',
      'What is the one up you have on others?',
      'What cannot be easily copied or bought?',
    ],
    description: 'Something that cannot be easily copied or bought, giving you a competitive edge.',
    order: 5,
  },
  [CanvasSection.CHANNELS]: {
    id: CanvasSection.CHANNELS,
    title: 'Channels',
    icon: 'Megaphone',
    color: 'text-accent-teal',
    bgColor: 'bg-teal-50',
    questions: [
      'Where is your audience currently spending time?',
      'Which channels will you use to reach them?',
      'What advertising message will speak to them?',
    ],
    description: 'The pathways through which you will reach your customers and deliver your value proposition.',
    order: 6,
  },
  [CanvasSection.KEY_METRICS]: {
    id: CanvasSection.KEY_METRICS,
    title: 'Key Metrics',
    icon: 'BarChart3',
    color: 'text-accent-pink',
    bgColor: 'bg-pink-50',
    questions: [
      'How will you track performance?',
      'What are your specific KPIs?',
      'What numbers indicate success?',
    ],
    description: 'The key numbers that tell you how your business is performing.',
    order: 7,
  },
  [CanvasSection.COST_STRUCTURE]: {
    id: CanvasSection.COST_STRUCTURE,
    title: 'Cost Structure',
    icon: 'DollarSign',
    color: 'text-accent-yellow',
    bgColor: 'bg-yellow-50',
    questions: [
      'What must you spend your money on?',
      'How about operations and logistics?',
      'What are your fixed and variable costs?',
    ],
    description: 'List your most important costs and resources needed to operate your business.',
    order: 8,
  },
  [CanvasSection.REVENUE_STREAMS]: {
    id: CanvasSection.REVENUE_STREAMS,
    title: 'Revenue Streams',
    icon: 'TrendingUp',
    color: 'text-accent-indigo',
    bgColor: 'bg-indigo-50',
    questions: [
      'What income sources are available?',
      'What is your intended pricing structure?',
      'How will you make money?',
    ],
    description: 'How your business will generate income from each customer segment.',
    order: 9,
  },
};

export const getSectionIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
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
  
  return icons[iconName] || Lightbulb;
};

export const getOrderedSections = (): SectionMeta[] => {
  return Object.values(sectionMetadata).sort((a, b) => a.order - b.order);
};

export const getSectionById = (id: CanvasSectionType): SectionMeta => {
  return sectionMetadata[id];
};

// Canvas grid layout configuration
export const canvasGridLayout = [
  // Row 1
  [
    CanvasSection.CUSTOMER_SEGMENTS,
    CanvasSection.PROBLEM,
    CanvasSection.UNIQUE_VALUE_PROPOSITION,
    CanvasSection.SOLUTION,
    CanvasSection.UNFAIR_ADVANTAGE,
  ],
  // Row 2
  [
    CanvasSection.CHANNELS,
    CanvasSection.KEY_METRICS,
  ],
  // Row 3
  [
    CanvasSection.COST_STRUCTURE,
    CanvasSection.REVENUE_STREAMS,
  ],
];

// Section span configuration for grid
export const sectionSpans: Record<CanvasSectionType, string> = {
  [CanvasSection.CUSTOMER_SEGMENTS]: 'col-span-1',
  [CanvasSection.PROBLEM]: 'col-span-1',
  [CanvasSection.UNIQUE_VALUE_PROPOSITION]: 'col-span-1',
  [CanvasSection.SOLUTION]: 'col-span-1',
  [CanvasSection.UNFAIR_ADVANTAGE]: 'col-span-1',
  [CanvasSection.CHANNELS]: 'col-span-3',
  [CanvasSection.KEY_METRICS]: 'col-span-2',
  [CanvasSection.COST_STRUCTURE]: 'col-span-2',
  [CanvasSection.REVENUE_STREAMS]: 'col-span-3',
};
