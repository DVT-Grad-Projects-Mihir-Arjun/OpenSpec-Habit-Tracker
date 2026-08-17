## Context

`core-habit-list` stores habits and completion state in `localStorage` (see that change's tasks.md, section 1). Its data model keeps at least "done today" per habit; this change requires the full set of completed dates per habit to be retained so a streak can be computed by walking backward day by day. See proposal.md - Why / What Changes for motivation.

## Goals / Non-Goals

**Goals:**
- Extend the existing persisted habit data to retain every completed date per habit, not just today's.
- Derive current streak purely from that stored history (no separate "streak" field to keep in sync).

**Non-Goals:**
- Longest/best streak, streak history charts, or multi-habit streak comparisons — only "current streak" per habit.
- Server-side or cross-device sync of streak/history data.

## Decisions

- **Store a set of completed date strings per habit, derive streak on read.** Rather than persisting a numeric streak value that must be kept in sync on every mark/unmark, compute it on demand from the completed-dates set. This avoids a whole class of bugs where the stored streak and the completion history drift apart, at the cost of a small backward-walk computation (bounded by the length of the streak, not the full history) each time it's displayed.
- **Streak computation starts from today, falls back to yesterday if today is incomplete.** Matches the grace-period behavior decided for this change (see spec: "Compute current streak").

## Risks / Trade-offs

- [Existing `core-habit-list` installs may have only stored "done today", discarding history on date change] → When loading persisted data, treat any missing/incompatible history field as an empty history rather than erroring; the user simply starts streak tracking from zero going forward instead of losing use of the app.
- [Clock/timezone drift between reloads] → Reuse the same local-date helper introduced in `core-habit-list` for all "today"/"yesterday" comparisons so the two features can't disagree on what day it is.
