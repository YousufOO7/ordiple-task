"use client";

import { useEffect, useState } from "react";
import { Task, TaskFormData } from "@/app/types/task";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";
import { X } from "lucide-react";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task | null;
  mode: "create" | "edit";
}

const initialForm: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setForm({
          title: initialData.title,
          description: initialData.description || "",
          status: initialData.status,
          priority: initialData.priority,
          dueDate: initialData.dueDate || "",
        });
      } else {
        setForm(initialForm);
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const next: Partial<Record<keyof TaskFormData, string>> = {};
    if (!form.title.trim()) {
      next.title = "Title is required";
    } else if (form.title.trim().length < 3) {
      next.title = "Title must be at least 3 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    onClose();
  };

  const handleChange = (
    field: keyof TaskFormData,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-amber-300">
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <Input
            id="title"
            label="Title"
            required
            placeholder="Enter task title..."
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
          />

          <Textarea
            id="description"
            label="Description"
            placeholder="Optional description..."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="status"
              label="Status"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={[
                { value: "todo", label: "To Do" },
                { value: "in-progress", label: "In Progress" },
                { value: "done", label: "Done" },
              ]}
            />

            <Select
              id="priority"
              label="Priority"
              value={form.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>

          <Input
            id="dueDate"
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {mode === "create" ? "Create Task" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
