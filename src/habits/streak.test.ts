import { describe, expect, it } from 'vitest'
import { computeCurrentStreak } from './streak'

const TODAY = '2026-08-17'
const YESTERDAY = '2026-08-16'
const TWO_DAYS_AGO = '2026-08-15'
const THREE_DAYS_AGO = '2026-08-14'
const FOUR_DAYS_AGO = '2026-08-13'

describe('computeCurrentStreak', () => {
  it('counts an unbroken run ending today', () => {
    const completedDates = [TODAY, YESTERDAY, TWO_DAYS_AGO, THREE_DAYS_AGO]
    expect(computeCurrentStreak(completedDates, TODAY)).toBe(4)
  })

  it('holds during the grace period when today is not yet done', () => {
    const completedDates = [YESTERDAY, TWO_DAYS_AGO, THREE_DAYS_AGO]
    expect(computeCurrentStreak(completedDates, TODAY)).toBe(3)
  })

  it('resets to 0 after a missed day', () => {
    const completedDates = [TWO_DAYS_AGO]
    expect(computeCurrentStreak(completedDates, TODAY)).toBe(0)
  })

  it('is 0 for a habit that has never been completed', () => {
    expect(computeCurrentStreak([], TODAY)).toBe(0)
  })

  it('does not count days beyond the first gap', () => {
    const completedDates = [TODAY, YESTERDAY, FOUR_DAYS_AGO]
    expect(computeCurrentStreak(completedDates, TODAY)).toBe(2)
  })
})
