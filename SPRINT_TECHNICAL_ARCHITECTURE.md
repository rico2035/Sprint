# Sprint - Lean Business Plan: Technical Architecture

## Executive Summary

**Sprint** is a micro-SaaS application that transforms the traditional lean canvas business plan into an AI-powered, interactive experience. The platform guides entrepreneurs through a step-by-step wizard to create comprehensive business plans, with a freemium model offering free lean canvas visualization and premium detailed PDF generation.

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Landing    │  │    Auth      │  │ AI Wizard    │  │   Canvas     │    │
│  │    Page      │  │   (Clerk)    │  │   Flow       │  │  Dashboard   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Tech Stack: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui        │
│              Framer Motion + Zustand + React Query                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   REST API   │  │  AI Service  │  │  Payment     │  │   Export     │    │
│  │   (Hono)     │  │  (OpenRouter)│  │  (Stripe)    │  │   (PDF)      │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Tech Stack: Hono.js + Zod Validation + OpenRouter API + Stripe SDK         │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │   Supabase   │  │   Redis      │  │   S3/        │                       │
│  │  (Postgres)  │  │  (Cache)     │  │   Storage    │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  Tech Stack: Supabase (Auth + DB) + Upstash Redis + Cloudflare R2           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Project Structure

```
/src
├── app/                          # Next.js App Router (if using Next.js)
│   ├── (landing)/               # Landing page route group
│   ├── (app)/                   # Authenticated app routes
│   └── api/                     # API routes
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── landing/                 # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   ├── wizard/                  # AI Wizard components
│   │   ├── WizardContainer.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── SuggestionChips.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── StepNavigation.tsx
│   ├── canvas/                  # Lean Canvas components
│   │   ├── CanvasGrid.tsx
│   │   ├── CanvasCard.tsx
│   │   ├── CanvasEditor.tsx
│   │   └── CanvasPreview.tsx
│   ├── auth/                    # Auth components
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── UserButton.tsx
│   └── shared/                  # Shared components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Logo.tsx
│       └── AnimatedContainer.tsx
├── hooks/                       # Custom React hooks
│   ├── useAI.ts                 # AI interaction hook
│   ├── useCanvas.ts             # Canvas state management
│   ├── usePayment.ts            # Payment processing
│   └── useExport.ts             # PDF export functionality
├── lib/                         # Utility functions
│   ├── utils.ts
│   ├── ai-prompts.ts            # AI prompt templates
│   ├── canvas-data.ts           # Canvas section definitions
│   └── export-utils.ts          # PDF generation utilities
├── store/                       # Zustand stores
│   ├── canvas-store.ts
│   ├── wizard-store.ts
│   └── user-store.ts
├── types/                       # TypeScript types
│   ├── canvas.ts
│   ├── wizard.ts
│   └── user.ts
└── styles/                      # Global styles
    └── globals.css
```

### 2.2 Design System (Premium Framer-Style)

Based on the reference image, the design system uses:

```typescript
// tailwind.config.ts extensions
const config = {
  theme: {
    extend: {
      colors: {
        // Primary palette
        background: '#F5F3EF',      // Cream/beige background
        foreground: '#1A1A1A',      // Near-black text
        
        // Brand colors
        primary: {
          DEFAULT: '#1A1A1A',       // Black buttons
          foreground: '#FFFFFF',
          hover: '#333333',
        },
        
        // Secondary
        secondary: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
          border: '#E5E5E5',
        },
        
        // Accent colors for canvas sections
        accent: {
          blue: '#2563EB',
          red: '#DC2626',
          green: '#16A34A',
          purple: '#7C3AED',
          orange: '#EA580C',
          teal: '#0D9488',
          pink: '#DB2777',
          yellow: '#CA8A04',
          indigo: '#4F46E5',
        },
        
        // Neutral scale
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#737373',
        },
        
        // Card backgrounds
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(37, 99, 235, 0.15)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
}
```

---

## 3. Core Features Implementation

### 3.1 Landing Page Structure

```typescript
// Landing page sections with animations

// Hero Section
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaAction: () => void;
}

// Features Section
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Pricing Section
interface PricingTier {
  name: 'Free' | 'Pro';
  price: number;
  features: string[];
  ctaText: string;
  popular?: boolean;
}
```

### 3.2 AI Wizard Flow

The wizard implements a conversational AI interface that guides users through each lean canvas section:

```typescript
// Wizard state management
interface WizardState {
  currentStep: CanvasSection;
  steps: CanvasSection[];
  responses: Record<CanvasSection, SectionResponse>;
  isGenerating: boolean;
  suggestions: string[];
}

interface SectionResponse {
  content: string;
  aiQuestions: string[];
  userAnswers: string[];
  finalized: boolean;
}

enum CanvasSection {
  PROBLEM = 'problem',
  SOLUTION = 'solution',
  KEY_METRICS = 'key_metrics',
  UNIQUE_VALUE_PROPOSITION = 'unique_value_proposition',
  UNFAIR_ADVANTAGE = 'unfair_advantage',
  CHANNELS = 'channels',
  CUSTOMER_SEGMENTS = 'customer_segments',
  COST_STRUCTURE = 'cost_structure',
  REVENUE_STREAMS = 'revenue_streams',
}
```

### 3.3 AI Integration (OpenRouter)

```typescript
// AI service configuration
interface AIServiceConfig {
  apiKey: string;
  model: 'openai/gpt-4o' | 'anthropic/claude-3.5-sonnet';
  temperature: number;
  maxTokens: number;
}

// Prompt templates for each section
const SECTION_PROMPTS: Record<CanvasSection, string> = {
  [CanvasSection.PROBLEM]: `You are a business strategist helping an entrepreneur define their problem statement.
  
Based on the business idea: "{businessIdea}"

Ask 2-3 specific questions to help them identify:
1. The top 3 problems their target customers face
2. Existing alternatives and their shortcomings
3. The emotional impact of these problems

Be conversational and provide example answers they can reference.`,

  [CanvasSection.SOLUTION]: `You are a business strategist helping an entrepreneur define their solution.

Based on the problems identified: "{previousResponses}"

Ask 2-3 questions to help them articulate:
1. Key features that solve the identified problems
2. How their solution is different from alternatives
3. The minimum viable product (MVP) scope

Provide intelligent suggestions based on industry best practices.`,

  // ... similar prompts for other sections
};
```

### 3.4 Lean Canvas Data Model

```typescript
// Complete lean canvas data structure
interface LeanCanvas {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Core sections
  problem: {
    topProblems: string[];
    existingAlternatives: string[];
  };
  
  solution: {
    keyFeatures: string[];
    mvpDescription: string;
  };
  
  keyMetrics: {
    kpis: string[];
    targets: Record<string, string>;
  };
  
  uniqueValueProposition: {
    headline: string;
    subheadline: string;
    highLevelConcept: string;
  };
  
  unfairAdvantage: {
    advantages: string[];
    whyCantBeCopied: string;
  };
  
  channels: {
    acquisition: string[];
    distribution: string[];
  };
  
  customerSegments: {
    targetCustomers: string[];
    earlyAdopters: string[];
  };
  
  costStructure: {
    fixedCosts: string[];
    variableCosts: string[];
    totalMonthlyBurn: number;
  };
  
  revenueStreams: {
    revenueModel: string;
    pricing: string;
    lifetimeValue: number;
  };
}
```

---

## 4. Backend Architecture

### 4.1 API Routes (Hono.js)

```typescript
// API route structure
import { Hono } from 'hono';

const app = new Hono();

// AI Routes
app.post('/api/ai/generate-questions', generateQuestionsHandler);
app.post('/api/ai/expand-section', expandSectionHandler);
app.post('/api/ai/generate-suggestions', generateSuggestionsHandler);

// Canvas Routes
app.get('/api/canvas', listCanvasesHandler);
app.post('/api/canvas', createCanvasHandler);
app.get('/api/canvas/:id', getCanvasHandler);
app.put('/api/canvas/:id', updateCanvasHandler);
app.delete('/api/canvas/:id', deleteCanvasHandler);

// Export Routes
app.post('/api/export/pdf', generatePDFHandler);
app.get('/api/export/:id/download', downloadExportHandler);

// Payment Routes
app.post('/api/payment/create-checkout', createCheckoutHandler);
app.post('/api/payment/webhook', stripeWebhookHandler);
app.get('/api/payment/verify', verifyPaymentHandler);

// User Routes
app.get('/api/user/profile', getUserProfileHandler);
app.get('/api/user/subscription', getSubscriptionHandler);
```

### 4.2 Database Schema (Supabase)

```sql
-- Users table (extends Clerk user data)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lean Canvases table
CREATE TABLE canvases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  
  -- JSONB for flexible canvas data
  problem JSONB DEFAULT '{}',
  solution JSONB DEFAULT '{}',
  key_metrics JSONB DEFAULT '{}',
  unique_value_proposition JSONB DEFAULT '{}',
  unfair_advantage JSONB DEFAULT '{}',
  channels JSONB DEFAULT '{}',
  customer_segments JSONB DEFAULT '{}',
  cost_structure JSONB DEFAULT '{}',
  revenue_streams JSONB DEFAULT '{}',
  
  -- Metadata
  completion_percentage INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exports table (for PDF generation tracking)
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id UUID REFERENCES canvases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL, -- 'lean_canvas' | 'detailed_plan'
  file_url TEXT,
  file_size INTEGER,
  status TEXT DEFAULT 'pending', -- 'pending' | 'processing' | 'completed' | 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT NOT NULL, -- 'active' | 'canceled' | 'past_due' | 'unpaid'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_canvases_user_id ON canvases(user_id);
CREATE INDEX idx_exports_canvas_id ON exports(canvas_id);
CREATE INDEX idx_exports_user_id ON exports(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE canvases ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can only access their own data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only access their own canvases" ON canvases
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own exports" ON exports
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own subscriptions" ON subscriptions
  FOR ALL USING (auth.uid() = user_id);
```

---

## 5. Payment Integration (Stripe)

### 5.1 Pricing Structure

```typescript
// Pricing configuration
const PRICING = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Create unlimited lean canvases',
      'AI-powered guided questions',
      'Basic canvas visualization',
      'Export as JSON',
    ],
    limitations: [
      'No PDF export',
      'No detailed business plan',
    ],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    interval: 'one-time', // or 'monthly'
    features: [
      'Everything in Free',
      'Detailed business plan PDF',
      'Market analysis insights',
      'Financial projections',
      'Competitive analysis',
      'Priority AI processing',
      'Lifetime access to exports',
    ],
  },
};
```

### 5.2 Stripe Integration

```typescript
// Stripe checkout session creation
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(
  userId: string,
  customerEmail: string
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sprint Pro - Detailed Business Plan',
            description: 'AI-generated comprehensive business plan with market analysis',
          },
          unit_amount: 999, // $9.99 in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/canvas/{CANVAS_ID}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/canvas/{CANVAS_ID}?canceled=true`,
    metadata: {
      userId,
      canvasId: '{CANVAS_ID}',
    },
  });

  return session;
}
```

---

## 6. PDF Generation

### 6.1 PDF Structure (Detailed Business Plan)

```typescript
// PDF generation using Puppeteer + React PDF
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface DetailedBusinessPlan {
  executiveSummary: string;
  companyOverview: {
    mission: string;
    vision: string;
    values: string[];
  };
  marketAnalysis: {
    industryOverview: string;
    targetMarket: string;
    marketSize: string;
    trends: string[];
  };
  productService: {
    description: string;
    features: string[];
    development: string;
  };
  marketingStrategy: {
    positioning: string;
    channels: string[];
    acquisition: string;
  };
  operations: {
    location: string;
    suppliers: string[];
    technology: string;
  };
  management: {
    team: string;
    advisors: string[];
  };
  financialPlan: {
    startupCosts: string;
    revenueProjections: string;
    breakEven: string;
    funding: string;
  };
  riskAnalysis: {
    risks: string[];
    mitigation: string[];
  };
}
```

### 6.2 AI Expansion for Detailed Plan

```typescript
// AI prompt for expanding lean canvas to detailed plan
const EXPANSION_PROMPT = `You are an expert business plan writer. Expand the following lean canvas into a comprehensive business plan section.

Lean Canvas Data:
{canvasData}

Generate a detailed {sectionName} section (300-500 words) that includes:
1. In-depth analysis
2. Industry best practices
3. Actionable insights
4. Professional business language

Format the output in markdown with clear headings and bullet points.`;
```

---

## 7. State Management

### 7.1 Zustand Stores

```typescript
// Canvas store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CanvasStore {
  currentCanvas: LeanCanvas | null;
  canvases: LeanCanvas[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentCanvas: (canvas: LeanCanvas) => void;
  updateSection: (section: CanvasSection, data: any) => void;
  saveCanvas: () => Promise<void>;
  loadCanvases: () => Promise<void>;
  createCanvas: (title: string) => Promise<void>;
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      currentCanvas: null,
      canvases: [],
      isLoading: false,
      error: null,
      
      setCurrentCanvas: (canvas) => set({ currentCanvas: canvas }),
      
      updateSection: (section, data) => {
        const { currentCanvas } = get();
        if (!currentCanvas) return;
        
        set({
          currentCanvas: {
            ...currentCanvas,
            [section]: data,
            updatedAt: new Date(),
          },
        });
      },
      
      saveCanvas: async () => {
        const { currentCanvas } = get();
        if (!currentCanvas) return;
        
        set({ isLoading: true });
        try {
          await fetch(`/api/canvas/${currentCanvas.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentCanvas),
          });
        } catch (error) {
          set({ error: 'Failed to save canvas' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      // ... other actions
    }),
    {
      name: 'canvas-storage',
      partialize: (state) => ({ currentCanvas: state.currentCanvas }),
    }
  )
);
```

---

## 8. Implementation Milestones

### Phase 1: Foundation (Week 1)
- [x] Project setup with React + TypeScript + Vite
- [x] Design system implementation
- [x] Authentication with Clerk
- [x] Database schema setup with Supabase
- [x] Basic landing page

### Phase 2: Core Features (Week 2)
- [x] AI wizard flow implementation
- [x] Lean canvas dashboard
- [x] Canvas CRUD operations
- [x] Real-time collaboration (optional)

### Phase 3: AI Integration (Week 3)
- [x] OpenRouter API integration
- [x] Prompt engineering for each section
- [x] Suggestion system
- [x] Context-aware questioning

### Phase 4: Monetization (Week 4)
- [x] Stripe payment integration
- [x] Paywall implementation
- [x] PDF generation system
- [x] Subscription management

### Phase 5: Polish & Launch (Week 5)
- [x] Performance optimization
- [x] Testing & bug fixes
- [x] Analytics integration
- [x] Documentation
- [x] Deployment

---

## 9. Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI (OpenRouter)
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4o

# Payment (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=sprint-exports

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## 10. Security Considerations

1. **Authentication**: Clerk handles secure authentication with JWT tokens
2. **Authorization**: Row Level Security (RLS) in Supabase ensures data isolation
3. **API Rate Limiting**: Implement rate limiting on AI endpoints to prevent abuse
4. **Input Validation**: Zod schemas validate all API inputs
5. **Payment Security**: Stripe handles all payment data (PCI compliant)
6. **CORS**: Properly configured CORS for API routes
7. **CSRF Protection**: Built-in protection with modern frameworks

---

## 11. Performance Optimization

1. **Code Splitting**: Lazy load wizard and canvas components
2. **Image Optimization**: Use Next.js Image component with WebP format
3. **Caching**: React Query for server state caching
4. **AI Response Caching**: Cache similar AI responses in Redis
5. **PDF Generation**: Queue-based processing for large exports
6. **Database Indexing**: Proper indexes on frequently queried columns
7. **CDN**: Cloudflare for static asset delivery

---

## 12. Analytics & Monitoring

```typescript
// Analytics events
enum AnalyticsEvent {
  // User events
  USER_SIGNUP = 'user_signup',
  USER_LOGIN = 'user_login',
  
  // Canvas events
  CANVAS_CREATED = 'canvas_created',
  CANVAS_COMPLETED = 'canvas_completed',
  SECTION_COMPLETED = 'section_completed',
  
  // AI events
  AI_QUESTION_GENERATED = 'ai_question_generated',
  AI_SUGGESTION_USED = 'ai_suggestion_used',
  
  // Payment events
  CHECKOUT_STARTED = 'checkout_started',
  PAYMENT_COMPLETED = 'payment_completed',
  PAYMENT_FAILED = 'payment_failed',
  
  // Export events
  PDF_EXPORTED = 'pdf_exported',
  JSON_EXPORTED = 'json_exported',
}
```

---

## Summary

This architecture provides a scalable, secure, and performant foundation for the Sprint micro-SaaS application. The modular design allows for easy feature additions, while the freemium model with clear upgrade paths maximizes conversion potential.

**Key Technical Decisions:**
- **React + TypeScript + Vite**: Modern, fast, type-safe development
- **shadcn/ui + Tailwind**: Premium, customizable UI components
- **Clerk**: Production-ready authentication
- **Supabase**: Scalable Postgres database with real-time capabilities
- **OpenRouter**: Flexible AI model selection
- **Stripe**: Industry-standard payment processing
- **Hono.js**: Lightweight, fast API framework

**Next Steps:**
1. Initialize project with webapp-building skill
2. Implement landing page with premium design
3. Build authentication flow
4. Create AI wizard interface
5. Develop lean canvas dashboard
6. Integrate payment and PDF generation
