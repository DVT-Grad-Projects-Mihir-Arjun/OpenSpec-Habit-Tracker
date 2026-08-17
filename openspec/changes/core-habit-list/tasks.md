## 1. Data model & persistence

- [ ] 1.1 Define a `Habit` type (id, name) and a way to record per-date completion (e.g. a set/map of completed dates per habit).
- [ ] 1.2 Implement a `useHabits` hook (or equivalent) that loads habits and completion data from `localStorage` on mount and writes back on every change.
- [ ] 1.3 Implement a helper to compute "today" as a local calendar date string (e.g. `YYYY-MM-DD`) for keying completion state.

## 2. Add habit

- [ ] 2.1 Build an add-habit form (text input + submit) in the UI.
- [ ] 2.2 Wire submit to create a new habit with a trimmed, non-empty name; ignore empty/whitespace-only submissions.
- [ ] 2.3 Clear the input after a successful add.

## 3. Checklist display & completion toggle

- [ ] 3.1 Build a checklist component that renders one row per habit with its name and a checkbox/toggle reflecting today's completion.
- [ ] 3.2 Wire the checkbox/toggle to mark/unmark the habit as done for today's date.
- [ ] 3.3 Render an empty-state message when there are no habits yet.

## 4. Wire up App

- [ ] 4.1 Replace the starter `src/App.tsx` content with the add-habit form and checklist.
- [ ] 4.2 Manually verify: add a habit, mark it done, reload the page, confirm the habit and its done state persist.
- [ ] 4.3 Manually verify (or simulate via the date helper): completion resets when the local date changes while the habit itself remains.
