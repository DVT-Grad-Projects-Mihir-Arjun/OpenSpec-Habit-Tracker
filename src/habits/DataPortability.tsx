import { useRef, useState } from 'react'
import type { Habit } from './types'
import {
  downloadHabitsExport,
  parseImportFile,
  type ExportedData,
} from './dataExportImport'

interface DataPortabilityProps {
  habits: Habit[]
  onImport: (habits: Habit[]) => void
}

export function DataPortability({ habits, onImport }: DataPortabilityProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingImport, setPendingImport] = useState<ExportedData | null>(
    null,
  )
  const [importError, setImportError] = useState<string | null>(null)

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const text = await file.text()
    const parsed = parseImportFile(text)
    if (parsed === null) {
      setImportError(
        'That file could not be imported: it is not valid, exported habit data.',
      )
      setPendingImport(null)
      return
    }
    setImportError(null)
    setPendingImport(parsed)
  }

  function confirmImport() {
    if (!pendingImport) return
    onImport(pendingImport.habits)
    setPendingImport(null)
  }

  function cancelImport() {
    setPendingImport(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => downloadHabitsExport(habits)}
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-h)]"
        >
          Export
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-h)]"
        >
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileSelected}
          className="hidden"
        />
      </div>

      {importError && (
        <p className="text-sm text-[var(--text)]" role="alert">
          {importError}
        </p>
      )}

      {pendingImport && (
        <div className="flex flex-col gap-2 rounded-md border border-[var(--border)] p-3">
          <p className="text-sm text-[var(--text-h)]">
            Importing will replace your current {habits.length} habit
            {habits.length === 1 ? '' : 's'} with {pendingImport.habits.length}{' '}
            imported habit
            {pendingImport.habits.length === 1 ? '' : 's'}. This cannot be
            undone.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirmImport}
              className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white"
            >
              Replace habits
            </button>
            <button
              type="button"
              onClick={cancelImport}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-h)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
