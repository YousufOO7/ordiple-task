"use client";

import { useCallback, useEffect, useState } from "react";
import { Task, TaskFormData, TaskFilters } from "@/app/types/task";
import { getTasks, saveTasks, generateId } from "@/app/lib/taskStorage";
import toast from "react-hot-toast";

const priorityOrder = { high: 0, medium: 1, low: 2 };

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    search: "",
    sortBy: "none",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getTasks();
    setTasks(stored);
    setLoading(false);
  }, []);

  // Persist whenever tasks change
  useEffect(() => {
    if (!loading) {
      saveTasks(tasks);
    }
  }, [tasks, loading]);

  const createTask = useCallback((data: TaskFormData) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim() || undefined,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate || undefined,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Task created successfully");
    return newTask;
  }, []);



  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted");
  }, []);

 

  return {
    tasks,
    allTasks: tasks,
    loading,
    filters,
    setFilters,
    createTask,
    deleteTask,
  };
}
