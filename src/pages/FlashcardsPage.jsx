import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import allDrugs from '../data/drugs.json'
import Flashcard from '../components/Flashcard'
import Sidebar from '../components/Sidebar'
import SessionComplete from '../components/SessionComplete'
import styles from './FlashcardsPage.module.css'

const DEFAULT_FILTERS = {
  mode: 'brand',
  category: 'All',
  special: 'all',
}

function buildDeck(drugs, filters, ratings) {
  let result = [...drugs]

  if (filters.category !== 'All') {
    result = result.filter(d => d.category === filters.category)
  }

  switch (filters.special) {
    case 'controlled':
      result = result.filter(d => d.controlled)
      break
    case 'discontinued':
      result = result.filter(d => d.brand_changed_or_discontinued)
      break
    case 'weak':
      result = result.filter(d => ratings[d.id] === 'again')
      break
    case 'unseen':
      result = result.filter(d => !ratings[d.id])
      break
    default:
      break
  }

  return result
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardsPage({ progress, rate, resetProgress, mastered, studied }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [cardIndex, setCardIndex] = useState(0)
  const [deck, setDeck] = useState(() => allDrugs)
  const [sessionStats, setSessionStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 })
  const [done, setDone] = useState(false)
  const [shuffled, setShuffled] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(false)

  // Rebuild deck when filters or ratings change
  useEffect(() => {
    const newDeck = buildDeck(allDrugs, filters, progress?.ratings ?? {})
    setDeck(shuffled ? shuffle(newDeck) : newDeck)
    setCardIndex(0)
    setDone(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
  }, [filters, shuffled])

  const currentDrug = deck[cardIndex] ?? null

  const handleRate = useCallback((r) => {
    if (!currentDrug) return
    rate(currentDrug.id, r)
    setSessionStats(s => ({ ...s, [r]: s[r] + 1 }))
    if (cardIndex < deck.length - 1) {
      setCardIndex(i => i + 1)
    } else {
      setDone(true)
    }
  }, [currentDrug, cardIndex, deck.length, rate])

  const handleNext = useCallback(() => {
    if (cardIndex < deck.length - 1) setCardIndex(i => i + 1)
    else setDone(true)
  }, [cardIndex, deck.length])

  const handlePrev = useCallback(() => {
    if (cardIndex > 0) setCardIndex(i => i - 1)
  }, [cardIndex])

  const handleShuffle = useCallback(() => {
    setShuffled(true)
    setDeck(d => shuffle(d))
    setCardIndex(0)
    setDone(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
  }, [])

  const handleReset = useCallback(() => {
    if (!window.confirm('Reset all progress? This cannot be undone.')) return
    resetProgress()
    setCardIndex(0)
    setDone(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
  }, [resetProgress])

  const handleRestart = useCallback(() => {
    setCardIndex(0)
    setDone(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
  }, [])

  const handleStudyWeak = useCallback(() => {
    setFilters(f => ({ ...f, special: 'weak' }))
    setDone(false)
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        deckSize={deck.length}
        ratings={progress?.ratings ?? {}}
        onShuffle={handleShuffle}
        onReset={handleReset}
        autoSpeak={autoSpeak}
        setAutoSpeak={setAutoSpeak}
      />

      <main className={styles.main}>
        <div className={styles.mainInner}>

          {/* Page header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Flashcards</h1>
              <p className={styles.pageSubtitle}>
                Top 200 PTCB Drugs · {filters.mode === 'brand' ? 'Brand → Generic' : 'Generic → Brand'}
                {filters.category !== 'All' && ` · ${filters.category}`}
              </p>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.deckCount}>{deck.length} cards</span>
            </div>
          </div>

          {/* Card area */}
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <SessionComplete
                  stats={sessionStats}
                  total={deck.length}
                  onRestart={handleRestart}
                  onStudyWeak={handleStudyWeak}
                />
              </motion.div>
            ) : deck.length === 0 ? (
              <motion.div
                key="empty"
                className={styles.empty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className={styles.emptyTitle}>No cards match this filter.</p>
                <p className={styles.emptySub}>Try adjusting your category or filter settings.</p>
                <button
                  className={styles.emptyBtn}
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentDrug?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
              <Flashcard
                drug={currentDrug}
                index={cardIndex}
                total={deck.length}
                mode={filters.mode}
                rating={progress?.ratings?.[currentDrug?.id]}
                onRate={handleRate}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={cardIndex === 0}
                isLast={cardIndex === deck.length - 1}
                autoSpeak={autoSpeak}
              />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard shortcut legend */}
          {!done && deck.length > 0 && (
            <div className={styles.kbdLegend}>
              <KbdItem keys={['Space']} label="Flip" />
              <KbdItem keys={['←', '→']} label="Navigate" />
              <KbdItem keys={['1', '2', '3', '4']} label="Rate after flip" />
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

function KbdItem({ keys, label }) {
  return (
    <div className={styles.kbdItem}>
      {keys.map(k => (
        <kbd key={k} className={styles.kbd}>{k}</kbd>
      ))}
      <span className={styles.kbdLabel}>{label}</span>
    </div>
  )
}
