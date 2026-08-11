"use client";

import Button from "@/app/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmProps {
  isOpen: boolean;
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirm({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            Delete Task?
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            Are you sure you want to delete{" "}
            <span className="text-amber-300 font-medium">
              &ldquo;{taskTitle}&rdquo;
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
