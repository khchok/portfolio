# Portfolio

A Next.js 16 portfolio hosting two full-stack demo apps.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind v4, shadcn/ui (slate theme)
- **Data fetching** — TanStack Query v5
- **Drag and drop** — @dnd-kit/core
- **HTTP** — Axios with API rewrites via `next.config.ts`

## Apps

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/tracker` | Job Tracker — Kanban board with drag-and-drop |
| `/marketplace` | Job Marketplace — employer & candidate dashboards |

## Structure

```
src/
  app/
    (landing)/          # Landing page
    (tracker)/          # Job Tracker (auth isolated)
    (marketplace)/      # Job Marketplace (auth isolated)
  components/
    tracker/
    marketplace/
  contexts/             # TrackerAuthContext, MarketplaceAuthContext
  services/
    tracker/            # job-service, user-service, queries, mutations
    marketplace/
      auth/             # auth-service, auth-queries, auth-mutations
      candidates/       # candidates-service, candidates-queries, candidates-mutations
      employer/         # employer-service, employer-queries, employer-mutations
  types/
```

## Dev

```bash
pnpm dev
```
