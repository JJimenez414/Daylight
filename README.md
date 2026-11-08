# Daylight

Full-stack TypeScript app: **React + Vite** frontend, **Express + Prisma + PostgreSQL** backend.

## Prerequisites

- Node.js 22+
- A PostgreSQL database (e.g. self-hosted on a Raspberry Pi)

## Getting started

```bash
npm install            # installs client + server, generates Prisma client
cp server/.env.example server/.env   # then set DATABASE_URL to your database
npm run dev            # start server (:4000) and client (:5173)
```

Open http://localhost:5173.

## Scripts (run from the repo root)

| Command              | What it does                                |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Run frontend and backend together           |
| `npm run build`      | Build both apps                             |
| `npm test`           | Run backend tests (Vitest + Supertest)      |
| `npm run db:migrate` | Apply Prisma schema changes to the database |
| `npm run format`     | Format all files with Prettier              |

## Project structure

```
client/                 React + Vite + Tailwind
  src/App.tsx           Main page (health check button)
  src/lib/api.ts        axios instance + API functions
server/                 Express API
  prisma/schema.prisma  Database models (none yet)
  src/app.ts            Express app setup
  src/routes/           API routes
  src/middleware/       Error handling
```

## API

| Method | Path          | Description  |
| ------ | ------------- | ------------ |
| GET    | `/api/health` | Health check |

In development, Vite proxies `/api/*` to the Express server, so the frontend calls the API with relative URLs.
