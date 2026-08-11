"use client";

import Button from "@/app/components/ui/Button";
import { useTasks } from "@/app/hooks/useTasks";
import { Plus, ClipboardList, Loader2 } from "lucide-react";

export default function TaskBoard() {
  const {
    loading,
  } = useTasks();



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
        <Button  size="lg" className="shrink-0">
          <Plus className="w-5 h-5" />
          New Task
        </Button>
      </div>


      {/* Task Grid */}
     <Button >
              <Plus className="w-4 h-4" />
              Create First Task
            </Button>
    </div>
  );
}
