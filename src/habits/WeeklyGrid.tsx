import type { Habit } from './types'
import { lastSevenDays, weeklyCompletion } from './weeklyView'

interface WeeklyGridProps {
  habits: Habit[]
  today: string
}

function weekdayLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}

export function WeeklyGrid({ habits, today }: WeeklyGridProps) {
  const window = lastSevenDays(today)

  if (habits.length === 0) {
    return (
      <p className="text-[var(--text)]">
        No habits yet — add one above to get started.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-4">
        <span className="flex-1" />
        <div className="flex gap-1">
          {window.map((date) => (
            <span
              key={date}
              className="w-6 text-center text-xs text-[var(--text)]"
            >
              {weekdayLabel(date)}
            </span>
          ))}
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {habits.map((habit) => {
          const completion = weeklyCompletion(habit.completedDates, window)
          return (
            <li
              key={habit.id}
              className="flex items-center gap-3 rounded-md border border-[var(--border)] px-4 py-3"
            >
              <span className="flex-1 text-[var(--text-h)]">
                {habit.name}
              </span>
              <div className="flex gap-1">
                {completion.map((done, i) => (
                  <span
                    key={window[i]}
                    aria-hidden="true"
                    className={
                      done
                        ? 'h-6 w-6 rounded-sm bg-[var(--accent)]'
                        : 'h-6 w-6 rounded-sm border border-[var(--border)]'
                    }
                  />
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
