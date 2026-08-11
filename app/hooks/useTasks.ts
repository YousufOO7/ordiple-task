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

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: data.title.trim(),
              description: data.description.trim() || undefined,
              status: data.status,
              priority: data.priority,
              dueDate: data.dueDate || undefined,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    toast.success("Task updated successfully");
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted");
  }, []);

  // Filtered + sorted tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesSearch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (filters.sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (filters.sortBy === "createdAt") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
  };
}
