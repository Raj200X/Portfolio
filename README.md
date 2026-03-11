# Raj Srivastava Portfolio

Story-driven MERN portfolio built as an immersive single-page journey instead of a standard stacked template.

## Stack

- Frontend: React, TailwindCSS, Framer Motion, Vite
- Backend: Node.js, Express
- Database: MongoDB with Mongoose

## Folder Structure

```text
.
├── src
│   ├── components/portfolio
│   │   ├── AmbientBackdrop.jsx
│   │   ├── ChapterRail.jsx
│   │   ├── ContactTerminal.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── DeveloperMind.jsx
│   │   ├── LandingSection.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ProjectUniverse.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── SkillsGalaxy.jsx
│   │   └── StorySection.jsx
│   ├── data/portfolioFallback.js
│   ├── hooks/usePortfolioData.js
│   ├── lib/api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── server
│   ├── src
│   │   ├── config/db.js
│   │   ├── data/portfolioSeed.js
│   │   ├── models
│   │   │   ├── ContactMessage.js
│   │   │   └── Portfolio.js
│   │   ├── routes
│   │   │   ├── contact.js
│   │   │   └── portfolio.js
│   │   ├── index.js
│   │   └── seed.js
│   └── .env.example
├── index.html
└── tailwind.config.js
```

## Frontend Experience

- `Landing`: cinematic intro with animated name reveal and scroll cue
- `My Story`: chapter-based timeline cards
- `Skills Galaxy`: orbit-style skill nodes with hover inspection
- `Project Universe`: horizontal project lane with premium hover states
- `Developer Mind`: principles + roadmap instead of a generic about section
- `Contact Terminal`: command-driven contact UI with backend message submission

## Backend API

- `GET /api/health` returns server status and whether it is using MongoDB or in-memory fallback
- `GET /api/portfolio` returns the portfolio payload
- `POST /api/contact` stores terminal messages

## MongoDB Schemas

- `Portfolio`
  - `slug: String`
  - `payload: Object`
- `ContactMessage`
  - `name: String`
  - `email: String`
  - `message: String`
  - `source: String`
  - timestamps enabled

## Setup

### 1. Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

If `MONGO_URI` is missing, the backend still starts in memory mode. The frontend also falls back to local portfolio data if the API is offline.

### 3. Seed MongoDB

Use this only if you want the portfolio content persisted in MongoDB.

```bash
cd server
npm run seed
```

## Notes

- The copy is prefilled using the profile details I could reliably extract from your CV metadata: GitHub, LinkedIn, email, coding profiles, and the `Convo` / `Cohort` repositories.
- `portfolioFallback.js` and `server/src/data/portfolioSeed.js` are the main content sources to edit if you want to refine project descriptions, roadmap text, or contact details.
