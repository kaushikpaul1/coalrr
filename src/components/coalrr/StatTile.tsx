"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

export type Accent = "amber" | "emerald" | "rose" | "slate" | "violet" | "teal";

const ACCENT_STYLES: Record<
  Accent,
  { bg: string; text: string; iconBg: string }
> = {
  amber: {
    bg: "bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-950/10 border-amber-200/40 dark:border-amber-900/30",
    text: "text-amber-950 dark:text-amber-50",
    iconBg:
      "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/10 border-emerald-200/40 dark:border-emerald-900/30",
    text: "text-emerald-950 dark:text-emerald-50",
    iconBg:
      "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-emerald-500/30",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-50/80 to-pink-50/50 dark:from-rose-950/40 dark:to-pink-950/10 border-rose-200/40 dark:border-rose-900/30",
    text: "text-rose-950 dark:text-rose-50",
    iconBg:
      "bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-rose-500/30",
  },
  slate: {
    bg: "bg-gradient-to-br from-slate-50/80 to-gray-50/50 dark:from-slate-900/40 dark:to-gray-900/10 border-slate-200/40 dark:border-slate-800/30",
    text: "text-slate-900 dark:text-slate-50",
    iconBg:
      "bg-gradient-to-br from-slate-400 to-gray-500 text-white shadow-slate-500/30",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-50/80 to-purple-50/50 dark:from-violet-950/40 dark:to-purple-950/10 border-violet-200/40 dark:border-violet-900/30",
    text: "text-violet-950 dark:text-violet-50",
    iconBg:
      "bg-gradient-to-br from-violet-400 to-purple-500 text-white shadow-violet-500/30",
  },
  teal: {
    bg: "bg-gradient-to-br from-teal-50/80 to-cyan-50/50 dark:from-teal-950/40 dark:to-cyan-950/10 border-teal-200/40 dark:border-teal-900/30",
    text: "text-teal-950 dark:text-teal-50",
    iconBg:
      "bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-teal-500/30",
  },
};

export interface StatTileProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: Accent;
  trend?: { value: string; direction: "up" | "down" };
  sublabel?: string;
}

export function StatTile({
  label,
  value,
  icon: Icon,
  accent = "slate",
  trend,
  sublabel,
}: StatTileProps) {
  const a = ACCENT_STYLES[accent];
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group",
        a.bg,
      )}
    >
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground/80">
            {label}
          </p>
          <p
            className={cn(
              "mt-1 truncate text-3xl font-extrabold tracking-tight tabular-nums",
              a.text,
            )}
          >
            {value}
          </p>
          {sublabel && (
            <p className="mt-1.5 text-[11px] font-medium text-muted-foreground">
              {sublabel}
            </p>
          )}
          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                trend.direction === "up"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
              )}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.value}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110",
            a.iconBg,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
