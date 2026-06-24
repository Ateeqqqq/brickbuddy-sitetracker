import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Building2,
  Camera,
  ClipboardList,
  FileText,
  Home,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { initials, classNames } from "../utils/format";

const navItems = [
  { label: "Dashboard", path: "/app", icon: Home },
  { label: "Projects", path: "/app/projects", icon: Building2 },
  { label: "Daily Updates", path: "/app/daily-updates", icon: ClipboardList },
  { label: "Photos", path: "/app/photos", icon: Camera },
  { label: "Reports", path: "/app/reports", icon: FileText },
  { label: "Team", path: "/app/team", icon: Users },
  { label: "Settings", path: "/app/settings", icon: Settings },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-line bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-line px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">B</div>
        <div>
          <p className="text-base font-bold text-ink">BrickBuddy</p>
          <p className="text-xs font-medium text-ink-muted">SiteTracker</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/app"}
              onClick={onNavigate}
              className={({ isActive }) =>
                classNames(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition",
                  isActive ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-slate-100 hover:text-ink",
                )
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-line p-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">Track Progress. Build Better.</p>
          <p className="mt-1 text-xs leading-5 text-ink-muted">Portfolio health, updates, and site evidence in one place.</p>
        </div>
      </div>
    </aside>
  );
}

export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        <Sidebar />
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/40"
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative h-full w-72">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
            <Button
              type="button"
              variant="ghost"
              className="absolute left-72 top-3 ml-2 h-10 w-10 bg-white px-0"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 md:px-6">
          <Button
            type="button"
            variant="ghost"
            className="h-10 w-10 px-0 lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </Button>
          <div className="relative hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={17} />
            <input
              className="focus-ring h-10 w-full rounded-md border border-line bg-slate-50 pl-10 pr-3 text-sm text-ink"
              placeholder="Search projects, updates, reports"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button type="button" variant="ghost" className="h-10 w-10 px-0" aria-label="Notifications">
              <Bell size={18} />
            </Button>
            <div className="flex items-center gap-3 rounded-md border border-line bg-white px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                {initials("Ateeq Malik")}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-ink">Ateeq Malik</p>
                <p className="text-xs text-ink-muted">Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
