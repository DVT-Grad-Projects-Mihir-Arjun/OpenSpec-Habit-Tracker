## 1. Tailwind setup

- [x] 1.1 Install Tailwind CSS and its Vite plugin, and configure `vite.config.ts` and the base stylesheet accordingly.
- [x] 1.2 Verify Tailwind utility classes apply correctly with a quick smoke check in `App.tsx`.

## 2. Data model & persistence

- [x] 2.1 Define a `Habit` type (id, name) and a way to record per-date completion (e.g. a set/map of completed dates per habit).
- [x] 2.2 Implement a `useHabits` hook (or equivalent) that loads habits and completion data from `localStorage` on mount and writes back on every change.
- [x] 2.3 Implement a helper to compute "today" as a local calendar date string (e.g. `YYYY-MM-DD`) for keying completion state.

## 3. Add habit

- [x] 3.1 Build an add-habit form (text input + submit) in the UI.
- [x] 3.2 Wire submit to create a new habit with a trimmed, non-empty name; ignore empty/whitespace-only submissions.
- [x] 3.3 Clear the input after a successful add.

## 4. Checklist display & completion toggle

- [x] 4.1 Build a checklist component that renders one row per habit with its name and a checkbox/toggle reflecting today's completion.
- [x] 4.2 Wire the checkbox/toggle to mark/unmark the habit as done for today's date.
- [x] 4.3 Render an empty-state message when there are no habits yet.

## 5. Wire up App

- [x] 5.1 Replace the starter `src/App.tsx` content with the add-habit form and checklist.
- [x] 5.2 Manually verify: add a habit, mark it done, reload the page, confirm the habit and its done state persist.
- [x] 5.3 Manually verify (or simulate via the date helper): completion resets when the local date changes while the habit itself remains.
