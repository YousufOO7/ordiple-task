"use client";

import { useState } from "react";
import { useTasks } from "@/app/hooks/useTasks";
import { Task, TaskFormData } from "@/app/types/task";
import Button from "@/app/components/ui/Button";
import { Plus, ClipboardList, Loader2 } from "lucide-react";

export default function TaskBoard() {
  const {
    tasks,
    allTasks,
    loading,
  } = useTasks();

  const [ , setFormOpen] = useState(false);
  const [ , setFormMode] = useState<"create" | "edit">("create");
  const [ , setEditingTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setFormMode("create");
    setEditingTask(null);
    setFormOpen(true);
  };

 
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
        <p className="text-amber-300/80 tracking-wide">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Task Board
          </h1>
          <p className="text-zinc-400 mt-1">
            Manage your tasks efficiently
          </p>
        </div>
        <Button onClick={handleCreate} size="lg" className="shrink-0">
          <Plus className="w-5 h-5" />
          New Task
        </Button>
      </div>


      {/* Task Grid */}
      {tasks.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 flex items-center justify-center mb-4">
            <ClipboardList className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            {allTasks.length === 0
              ? "No tasks yet"
              : "No matching tasks"}
          </h3>
          <p className="text-zinc-500 max-w-sm mb-6">
            {allTasks.length === 0
              ? "Create your first task to get started with your board."
              : "Try adjusting your filters or search query."}
          </p>
          {allTasks.length === 0 && (
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4" />
              Create First Task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
        </div>
      )}

    </div>
  );
}
