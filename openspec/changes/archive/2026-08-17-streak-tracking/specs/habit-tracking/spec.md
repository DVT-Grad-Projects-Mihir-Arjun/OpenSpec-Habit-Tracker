## MODIFIED Requirements

### Requirement: Persist habits and daily completion
The system SHALL persist created habits and, for each habit, the full history of calendar dates on which it was marked done, across page reloads, using the device's current local date to determine "today".

#### Scenario: Habits survive a reload
- **WHEN** the user reloads the page after creating habits and marking some done today
- **THEN** the checklist shows the same habits with the same today-completion state as before the reload

#### Scenario: Completion resets on a new day
- **WHEN** the user opens the checklist on a calendar day after marking a habit done on a previous day
- **THEN** that habit is shown as not done for the new day, while remaining in the habit list

#### Scenario: Completion history retained across multiple days
- **WHEN** a habit has been marked done on several different calendar days over time
- **THEN** the system retains a record of every one of those completed dates, not only the most recent one
