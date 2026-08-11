"use client";

import { Task } from "@/app/types/task";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import { formatDate, isOverdue } from "@/app/lib/utils";
import { Pencil, Trash2, Calendar } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="group bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2">
          {task.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="p-1.5 h-auto"
            aria-label="Edit task"
          >
            <Pencil className="w-4 h-4 text-amber-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task)}
            className="p-1.5 h-auto"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </Button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800">
        <Badge type="status" value={task.status} />
        <Badge type="priority" value={task.priority} />

        {task.dueDate && (
          <div
            className={`flex items-center gap-1.5 text-xs ml-auto ${
              overdue ? "text-red-400" : "text-zinc-500"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {formatDate(task.dueDate)}
              {overdue && " (Overdue)"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
