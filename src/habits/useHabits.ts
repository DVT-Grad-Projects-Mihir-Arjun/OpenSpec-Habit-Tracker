import { useEffect, useState } from 'react'
import type { Habit } from './types'

const STORAGE_KEY = 'habit-tracker:habits'

function normalizeHabit(value: unknown): Habit | null {
  if (typeof value !== 'object' || value === null) return null
  const record = value as Record<string, unknown>
  if (typeof record.id !== 'string' || typeof record.name !== 'string') {
    return null
  }
  const completedDates = Array.isArray(record.completedDates)
    ? record.completedDates.filter((d): d is string => typeof d === 'string')
    : []
  return { id: record.id, name: record.name, completedDates }
}

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map(normalizeHabit)
      .filter((habit): habit is Habit => habit !== null)
  } catch {
    return []
  }
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, completedDates: [] },
    ])
  }

  function toggleHabitDoneOnDate(habitId: string, date: string) {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit
        const isDone = habit.completedDates.includes(date)
        return {
          ...habit,
          completedDates: isDone
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        }
      }),
    )
  }

  function replaceAllHabits(nextHabits: Habit[]) {
    setHabits(nextHabits)
  }

  return { habits, addHabit, toggleHabitDoneOnDate, replaceAllHabits }
}
