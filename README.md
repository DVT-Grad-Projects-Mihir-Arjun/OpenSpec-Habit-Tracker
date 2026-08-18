# OpenSpec Habit Tracker

A small habit-tracking web app, built as a hands-on test of the [OpenSpec](https://github.com/Fission-AI/OpenSpec) spec-driven workflow: every feature here started as an `openspec` proposal (why/what, specs, design, tasks) before any code was written, and the specs in `openspec/specs/` are the living source of truth for what the app does.

## What's in this repo

- **App**: a client-side habit tracker — create habits, check them off daily, see streaks and a 7-day history, in light or dark theme, with JSON backup/restore.
- **`openspec/specs/`**: the current behavior contract for each capability (`habit-tracking`, `streak-tracking`, `weekly-view`, `theming`, `data-portability`).
- **`openspec/changes/archive/`**: the archived proposals that built each capability, including the "why" behind each decision.

## Features

- **Habit checklist** — add a habit by name, mark it done for today, and unmark it. Habits and completion history persist across reloads.
- **Streaks** — each habit shows its current consecutive-day streak. If you haven't checked off today yet, the streak still counts through yesterday (a grace period) rather than dropping to 0 — it only breaks once a full day passes without completion.
- **Weekly view** — a rolling 7-day grid per habit (today plus the 6 preceding days) showing which days it was completed. Read-only; the only way to change completion is the checklist's today toggle.
- **Dark mode** — defaults to your OS/browser color-scheme preference; the toggle button lets you override it, and your choice is remembered on future visits.
- **Export / Import** — download all your habits and their full completion history as a JSON file, and re-import it later (e.g. after clearing browser storage or on a new device). Importing replaces existing data and requires confirmation first.

## Running it

```bash
npm install
npm run dev       # start the dev server
npm run build     # typecheck + production build
npm run test      # run the unit tests (streak calculation)
npm run lint      # lint the codebase
```

All data lives in the browser's `localStorage` — there's no backend or account system.

## Tech stack

React 19 + TypeScript + Vite, styled with Tailwind CSS. Client-only, no server or database.
