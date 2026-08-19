import type { Habit } from './types'
import { lastSevenDays, weeklyCompletion } from './weeklyView'

interface WeeklyGridProps {
  habits: Habit[]
  today: string
}

function weekdayLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2)
}

export function WeeklyGrid({ habits, today }: WeeklyGridProps) {
  const window = lastSevenDays(today)

  if (habits.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-(--border) px-4 py-6 text-center text-sm text-(--text)">
        No habits yet — add one above to get started.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <span />
        <div className="grid grid-cols-7 gap-1">
          {window.map((date) => (
            <span
              key={date}
              className="w-5 text-center text-[11px] font-medium text-(--text) sm:w-6"
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
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-(--border) bg-(--surface) px-4 py-3 shadow-(--shadow-sm)"
            >
              <span className="min-w-0 truncate text-[15px] font-medium text-(--text-h)">
                {habit.name}
              </span>
              <div className="grid grid-cols-7 gap-1">
                {completion.map((done, i) => (
                  <span
                    key={window[i]}
                    aria-hidden="true"
                    className={
                      done
                        ? 'h-5 w-5 rounded-md bg-(--accent) sm:h-6 sm:w-6'
                        : 'h-5 w-5 rounded-md border border-(--border) sm:h-6 sm:w-6'
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
