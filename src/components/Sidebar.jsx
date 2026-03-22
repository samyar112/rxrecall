import styles from './Sidebar.module.css'

export default function Sidebar({ filters, setFilters, deckSize, ratings, onShuffle, onReset, autoSpeak, setAutoSpeak }) {
  const masteredCount = Object.values(ratings).filter(r => r === 'easy').length
  const againCount = Object.values(ratings).filter(r => r === 'again').length
  const studiedCount = Object.keys(ratings).length

  return (
    <aside className={styles.sidebar}>

      {/* Deck info */}
      <div className={styles.deckInfo}>
        <div className={styles.deckStat}>
          <span className={styles.deckNum}>{deckSize}</span>
          <span className={styles.deckLabel}>cards in deck</span>
        </div>
        <div className={styles.deckMini}>
          <span style={{ color: 'var(--green)' }}>{masteredCount} mastered</span>
          <span>·</span>
          <span style={{ color: 'var(--red)' }}>{againCount} to review</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Study mode */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Study Mode</p>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${filters.mode === 'brand' ? styles.modeBtnActive : ''}`}
            onClick={() => setFilters(f => ({ ...f, mode: 'brand' }))}
          >
            Brand → Generic
          </button>
          <button
            className={`${styles.modeBtn} ${filters.mode === 'generic' ? styles.modeBtnActive : ''}`}
            onClick={() => setFilters(f => ({ ...f, mode: 'generic' }))}
          >
            Generic → Brand
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Auto-speak toggle */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Pronunciation</p>
        <label className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Auto-pronounce on load</span>
          <button
            className={`${styles.toggle} ${autoSpeak ? styles.toggleOn : ''}`}
            onClick={() => setAutoSpeak(v => !v)}
            aria-pressed={autoSpeak}
          >
            <span className={styles.toggleThumb} />
          </button>
        </label>
        <p className={styles.toggleHint}>Speaks the drug name automatically when each card appears</p>
      </div>

      <div className={styles.divider} />

      {/* Special filters */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Filter By</p>
        <div className={styles.filterGroup}>
          {[
            { value: 'all', label: 'All Cards' },
            { value: 'controlled', label: 'Controlled Substances' },
            { value: 'discontinued', label: 'Brand Updated/DC' },
            { value: 'weak', label: 'Weak Cards (Again)' },
            { value: 'unseen', label: 'Not Yet Studied' },
          ].map(opt => (
            <label key={opt.value} className={styles.radioRow}>
              <input
                type="radio"
                name="special"
                value={opt.value}
                checked={filters.special === opt.value}
                onChange={() => setFilters(f => ({ ...f, special: opt.value }))}
                className={styles.radio}
              />
              <span className={styles.radioLabel}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Actions */}
      <div className={styles.section}>
        <button className={styles.actionBtn} onClick={onShuffle}>
          <ShuffleIcon /> Shuffle Deck
        </button>
        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={onReset}>
          <ResetIcon /> Reset Progress
        </button>
      </div>

      {/* Progress breakdown */}
      <div className={styles.progressBreakdown}>
        <p className={styles.sectionLabel}>Overall Progress</p>
        <div className={styles.progressBar}>
          <div className={styles.pbFill} style={{ width: `${(studiedCount / 200) * 100}%` }} />
        </div>
        <div className={styles.pbStats}>
          <span className={styles.pbStat} style={{ color: 'var(--red)' }}>{againCount} again</span>
          <span className={styles.pbStat} style={{ color: 'var(--amber)' }}>{Object.values(ratings).filter(r => r === 'hard').length} hard</span>
          <span className={styles.pbStat} style={{ color: 'var(--blue)' }}>{Object.values(ratings).filter(r => r === 'good').length} good</span>
          <span className={styles.pbStat} style={{ color: 'var(--green)' }}>{masteredCount} easy</span>
        </div>
      </div>

    </aside>
  )
}

function ShuffleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/><polyline points="4 20 9 15"/>
      <path d="M21 3l-7 7"/><path d="M3 3l18 18"/>
      <polyline points="16 21 21 21 21 16"/>
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  )
}