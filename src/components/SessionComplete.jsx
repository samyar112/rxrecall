import { motion } from 'framer-motion'
import styles from './SessionComplete.module.css'

export default function SessionComplete({ stats, total, onRestart, onStudyWeak }) {
  const pct = Math.round(((stats.good + stats.easy) / total) * 100)

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>Session Complete</p>
          <h2 className={styles.title}>
            {pct >= 80 ? 'Excellent work.' : pct >= 50 ? 'Good progress.' : 'Keep at it.'}
          </h2>
          <p className={styles.sub}>{total} cards reviewed</p>
        </div>

        <div className={styles.statsRow}>
          <StatCell value={stats.again} label="Again" color="red" />
          <StatCell value={stats.hard} label="Hard" color="amber" />
          <StatCell value={stats.good} label="Good" color="blue" />
          <StatCell value={stats.easy} label="Easy" color="green" />
        </div>

        <div className={styles.scoreBar}>
          <div className={styles.scoreBarFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={styles.scorePct}>{pct}% correct or better</p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={onRestart}>
            Study Again
          </button>
          {stats.again > 0 && (
            <button className={styles.btnSecondary} onClick={onStudyWeak}>
              Review {stats.again} missed cards
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function StatCell({ value, label, color }) {
  return (
    <div className={styles.statCell}>
      <span className={`${styles.statVal} ${styles[`color_${color}`]}`}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}
