import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";

const LandingPage = lazy(() => import("../pages/LandingPage").then((module) => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import("../pages/auth/LoginPage").then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage").then((module) => ({ default: module.RegisterPage })));
const ForgotPasswordPage = lazy(() =>
  import("../pages/auth/ForgotPasswordPage").then((module) => ({ default: module.ForgotPasswordPage })),
);
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const ProjectsPage = lazy(() => import("../pages/projects/ProjectsPage").then((module) => ({ default: module.ProjectsPage })));
const ProjectDetailPage = lazy(() =>
  import("../pages/projects/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })),
);
const DailyUpdatesPage = lazy(() =>
  import("../pages/updates/DailyUpdatesPage").then((module) => ({ default: module.DailyUpdatesPage })),
);
const PhotosPage = lazy(() => import("../pages/photos/PhotosPage").then((module) => ({ default: module.PhotosPage })));
const ReportsPage = lazy(() => import("../pages/reports/ReportsPage").then((module) => ({ default: module.ReportsPage })));
const TeamPage = lazy(() => import("../pages/team/TeamPage").then((module) => ({ default: module.TeamPage })));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage").then((module) => ({ default: module.SettingsPage })));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm font-semibold text-ink-muted">
      Loading BrickBuddy...
    </div>
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<LandingPage />) },
  { path: "/login", element: withSuspense(<LoginPage />) },
  { path: "/register", element: withSuspense(<RegisterPage />) },
  { path: "/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: "projects", element: withSuspense(<ProjectsPage />) },
      { path: "projects/:projectId", element: withSuspense(<ProjectDetailPage />) },
      { path: "daily-updates", element: withSuspense(<DailyUpdatesPage />) },
      { path: "photos", element: withSuspense(<PhotosPage />) },
      { path: "reports", element: withSuspense(<ReportsPage />) },
      { path: "team", element: withSuspense(<TeamPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
