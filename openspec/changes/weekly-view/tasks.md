## 1. Compute the 7-day window

- [ ] 1.1 Implement a pure function that, given today's local date, returns the 7 calendar dates covering today and the 6 preceding days, oldest first.
- [ ] 1.2 Implement a function that, given a habit's completion history and that 7-day window, returns a completed/not-completed flag per day.

## 2. Grid component

- [ ] 2.1 Build a grid component that renders one row per habit, with 7 day cells per row reflecting completed/not-completed state.
- [ ] 2.2 Ensure cells are visually read-only (no click handler that mutates completion state).
- [ ] 2.3 Render an empty-state consistent with the checklist when there are no habits.

## 3. Wire into app

- [ ] 3.1 Add the weekly grid to the app alongside the existing checklist/streak display.
- [ ] 3.2 Manually verify: mark a habit done today, confirm today's cell reflects it immediately.
- [ ] 3.3 Manually verify (or simulate via the date helper): the window rolls forward by one day and drops the oldest day when the local date advances.
