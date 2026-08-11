# Task Board

A clean, modern task management web app built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

Inspired by the same code standards and component structure used in the Surah project.

---

## Features

### Core
- **Task List** — View all tasks in a responsive card grid (Title, Status, Priority, Due Date)
- **Create Task** — Modal form with validation (Title required, min 3 characters)
- **Edit Task** — Update any existing task
- **Delete Task** — Confirmation dialog before deleting
- **Filter & Search**
  - Filter by Status (To Do / In Progress / Done / All)
  - Search by title (case-insensitive)
- **Persistence** — Data saved in `localStorage` (survives page refresh)

### Bonus
- Sort by Priority / Due Date / Newest
- Loading state
- Empty state ("No tasks yet")
- Overdue indicator on due dates
- Responsive design (mobile-friendly)
- Toast notifications
- Dark theme (zinc + amber)

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **React Hot Toast**
- **localStorage** for persistence

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open https://ordiple-task.vercel.app/

---

## Project Structure

```
app/
├── components/
│   ├── tasks/
│   │   ├── TaskBoard.tsx      # Main container
│   │   ├── TaskCard.tsx       # Single task card
│   │   ├── TaskForm.tsx       # Create / Edit modal
│   │   ├── DeleteConfirm.tsx  # Delete confirmation
│   │   └── FilterBar.tsx      # Search + Filter + Sort
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Select.tsx
│       └── Badge.tsx
├── hooks/
│   └── useTasks.ts            # Custom hook (CRUD + filter + persist)
├── lib/
│   ├── taskStorage.ts         # localStorage helpers
│   └── utils.ts               # cn, formatDate, isOverdue
├── types/
│   └── task.ts                # Task, TaskFormData, TaskFilters
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Task Fields

| Field       | Type                          | Required |
|-------------|-------------------------------|----------|
| Title       | string (min 3 chars)          | Yes      |
| Description | string                        | No       |
| Status      | To Do / In Progress / Done    | Yes      |
| Priority    | Low / Medium / High           | Yes      |
| Due Date    | date                          | No       |

---

## Notes

- All data is stored in the browser's `localStorage` under the key `task-board-tasks`.
- No backend or database is required.
- Code style matches the Surah project (dark theme, rounded-2xl cards, amber accents, TypeScript, clean component separation).
