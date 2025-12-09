"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "../button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "page-fade-in flex flex-col items-center justify-center border-t py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="bg-brand-gray-50 text-muted-foreground mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          {description}
        </p>
      )}
      {action && (
        <Button variant="default_blue" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
