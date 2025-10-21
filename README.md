
# AI-Powered-Blog-Generator (Frontend)

A responsive React (Vite + TS) app to generate blog content with Azure OpenAI and manage drafts.

## Quick start

```bash
# 1) Install deps
npm install

# 2) Configure backend URL
cp .env.example .env
# edit .env and set VITE_API_BASE_URL (e.g., http://localhost:8000)

# 3) Run dev server
npm run dev
```

## Environment

- `VITE_API_BASE_URL` — FastAPI server base URL (default `http://localhost:8000`).

## Features
- Form with topic, keywords, tone, audience, and word count
- Generate content via Azure OpenAI (through the backend)
- View and edit generated text
- Save, list, copy, and delete drafts
- Responsive, MUI-based UI
