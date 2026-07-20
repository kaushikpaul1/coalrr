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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
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
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans antialiased">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 border-t-4 border-t-blue-600 bg-white/80 pr-4 shadow-sm backdrop-blur-md transition-all">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center pl-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
            className="hover:bg-slate-100"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-slate-700" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700" />
            )}
          </Button>
        </div>

        {/* Logo Container - Matches the w-64 sidebar width */}
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

        {/* Vertical Divider for Premium Separation */}
        <div className="hidden lg:block h-8 w-px bg-slate-300 mx-2"></div>

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

        {/* Active Page Header (Dynamic Breadcrumb) */}
        <div className="hidden flex-1 items-center gap-3 pl-4 md:flex">
          {(() => {
            const activeItem = visibleNav.find((item) =>
              getActiveState(item.key),
            );
            if (!activeItem) return null;

            const ActiveIcon = ICONS[activeItem.icon] ?? LayoutDashboard;
            return (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50">
                  <ActiveIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold text-slate-900 leading-none">
                    {t(`nav.${activeItem.key}.label`)}
                  </h1>
                  <span className="mt-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                    {activeItem.module}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <NotificationCenter user_id={user.id} />
          <LanguageSwitcher />
          <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 pl-2 pr-5 py-1.5 min-w-48">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none outline-none group">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold shadow-sm transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md group-active:scale-95 group-data-[state=open]:ring-2 group-data-[state=open]:ring-slate-400 group-data-[state=open]:ring-offset-1",
                      user.portal === "ecl"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200 text-slate-800 border border-slate-300",
                    )}
                  >
                    {(user.name || user.role || "user")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="bottom"
                sideOffset={12}
                className="w-52 origin-top-left data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-50 data-[state=closed]:zoom-out-50 data-[state=open]:slide-in-from-top-4 data-[state=open]:slide-in-from-left-4 duration-500 ease-out"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/settings/password")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    fetch("/api/auth/logout", { method: "POST" }).then(() => {
                      window.location.href = "/";
                    });
                  }}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden text-left sm:block cursor-text select-text">
              <p className="text-xs font-semibold leading-tight text-slate-900">
                {user.name || "user"}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {user.roleLabel ?? user.role}
                {user.designation ? ` · ${user.designation}` : ""}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-20 w-64 transform border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 shadow-lg lg:shadow-none",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
            <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
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
                    "group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ease-in-out",
                    active
                      ? "bg-blue-50 text-blue-900 shadow-sm ring-1 ring-blue-200/50"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-800",
                  )}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 transition-colors",
                      active
                        ? "text-blue-700"
                        : "text-slate-400 group-hover:text-blue-600",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          active ? "text-blue-950" : "text-slate-700 group-hover:text-blue-900",
                        )}
                      >
                        {t(`nav.${item.key}.label`)}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-3.5 px-1.5 text-[9px] font-mono border-0",
                          active
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100/50 group-hover:text-blue-700",
                        )}
                      >
                        {item.module}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        "mt-1 line-clamp-2 text-[10px] leading-relaxed transition-colors",
                        active ? "text-blue-700/80" : "text-slate-500 group-hover:text-blue-700/70",
                      )}
                    >
                      {t(`nav.${item.key}.desc`)}
                    </p>
                  </div>
                  {active && (
                    <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-700" />
                  )}
                </button>
              );
            })}
            <Separator className="my-3 border-slate-200" />
            <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Architecture
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 font-mono">
                <li>• Math Engine (decimal.js)</li>
                <li>• Workflow Engine (FSM)</li>
                <li>• Docx Engine (registry)</li>
                <li>• Immutable Ledger</li>
              </ul>
            </div>
            {user.portal === "ecl" && (
              <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <Building2 className="h-3 w-3 text-slate-400" />{" "}
                  {user.colliery_code ?? "ECL"}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Logged in as{" "}
                  <span className="font-semibold text-slate-900">
                    {user.roleLabel ?? user.role}
                  </span>
                </p>
              </div>
            )}
          </nav>
        </aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-slate-950/50 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <footer className="mt-auto border-t-4 border-slate-900 border-t-blue-600 bg-slate-950 px-4 sm:px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
            <span className="font-bold tracking-wider text-white">COALRR</span>
            <span className="h-3 w-px bg-slate-700"></span>
            <span className="hidden sm:inline text-slate-300">
              Coal Land Acquisition, Rehabilitation &amp; Resettlement
            </span>
            <span className="sm:hidden text-slate-300">
              CLA &amp; R Platform
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400">All Systems Operational</span>
            </div>
            <span className="hidden h-3 w-px bg-slate-700 sm:block"></span>
            <span className="hidden sm:block text-slate-300">v1.0.0-beta</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
