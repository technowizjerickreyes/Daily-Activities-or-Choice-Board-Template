import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle({ isDark, onToggle }) {
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <motion.button
      className="theme-toggle"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={onToggle}
      aria-label={label}
      title={label}
      type="button"
    >
      <span aria-hidden="true" className="theme-toggle__icon">
        {isDark ? <Sun size={18} strokeWidth={2.25} /> : <Moon size={18} strokeWidth={2.25} />}
      </span>
      <span className="theme-toggle__text">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </motion.button>
  )
}
