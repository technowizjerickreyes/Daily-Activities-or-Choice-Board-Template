import { startTransition, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideContent from './components/SlideContent'
import ThemeToggle from './ThemeToggle'
import { NOTE_KEY, mockStudents, quickLinks, slides } from './deckData'

const THEME_KEY = 'daily-activities-choice-board-theme'

export default function App() {
  const [currentId, setCurrentId] = useState(1)
  const [notes, setNotes] = useState({})
  const contentViewportRef = useRef(null)
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

  useEffect(() => {
    contentViewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentId])

  const currentIndex = slides.findIndex((slide) => slide.id === currentId)
  const currentSlide = slides[currentIndex] ?? slides[0]

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event) {
      // Don't capture if user is typing in textarea
      if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
        return
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        move(1)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        move(-1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        openSlide(slides[0].id)
      } else if (event.key === 'End') {
        event.preventDefault()
        openSlide(slides[slides.length - 1].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  function openSlide(id) {
    if (id === currentId) return

    startTransition(() => {
      setCurrentId(id)
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="app-container">
        <header className="unified-header">
          <div className="unified-header__top">
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
              <div className="meta-card">
                <span>Loaded records</span>
                <strong>{mockStudents.length} students</strong>
              </div>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>

          <nav className="unified-header__nav" aria-label="Quick navigation">
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
                aria-label="Previous slide"
                title="Previous slide (Left Arrow)"
              >
                Previous
              </motion.button>
              <motion.button
                className="nav-arrow"
                disabled={currentIndex >= slides.length - 1}
                whileHover={{ scale: 1.02 }}
                onClick={() => move(1)}
                type="button"
                aria-label="Next slide"
                title="Next slide (Right Arrow)"
              >
                Next
              </motion.button>
            </div>
          </nav>
        </header>

        <div ref={contentViewportRef} id="main-content" className="content-shell" role="region" aria-label="Main content">
          <AnimatePresence initial={false} mode="wait">
            <motion.section
              key={currentId}
              className="content-stage"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              role="main"
              aria-live="polite"
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
      </div>
    </main>
  )
}
