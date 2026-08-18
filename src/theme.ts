export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'habit-tracker:theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return isTheme(stored) ? stored : null
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function resolveInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
}

export function storeTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function watchSystemTheme(onChange: (theme: Theme) => void): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const listener = (event: MediaQueryListEvent) => {
    onChange(event.matches ? 'dark' : 'light')
  }
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}
