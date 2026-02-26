import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/store/wizardStore';
import { useCanvasStore } from '@/store/canvasStore';
import { useAppStore } from '@/store/appStore';
import { sectionMetadata } from '@/lib/canvas-data';
import { generateMockQuestions, generateMockSuggestions } from '@/lib/ai-prompts';
import type { CanvasSectionType } from '@/types';

export function WizardContainer() {
  const {
    currentStep,
    totalSteps,
    isGenerating,
    aiResponses,
    currentSuggestions,
    nextStep,
    prevStep,
    setGenerating,
    setAIResponse,
    setSuggestions,
    completeWizard,
    getCurrentSection,
    getProgress,
  } = useWizardStore();

  const { currentCanvas, updateSection } = useCanvasStore();
  const { setRoute, showToast } = useAppStore();
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeInput, setActiveInput] = useState('');

  const currentSection = getCurrentSection();
  const progress = getProgress();
  const sectionMeta = currentSection ? sectionMetadata[currentSection] : null;
  const currentAIResponse = currentSection ? aiResponses[currentSection] : null;

  // Generate AI questions when step changes
  useEffect(() => {
    if (currentSection && !aiResponses[currentSection]) {
      generateQuestions();
    }
  }, [currentStep, currentSection, aiResponses]);

  const generateQuestions = async () => {
    if (!currentSection) return;
    
    setGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Use mock responses for demo
    const mockResponse = generateMockQuestions(currentSection);
    
    setAIResponse(currentSection, {
      questions: mockResponse.questions,
      suggestions: [],
      context: mockResponse.context,
    });
    
    setGenerating(false);
  };

  const handleGetSuggestions = async () => {
    if (!currentSection) return;
    
    setGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const suggestions = generateMockSuggestions(currentSection, activeInput);
    setSuggestions(suggestions);
    
    setGenerating(false);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setActiveInput(value);
  };

  const handleUseSuggestion = (suggestion: string) => {
    const questionId = `q_${currentSection}_1`;
    setAnswers(prev => ({ 
      ...prev, 
      [questionId]: prev[questionId] ? `${prev[questionId]}, ${suggestion}` : suggestion 
    }));
  };

  const handleNext = async () => {
    if (!currentSection) return;

    // Save current answers to canvas
    const sectionAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith(`q_${currentSection}`))
      .map(([, value]) => value)
      .filter(Boolean);

    if (sectionAnswers.length === 0) {
      showToast('Please provide at least one answer before continuing', 'error');
      return;
    }

    // Update canvas with section data
    const sectionData = formatSectionData(currentSection, sectionAnswers);
    updateSection(currentSection, sectionData);

    if (currentStep < totalSteps - 1) {
      nextStep();
      setAnswers({});
      setActiveInput('');
    } else {
      // Complete wizard
      completeWizard();
      
      // Save canvas
      if (currentCanvas) {
        await useCanvasStore.getState().saveCanvas();
      }
      
      showToast('Your lean canvas has been created!', 'success');
      setRoute('canvas');
    }
  };

  const formatSectionData = (section: CanvasSectionType, sectionAnswers: string[]) => {
    switch (section) {
      case 'problem':
        return {
          topProblems: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          existingAlternatives: sectionAnswers[1]?.split(',').map(s => s.trim()).filter(Boolean) || [],
        };
      case 'solution':
        return {
          keyFeatures: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          mvpDescription: sectionAnswers[1] || '',
        };
      case 'uniqueValueProposition':
        return {
          headline: sectionAnswers[0] || '',
          subheadline: sectionAnswers[1] || '',
          highLevelConcept: sectionAnswers[2] || '',
        };
      case 'unfairAdvantage':
        return {
          advantages: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          whyCantBeCopied: sectionAnswers[1] || '',
        };
      case 'keyMetrics':
        return {
          kpis: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          targets: {},
        };
      case 'channels':
        return {
          acquisition: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          distribution: sectionAnswers[1]?.split(',').map(s => s.trim()).filter(Boolean) || [],
        };
      case 'customerSegments':
        return {
          targetCustomers: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          earlyAdopters: sectionAnswers[1]?.split(',').map(s => s.trim()).filter(Boolean) || [],
        };
      case 'costStructure':
        return {
          fixedCosts: sectionAnswers[0]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          variableCosts: sectionAnswers[1]?.split(',').map(s => s.trim()).filter(Boolean) || [],
          totalMonthlyBurn: 0,
        };
      case 'revenueStreams':
        return {
          revenueModel: sectionAnswers[0] || '',
          pricing: sectionAnswers[1] || '',
          lifetimeValue: 0,
        };
      default:
        return {};
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    } else {
      setRoute('landing');
    }
  };

  return (
    <div className="min-h-screen bg-cream-200 pt-20 pb-12">
      <div className="section-padding">
        <div className="container-premium max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-ink-600 hover:text-ink-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-ink-700">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-sm text-ink-500">
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sectionMeta && (
                <div className="bg-white rounded-3xl shadow-card overflow-hidden">
                  {/* Section Header */}
                  <div className={`${sectionMeta.bgColor} px-6 py-6 lg:px-8 lg:py-8`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-2xl">{sectionMeta.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-ink-900">
                          {sectionMeta.title}
                        </h2>
                        <p className="text-ink-600 text-sm mt-1">
                          {sectionMeta.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="p-6 lg:p-8">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-ink-400 animate-spin mb-4" />
                        <p className="text-ink-600">Generating questions...</p>
                      </div>
                    ) : currentAIResponse ? (
                      <div className="space-y-6">
                        {/* Context */}
                        <div className="bg-cream-100 rounded-xl p-4 flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-ink-700">{currentAIResponse.context}</p>
                        </div>

                        {/* Questions */}
                        {currentAIResponse.questions.map((question, index) => (
                          <div key={index}>
                            <label className="block text-sm font-medium text-ink-900 mb-2">
                              {question}
                            </label>
                            <textarea
                              value={answers[`q_${currentSection}_${index}`] || ''}
                              onChange={(e) => handleAnswerChange(`q_${currentSection}_${index}`, e.target.value)}
                              placeholder="Type your answer here..."
                              className="input-premium min-h-[100px] resize-none"
                            />
                          </div>
                        ))}

                        {/* Suggestions */}
                        {currentSuggestions.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-ink-700 mb-3">
                              Suggestions (click to use):
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {currentSuggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleUseSuggestion(suggestion)}
                                  className="px-3 py-1.5 bg-cream-100 hover:bg-cream-200 text-ink-700 text-sm rounded-full transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Get Suggestions Button */}
                        <button
                          onClick={handleGetSuggestions}
                          disabled={isGenerating}
                          className="flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 transition-colors"
                        >
                          <Sparkles className="w-4 h-4" />
                          {isGenerating ? 'Getting suggestions...' : 'Get AI suggestions'}
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Footer */}
                  <div className="px-6 lg:px-8 py-6 border-t border-ink-100 flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="btn-secondary"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={isGenerating}
                      className="btn-primary"
                    >
                      {currentStep === totalSteps - 1 ? (
                        <>
                          <Check className="w-4 h-4" />
                          Complete
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
