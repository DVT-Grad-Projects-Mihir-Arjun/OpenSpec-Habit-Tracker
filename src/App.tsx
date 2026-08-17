import { useMemo } from 'react'
import { AddHabitForm } from './habits/AddHabitForm'
import { DataPortability } from './habits/DataPortability'
import { HabitChecklist } from './habits/HabitChecklist'
import { WeeklyGrid } from './habits/WeeklyGrid'
import { todayLocalDate } from './habits/date'
import { computeCurrentStreak } from './habits/streak'
import { useHabits } from './habits/useHabits'
import { useTheme } from './useTheme'

function App() {
  const { habits, addHabit, toggleHabitDoneOnDate, replaceAllHabits } =
    useHabits()
  const today = useMemo(() => todayLocalDate(), [])
  const { theme, toggleTheme } = useTheme()

  return (
    <section
      id="center"
      className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-12"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium text-[var(--text-h)]">Habits</h1>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-h)]"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <AddHabitForm onAdd={addHabit} />
      <HabitChecklist
        habits={habits}
        isDoneToday={(habit) => habit.completedDates.includes(today)}
        onToggle={(habitId) => toggleHabitDoneOnDate(habitId, today)}
        streakFor={(habit) => computeCurrentStreak(habit.completedDates, today)}
      />
      <WeeklyGrid habits={habits} today={today} />
      <DataPortability habits={habits} onImport={replaceAllHabits} />
    </section>
  )
}

export default App
