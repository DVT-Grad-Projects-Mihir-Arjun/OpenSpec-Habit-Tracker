import { useMemo } from 'react'
import { AddHabitForm } from './habits/AddHabitForm'
import { DataPortability } from './habits/DataPortability'
import { HabitChecklist } from './habits/HabitChecklist'
import { WeeklyGrid } from './habits/WeeklyGrid'
import { todayLocalDate } from './habits/date'
import { computeCurrentStreak } from './habits/streak'
import { useHabits } from './habits/useHabits'
import { useTheme } from './useTheme'
import { MoonIcon, SunIcon } from './icons'

function App() {
  const { habits, addHabit, toggleHabitDoneOnDate, replaceAllHabits } =
    useHabits()
  const today = useMemo(() => todayLocalDate(), [])
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-h)]">
            Habit Tracker
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-h)] transition-colors hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)]"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-4.5 w-4.5" />
            ) : (
              <MoonIcon className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        <AddHabitForm onAdd={addHabit} />

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text)]">
            Today
          </h2>
          <HabitChecklist
            habits={habits}
            isDoneToday={(habit) => habit.completedDates.includes(today)}
            onToggle={(habitId) => toggleHabitDoneOnDate(habitId, today)}
            streakFor={(habit) =>
              computeCurrentStreak(habit.completedDates, today)
            }
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text)]">
            This week
          </h2>
          <WeeklyGrid habits={habits} today={today} />
        </section>

        <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text)]">
            Data
          </h2>
          <DataPortability habits={habits} onImport={replaceAllHabits} />
        </section>
      </main>
    </div>
  )
}

export default App
