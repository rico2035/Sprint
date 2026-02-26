import type { CanvasSectionType } from '@/types';
import { CanvasSection } from './canvas-data';

// AI System Prompt
export const SYSTEM_PROMPT = `You are an expert business strategist and startup advisor. Your role is to help entrepreneurs create comprehensive lean canvas business plans through intelligent, contextual questioning.

Guidelines:
- Ask specific, actionable questions that help users think deeply about their business
- Provide 2-3 questions per section
- Include relevant examples and suggestions
- Be encouraging but challenge assumptions when needed
- Focus on clarity and specificity
- Use professional but accessible language

Respond in JSON format with:
{
  "questions": ["question 1", "question 2", "question 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "context": "brief context or tip for this section"
}`;

// Section-specific prompts
export const SECTION_PROMPTS: Record<CanvasSectionType, string> = {
  [CanvasSection.PROBLEM]: `Based on the business idea: "{businessIdea}"

Help the entrepreneur identify and articulate the problems they're solving.

Ask 2-3 specific questions about:
1. The top problems their target customers face
2. Existing alternatives and their shortcomings
3. The emotional and practical impact of these problems

Provide intelligent suggestions based on the business context.

Respond in JSON format.`,

  [CanvasSection.SOLUTION]: `Based on the business idea: "{businessIdea}"
And the problems identified: "{previousResponses}"

Help articulate the solution.

Ask 2-3 questions about:
1. Key features that solve the identified problems
2. How the solution differs from alternatives
3. The minimum viable product (MVP) scope

Provide suggestions for core features and differentiation strategies.

Respond in JSON format.`,

  [CanvasSection.UNIQUE_VALUE_PROPOSITION]: `Based on the business idea: "{businessIdea}"
And the solution: "{previousResponses}"

Help craft a compelling unique value proposition.

Ask 2-3 questions about:
1. The single most important benefit to customers
2. What makes this solution unique compared to alternatives
3. A high-level concept (X for Y) analogy

Provide suggestions for powerful UVP statements.

Respond in JSON format.`,

  [CanvasSection.UNFAIR_ADVANTAGE]: `Based on the business idea: "{businessIdea}"

Help identify unfair advantages.

Ask 2-3 questions about:
1. Internal strengths or assets that competitors cannot easily replicate
2. Exclusive relationships, knowledge, or technology
3. Network effects or economies of scale potential

Provide suggestions for building sustainable competitive advantages.

Respond in JSON format.`,

  [CanvasSection.KEY_METRICS]: `Based on the business idea: "{businessIdea}"

Help define key metrics for success.

Ask 2-3 questions about:
1. The most important metrics to track (acquisition, activation, retention, revenue, referral)
2. Specific targets or benchmarks for each metric
3. How to measure product-market fit

Provide suggestions for relevant KPIs based on the business model.

Respond in JSON format.`,

  [CanvasSection.CHANNELS]: `Based on the business idea: "{businessIdea}"
And target customers: "{previousResponses}"

Help identify effective channels.

Ask 2-3 questions about:
1. Where target customers currently spend time online and offline
2. The most cost-effective channels for reaching them
3. Channels for both acquisition and distribution

Provide suggestions for channel strategies based on the target audience.

Respond in JSON format.`,

  [CanvasSection.CUSTOMER_SEGMENTS]: `Based on the business idea: "{businessIdea}"

Help define customer segments.

Ask 2-3 questions about:
1. The ideal customer profile (demographics, psychographics, behaviors)
2. Early adopters who would be first to use the product
3. Market size and accessibility of each segment

Provide suggestions for customer segmentation strategies.

Respond in JSON format.`,

  [CanvasSection.COST_STRUCTURE]: `Based on the business idea: "{businessIdea}"

Help identify key costs.

Ask 2-3 questions about:
1. Fixed costs (salaries, rent, software subscriptions)
2. Variable costs (customer acquisition, production, support)
3. Major cost drivers and potential areas for optimization

Provide suggestions for cost management based on the business model.

Respond in JSON format.`,

  [CanvasSection.REVENUE_STREAMS]: `Based on the business idea: "{businessIdea}"

Help define revenue streams.

Ask 2-3 questions about:
1. Revenue model (subscription, one-time, freemium, etc.)
2. Pricing strategy and willingness to pay
3. Lifetime value and revenue projections

Provide suggestions for revenue optimization.

Respond in JSON format.`,
};

// Suggestion prompts for each section
export const SUGGESTION_PROMPTS: Record<CanvasSectionType, string> = {
  [CanvasSection.PROBLEM]: `Given the business idea "{businessIdea}", provide 3-5 common problems that customers in this space typically face. Format as a JSON array of strings.`,
  
  [CanvasSection.SOLUTION]: `Given the problem "{currentInput}" in the context of "{businessIdea}", suggest 3-5 potential solution features. Format as a JSON array of strings.`,
  
  [CanvasSection.UNIQUE_VALUE_PROPOSITION]: `Given the business "{businessIdea}", suggest 3 compelling unique value proposition templates. Format as a JSON array of strings.`,
  
  [CanvasSection.UNFAIR_ADVANTAGE]: `Given the business "{businessIdea}", suggest 3-5 potential unfair advantages. Format as a JSON array of strings.`,
  
  [CanvasSection.KEY_METRICS]: `Given the business "{businessIdea}", suggest 5 key metrics to track. Format as a JSON array of strings.`,
  
  [CanvasSection.CHANNELS]: `Given the business "{businessIdea}", suggest 5 effective marketing channels. Format as a JSON array of strings.`,
  
  [CanvasSection.CUSTOMER_SEGMENTS]: `Given the business "{businessIdea}", suggest 3-5 target customer segments. Format as a JSON array of strings.`,
  
  [CanvasSection.COST_STRUCTURE]: `Given the business "{businessIdea}", suggest common cost categories. Format as a JSON array of strings.`,
  
  [CanvasSection.REVENUE_STREAMS]: `Given the business "{businessIdea}", suggest 3-5 revenue stream ideas. Format as a JSON array of strings.`,
};

// Mock AI responses for demonstration (when API is not available)
export const MOCK_AI_RESPONSES: Record<CanvasSectionType, { questions: string[]; suggestions: string[]; context: string }> = {
  [CanvasSection.PROBLEM]: {
    questions: [
      'What are the top 3 problems your target customers face that your solution addresses?',
      'What existing solutions are they using, and what are the main pain points with those?',
      'How do these problems impact their daily life or business operations?',
    ],
    suggestions: [
      'Time-consuming manual processes',
      'High costs of current solutions',
      'Lack of integration between tools',
      'Poor user experience',
      'Limited access to data insights',
    ],
    context: 'Focus on problems that are painful enough that customers will pay to solve them.',
  },
  [CanvasSection.SOLUTION]: {
    questions: [
      'What are the key features that directly address the problems you identified?',
      'How does your solution differ from existing alternatives?',
      'What would a minimum viable product (MVP) include?',
    ],
    suggestions: [
      'Automated workflow engine',
      'Real-time collaboration features',
      'AI-powered recommendations',
      'One-click integrations',
      'Mobile-first design',
    ],
    context: 'Your solution should directly map to the problems identified. Keep the MVP focused.',
  },
  [CanvasSection.UNIQUE_VALUE_PROPOSITION]: {
    questions: [
      'In one sentence, why should customers choose you over alternatives?',
      'What is your "X for Y" analogy (e.g., "Uber for groceries")?',
      'What is the single most important benefit customers will get?',
    ],
    suggestions: [
      'Save 10+ hours per week on manual tasks',
      'Reduce costs by 50% compared to alternatives',
      'Get started in under 5 minutes',
      'The only solution with native AI integration',
      'Trusted by 10,000+ businesses',
    ],
    context: 'Your UVP should be clear, specific, and differentiate you from competitors.',
  },
  [CanvasSection.UNFAIR_ADVANTAGE]: {
    questions: [
      'What do you have that competitors cannot easily copy or buy?',
      'Do you have exclusive partnerships, proprietary technology, or unique expertise?',
      'What would make it difficult for a well-funded competitor to replicate your success?',
    ],
    suggestions: [
      'Proprietary algorithm or technology',
      'Exclusive industry partnerships',
      'Deep domain expertise',
      'Strong community or network effects',
      'First-mover advantage in a niche',
    ],
    context: 'Unfair advantages are sustainable competitive moats, not just features.',
  },
  [CanvasSection.KEY_METRICS]: {
    questions: [
      'What are the 3-5 most important numbers that indicate business health?',
      'What metrics will you track daily, weekly, and monthly?',
      'What numbers would indicate you have achieved product-market fit?',
    ],
    suggestions: [
      'Monthly Recurring Revenue (MRR)',
      'Customer Acquisition Cost (CAC)',
      'Customer Lifetime Value (LTV)',
      'Monthly Active Users (MAU)',
      'Net Promoter Score (NPS)',
    ],
    context: 'Focus on actionable metrics that drive decisions, not vanity metrics.',
  },
  [CanvasSection.CHANNELS]: {
    questions: [
      'Where do your target customers currently spend time online and offline?',
      'What channels will you use to acquire your first 100 customers?',
      'Which channels align best with your budget and resources?',
    ],
    suggestions: [
      'Content marketing and SEO',
      'Social media advertising',
      'Industry conferences and events',
      'Partnership and affiliate programs',
      'Product-led growth and referrals',
    ],
    context: 'Start with 2-3 channels and master them before expanding.',
  },
  [CanvasSection.CUSTOMER_SEGMENTS]: {
    questions: [
      'Who is your ideal customer? Describe their demographics, behaviors, and pain points.',
      'Who would be your early adopters - the first to try your solution?',
      'Is this a mass market or a niche audience?',
    ],
    suggestions: [
      'Small business owners (10-50 employees)',
      'Marketing managers at SaaS companies',
      'Freelancers and solopreneurs',
      'Enterprise teams looking for agility',
      'Tech-savvy early adopters',
    ],
    context: 'Be specific. "Everyone" is not a target market.',
  },
  [CanvasSection.COST_STRUCTURE]: {
    questions: [
      'What are your fixed costs (salaries, rent, software) regardless of sales?',
      'What are your variable costs that scale with customers?',
      'What is your estimated monthly burn rate?',
    ],
    suggestions: [
      'Team salaries and benefits',
      'Cloud infrastructure and hosting',
      'Software subscriptions',
      'Customer acquisition costs',
      'Office and operational expenses',
    ],
    context: 'Understand your unit economics - cost per customer vs revenue per customer.',
  },
  [CanvasSection.REVENUE_STREAMS]: {
    questions: [
      'How will you make money? (subscription, one-time, freemium, etc.)',
      'What is your pricing strategy and why?',
      'What is the estimated lifetime value of a customer?',
    ],
    suggestions: [
      'Monthly/annual subscription model',
      'Usage-based pricing',
      'Freemium with premium upgrades',
      'Enterprise licensing',
      'Transaction fees or revenue share',
    ],
    context: 'Your pricing should reflect the value you create for customers.',
  },
};

// Mock suggestion generation
export const generateMockSuggestions = (section: CanvasSectionType, input: string): string[] => {
  const baseSuggestions = MOCK_AI_RESPONSES[section].suggestions;
  
  // If user has typed something, filter suggestions that might be relevant
  if (input.length > 10) {
    return baseSuggestions.slice(0, 3);
  }
  
  return baseSuggestions;
};

// Mock question generation
export const generateMockQuestions = (section: CanvasSectionType): { questions: string[]; context: string } => {
  const response = MOCK_AI_RESPONSES[section];
  return {
    questions: response.questions,
    context: response.context,
  };
};
