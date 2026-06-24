# BrickBuddy SiteTracker

BrickBuddy SiteTracker is a full-stack construction project tracking test project that feels like a real product. It includes a polished React frontend, a FastAPI backend, PostgreSQL support, JWT authentication, and production-ready API structure for projects, daily updates, photos, reports, team management, and settings.

It is designed to show practical SaaS workflows, clear architecture, and real integration points without depending on a toy mockup backend.

## Highlights

- React + TypeScript + Vite frontend
- FastAPI backend
- PostgreSQL database support
- JWT login flow
- Project tracking dashboard
- Daily site updates
- Photo documentation and upload flow
- Reports and PDF generation
- Team management
- Settings and company profile screens
- Ready for future production API expansion

## Product Phases

1. Layout System: responsive app shell, sticky header, sidebar navigation, mobile drawer, shared UI components.
2. Authentication: login, register, and forgot password screens.
3. Dashboard: statistics cards, progress charts, weekly activity, recent updates, and deadlines.
4. Projects: searchable/filterable project table, create/edit/delete flows, and project detail page.
5. Daily Updates: update creation, progress percentage, completed work, issues, tomorrow plan, and history.
6. Photos: grid gallery, project filtering, preview modal, upload action, and delete flow.
7. Reports: weekly, monthly, and project report library with generate PDF actions.
8. Team Management: members table, add member flow, roles, status, and project assignments.
9. Settings: profile, company information, notifications, and password management.

## API Readiness

The app contains service files in `src/services` with placeholder endpoints prepared for future FastAPI integration:

- `/api/auth/login`
- `/api/projects`
- `/api/updates`
- `/api/photos`
- `/api/reports`
- `/api/team`

Set the backend base URL in `.env.local` when your FastAPI app is ready:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The shared Axios client in `src/services/apiClient.ts` automatically sends a bearer token from `localStorage` using the key `brickbuddy_token`. Replace the demo auth behavior in `src/pages/auth` with real calls to `authService` when the backend endpoints are live.

## Source Structure

```text
src/
  components/     Shared UI primitives and status badges
  data/           Demo data used until API responses are connected
  layouts/        Authenticated dashboard shell
  pages/          Feature pages organized by product module
  routes/         React Router configuration with lazy-loaded pages
  services/       Axios service files for future FastAPI endpoints
  types/          Shared TypeScript domain interfaces
  utils/          Formatting and class helpers
```

## Backend Integration Checklist

1. Implement FastAPI routes matching the service files in `src/services`.
2. Add JWT login/register responses and store the returned token under `brickbuddy_token`.
3. Replace mock arrays from `src/data/mockData.ts` with service calls and loading/error states.
4. Connect uploads to `/api/photos` with multipart form data.
5. Connect report PDF generation to `/api/reports/{id}/pdf`.

## Demo Access

The backend seeds a demo account for testing:

- Email: `admin@brickbuddy.com`
- Password: `password`

## Run Locally

Frontend only:

```bash
npm install
npm run dev
```

Backend and PostgreSQL:

```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Full stack with Docker:

```bash
docker compose up --build
```

Build frontend for production:

```bash
npm run build
```

## Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Health check: `http://localhost:8000/api/health`
