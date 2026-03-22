import { useState } from 'react'
import Topbar from './components/Topbar'
import FlashcardsPage from './pages/FlashcardsPage'
import LandingPage from './pages/LandingPage'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const { progress, rate, resetProgress, mastered, studied } = useProgress()
  const [page, setPage] = useState('landing')

  if (page === 'landing') {
    return <LandingPage onStart={() => setPage('flashcards')} />
  }

  return (
    <>
      <Topbar
        mastered={mastered}
        studied={studied}
        streak={progress.streak}
        page={page}
        setPage={setPage}
      />
      {page === 'flashcards' && (
        <FlashcardsPage
          progress={progress}
          rate={rate}
          resetProgress={resetProgress}
          mastered={mastered}
          studied={studied}
        />
      )}
    </>
  )
}