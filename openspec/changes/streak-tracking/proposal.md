## Why

Once a user can check habits off day by day, the natural next motivator is seeing how many days in a row they've kept it up. Streak tracking turns the checklist into a habit-building tool by surfacing consecutive-day progress.

## What Changes

- Compute each habit's current streak: the number of consecutive calendar days completed, counting backward from today.
- If today isn't marked done yet, the streak still counts through yesterday (a grace period) rather than showing 0 — it only breaks once a day passes without being completed.
- Display the current streak alongside each habit in the checklist.
- Recompute the streak immediately whenever a habit is marked or unmarked done.
- Requires retaining each habit's full day-by-day completion history (not just today's state), so streaks can be computed across multiple past days.

## Capabilities

### New Capabilities
- `streak-tracking`: Computing and displaying each habit's current consecutive-day streak.

### Modified Capabilities
- `habit-tracking`: The "Persist habits and daily completion" requirement is extended to commit to retaining the full history of completed dates per habit (not just today's state), since streak calculation needs to look back across multiple days.

## Impact

- Affected code: the habit checklist UI (add streak display per row) and the persistence layer introduced by `core-habit-list` (extend stored data to keep full completion history instead of only today's flag).
- Sequencing: this change builds on the `core-habit-list` change and its `habit-tracking` capability; `core-habit-list` should be implemented/archived first so `openspec/specs/habit-tracking/spec.md` exists for this change's delta to apply against.
- New dependency: Vitest is added as a dev dependency to unit test the streak computation function (unbroken streak, grace period, broken streak, never-completed cases). No runtime/production dependency is added.
