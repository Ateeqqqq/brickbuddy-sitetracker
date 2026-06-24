import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Camera, CheckCircle2, ClipboardList, FileText, Users } from "lucide-react";
import { Button } from "../components/ui/Button";

const features = [
  { title: "Project Tracking", text: "Keep status, owners, budgets, and schedules visible across every active job.", icon: ClipboardList },
  { title: "Daily Updates", text: "Capture completed work, blockers, tomorrow plans, and percent progress from site.", icon: CheckCircle2 },
  { title: "Photo Documentation", text: "Organize visual evidence by project, date, category, and upload owner.", icon: Camera },
  { title: "Progress Analytics", text: "Spot delayed work early with clean dashboards and activity trends.", icon: BarChart3 },
  { title: "Team Collaboration", text: "Assign engineers, contractors, managers, and viewers with role clarity.", icon: Users },
  { title: "Report Generation", text: "Prepare weekly, monthly, and project reports for clients and leadership.", icon: FileText },
];

const steps = ["Create Project", "Track Progress", "Upload Site Updates", "Generate Reports"];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-white/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">B</div>
            <div>
              <p className="text-base font-bold">BrickBuddy</p>
              <p className="text-xs font-medium text-ink-muted">SiteTracker</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-ink-muted md:flex">
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#how-it-works" className="hover:text-ink">How It Works</a>
            <Link to="/login" className="hover:text-ink">Login</Link>
          </nav>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1fr_0.9fr] lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-normal text-primary">Track Progress. Build Better.</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-normal text-ink md:text-5xl">
                Manage Every Construction Site From One Dashboard
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
                Track project progress, site updates, teams, photos, and deadlines without spreadsheets or endless WhatsApp groups.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register">
                  <Button icon={<ArrowRight size={18} />}>Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Book Demo</Button>
                </Link>
              </div>
            </div>
            <div className="min-h-[360px] overflow-hidden rounded-lg border border-line bg-white shadow-panel">
              <div className="border-b border-line px-5 py-4">
                <p className="text-sm font-semibold text-ink">Portfolio Overview</p>
                <p className="mt-1 text-xs text-ink-muted">Live construction health across active sites</p>
              </div>
              <div className="space-y-4 p-5">
                {["Palm Heights Tower", "Northline Warehouse", "Civic School Renovation"].map((name, index) => (
                  <div key={name} className="rounded-md border border-line p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-ink">{name}</p>
                        <p className="mt-1 text-sm text-ink-muted">{index === 1 ? "At risk" : "On track"} deadline status</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{[68, 42, 76][index]}%</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${[68, 42, 76][index]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-ink">Built for everyday site operations</h2>
            <p className="mt-3 text-base leading-7 text-ink-muted">
              A practical workspace for construction teams who need reliable records, simple navigation, and faster reporting.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-line bg-white p-5 shadow-panel">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <h2 className="text-3xl font-bold text-ink">How It Works</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-lg border border-line bg-white p-5 shadow-panel">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-5 text-base font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
