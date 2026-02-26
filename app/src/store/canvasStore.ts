import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LeanCanvas, CanvasSectionType } from '@/types';
import { CanvasSection } from '@/lib/canvas-data';

interface CanvasStore {
  // State
  currentCanvas: LeanCanvas | null;
  canvases: LeanCanvas[];
  isLoading: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
  
  // Actions
  setCurrentCanvas: (canvas: LeanCanvas | null) => void;
  updateSection: (section: CanvasSectionType, data: unknown) => void;
  updateCanvas: (updates: Partial<LeanCanvas>) => void;
  saveCanvas: () => Promise<boolean>;
  loadCanvases: () => Promise<void>;
  createCanvas: (title: string, description?: string) => Promise<LeanCanvas | null>;
  deleteCanvas: (id: string) => Promise<boolean>;
  clearError: () => void;
  markAsSaved: () => void;
  
  // Computed
  getCompletionPercentage: () => number;
  getSectionData: (section: CanvasSectionType) => unknown;
}

const defaultCanvasData = {
  problem: { topProblems: [], existingAlternatives: [] },
  solution: { keyFeatures: [], mvpDescription: '' },
  keyMetrics: { kpis: [], targets: {} },
  uniqueValueProposition: { headline: '', subheadline: '', highLevelConcept: '' },
  unfairAdvantage: { advantages: [], whyCantBeCopied: '' },
  channels: { acquisition: [], distribution: [] },
  customerSegments: { targetCustomers: [], earlyAdopters: [] },
  costStructure: { fixedCosts: [], variableCosts: [], totalMonthlyBurn: 0 },
  revenueStreams: { revenueModel: '', pricing: '', lifetimeValue: 0 },
  completionPercentage: 0,
  isPublished: false,
};

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentCanvas: null,
      canvases: [],
      isLoading: false,
      error: null,
      hasUnsavedChanges: false,
      
      // Actions
      setCurrentCanvas: (canvas) => {
        set({ currentCanvas: canvas, hasUnsavedChanges: false });
      },
      
      updateSection: (section, data) => {
        const { currentCanvas } = get();
        if (!currentCanvas) return;
        
        const updatedCanvas = {
          ...currentCanvas,
          [section]: data,
          updatedAt: new Date().toISOString(),
        };
        
        // Recalculate completion percentage
        const completionPercentage = calculateCompletion(updatedCanvas);
        
        set({
          currentCanvas: {
            ...updatedCanvas,
            completionPercentage,
          },
          hasUnsavedChanges: true,
        });
      },
      
      updateCanvas: (updates) => {
        const { currentCanvas } = get();
        if (!currentCanvas) return;
        
        set({
          currentCanvas: {
            ...currentCanvas,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
          hasUnsavedChanges: true,
        });
      },
      
      saveCanvas: async () => {
        const { currentCanvas } = get();
        if (!currentCanvas) return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          set({ 
            isLoading: false, 
            hasUnsavedChanges: false,
            error: null 
          });
          
          return true;
        } catch {
          set({ 
            isLoading: false, 
            error: 'Failed to save canvas. Please try again.' 
          });
          return false;
        }
      },
      
      loadCanvases: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data for demonstration
          const mockCanvases: LeanCanvas[] = [];
          
          set({ canvases: mockCanvases, isLoading: false });
        } catch {
          set({ 
            isLoading: false, 
            error: 'Failed to load canvases. Please try again.' 
          });
        }
      },
      
      createCanvas: async (title, description) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 600));
          
          const now = new Date().toISOString();
          const newCanvas: LeanCanvas = {
            id: `canvas_${Date.now()}`,
            userId: 'user_123',
            title,
            description,
            createdAt: now,
            updatedAt: now,
            ...defaultCanvasData,
          };
          
          set(state => ({
            canvases: [newCanvas, ...state.canvases],
            currentCanvas: newCanvas,
            isLoading: false,
            hasUnsavedChanges: false,
          }));
          
          return newCanvas;
        } catch {
          set({ 
            isLoading: false, 
            error: 'Failed to create canvas. Please try again.' 
          });
          return null;
        }
      },
      
      deleteCanvas: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            canvases: state.canvases.filter(c => c.id !== id),
            currentCanvas: state.currentCanvas?.id === id ? null : state.currentCanvas,
            isLoading: false,
          }));
          
          return true;
        } catch {
          set({ 
            isLoading: false, 
            error: 'Failed to delete canvas. Please try again.' 
          });
          return false;
        }
      },
      
      clearError: () => set({ error: null }),
      
      markAsSaved: () => set({ hasUnsavedChanges: false }),
      
      // Computed
      getCompletionPercentage: () => {
        const { currentCanvas } = get();
        if (!currentCanvas) return 0;
        return calculateCompletion(currentCanvas);
      },
      
      getSectionData: (section) => {
        const { currentCanvas } = get();
        if (!currentCanvas) return null;
        return currentCanvas[section];
      },
    }),
    {
      name: 'canvas-storage',
      partialize: (state) => ({ 
        currentCanvas: state.currentCanvas,
        canvases: state.canvases,
      }),
    }
  )
);

// Helper function to calculate completion percentage
function calculateCompletion(canvas: LeanCanvas): number {
  const sections: CanvasSectionType[] = [
    CanvasSection.PROBLEM,
    CanvasSection.SOLUTION,
    CanvasSection.KEY_METRICS,
    CanvasSection.UNIQUE_VALUE_PROPOSITION,
    CanvasSection.UNFAIR_ADVANTAGE,
    CanvasSection.CHANNELS,
    CanvasSection.CUSTOMER_SEGMENTS,
    CanvasSection.COST_STRUCTURE,
    CanvasSection.REVENUE_STREAMS,
  ];
  
  let completedSections = 0;
  
  sections.forEach(section => {
    const data = canvas[section];
    if (isSectionComplete(section, data)) {
      completedSections++;
    }
  });
  
  return Math.round((completedSections / sections.length) * 100);
}

function isSectionComplete(section: CanvasSectionType, data: unknown): boolean {
  if (!data) return false;
  
  const d = data as Record<string, unknown>;
  
  switch (section) {
    case CanvasSection.PROBLEM:
      return (d.topProblems as string[])?.length > 0;
    case CanvasSection.SOLUTION:
      return (d.keyFeatures as string[])?.length > 0;
    case CanvasSection.KEY_METRICS:
      return (d.kpis as string[])?.length > 0;
    case CanvasSection.UNIQUE_VALUE_PROPOSITION:
      return (d.headline as string)?.length > 0;
    case CanvasSection.UNFAIR_ADVANTAGE:
      return (d.advantages as string[])?.length > 0;
    case CanvasSection.CHANNELS:
      return (d.acquisition as string[])?.length > 0;
    case CanvasSection.CUSTOMER_SEGMENTS:
      return (d.targetCustomers as string[])?.length > 0;
    case CanvasSection.COST_STRUCTURE:
      return (d.fixedCosts as string[])?.length > 0;
    case CanvasSection.REVENUE_STREAMS:
      return (d.revenueModel as string)?.length > 0;
    default:
      return false;
  }
}
