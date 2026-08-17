# streak-tracking Specification

## Purpose

Computes and displays how many consecutive days in a row a habit has been completed, so users can see and stay motivated by their progress.

## Requirements

### Requirement: Compute current streak
The system SHALL compute a habit's current streak as the number of consecutive calendar days, counting backward from today, on which the habit was marked done. If today has not yet been marked done, the count SHALL instead count backward from yesterday, so the streak is not broken until a full day passes without completion.

#### Scenario: Streak counts an unbroken run ending today
- **WHEN** a habit was marked done today and on each of the 3 preceding consecutive days
- **THEN** the current streak for that habit is 4

#### Scenario: Streak holds during today's grace period
- **WHEN** a habit was marked done on each of the last 3 consecutive days but has not yet been marked done today
- **THEN** the current streak for that habit is 3

#### Scenario: Streak resets after a missed day
- **WHEN** a habit was marked done 2 days ago but not marked done yesterday or today
- **THEN** the current streak for that habit is 0

#### Scenario: No completions yet
- **WHEN** a habit has never been marked done
- **THEN** the current streak for that habit is 0

### Requirement: Display current streak
The system SHALL display each habit's current streak alongside it in the checklist, and SHALL update the displayed streak immediately whenever the habit's done-for-today state changes.

#### Scenario: Streak shown per habit
- **WHEN** the checklist is displayed
- **THEN** each habit row shows its current streak next to its name and completion state

#### Scenario: Streak updates on toggle
- **WHEN** the user marks or unmarks a habit as done for today
- **THEN** the displayed current streak for that habit updates to reflect the change without requiring a page reload
