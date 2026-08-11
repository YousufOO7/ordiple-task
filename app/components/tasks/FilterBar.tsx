"use client";

import { TaskFilters, TaskStatus } from "@/app/types/task";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import { Search } from "lucide-react";

interface FilterBarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 md:p-5">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        {/* Search */}
        <div className="flex-1 w-full relative">
          <div className="absolute left-3 top-[38px] text-zinc-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <Input
            id="search"
            label="Search"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) =>
              onChange({ ...filters, search: e.target.value })
            }
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <Select
            id="status-filter"
            label="Status"
            value={filters.status}
            onChange={(e) =>
              onChange({
                ...filters,
                status: e.target.value as TaskStatus | "all",
              })
            }
            options={[
              { value: "all", label: "All Status" },
              { value: "todo", label: "To Do" },
              { value: "in-progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-48">
          <Select
            id="sort"
            label="Sort By"
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as TaskFilters["sortBy"],
              })
            }
            options={[
              { value: "none", label: "Default" },
              { value: "priority", label: "Priority" },
              { value: "dueDate", label: "Due Date" },
              { value: "createdAt", label: "Newest First" },
            ]}
          />
        </div>
      </div>

      {/* Count */}
      <div className="mt-3 text-xs text-zinc-500">
        Showing {filteredCount} of {totalCount} task
        {totalCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
