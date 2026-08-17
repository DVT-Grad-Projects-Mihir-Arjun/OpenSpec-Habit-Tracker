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
