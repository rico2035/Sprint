from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import time

app = FastAPI()

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_AI_RESPONSES = {
  "problem": {
    "questions": [
      "What are the top 3 problems your target customers face that your solution addresses?",
      "What existing solutions are they using, and what are the main pain points with those?",
      "How do these problems impact their daily life or business operations?",
    ],
    "suggestions": [
      "Time-consuming manual processes",
      "High costs of current solutions",
      "Lack of integration between tools",
      "Poor user experience",
      "Limited access to data insights",
    ],
    "context": "Focus on problems that are painful enough that customers will pay to solve them.",
  },
  "solution": {
    "questions": [
      "What are the key features that directly address the problems you identified?",
      "How does your solution differ from existing alternatives?",
      "What would a minimum viable product (MVP) include?",
    ],
    "suggestions": [
      "Automated workflow engine",
      "Real-time collaboration features",
      "AI-powered recommendations",
      "One-click integrations",
      "Mobile-first design",
    ],
    "context": "Your solution should directly map to the problems identified. Keep the MVP focused.",
  },
  "uniqueValueProposition": {
    "questions": [
      "In one sentence, why should customers choose you over alternatives?",
      "What is your 'X for Y' analogy (e.g., 'Uber for groceries')?",
      "What is the single most important benefit customers will get?",
    ],
    "suggestions": [
      "Save 10+ hours per week on manual tasks",
      "Reduce costs by 50% compared to alternatives",
      "Get started in under 5 minutes",
      "The only solution with native AI integration",
      "Trusted by 10,000+ businesses",
    ],
    "context": "Your UVP should be clear, specific, and differentiate you from competitors.",
  },
  "unfairAdvantage": {
    "questions": [
      "What do you have that competitors cannot easily copy or buy?",
      "Do you have exclusive partnerships, proprietary technology, or unique expertise?",
      "What would make it difficult for a well-funded competitor to replicate your success?",
    ],
    "suggestions": [
      "Proprietary algorithm or technology",
      "Exclusive industry partnerships",
      "Deep domain expertise",
      "Strong community or network effects",
      "First-mover advantage in a niche",
    ],
    "context": "Unfair advantages are sustainable competitive moats, not just features.",
  },
  "keyMetrics": {
    "questions": [
      "What are the 3-5 most important numbers that indicate business health?",
      "What metrics will you track daily, weekly, and monthly?",
      "What numbers would indicate you have achieved product-market fit?",
    ],
    "suggestions": [
      "Monthly Recurring Revenue (MRR)",
      "Customer Acquisition Cost (CAC)",
      "Customer Lifetime Value (LTV)",
      "Monthly Active Users (MAU)",
      "Net Promoter Score (NPS)",
    ],
    "context": "Focus on actionable metrics that drive decisions, not vanity metrics.",
  },
  "channels": {
    "questions": [
      "Where do your target customers currently spend time online and offline?",
      "What channels will you use to acquire your first 100 customers?",
      "Which channels align best with your budget and resources?",
    ],
    "suggestions": [
      "Content marketing and SEO",
      "Social media advertising",
      "Industry conferences and events",
      "Partnership and affiliate programs",
      "Product-led growth and referrals",
    ],
    "context": "Start with 2-3 channels and master them before expanding.",
  },
  "customerSegments": {
    "questions": [
      "Who is your ideal customer? Describe their demographics, behaviors, and pain points.",
      "Who would be your early adopters - the first to try your solution?",
      "Is this a mass market or a niche audience?",
    ],
    "suggestions": [
      "Small business owners (10-50 employees)",
      "Marketing managers at SaaS companies",
      "Freelancers and solopreneurs",
      "Enterprise teams looking for agility",
      "Tech-savvy early adopters",
    ],
    "context": "Be specific. 'Everyone' is not a target market.",
  },
  "costStructure": {
    "questions": [
      "What are your fixed costs (salaries, rent, software) regardless of sales?",
      "What are your variable costs that scale with customers?",
      "What is your estimated monthly burn rate?",
    ],
    "suggestions": [
      "Team salaries and benefits",
      "Cloud infrastructure and hosting",
      "Software subscriptions",
      "Customer acquisition costs",
      "Office and operational expenses",
    ],
    "context": "Understand your unit economics - cost per customer vs revenue per customer.",
  },
  "revenueStreams": {
    "questions": [
      "How will you make money? (subscription, one-time, freemium, etc.)",
      "What is your pricing strategy and why?",
      "What is the estimated lifetime value of a customer?",
    ],
    "suggestions": [
      "Monthly/annual subscription model",
      "Usage-based pricing",
      "Freemium with premium upgrades",
      "Enterprise licensing",
      "Transaction fees or revenue share",
    ],
    "context": "Your pricing should reflect the value you create for customers.",
  },
}

@app.get("/api/questions")
def get_questions(section: str):
    time.sleep(1.2) # Simulate API delay
    if section not in MOCK_AI_RESPONSES:
        raise HTTPException(status_code=404, detail="Section not found")
    response = MOCK_AI_RESPONSES[section]
    return {
        "questions": response["questions"],
        "context": response["context"]
    }

@app.get("/api/suggestions")
def get_suggestions(section: str, input: str = ""):
    time.sleep(0.8) # Simulate API delay
    if section not in MOCK_AI_RESPONSES:
        raise HTTPException(status_code=404, detail="Section not found")
    
    base_suggestions = MOCK_AI_RESPONSES[section]["suggestions"]
    # If user has typed something, filter suggestions that might be relevant
    if len(input) > 10:
        return {"suggestions": base_suggestions[:3]}
    return {"suggestions": base_suggestions}

dist_path = os.path.join(os.path.dirname(__file__), "app", "dist")

if os.path.exists(dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        file_path = os.path.join(dist_path, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
