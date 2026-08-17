## Why

Users increasingly expect apps to support dark mode, both for comfort in low light and to match their system preference. This is a standalone, cross-cutting UI concern that applies uniformly across the existing checklist, streak, and weekly-grid views.

## What Changes

- Add a light/dark theme applied across the whole app (checklist, streak display, and weekly grid).
- On first visit, default the theme to the user's OS/browser color-scheme preference (`prefers-color-scheme`).
- Add a manual toggle control that lets the user override the theme.
- Persist the user's manual choice (if any) in `localStorage` so it's remembered on future visits, taking precedence over the OS preference from then on.

## Capabilities

### New Capabilities
- `theming`: Light/dark theme selection, OS-preference default, manual override, and persistence.

### Modified Capabilities
- (none — this is a purely visual/presentational layer over existing capabilities; it doesn't change their behavior or data)

## Impact

- Affected code: global styles/CSS variables and a small theme-state module used across all existing views; adds a toggle control to the UI shell.
- No new runtime dependency — uses the CSS `prefers-color-scheme` media feature and `localStorage`.
- No backend impact — entirely client-side.
