## 1. Theme foundation

- [x] 1.1 Define light and dark CSS variable sets (colors for background, text, borders, etc.) keyed off a `data-theme` attribute on the root element.
- [x] 1.2 Convert existing hard-coded colors in `App.css`/`index.css` to reference the new CSS variables. (`App.css` no longer exists; all colors in `index.css` and components already referenced variables)
- [x] 1.3 Implement a theme-state module: resolve initial theme from stored preference, falling back to `prefers-color-scheme`, and expose a way to set/read the current theme.
- [x] 1.4 Apply the resolved theme attribute as early as possible during startup to avoid a flash of the wrong theme.

## 2. Manual toggle & persistence

- [x] 2.1 Add a toggle control to the UI shell that switches the theme.
- [x] 2.2 Wire the toggle to update the `data-theme` attribute immediately and persist the explicit choice to `localStorage`.
- [x] 2.3 Once a manual choice is stored, stop reacting to OS `prefers-color-scheme` changes; before any manual choice, keep following OS changes live. (implemented in `useTheme`'s `hasManualChoice`-gated effect)

## 3. Verification across existing views

- [x] 3.1 Manually verify the checklist, streak display, and weekly grid all render correctly in both light and dark theme. (found and fixed a `color-scheme` bug causing native checkbox styling to mismatch the applied theme)
- [x] 3.2 Manually verify: fresh browser profile with OS set to dark shows dark theme by default; toggling to light and reloading keeps light regardless of OS setting. (verified with the real system preference, which was dark)
