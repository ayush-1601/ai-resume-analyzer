# AI Resume Analyzer

Production-grade SaaS monorepo for analyzing resumes against job descriptions with AI-powered ATS scoring, skill gap analysis, and interview question generation.

## Prerequisites

- Node.js 18+
- npm (workspaces — do **not** use pnpm or yarn)
- Docker (for local PostgreSQL)

## Project Structure

```
├── apps/
│   ├── web/          # Next.js 14 (App Router) frontend
│   └── api/          # Express + Prisma backend
├── packages/
│   └── shared-types/ # Shared TypeScript types
├── docker-compose.yml
└── package.json      # Root workspace config
```

## Getting Started

### 1. Install dependencies

From the **repository root**, run:

```bash
npm install
```

This links all workspaces together via npm workspaces. You must run this from the root before anything else will work.

### 2. Configure environment variables

Copy the example env files and fill in values as needed:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

The default `DATABASE_URL` in `apps/api/.env.example` matches the Docker Compose Postgres service.

### 3. Start PostgreSQL

```bash
docker compose up -d
```

This starts a Postgres 16 instance on port `5432` with database `ai_resume_analyzer`.

### 4. Run database migrations

```bash
npm run db:migrate -w apps/api
```

Or directly with Prisma:

```bash
npm run db:migrate -w apps/api -- --name init
```

Generate the Prisma client after schema changes:

```bash
npm run db:generate -w apps/api
```

### 5. Start development servers

From the root:

```bash
npm run dev
```

This runs both apps concurrently:

| App | URL |
|-----|-----|
| Web (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:3001 |

Open http://localhost:3000 — the placeholder page calls `GET /health` on the API via React Query and displays the result.

## Available Scripts

All scripts are run from the repository root unless noted.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start web + api in dev mode |
| `npm run build` | Build both apps |
| `npm run lint` | Lint both apps |
| `npm run db:migrate -w apps/api` | Run Prisma migrations |
| `npm run db:generate -w apps/api` | Regenerate Prisma client |

## Tech Stack

**Web:** Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, Zustand, React Query, React Hook Form, Zod

**API:** Node.js, Express, TypeScript, Prisma, PostgreSQL

**Shared:** npm workspaces, shared-types package
