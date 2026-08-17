import { useState, type FormEvent } from 'react'

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
        className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--text-h)] outline-none focus-visible:border-[var(--accent)]"
      />
      <button
        type="submit"
        className="rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
      >
        Add
      </button>
    </form>
  )
}
