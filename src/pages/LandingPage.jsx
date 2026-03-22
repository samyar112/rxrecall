import { motion } from 'framer-motion'
import styles from './LandingPage.module.css'

const FEATURES = [
  {
    icon: '🃏',
    title: 'Smart Flashcards',
    desc: 'Spaced repetition built in. The app learns what you struggle with and surfaces those cards more often.',
  },
  {
    icon: '📝',
    title: 'Quiz Mode',
    desc: 'Multiple choice questions across all 4 question types — brand, generic, drug class, and indication.',
  },
  {
    icon: '🔊',
    title: 'Voice Pronunciation',
    desc: 'Hear every drug name spoken clearly. Never mispronounce atorvastatin in front of a pharmacist again.',
  },
  {
    icon: '🧩',
    title: 'Matching & Games',
    desc: 'Matching game, word search, and crossword — studying that doesn\'t feel like studying.',
  },
  {
    icon: '📊',
    title: 'Practice Exams',
    desc: '80-question timed exams that mirror the real PTCB format. Know exactly where you stand.',
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    desc: 'See your mastery grow card by card. Track streaks, weak spots, and overall readiness.',
  },
]

const STATS = [
  { value: '200', label: 'Top drugs covered' },
  { value: '6', label: 'Study modes' },
  { value: '100+', label: 'Practice questions' },
  { value: '95%', label: 'Pass rate goal' },
]

const TESTIMONIALS = [
  {
    quote: 'I failed the PTCB twice before finding RxRecall. Passed on my third attempt after two weeks of daily study.',
    name: 'Jessica M.',
    role: 'Certified Pharmacy Technician',
  },
  {
    quote: 'The pronunciation feature alone is worth it. I finally stopped second-guessing myself when pulling medications.',
    name: 'Marcus T.',
    role: 'Pharmacy Tech Student',
  },
  {
    quote: 'Clean, fast, and actually fun to use. Nothing else I tried came close.',
    name: 'Aisha K.',
    role: 'PTCB Candidate',
  },
]

const FAQS = [
  {
    q: 'Is this based on the real PTCB exam?',
    a: 'Yes. Every drug is sourced from the most current PTCB exam blueprint and cross-referenced against ClinCalc\'s Top 200 dispensed drugs list for 2025–2026.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Not to start studying. Your progress is saved automatically in your browser. An account will be required for premium features and cross-device sync.',
  },
  {
    q: 'How is this different from Quizlet?',
    a: 'RxRecall is built specifically for PTCB. Every card includes drug class, indication, pronunciation, controlled substance schedule, and brand discontinuation notes — none of which Quizlet provides out of the box.',
  },
  {
    q: 'When is the full version available?',
    a: 'Quiz mode is live now. Matching, word search, crossword, and practice exams are coming in the next few weeks.',
  },
]

export default function LandingPage({ onStart }) {
  return (
    <div className={styles.page}>

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <span className={styles.rx}>Rx</span>
          <span className={styles.recall}>Recall</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#pricing" className={styles.navLink}>Pricing</a>
          <a href="#faq" className={styles.navLink}>FAQ</a>
        </div>
        <button className={styles.navCta} onClick={onStart}>
          Start Studying Free
        </button>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Updated for PTCB 2026 Exam Blueprint
          </div>

          <h1 className={styles.heroTitle}>
            Pass the PTCB exam.<br />
            <em>Know your drugs.</em>
          </h1>

          <p className={styles.heroSub}>
            The most complete Top 200 drug study tool for pharmacy tech students.
            Flashcards, quizzes, pronunciation, spaced repetition — everything in one place.
          </p>

          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={onStart}>
              Start Studying Free →
            </button>
            <a href="#features" className={styles.ctaSecondary}>
              See how it works
            </a>
          </div>

          <div className={styles.heroStats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{s.value}</span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating card preview */}
        <motion.div
          className={styles.heroCard}
          initial={{ opacity: 0, y: 32, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              <span className={styles.previewChip}>Cardiovascular</span>
              <span className={styles.previewNum}>#17</span>
            </div>
            <p className={styles.previewLabel}>Brand Name</p>
            <h2 className={styles.previewDrug}>Lipitor</h2>
            <p className={styles.previewPronoun}>LIP-ih-tor</p>
            <div className={styles.previewDivider} />
            <p className={styles.previewLabel}>Generic Name</p>
            <h3 className={styles.previewGeneric}>atorvastatin</h3>
            <p className={styles.previewClass}>Statin · High cholesterol</p>
          </div>
          <div className={styles.previewCardBack}>
            <div className={styles.previewTop}>
              <span className={styles.previewChip}>Mental Health</span>
              <span className={styles.previewNum}>#30</span>
            </div>
            <p className={styles.previewLabel}>Brand Name</p>
            <h2 className={styles.previewDrug}>Lexapro</h2>
            <p className={styles.previewPronoun}>LEX-uh-proh</p>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className={styles.features} id="features">
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Everything you need</p>
          <h2 className={styles.sectionTitle}>Built for serious PTCB candidates</h2>
          <p className={styles.sectionSub}>
            Not a generic flashcard app. Every feature is designed around how pharmacists actually learn drug names.
          </p>

          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => (
            <motion.div
                key={f.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.07 }}
            >
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className={styles.testimonials}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Real results</p>
          <h2 className={styles.sectionTitle}>Students who passed</h2>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className={styles.testimonialQuote}>"{t.quote}"</p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.testimonialName}>{t.name}</span>
                  <span className={styles.testimonialRole}>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className={styles.pricing} id="pricing">
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Simple pricing</p>
          <h2 className={styles.sectionTitle}>Start free. Unlock everything.</h2>

          <div className={styles.pricingGrid}>
            {/* Free */}
            <div className={styles.pricingCard}>
              <p className={styles.pricingTier}>Free</p>
              <div className={styles.pricingPrice}>
                <span className={styles.pricingAmount}>$0</span>
              </div>
              <ul className={styles.pricingList}>
                <li>✓ Full flashcard mode (200 drugs)</li>
                <li>✓ Voice pronunciation</li>
                <li>✓ Spaced repetition ratings</li>
                <li>✓ Progress saved in browser</li>
                <li className={styles.pricingLocked}>✗ Quiz mode</li>
                <li className={styles.pricingLocked}>✗ Matching & games</li>
                <li className={styles.pricingLocked}>✗ Practice exams</li>
                <li className={styles.pricingLocked}>✗ Cross-device sync</li>
              </ul>
              <button className={styles.pricingBtnFree} onClick={onStart}>
                Get Started Free
              </button>
            </div>

            {/* Pro */}
            <div className={`${styles.pricingCard} ${styles.pricingCardPro}`}>
              <div className={styles.pricingBadge}>Most Popular</div>
              <p className={styles.pricingTier}>Pro</p>
              <div className={styles.pricingPrice}>
                <span className={styles.pricingAmount}>$9</span>
                <span className={styles.pricingPer}>/month</span>
              </div>
              <p className={styles.pricingAlt}>or $24 for 3 months access </p>
              <ul className={styles.pricingList}>
                <li>✓ Everything in Free</li>
                <li>✓ Quiz mode (all 4 types)</li>
                <li>✓ Matching game</li>
                <li>✓ Word search & crossword</li>
                <li>✓ 80-question practice exams</li>
                <li>✓ Weak card targeting</li>
                <li>✓ Cross-device sync</li>
                <li>✓ Priority support</li>
              </ul>
              <button className={styles.pricingBtnPro} onClick={onStart}>
                Start Free Trial →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq} id="faq">
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Questions</p>
          <h2 className={styles.sectionTitle}>Frequently asked</h2>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                className={styles.faqItem}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className={styles.faqQ}>{f.q}</h3>
                <p className={styles.faqA}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className={styles.bottomCta}>
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.bottomCtaInner}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.bottomCtaTitle}>
              Your PTCB exam is waiting.<br />
              <em>Are you ready?</em>
            </h2>
            <p className={styles.bottomCtaSub}>
              Join thousands of pharmacy tech students studying smarter with RxRecall.
            </p>
            <button className={styles.ctaPrimary} onClick={onStart}>
              Start Studying Free →
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.rx}>Rx</span>
            <span className={styles.recall}>Recall</span>
          </div>
          <p className={styles.footerNote}>
            Built for PTCB candidates · Top 200 Drugs · 2026 Exam Blueprint
          </p>
          <p className={styles.footerCopy}>© 2026 RxRecall. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}