# Academia Web Architecture Record

This document details the current implementation of the "Academia Web" platform and the roadmap for its evolution into a multi-tenant, self-hosted system.

## 1. Current Architecture (Legacy)
The current stack is a traditional decoupled frontend/backend setup:

- **Frontend**: React-based SPA located in `/frontend`. Served by Nginx.
- **Backend**: Express.js REST API located in `/api`. Acts as a proxy for Supabase.
- **Database**: Supabase (Cloud) for Auth, Postgres, and Row Level Security.
- **Containerization**: A single multi-stage `Dockerfile` that bundles React, Node, Nginx, and Supervisor into one image.

## 2. Infrastructure & Deployment (Local/VPS)
The system is being migrated to a **Self-Hosted** model to eliminate cloud costs.

### Container Orchestration
We use `docker-compose.yml` to manage the following services:
- **`db`**: PostgreSQL (PostGIS) for data persistence.
- **`auth`**: GoTrue (Supabase Auth compatible).
- **`rest`**: PostgREST (Automatic REST API layer).
- **`gateway` (Kong)**: Manages API routing and JWT validation.
- **`app`**: The core application (Astro/React).

### Multi-Tenancy (Student Isolation)
The "best structure" for serving multiple clients (students) is **Row-Level Security (RLS)** in PostgreSQL:
1.  **Tenant Recognition**: Using URL subdomains (e.g., `clase-a.academia.com`).
2.  **Schema isolation**: Every data table (`progress`, `certificates`) includes a `tenant_id`.
3.  **Policy Enforcment**: Supabase/PostgREST automatically applies filters so `user_id` can only see their own data within their authorized `tenant_id`.

## 3. Target State: Astro Migration
The final goal is to merge the `/frontend` and `/api` into a single **Astro** application.

### Why Astro?
- **Performance**: Pre-renders content for students, resulting in faster load times.
- **Simplicity**: No more separate API server; everything lives in `src/pages/api/`.
- **Lower Resource Usage**: One single Node process instead of Nginx + Express + React build.
- **Multi-Tenant Middleware**: Easier to implement tenant detection at the edge.

---
*Created on 2026-03-30*
