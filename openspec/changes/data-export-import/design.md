## Context

Habit data (from `core-habit-list`, extended by `streak-tracking`) lives in `localStorage` as habits plus a per-habit completion-date history. This change adds a way to move that data in and out of the app as a file. See proposal.md - Why for motivation.

## Goals / Non-Goals

**Goals:**
- A JSON export format that round-trips cleanly back through import, including full completion history (not just today).
- Validation that catches malformed/unexpected files before any existing data is touched.

**Non-Goals:**
- Merging imported data with existing data (replace-only, per proposal).
- Any format other than JSON (no CSV export, no cloud sync).
- Automatic/periodic backups — export/import are user-initiated only.

## Decisions

- **Export format includes a `version` field alongside the habit list.** Even though there's only one shape today, stamping a version number now means future changes to the stored data shape (e.g. if a later feature adds new per-habit fields) can add import-time migration logic keyed off that field instead of guessing the file's shape. Alternative considered: no version field — rejected because it would make any future format change either silently break old exports or require sniffing the JSON shape heuristically.
- **Validate structurally before applying anything.** Parse the JSON, then check it has the expected top-level shape (a `version` and an array of habits, each with a name and an array/set of completion dates) before touching stored state. If validation fails at any point, existing data is left completely untouched — the import is all-or-nothing, never partial.
- **Import triggers a confirmation step in the UI before overwriting**, since it's destructive; this is a UI-level guard in front of the same replace-all storage write used by a (hypothetical) programmatic import.

## Risks / Trade-offs

- [Destructive replace-all import could wipe data the user meant to keep] → Require explicit confirmation naming what will be replaced before the import applies (per spec: "Import requires confirmation").
- [Hand-edited or corrupted JSON files could partially match the expected shape] → Validate the full structure (not just top-level keys) before applying; reject anything that doesn't fully conform rather than trying to salvage partial data.
