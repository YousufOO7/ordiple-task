"use client";

import TaskBoard from "@/app/components/tasks/TaskBoard";
import { LayoutDashboard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Task<span className="text-amber-400">Board</span>
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <TaskBoard />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          Task Board &mdash; Built with Next.js
        </div>
      </footer>
    </div>
  );
}
