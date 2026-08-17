## Why

A single "done today" checkbox doesn't show a user their recent consistency at a glance. A 7-day grid gives an at-a-glance view of which days each habit was actually completed, complementing the streak count with visual history.

## What Changes

- Add a 7-day grid view showing, for each habit, whether it was completed on each of the last 7 calendar days (today and the 6 preceding days), updating by one day as time passes (a rolling window, not a fixed calendar week).
- The grid is read-only: it displays completion history but does not let the user toggle past days from it. Editing completion remains limited to marking/unmarking *today*, as defined by `habit-tracking`.
- Grid cells read from the same per-habit completion history that `streak-tracking` already commits to retaining.

## Capabilities

### New Capabilities
- `weekly-view`: Displaying a rolling 7-day completion grid per habit.

### Modified Capabilities
- (none — this reads existing completion history without changing how it's created or stored)

## Impact

- Affected code: a new grid component alongside the existing checklist in the UI; reads the same stored per-habit completion history introduced by `core-habit-list` and extended by `streak-tracking`.
- Sequencing: depends on `streak-tracking` (or at least its `habit-tracking` history-retention delta) being implemented first, since the grid needs more than "today only" data to render.
- No new dependency — plain client-side rendering from existing stored data.
