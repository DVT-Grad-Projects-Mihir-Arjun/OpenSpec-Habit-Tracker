import { shiftLocalDate } from './date'

export function computeCurrentStreak(
  completedDates: string[],
  today: string,
): number {
  const completed = new Set(completedDates)
  let cursor = completed.has(today) ? today : shiftLocalDate(today, -1)

  if (!completed.has(cursor)) return 0

  let streak = 0
  while (completed.has(cursor)) {
    streak += 1
    cursor = shiftLocalDate(cursor, -1)
  }
  return streak
}
