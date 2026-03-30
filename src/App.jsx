import { startTransition, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideContent from './components/SlideContent'
import ThemeToggle from './ThemeToggle'
import { NOTE_KEY, quickLinks, slides } from './deckData'

const THEME_KEY = 'daily-activities-choice-board-theme'

export default function App() {
  const [currentId, setCurrentId] = useState(1)
  const [notes, setNotes] = useState({})
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true

    const savedTheme = window.localStorage.getItem(THEME_KEY)

    if (savedTheme === 'light') return false
    if (savedTheme === 'dark') return true

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const savedNotes = window.localStorage.getItem(NOTE_KEY)
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch {
        window.localStorage.removeItem(NOTE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(NOTE_KEY, JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    window.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const currentIndex = slides.findIndex((slide) => slide.id === currentId)
  const currentSlide = slides[currentIndex] ?? slides[0]

  function openSlide(id) {
    startTransition(() => {
      setCurrentId(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  function move(offset) {
    const target = slides[currentIndex + offset]
    if (target) openSlide(target.id)
  }

  function updateNote(id, value) {
    setNotes((current) => ({ ...current, [id]: value }))
  }

  function toggleTheme() {
    setIsDark((current) => !current)
  }

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="topbar">
          <div className="topbar__copy">
            <p className="topbar__eyebrow">Interactive Classroom Board</p>
            <h1>Daily Activities Choice Board</h1>
            <p>
              A classroom-ready board with warm-ups, focused task pages, and reflection
              journals that students can move through at their own pace.
            </p>
          </div>

          <div className="topbar__meta">
            <div className="meta-card">
              <span>Current view</span>
              <strong>{currentSlide.title}</strong>
            </div>
            <div className="meta-card">
              <span>Progress</span>
              <strong>
                {currentIndex + 1} / {slides.length}
              </strong>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </header>

        <nav className="topnav" aria-label="Quick navigation">
          <div className="topnav__links">
            {quickLinks.map((link) => (
              <motion.button
                key={link.id}
                aria-current={currentId === link.id ? 'page' : undefined}
                className={`nav-pill${currentId === link.id ? ' nav-pill--active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => openSlide(link.id)}
                type="button"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <div className="topnav__controls">
            <motion.button
              className="nav-arrow"
              disabled={currentIndex <= 0}
              whileHover={{ scale: 1.02 }}
              onClick={() => move(-1)}
              type="button"
            >
              Previous
            </motion.button>
            <motion.button
              className="nav-arrow"
              disabled={currentIndex >= slides.length - 1}
              whileHover={{ scale: 1.02 }}
              onClick={() => move(1)}
              type="button"
            >
              Next
            </motion.button>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.section
            key={currentId}
            className="content-shell"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <SlideContent
              notes={notes}
              onNote={updateNote}
              onOpen={openSlide}
              slide={currentSlide}
            />
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  )
}
