# theming Specification

## Purpose

Lets the app present a light or dark visual theme across all views, defaulting to the user's system preference while allowing a persisted manual override.

## Requirements

### Requirement: Default theme follows OS preference
On first visit (no stored theme preference), the system SHALL apply the light or dark theme matching the user's OS/browser `prefers-color-scheme` setting.

#### Scenario: First visit with OS set to dark
- **WHEN** a user with no stored theme preference opens the app and their OS/browser color-scheme preference is dark
- **THEN** the app renders in dark theme

#### Scenario: First visit with OS set to light
- **WHEN** a user with no stored theme preference opens the app and their OS/browser color-scheme preference is light
- **THEN** the app renders in light theme

### Requirement: Manual theme toggle
The system SHALL provide a control that lets the user switch between light and dark theme, overriding the OS-preference default.

#### Scenario: Toggle switches theme immediately
- **WHEN** the user activates the theme toggle
- **THEN** the app immediately re-renders in the other theme (light to dark, or dark to light)

### Requirement: Persist manual theme choice
The system SHALL persist a user's manually chosen theme across page reloads, and SHALL apply that stored choice instead of the OS preference on subsequent visits.

#### Scenario: Manual choice survives reload
- **WHEN** the user selects a theme via the toggle and reloads the page
- **THEN** the app renders in the previously selected theme, regardless of the current OS/browser color-scheme preference

#### Scenario: No manual choice yet made
- **WHEN** the user has never used the toggle
- **THEN** the app continues to follow the OS/browser color-scheme preference, including if that preference changes
