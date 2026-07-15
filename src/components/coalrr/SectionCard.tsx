"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SectionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * SectionCard — titled Card with optional icon, description, and action slot.
 * Used everywhere for consistent module sectioning.
 */
export function SectionCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-border/40 bg-card/80 backdrop-blur-sm shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <CardTitle className="text-base font-bold tracking-tight leading-tight text-foreground">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-xs font-medium text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
