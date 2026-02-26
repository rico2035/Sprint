<p align="center">
  <h1 align="center">Sprint</h1>
  <p align="center">
    AI-Powered Lean Business Plan Generator
    <br />
    <em>Transform your business idea into a comprehensive lean canvas — in minutes, not hours.</em>
  </p>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#license">License</a>
</p>

---

## Overview

**Sprint** is a micro-SaaS platform that transforms the traditional lean canvas business plan into an AI-powered, interactive experience. The platform guides entrepreneurs through a step-by-step wizard to create comprehensive business plans, with intelligent suggestions and contextual guidance at every stage.

Built with a Python (FastAPI) backend and a modern React frontend, Sprint delivers a fast, responsive, and production-ready experience.

## Features

- **AI-Guided Wizard** — Step-by-step flow covering all 9 lean canvas sections: Problem, Solution, Unique Value Proposition, Unfair Advantage, Key Metrics, Channels, Customer Segments, Cost Structure, and Revenue Streams
- **Smart Suggestions** — Context-aware recommendations that adapt to user input
- **Contextual Guidance** — Expert-level prompts and questions to sharpen each section of your plan
- **Lean Canvas Visualization** — Clean, structured output of your complete business model
- **Fast API Backend** — High-performance Python API built on FastAPI with async support
- **Modern Frontend** — React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Architecture

```
┌──────────────────────────────────┐
│         Client (React SPA)       │
│  React 18 · TypeScript · Vite    │
│  Tailwind CSS · shadcn/ui        │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│        API Layer (FastAPI)       │
│  REST Endpoints · CORS · Static  │
│  Serving · AI Service Layer      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│          Data / Services         │
│  AI Provider · Database · Cache  │
└──────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ (for frontend build)

### Installation

```bash
# Clone the repository
git clone https://github.com/rico2035/Sprint.git
cd Sprint

# Install Python dependencies
pip install -r requirements.txt

# (Optional) Build the frontend
cd app
npm install
npm run build
cd ..
```

### Running the Application

```bash
# Start the development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The application will be available at `http://localhost:8000`.

## API Reference

| Method | Endpoint             | Description                                    |
|--------|----------------------|------------------------------------------------|
| GET    | `/api/questions`     | Get guided questions for a lean canvas section |
| GET    | `/api/suggestions`   | Get smart suggestions based on user input      |
| GET    | `/{path}`            | Serve the React frontend (SPA fallback)        |

### Query Parameters

- `section` — The lean canvas section identifier (e.g., `problem`, `solution`, `revenueStreams`)
- `input` — (Suggestions only) User input for contextual filtering

## Tech Stack

| Layer    | Technology                                    |
|----------|-----------------------------------------------|
| Backend  | Python · FastAPI · Uvicorn · Pydantic         |
| Frontend | React 18 · TypeScript · Vite · Tailwind CSS   |
| UI       | shadcn/ui · Framer Motion · Recharts          |
| State    | Zustand · React Query                         |

## Project Structure

```
Sprint/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── app/                    # React frontend application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/            # Utilities and helpers
│   │   └── ...
│   └── dist/               # Production build output
├── LICENSE                 # MIT License
└── README.md
```

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Sprint</strong> v1.5 · Built by <strong>Ric S Kolluri</strong>
  <br />
  Copyright &copy; 2026 Ric S Kolluri. All rights reserved.
</p>
