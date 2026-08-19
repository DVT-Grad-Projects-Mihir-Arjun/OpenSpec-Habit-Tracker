import { useRef, useState } from 'react'
import { DownloadIcon, UploadIcon } from '../icons'
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
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => downloadHabitsExport(habits)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-h)]"
        >
          <DownloadIcon className="h-4 w-4" />
          Export
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-h)]"
        >
          <UploadIcon className="h-4 w-4" />
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
        <p
          className="rounded-lg border border-[var(--warning-border)] bg-[var(--warning-bg)] px-3 py-2 text-sm text-[var(--warning-text)]"
          role="alert"
        >
          {importError}
        </p>
      )}

      {pendingImport && (
        <div className="flex flex-col gap-3 rounded-xl border border-[var(--warning-border)] bg-[var(--warning-bg)] p-3.5">
          <p className="text-sm text-[var(--warning-text)]">
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
              className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              Replace habits
            </button>
            <button
              type="button"
              onClick={cancelImport}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text-h)] transition-colors hover:border-[var(--border-strong)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
