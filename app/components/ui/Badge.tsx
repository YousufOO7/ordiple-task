"use client";

import { cn } from "@/app/lib/utils";
import { TaskStatus, TaskPriority } from "@/app/types/task";

interface BadgeProps {
  type: "status" | "priority";
  value: TaskStatus | TaskPriority;
  className?: string;
}

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-zinc-700/60 text-zinc-300 border-zinc-600",
  "in-progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  done: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-zinc-700/60 text-zinc-400 border-zinc-600",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  high: "bg-red-500/15 text-red-400 border-red-500/30",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function Badge({ type, value, className }: BadgeProps) {
  if (type === "status") {
    const status = value as TaskStatus;
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide",
          statusStyles[status],
          className
        )}
      >
        {statusLabels[status]}
      </span>
    );
  }

  const priority = value as TaskPriority;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide",
        priorityStyles[priority],
        className
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
}
