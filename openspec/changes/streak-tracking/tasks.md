## 1. Persist full completion history

- [ ] 1.1 Extend the habit persistence model to store a set of completed calendar dates per habit (not just today's flag).
- [ ] 1.2 When loading existing persisted data, treat a missing or old-shape history as empty rather than failing.
- [ ] 1.3 Update the mark/unmark-done action to add/remove today's date from that habit's completed-dates set.

## 2. Compute current streak

- [ ] 2.1 Implement a pure function that, given a habit's completed-dates set and today's local date, returns the current streak per the grace-period rule (count back from today, or from yesterday if today isn't done yet, stopping at the first gap).
- [ ] 2.2 Cover the function with cases: unbroken streak ending today, grace period (today not done), broken streak (0), and never-completed habit (0).

## 3. Display streak in checklist

- [ ] 3.1 Show each habit's current streak next to its name/completion toggle in the checklist row.
- [ ] 3.2 Recompute and re-render the streak immediately when a habit is marked or unmarked done, without requiring a reload.

## 4. Manual verification

- [ ] 4.1 Mark a habit done on several consecutive simulated days and confirm the streak count increments correctly.
- [ ] 4.2 Skip a day and confirm the streak resets to 0.
- [ ] 4.3 Confirm a habit's streak from yesterday still displays before it's marked done today, and updates once it is.
