import { useMemo } from 'react'
import { AddHabitForm } from './habits/AddHabitForm'
import { HabitChecklist } from './habits/HabitChecklist'
import { WeeklyGrid } from './habits/WeeklyGrid'
import { todayLocalDate } from './habits/date'
import { computeCurrentStreak } from './habits/streak'
import { useHabits } from './habits/useHabits'

function App() {
  const { habits, addHabit, toggleHabitDoneOnDate } = useHabits()
  const today = useMemo(() => todayLocalDate(), [])

  return (
    <section
      id="center"
      className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-12"
    >
      <h1 className="text-3xl font-medium text-[var(--text-h)]">Habits</h1>
      <AddHabitForm onAdd={addHabit} />
      <HabitChecklist
        habits={habits}
        isDoneToday={(habit) => habit.completedDates.includes(today)}
        onToggle={(habitId) => toggleHabitDoneOnDate(habitId, today)}
        streakFor={(habit) => computeCurrentStreak(habit.completedDates, today)}
      />
      <WeeklyGrid habits={habits} today={today} />
    </section>
  )
}

export default App
