## 1. Export

- [x] 1.1 Implement a serializer that reads current habits and their completion history and produces a JSON object with a `version` field plus the habit list.
- [x] 1.2 Add an "Export" control that triggers a JSON file download of the serialized data.
- [x] 1.3 Manually verify: export with no habits produces a valid, well-formed empty-list JSON file.

## 2. Import validation

- [ ] 2.1 Implement a validator that checks a parsed JSON value has the expected top-level shape (version + array of habits, each with a name and completion-date history) before it's applied.
- [ ] 2.2 Handle JSON parse failures and validation failures by reporting an error and leaving existing stored data untouched.

## 3. Import flow

- [ ] 3.1 Add an "Import" control that lets the user pick a JSON file via the browser's file picker.
- [ ] 3.2 On selecting a file that passes validation, show a confirmation step describing that existing habits/history will be replaced.
- [ ] 3.3 On confirmation, replace stored habits and completion history with the imported data and refresh the checklist/streak/weekly-grid views.

## 4. Manual verification

- [ ] 4.1 Export data, clear it (or use a fresh profile), import the file back, and confirm habits, completion history, and streaks match the original.
- [ ] 4.2 Attempt to import a non-JSON file and a JSON file with the wrong shape; confirm both are rejected with an error and existing data is unchanged.
