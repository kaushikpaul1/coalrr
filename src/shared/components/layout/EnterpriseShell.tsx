"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  FileText,
  Calculator,
  Lock,
  Users,
  Inbox,
  ClipboardList,
  Home,
  UserPlus,
  Briefcase,
  UserCheck,
  Menu,
  X,
  Mountain,
  ChevronRight,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/core/authorization/providers/AuthProvider";
import { useAppTranslation } from "@/localization/hooks/useAppTranslation";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "@/localization/components/LanguageSwitcher";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { AuthView } from "@/components/coalrr/views/AuthView";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Map,
  FileText,
  Calculator,
  Lock,
  Users,
  Inbox,
  ClipboardList,
  Home,
  UserPlus,
  Briefcase,
  UserCheck,
};

const NAV_ITEMS = [
  {
    key: "dashboard",
    icon: "LayoutDashboard",
    portals: ["ecl", "public"],
    module: "Core",
  },
  { key: "project-master", icon: "Map", portals: ["ecl"], module: "Module 1" },
  { key: "paf-census", icon: "Users", portals: ["ecl"], module: "Module 1" },
  { key: "rnr-asset", icon: "Home", portals: ["ecl"], module: "Module 1" },
  {
    key: "acquisition",
    icon: "FileText",
    portals: ["ecl"],
    module: "Module 2",
  },
  {
    key: "form-i-wizard",
    icon: "ClipboardList",
    portals: ["ecl", "public"],
    module: "Module 3",
  },
  {
    key: "nomination",
    icon: "UserPlus",
    portals: ["ecl", "public"],
    module: "Module 3",
  },
  {
    key: "payroll-builder",
    icon: "Calculator",
    portals: ["ecl"],
    module: "Module 4",
  },
  { key: "payment-ledger", icon: "Lock", portals: ["ecl"], module: "Module 4" },
  {
    key: "employment",
    icon: "Briefcase",
    portals: ["ecl", "public"],
    module: "Module 5",
  },
  { key: "workflow-inbox", icon: "Inbox", portals: ["ecl"], module: "Core" },
];

export const ROUTE_MAP: Record<string, string> = {
  dashboard: "/",
  acquisition: "/proposals",
  "payroll-builder": "/payrolls",
  "form-i-wizard": "/claims",
  "project-master": "/projects",
  "workflow-inbox": "/workflows",
};

export function EnterpriseShell({ children }: { children?: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const t = useAppTranslation("common");
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">{t("shell.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthView />;

  const getActiveState = (key: string) => {
    const expectedPath = ROUTE_MAP[key] || `/${key}`;
    if (expectedPath === "/") return pathname === "/";
    return pathname.startsWith(expectedPath);
  };

  const visibleNav = NAV_ITEMS.filter((item) =>
    item.portals.includes(user.portal),
  );

  const handleNavClick = (key: string) => {
    const newPath = ROUTE_MAP[key] || `/${key}`;
    setSidebarOpen(false);
    router.push(newPath);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-blue-100 bg-white pr-4 shadow-sm">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center pl-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-blue-700" />
            ) : (
              <Menu className="h-5 w-5 text-blue-700" />
            )}
          </Button>
        </div>

        {/* Logo Container - Perfectly matches the w-64 sidebar width */}
        <div
          className="hidden h-full w-64 shrink-0 cursor-pointer items-center justify-start pl-1 lg:flex"
          onClick={() => router.push("/")}
        >
          <img
            src="/images.png"
            alt="ECL Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Mobile Logo Fallback */}
        <div
          className="flex h-full flex-1 cursor-pointer items-center pl-1 lg:hidden"
          onClick={() => router.push("/")}
        >
          <img
            src="/images.png"
            alt="ECL Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Top Navigation */}
        <nav className="hidden flex-1 items-center gap-1 pl-6 md:flex">
          {visibleNav.slice(0, 5).map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm font-medium transition",
                getActiveState(item.key)
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700",
              )}
            >
              {t(`nav.${item.key}.label`)}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 sm:flex">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                user.portal === "ecl"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700",
              )}
            >
              {(user.name || user.role || "user")
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="text-left">
              <p className="text-xs font-medium leading-tight text-blue-950">
                {user.name || "user"}
              </p>
              <p className="text-[10px] text-blue-700/80 leading-tight">
                {user.roleLabel ?? user.role}
                {user.designation ? ` · ${user.designation}` : ""}
              </p>
            </div>
          </div>
          <LanguageSwitcher />
          <NotificationCenter user_id={user.id} />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-blue-700 hover:bg-blue-50 hover:text-blue-900"
            onClick={() => {
              fetch("/api/auth/logout", { method: "POST" }).then(() => {
                window.location.href = "/";
              });
            }}
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-20 w-64 transform border-r border-blue-100 bg-gradient-to-b from-white to-blue-50/50 transition-transform lg:static lg:translate-x-0",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-600/70">
              {user.portal === "ecl" ? "ECL Modules" : "Citizen Portal"}
            </p>
            {visibleNav.map((item) => {
              const Icon = ICONS[item.icon] ?? LayoutDashboard;
              const active = getActiveState(item.key);
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={cn(
                    "group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition",
                    active
                      ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-200"
                      : "text-slate-600 hover:bg-white/60 hover:text-blue-700",
                  )}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      active
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-blue-500",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">
                        {t(`nav.${item.key}.label`)}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-3.5 px-1 text-[9px] font-mono",
                          active
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 text-slate-500",
                        )}
                      >
                        {item.module}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        "mt-0.5 line-clamp-2 text-[11px]",
                        active ? "text-blue-700/80" : "text-slate-500",
                      )}
                    >
                      {t(`nav.${item.key}.desc`)}
                    </p>
                  </div>
                  {active && (
                    <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  )}
                </button>
              );
            })}
            <Separator className="my-2 border-blue-100" />
            <div className="rounded-lg bg-blue-50/80 p-3 ring-1 ring-blue-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                Architecture
              </p>
              <ul className="mt-1.5 space-y-1 text-[11px] text-blue-900/70">
                <li>• Math Engine (decimal.js)</li>
                <li>• Workflow Engine (FSM)</li>
                <li>• Docx Engine (registry)</li>
                <li>• Immutable Form-D Ledger</li>
              </ul>
            </div>
            {user.portal === "ecl" && (
              <div className="mt-2 rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-3 shadow-sm">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                  <Building2 className="h-3 w-3 text-emerald-600" />{" "}
                  {user.colliery_code ?? "ECL"}
                </p>
                <p className="mt-0.5 text-[11px] text-emerald-900/70">
                  Logged in as{" "}
                  <span className="font-medium text-emerald-900">
                    {user.roleLabel ?? user.role}
                  </span>
                </p>
              </div>
            )}
          </nav>
        </aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-blue-950/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <footer className="mt-auto border-t border-blue-100 bg-white px-4 py-3 text-center text-[11px] text-slate-500">
        <p>
          <span className="font-semibold text-blue-900">COALRR</span> — Coal
          Land Acquisition, Rehabilitation &amp; Resettlement Platform · Next.js
          16 + TypeScript + Prisma + decimal.js
        </p>
      </footer>
    </div>
  );
}
