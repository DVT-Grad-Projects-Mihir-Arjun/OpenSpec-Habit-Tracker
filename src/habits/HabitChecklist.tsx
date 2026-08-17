import type { Habit } from './types'

interface HabitChecklistProps {
  habits: Habit[]
  isDoneToday: (habit: Habit) => boolean
  onToggle: (habitId: string) => void
  streakFor: (habit: Habit) => number
}

export function HabitChecklist({
  habits,
  isDoneToday,
  onToggle,
  streakFor,
}: HabitChecklistProps) {
  if (habits.length === 0) {
    return (
      <p className="text-[var(--text)]">
        No habits yet — add one above to get started.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => {
        const done = isDoneToday(habit)
        const streak = streakFor(habit)
        return (
          <li
            key={habit.id}
            className="flex items-center gap-3 rounded-md border border-[var(--border)] px-4 py-3"
          >
            <input
              type="checkbox"
              checked={done}
              onChange={() => onToggle(habit.id)}
              className="h-5 w-5 accent-[var(--accent)]"
            />
            <span
              className={
                done
                  ? 'flex-1 text-[var(--text)] line-through'
                  : 'flex-1 text-[var(--text-h)]'
              }
            >
              {habit.name}
            </span>
            <span className="text-sm text-[var(--text)]">
              🔥 {streak}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
