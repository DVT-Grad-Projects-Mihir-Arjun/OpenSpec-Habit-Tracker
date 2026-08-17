import type { Habit } from './types'

interface HabitChecklistProps {
  habits: Habit[]
  isDoneToday: (habit: Habit) => boolean
  onToggle: (habitId: string) => void
}

export function HabitChecklist({
  habits,
  isDoneToday,
  onToggle,
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
                  ? 'text-[var(--text)] line-through'
                  : 'text-[var(--text-h)]'
              }
            >
              {habit.name}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
