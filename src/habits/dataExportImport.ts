import type { Habit } from './types'

export const EXPORT_VERSION = 1

export interface ExportedData {
  version: number
  habits: Habit[]
}

export function serializeHabits(habits: Habit[]): ExportedData {
  return { version: EXPORT_VERSION, habits }
}

export function downloadHabitsExport(habits: Habit[]): void {
  const json = JSON.stringify(serializeHabits(habits), null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'habits-export.json'
  link.click()
  URL.revokeObjectURL(url)
}

function isHabit(value: unknown): value is Habit {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    Array.isArray(record.completedDates) &&
    record.completedDates.every((d) => typeof d === 'string')
  )
}

export function validateImportedData(value: unknown): ExportedData | null {
  if (typeof value !== 'object' || value === null) return null
  const record = value as Record<string, unknown>
  if (typeof record.version !== 'number') return null
  if (!Array.isArray(record.habits)) return null
  if (!record.habits.every(isHabit)) return null
  return { version: record.version, habits: record.habits as Habit[] }
}

export function parseImportFile(text: string): ExportedData | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  return validateImportedData(parsed)
}
