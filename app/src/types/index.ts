// Lean Canvas Section Types
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

export type CanvasSectionType = typeof CanvasSection[keyof typeof CanvasSection];

// Section metadata
export interface SectionMeta {
  id: CanvasSectionType;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: string[];
  description: string;
  order: number;
}

// Canvas section data
export interface ProblemData {
  topProblems: string[];
  existingAlternatives: string[];
}

export interface SolutionData {
  keyFeatures: string[];
  mvpDescription: string;
}

export interface KeyMetricsData {
  kpis: string[];
  targets: Record<string, string>;
}

export interface UniqueValuePropositionData {
  headline: string;
  subheadline: string;
  highLevelConcept: string;
}

export interface UnfairAdvantageData {
  advantages: string[];
  whyCantBeCopied: string;
}

export interface ChannelsData {
  acquisition: string[];
  distribution: string[];
}

export interface CustomerSegmentsData {
  targetCustomers: string[];
  earlyAdopters: string[];
}

export interface CostStructureData {
  fixedCosts: string[];
  variableCosts: string[];
  totalMonthlyBurn: number;
}

export interface RevenueStreamsData {
  revenueModel: string;
  pricing: string;
  lifetimeValue: number;
}

// Complete Lean Canvas
export interface LeanCanvas {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  
  problem: ProblemData;
  solution: SolutionData;
  keyMetrics: KeyMetricsData;
  uniqueValueProposition: UniqueValuePropositionData;
  unfairAdvantage: UnfairAdvantageData;
  channels: ChannelsData;
  customerSegments: CustomerSegmentsData;
  costStructure: CostStructureData;
  revenueStreams: RevenueStreamsData;
  
  completionPercentage: number;
  isPublished: boolean;
}

// Wizard Types
export interface WizardQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'list' | 'select';
  placeholder?: string;
  suggestions?: string[];
}

export interface WizardStep {
  section: CanvasSectionType;
  questions: WizardQuestion[];
  isCompleted: boolean;
}

export interface WizardState {
  currentStep: number;
  steps: WizardStep[];
  businessIdea: string;
  isGenerating: boolean;
  aiResponses: Record<string, string>;
}

// AI Types
export interface AIQuestionRequest {
  section: CanvasSectionType;
  businessIdea: string;
  previousResponses: Record<string, unknown>;
}

export interface AIQuestionResponse {
  questions: string[];
  suggestions: string[];
  context: string;
}

export interface AISuggestionRequest {
  section: CanvasSectionType;
  currentInput: string;
  businessIdea: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  subscriptionTier: 'free' | 'pro';
  subscriptionStatus: 'active' | 'inactive' | 'past_due' | 'canceled';
  stripeCustomerId?: string;
  createdAt: string;
}

// Export Types
export interface ExportRequest {
  canvasId: string;
  exportType: 'lean_canvas' | 'detailed_plan';
}

export interface ExportStatus {
  id: string;
  canvasId: string;
  exportType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  fileSize?: number;
  createdAt: string;
  completedAt?: string;
}

// Payment Types
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval?: 'one-time' | 'monthly' | 'yearly';
  features: string[];
  limitations?: string[];
  ctaText: string;
  popular?: boolean;
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: 'open' | 'complete' | 'expired';
}

// Navigation Types
export type AppRoute = 
  | 'landing'
  | 'sign-in'
  | 'sign-up'
  | 'dashboard'
  | 'wizard'
  | 'canvas'
  | 'pricing'
  | 'success';

// UI Types
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
}

// Canvas Card Types
export interface CanvasCardProps {
  section: SectionMeta;
  data: unknown;
  onEdit: () => void;
  isActive?: boolean;
}

// Animation Types
export interface AnimationConfig {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}
