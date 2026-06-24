import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden border-r border-line bg-white px-10 py-12 lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">B</div>
          <div>
            <p className="text-base font-bold text-ink">BrickBuddy</p>
            <p className="text-xs font-medium text-ink-muted">SiteTracker</p>
          </div>
        </Link>
        <div className="mt-auto max-w-md">
          <p className="text-sm font-bold uppercase tracking-normal text-primary">Track Progress. Build Better.</p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-ink">Reliable project records for fast-moving sites.</h1>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            Manage updates, photos, reports, and deadlines from a calm workspace your field and office teams can share.
          </p>
        </div>
      </section>
      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-panel">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-ink">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
