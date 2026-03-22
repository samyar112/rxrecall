import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpeech } from '../hooks/useSpeech'
import styles from './Flashcard.module.css'

const SCHEDULE_LABEL = { 'II': 'C-II', 'III': 'C-III', 'IV': 'C-IV', 'V': 'C-V' }

export default function Flashcard({ drug, index, total, mode, rating, onRate, onNext, onPrev, isFirst, isLast, autoSpeak }) {
 const [flipped, setFlipped] = useState(false)
 const [speaking, setSpeaking] = useState(null)
 const [rated, setRated] = useState(false)
  const { speak } = useSpeech()

  // Auto-speak FRONT when card loads
  useEffect(() => {
    setFlipped(false)
    setSpeaking(null)
    setRated(false)
    if (!autoSpeak || !drug) return
    const isBrand = mode === 'brand'
    const text = isBrand ? drug.brand : drug.generic
    const timer = setTimeout(() => {
      setSpeaking('front')
      speak(text)
      setTimeout(() => setSpeaking(null), 2500)
    }, 400)
    return () => clearTimeout(timer)
  }, [drug?.id, autoSpeak])

  // Auto-speak BACK when card flips
  useEffect(() => {
    if (!flipped || !autoSpeak || !drug) return
    const isBrand = mode === 'brand'
    const text = isBrand ? drug.generic : drug.brand
    const timer = setTimeout(() => {
      setSpeaking('back')
      speak(text)
      setTimeout(() => setSpeaking(null), 2500)
    }, 500)
    return () => clearTimeout(timer)
  }, [flipped])

  // Simple flip — no side effects inside setter
  const handleFlip = useCallback(() => {
    setFlipped(f => !f)
  }, [])

  // Manual pronounce button
  const handleSpeak = useCallback((e, side) => {
    e.stopPropagation()
    const isBrand = mode === 'brand'
    const text = side === 'front'
      ? (isBrand ? drug.brand : drug.generic)
      : (isBrand ? drug.generic : drug.brand)
    setSpeaking(side)
    speak(text)
    setTimeout(() => setSpeaking(null), 2500)
  }, [drug, mode, speak])

  const handleRate = useCallback((r) => {
    setRated(true)
    onRate(r)
  }, [onRate])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return
      switch (e.key) {
        case ' ': case 'Enter': e.preventDefault(); handleFlip(); break
        case 'ArrowRight': if (!flipped && !isLast) onNext(); break
        case 'ArrowLeft': if (!isFirst) onPrev(); break
        case '1': if (flipped) handleRate('again'); break
        case '2': if (flipped) handleRate('hard'); break
        case '3': if (flipped) handleRate('good'); break
        case '4': if (flipped) handleRate('easy'); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flipped, handleFlip, handleRate, isFirst, isLast, onNext, onPrev])

  if (!drug) return null

  const isBrandMode = mode === 'brand'
  const frontName = isBrandMode ? drug.brand : drug.generic
  const frontPronoun = isBrandMode ? drug.pronunciation_brand : drug.pronunciation_generic
  const frontLabel = isBrandMode ? 'Brand Name' : 'Generic Name'
  const backName = isBrandMode ? drug.generic : drug.brand
  const backPronoun = isBrandMode ? drug.pronunciation_generic : drug.pronunciation_brand
  const backLabel = isBrandMode ? 'Generic Name' : 'Brand Name'

  return (
    <div className={styles.wrapper}>

      {/* Card */}
      <div
        className={styles.scene}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? 'Click to flip back' : 'Click to reveal answer'}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleFlip()}
      >
        <motion.div
          className={styles.cardInner}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >

          {/* FRONT */}
          <div className={styles.cardFace}>
            <div className={styles.cardTop}>
              <div className={styles.chips}>
                {drug.controlled && (
                  <span className={styles.chipControlled}>{SCHEDULE_LABEL[drug.schedule]}</span>
                )}
                {drug.brand_changed_or_discontinued && (
                  <span className={styles.chipDiscontinued}>Brand Updated</span>
                )}
              </div>
              <span className={styles.cardNum}>{index + 1} / {total}</span>
            </div>

            <div className={styles.cardCenter}>
              <p className={styles.cardSideLabel}>{frontLabel}</p>
              <h2 className={styles.drugName}>{frontName}</h2>
              <p className={styles.pronunciation}>{frontPronoun}</p>
            </div>

            <div className={styles.cardBottom}>
              <button
                className={`${styles.speakBtn} ${speaking === 'front' ? styles.speakActive : ''}`}
                onClick={(e) => handleSpeak(e, 'front')}
              >
                <SpeakerIcon active={speaking === 'front'} />
                {speaking === 'front' ? 'Playing…' : 'Pronounce'}
              </button>
              <p className={styles.flipHint}><KbdHint>Space</KbdHint> to flip</p>
            </div>
          </div>

          {/* BACK */}
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <div className={styles.cardTop}>
              <div className={styles.chips}>
                {drug.controlled && (
                  <span className={styles.chipControlled}>{SCHEDULE_LABEL[drug.schedule]}</span>
                )}
              </div>
              <span className={styles.cardNum}>#{drug.id}</span>
            </div>

            <div className={styles.cardCenter}>
              <p className={styles.cardSideLabel}>{backLabel}</p>
              <h2 className={`${styles.drugName} ${styles.drugNameAccent}`}>{backName}</h2>
              <p className={styles.pronunciation}>{backPronoun}</p>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Class</span>
                  <span className={styles.infoVal}>{drug.class}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Use</span>
                  <span className={styles.infoVal}>{drug.use}</span>
                </div>
              </div>
            </div>

            <div className={styles.cardBottom}>
              <button
                className={`${styles.speakBtn} ${speaking === 'back' ? styles.speakActive : ''}`}
                onClick={(e) => handleSpeak(e, 'back')}
              >
                <SpeakerIcon active={speaking === 'back'} />
                {speaking === 'back' ? 'Playing…' : 'Pronounce'}
              </button>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Rating row — appears after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            className={styles.ratingRow}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p className={styles.ratingLabel}>How well did you know this?</p>
            <div className={styles.ratingBtns}>
              <RatingBtn label="Again" sub="Didn't know it" color="red" onClick={() => handleRate('again')} kbd="1" />
              <RatingBtn label="Hard" sub="Almost got it" color="amber" onClick={() => handleRate('hard')} kbd="2" />
              <RatingBtn label="Good" sub="Got it right" color="blue" onClick={() => handleRate('good')} kbd="3" />
              <RatingBtn label="Easy" sub="Knew instantly" color="green" onClick={() => handleRate('easy')} kbd="4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className={styles.navRow}>
        <button className={styles.navBtn} onClick={onPrev} disabled={isFirst} aria-label="Previous card">←</button>
        <div className={styles.progressDots}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
          <span className={styles.progressText}>{index + 1} of {total}</span>
        </div>
        <div className={styles.nextWrap}>
        <button
          className={styles.navBtn}
          onClick={onNext}
          disabled={isLast || (!rated && flipped)}
          aria-label="Next card"
        >→</button>
        {flipped && !rated && (
          <span className={styles.rateHint}>Rate the card to continue</span>
        )}
      </div>
      </div>

    </div>
  )
}

function RatingBtn({ label, sub, color, onClick, kbd }) {
  return (
    <button className={`${styles.ratingBtn} ${styles[`rating_${color}`]}`} onClick={onClick}>
      <span className={styles.ratingBtnLabel}>{label}</span>
      <span className={styles.ratingBtnSub}>{sub}</span>
      <span className={styles.ratingKbd}>{kbd}</span>
    </button>
  )
}

function KbdHint({ children }) {
  return <kbd className={styles.kbd}>{children}</kbd>
}

function SpeakerIcon({ active }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      {active
        ? <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        : <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      }
    </svg>
  )
}