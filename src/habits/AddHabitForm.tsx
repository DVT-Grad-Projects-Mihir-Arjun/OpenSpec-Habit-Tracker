import { useState, type FormEvent } from 'react'
import { PlusIcon } from '../icons'

interface AddHabitFormProps {
  onAdd: (name: string) => void
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Add a new habit"
        className="min-w-0 flex-1 rounded-xl border border-(--border) bg-(--surface) px-3.5 py-2.5 text-[15px] text-(--text-h) shadow-(--shadow-sm) outline-none transition-colors placeholder:text-(--text) focus-visible:border-(--accent-border) focus-visible:ring-2 focus-visible:ring-(--accent-bg)"
      />
      <button
        type="submit"
        aria-label="Add habit"
        className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-(--accent) px-4 py-2.5 text-[15px] font-medium text-white shadow-(--shadow-sm) transition-colors hover:bg-(--accent-hover)"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  )
}
