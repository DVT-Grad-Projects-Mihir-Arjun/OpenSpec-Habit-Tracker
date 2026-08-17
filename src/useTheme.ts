import { useEffect, useState } from 'react'
import {
  applyTheme,
  getStoredTheme,
  resolveInitialTheme,
  storeTheme,
  watchSystemTheme,
  type Theme,
} from './theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme)
  const [hasManualChoice, setHasManualChoice] = useState(
    () => getStoredTheme() !== null,
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (hasManualChoice) return
    return watchSystemTheme(setTheme)
  }, [hasManualChoice])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    storeTheme(next)
    setHasManualChoice(true)
  }

  return { theme, toggleTheme }
}
