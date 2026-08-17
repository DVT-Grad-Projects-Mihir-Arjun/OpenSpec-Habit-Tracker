## Purpose

Lets a user maintain a list of habits and track, day by day, whether each one was completed, so they can build a checklist habit-tracking routine.

## ADDED Requirements

### Requirement: Create a habit
The system SHALL allow the user to add a new habit by entering a non-empty name.

#### Scenario: Add a habit with a valid name
- **WHEN** the user submits the add-habit form with a non-empty name
- **THEN** the system creates a new habit with that name and it appears in the checklist

#### Scenario: Reject an empty habit name
- **WHEN** the user submits the add-habit form with an empty or whitespace-only name
- **THEN** the system does not create a habit and shows no new checklist entry

### Requirement: View habit checklist
The system SHALL display all created habits as a checklist, each showing its name and whether it is done for the current day.

#### Scenario: Checklist reflects created habits
- **WHEN** the user has created one or more habits
- **THEN** the checklist displays one entry per habit, showing its name and today's completion state

#### Scenario: Empty state
- **WHEN** the user has not created any habits
- **THEN** the system displays an empty checklist with no habit entries

### Requirement: Mark habit done for today
The system SHALL allow the user to mark a habit as done for the current calendar day, and to unmark it.

#### Scenario: Mark a habit done
- **WHEN** the user marks an incomplete habit as done
- **THEN** the checklist shows that habit as done for today

#### Scenario: Unmark a habit
- **WHEN** the user unmarks a habit that is currently done for today
- **THEN** the checklist shows that habit as not done for today

### Requirement: Persist habits and daily completion
The system SHALL persist created habits and each habit's completion state across page reloads, using the device's current local date to determine "today".

#### Scenario: Habits survive a reload
- **WHEN** the user reloads the page after creating habits and marking some done today
- **THEN** the checklist shows the same habits with the same today-completion state as before the reload

#### Scenario: Completion resets on a new day
- **WHEN** the user opens the checklist on a calendar day after marking a habit done on a previous day
- **THEN** that habit is shown as not done for the new day, while remaining in the habit list
