import { useEffect, useState } from 'react'
import type { Habit } from './types'

const STORAGE_KEY = 'habit-tracker:habits'

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
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

  return { habits, addHabit, toggleHabitDoneOnDate }
}
