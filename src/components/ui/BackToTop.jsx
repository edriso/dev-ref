import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 rounded-full bg-bg-hover border border-border-sub px-4 py-2.5 text-sm text-text-body shadow-lg hover:bg-accent/15 hover:text-accent hover:border-accent/30 transition-colors cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
      Top
    </button>
  )
}

export default BackToTop
