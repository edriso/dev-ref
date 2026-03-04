import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/ui/ScrollToTop'
import BackToTop from './components/ui/BackToTop'
import SearchModal from './components/ui/SearchModal'
import { KeyboardShortcuts } from './components/ui/KeyboardShortcuts'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K → open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
        return
      }

      // Skip shortcuts when typing in inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return

      // ? (Shift+/) → open keyboard shortcuts
      if (e.key === '?' && !searchOpen && !shortcutsOpen) {
        e.preventDefault()
        setShortcutsOpen(true)
        return
      }

      // / → open search
      if (e.key === '/' && !searchOpen && !shortcutsOpen) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, shortcutsOpen])

  return (
    <div className="min-h-screen bg-bg text-text">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <BackToTop />
      <Navbar onSearchOpen={() => setSearchOpen(true)} onShortcutsOpen={() => setShortcutsOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <KeyboardShortcuts open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:topicId" element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
