import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'rxrecall_v1'

const defaultState = {
  ratings: {},      // drugId -> 'again' | 'hard' | 'good' | 'easy'
  streak: 0,
  totalReviewed: 0,
  lastStudied: null,
}

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {}
  }, [progress])

  const rate = useCallback((drugId, rating) => {
    setProgress(prev => {
      const wasEasy = prev.ratings[drugId] === 'easy'
      const nowEasy = rating === 'easy'
      const streak = rating === 'again' ? 0 : prev.streak + 1
      return {
        ...prev,
        ratings: { ...prev.ratings, [drugId]: rating },
        streak,
        totalReviewed: prev.totalReviewed + 1,
        lastStudied: new Date().toISOString(),
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultState)
  }, [])

  const mastered = Object.values(progress.ratings).filter(r => r === 'easy').length
  const studied = Object.keys(progress.ratings).length

  return { progress, rate, resetProgress, mastered, studied }
}
