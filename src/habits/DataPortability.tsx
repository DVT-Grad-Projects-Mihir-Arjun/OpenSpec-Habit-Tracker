import type { Habit } from './types'
import { downloadHabitsExport } from './dataExportImport'

interface DataPortabilityProps {
  habits: Habit[]
}

export function DataPortability({ habits }: DataPortabilityProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => downloadHabitsExport(habits)}
        className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-h)]"
      >
        Export
      </button>
    </div>
  )
}
