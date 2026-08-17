## Why

The habit tracker currently has no functionality — it's a blank React + Vite starter. Users need the most basic loop first: keep a list of habits and check them off for the day. This is the foundation every other habit-tracker feature (streaks, stats, reminders, etc.) will build on.

## What Changes

- Add a form/control to create a new habit by name.
- Store habits in browser `localStorage` so the list survives page reloads (no backend exists yet).
- Display all habits as a checklist.
- Let the user mark a habit as done for the current calendar day (device-local date), and unmark it.
- Persist each habit's "done today" state, keyed by date, so completion resets naturally on a new day.

## Capabilities

### New Capabilities
- `habit-tracking`: Creating habits and tracking daily completion via a checklist.

### Modified Capabilities
- (none — first capability in this project)

## Impact

- Affected code: `src/App.tsx` and new components/hooks for habit state and persistence (all new, no existing app logic to modify).
- New dependency: Tailwind CSS is added and configured as part of this change (per project tech stack), and used to style the add-habit form and checklist.
- No backend/API impact — this feature is entirely client-side.
