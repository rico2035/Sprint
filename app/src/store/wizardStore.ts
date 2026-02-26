import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CanvasSectionType, WizardStep, AIQuestionResponse } from '@/types';
import { CanvasSection } from '@/lib/canvas-data';

interface WizardStore {
  // State
  currentStep: number;
  totalSteps: number;
  businessIdea: string;
  isGenerating: boolean;
  isComplete: boolean;
  steps: WizardStep[];
  aiResponses: Record<string, AIQuestionResponse>;
  currentSuggestions: string[];
  
  // Actions
  setBusinessIdea: (idea: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setGenerating: (isGenerating: boolean) => void;
  setAIResponse: (section: CanvasSectionType, response: AIQuestionResponse) => void;
  setSuggestions: (suggestions: string[]) => void;
  completeWizard: () => void;
  resetWizard: () => void;
  initializeSteps: () => void;
  
  // Computed
  getCurrentSection: () => CanvasSectionType;
  getProgress: () => number;
  getCurrentQuestions: () => string[];
}

const defaultSteps: WizardStep[] = [
  {
    section: CanvasSection.PROBLEM,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.SOLUTION,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.UNIQUE_VALUE_PROPOSITION,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.UNFAIR_ADVANTAGE,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.KEY_METRICS,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.CHANNELS,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.CUSTOMER_SEGMENTS,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.COST_STRUCTURE,
    questions: [],
    isCompleted: false,
  },
  {
    section: CanvasSection.REVENUE_STREAMS,
    questions: [],
    isCompleted: false,
  },
];

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      totalSteps: 9,
      businessIdea: '',
      isGenerating: false,
      isComplete: false,
      steps: defaultSteps,
      aiResponses: {},
      currentSuggestions: [],
      
      // Actions
      setBusinessIdea: (idea) => set({ businessIdea: idea }),
      
      nextStep: () => {
        const { currentStep, steps } = get();
        if (currentStep < 8) {
          // Mark current step as completed
          const updatedSteps = [...steps];
          updatedSteps[currentStep].isCompleted = true;
          
          set({ 
            currentStep: currentStep + 1,
            steps: updatedSteps,
            currentSuggestions: [],
          });
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ 
            currentStep: currentStep - 1,
            currentSuggestions: [],
          });
        }
      },
      
      goToStep: (step) => {
        if (step >= 0 && step < 9) {
          set({ 
            currentStep: step,
            currentSuggestions: [],
          });
        }
      },
      
      setGenerating: (isGenerating) => set({ isGenerating }),
      
      setAIResponse: (section, response) => {
        set(state => ({
          aiResponses: {
            ...state.aiResponses,
            [section]: response,
          },
          currentSuggestions: response.suggestions || [],
        }));
      },
      
      setSuggestions: (suggestions) => set({ currentSuggestions: suggestions }),
      
      completeWizard: () => {
        const { steps, currentStep } = get();
        const updatedSteps = [...steps];
        updatedSteps[currentStep].isCompleted = true;
        
        set({ 
          isComplete: true,
          steps: updatedSteps,
        });
      },
      
      resetWizard: () => set({
        currentStep: 0,
        businessIdea: '',
        isGenerating: false,
        isComplete: false,
        steps: defaultSteps,
        aiResponses: {},
        currentSuggestions: [],
      }),
      
      initializeSteps: () => {
        set({
          steps: defaultSteps.map(step => ({ ...step, isCompleted: false })),
        });
      },
      
      // Computed
      getCurrentSection: () => {
        const { steps, currentStep } = get();
        return steps[currentStep]?.section;
      },
      
      getProgress: () => {
        const { currentStep, totalSteps } = get();
        return ((currentStep + 1) / totalSteps) * 100;
      },
      
      getCurrentQuestions: () => {
        const { steps, currentStep, aiResponses } = get();
        const section = steps[currentStep]?.section;
        const response = aiResponses[section];
        return response?.questions || [];
      },
    }),
    {
      name: 'wizard-storage',
      partialize: (state) => ({ 
        businessIdea: state.businessIdea,
        currentStep: state.currentStep,
        steps: state.steps,
        aiResponses: state.aiResponses,
      }),
    }
  )
);
