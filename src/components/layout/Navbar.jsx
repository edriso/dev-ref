import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Sun, Moon, Monitor, Search, Keyboard } from 'lucide-react'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(preference) {
  const resolved = preference === 'auto' ? getSystemTheme() : preference
  if (resolved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

function Navbar({ onSearchOpen, onShortcutsOpen }) {
  const [preference, setPreference] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    applyTheme(preference)
    localStorage.setItem('theme', preference)
  }, [preference])

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (preference !== 'auto') return

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => applyTheme('auto')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [preference])

  const cycleTheme = () => {
    setPreference((prev) => {
      if (prev === 'dark') return 'light'
      if (prev === 'light') return 'auto'
      return 'dark'
    })
  }

  const icon = preference === 'dark' ? Sun : preference === 'light' ? Moon : Monitor
  const Icon = icon
  const label =
    preference === 'dark'
      ? 'Switch to light mode'
      : preference === 'light'
        ? 'Switch to auto mode'
        : 'Switch to dark mode'

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold hover:text-accent transition-colors"
        >
          <BookOpen size={20} />
          <span className="hidden sm:inline">Best Practice Code</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Search button */}
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-text-muted hover:text-text hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={16} />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline rounded border border-border-sub px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
              ⌘K
            </kbd>
          </button>

          {/* Keyboard shortcuts */}
          <button
            onClick={onShortcutsOpen}
            className="hidden sm:flex rounded-md p-2 text-text-sub hover:text-text hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard size={18} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="relative rounded-md p-2 text-text-sub hover:text-text hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label={label}
            title={label}
          >
            <Icon size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
