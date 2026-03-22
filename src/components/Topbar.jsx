import styles from './Topbar.module.css'

export default function Topbar({ mastered, studied, streak, page, setPage }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.wordmark} onClick={() => setPage('landing')}>
          <span className={styles.rx}>Rx</span>
          <span className={styles.recall}>Recall</span>
        </div>
        <div className={styles.badge}>PTCB 2026</div>
      </div>

      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${page === 'flashcards' ? styles.active : ''}`}
          onClick={() => setPage('flashcards')}
        >
          Flashcards
        </button>
        <button className={`${styles.navItem} ${styles.soon}`}>Quiz</button>
        <button className={`${styles.navItem} ${styles.soon}`}>Matching</button>
        <button className={`${styles.navItem} ${styles.soon}`}>Practice Exam</button>
      </nav>

      <div className={styles.right}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{streak}</span>
          <span className={styles.statLabel}>streak</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{mastered}</span>
          <span className={styles.statLabel}>mastered</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{studied}/200</span>
          <span className={styles.statLabel}>studied</span>
        </div>
      </div>
    </header>
  )
}