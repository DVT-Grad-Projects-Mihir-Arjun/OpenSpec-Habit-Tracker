## Why

All habit data lives only in one browser's `localStorage`. Users need a way to back it up, move it to another browser/device, or restore it after clearing site data — otherwise a cleared cache means total data loss.

## What Changes

- Add an "Export" action that downloads the user's current habit data (habits and their full completion history) as a JSON file.
- Add an "Import" action that lets the user pick a JSON file and load its contents into the app.
- **BREAKING (data-loss risk)**: Import replaces all existing habits and completion history with the imported data. The UI SHALL require the user to confirm before an import proceeds, since it is destructive to whatever is currently stored.
- Validate imported JSON has the expected shape before applying it; reject and report invalid/malformed files without altering existing data.

## Capabilities

### New Capabilities
- `data-portability`: Exporting current habit data to a JSON file and importing a JSON file to replace it.

### Modified Capabilities
- (none — this reads and overwrites the same stored data `core-habit-list`/`streak-tracking` already define; it doesn't change how habits are created, completed, or displayed)

## Impact

- Affected code: new export/import UI controls; a serializer/deserializer for the existing `localStorage` data shape (habits + completion history).
- Data risk: import overwrites existing data — mitigated by a confirmation step before applying.
- No new backend/API — file download/upload happens entirely client-side via the browser's file APIs.
