import { FlameIcon } from '../icons'
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
      <p className="rounded-xl border border-dashed border-[var(--border)] px-4 py-6 text-center text-sm text-[var(--text)]">
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
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-sm)] transition-colors"
          >
            <input
              type="checkbox"
              checked={done}
              onChange={() => onToggle(habit.id)}
              aria-label={`Mark "${habit.name}" as done for today`}
              className="peer relative h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[var(--border-strong)] bg-transparent transition-colors checked:border-[var(--accent)] checked:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[13px] after:leading-none after:text-white after:opacity-0 after:content-['✓'] checked:after:opacity-100"
            />
            <span
              className={
                done
                  ? 'min-w-0 flex-1 truncate text-[15px] text-[var(--text)] line-through'
                  : 'min-w-0 flex-1 truncate text-[15px] font-medium text-[var(--text-h)]'
              }
            >
              {habit.name}
            </span>
            <span
              className={
                streak > 0
                  ? 'flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent-bg)] px-2 py-1 text-xs font-medium text-[var(--accent)]'
                  : 'flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-[var(--text)]'
              }
            >
              <FlameIcon className="h-3.5 w-3.5" />
              {streak}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
