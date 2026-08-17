import { shiftLocalDate } from './date'

export function lastSevenDays(today: string): string[] {
  return Array.from({ length: 7 }, (_, i) => shiftLocalDate(today, i - 6))
}

export function weeklyCompletion(
  completedDates: string[],
  window: string[],
): boolean[] {
  const completed = new Set(completedDates)
  return window.map((date) => completed.has(date))
}
