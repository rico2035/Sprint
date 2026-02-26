import { create } from 'zustand';
import type { AppRoute, User, PricingTier } from '@/types';

interface AppStore {
  // Navigation
  currentRoute: AppRoute;
  previousRoute: AppRoute | null;
  
  // User
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // UI State
  isSidebarOpen: boolean;
  showPaywall: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
  
  // Pricing
  pricingTiers: PricingTier[];
  
  // Actions
  setRoute: (route: AppRoute) => void;
  goBack: () => void;
  
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  showPaywallModal: () => void;
  hidePaywallModal: () => void;
  
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  
  logout: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  currentRoute: 'landing',
  previousRoute: null,
  
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  isSidebarOpen: false,
  showPaywall: false,
  toast: null,
  
  pricingTiers: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Create unlimited lean canvases',
        'AI-powered guided questions',
        'Basic canvas visualization',
        'Export as JSON',
        'Auto-save progress',
      ],
      ctaText: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
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
      ],
      ctaText: 'Upgrade to Pro',
      popular: true,
    },
  ],
  
  // Actions
  setRoute: (route) => {
    const { currentRoute } = get();
    set({ 
      currentRoute: route,
      previousRoute: currentRoute,
    });
  },
  
  goBack: () => {
    const { previousRoute } = get();
    if (previousRoute) {
      set({ currentRoute: previousRoute });
    }
  },
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  showPaywallModal: () => set({ showPaywall: true }),
  
  hidePaywallModal: () => set({ showPaywall: false }),
  
  showToast: (message, type = 'info') => {
    set({ toast: { show: true, message, type } });
    
    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      set(state => ({ 
        toast: state.toast ? { ...state.toast, show: false } : null 
      }));
    }, 4000);
  },
  
  hideToast: () => set(state => ({ 
    toast: state.toast ? { ...state.toast, show: false } : null 
  })),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
    currentRoute: 'landing',
  }),
}));
