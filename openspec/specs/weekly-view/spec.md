# weekly-view Specification

## Purpose

Shows each habit's completion status across the last 7 days as a grid, giving users an at-a-glance view of recent consistency beyond a single day or streak count.

## Requirements

### Requirement: Display rolling 7-day grid
The system SHALL display, for each habit, a grid of the last 7 calendar days — today and the 6 preceding days — indicating for each day whether the habit was completed. The window SHALL roll forward by one day as the current local date advances, rather than resetting to a fixed calendar week.

#### Scenario: Grid shows today and prior 6 days
- **WHEN** the weekly view is displayed
- **THEN** each habit's row shows exactly 7 day cells covering today and the 6 days before it, each marked as completed or not based on stored completion history

#### Scenario: Grid rolls forward on a new day
- **WHEN** the user views the grid on a later calendar day than their previous visit
- **THEN** the grid's 7-day window shifts so it again ends on the current day, dropping the oldest day and adding the new day

#### Scenario: Habit with no history in the window
- **WHEN** a habit has no completions within the last 7 days
- **THEN** all 7 of its day cells are shown as not completed

### Requirement: Grid is read-only
The system SHALL NOT allow the user to change a habit's completion state for any day by interacting with the grid. Completion can only be changed via the existing today-only mark/unmark action defined by `habit-tracking`.

#### Scenario: Interacting with a past-day cell has no effect
- **WHEN** the user clicks or taps a grid cell representing a day other than today
- **THEN** the habit's completion state for that day does not change
