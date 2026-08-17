## Context

The app currently has no theming system — `src/App.css` / `src/index.css` use fixed colors. This change introduces the first cross-cutting styling mechanism, applied uniformly across the checklist, streak display, and weekly grid from prior changes. See proposal.md - Why for motivation.

## Goals / Non-Goals

**Goals:**
- One theming mechanism that every existing and future view picks up automatically, without per-component theme logic.
- Correct precedence: stored manual choice > OS preference > light default.

**Non-Goals:**
- Per-habit or per-view theme overrides — theme is global for the whole app.
- More than two themes (light/dark) — no custom color picker or additional theme variants.

## Decisions

- **CSS custom properties (variables) driven by a `data-theme` attribute on the root element, toggled by a small theme-state module.** Colors are defined once as CSS variables for each theme; components reference the variables instead of hard-coded colors. Alternative considered: a CSS-in-JS theme provider — rejected as an unnecessary new dependency for a two-theme, purely visual feature.
- **Theme state resolution order**: read stored preference from `localStorage` first; if absent, read `window.matchMedia('(prefers-color-scheme: dark)')`; the toggle writes an explicit choice to `localStorage`, which from then on wins over the OS setting. This directly implements the precedence in the spec's three requirements.
- **Live OS-preference updates only apply when no manual choice is stored.** Listening to `prefers-color-scheme` changes only matters pre-toggle; once the user has picked a theme, OS changes are ignored (per the "Persist manual theme choice" requirement).

## Risks / Trade-offs

- [Existing hard-coded colors in `App.css`/`index.css` may not all be converted to variables, leaving some elements themed inconsistently] → Sweep all current styles as part of implementation and verify visually in both themes before considering this change done.
- [Flash of wrong theme on load if the stored/OS preference is read after first paint] → Resolve and apply the theme attribute as early as possible during app startup, before the main content renders.
