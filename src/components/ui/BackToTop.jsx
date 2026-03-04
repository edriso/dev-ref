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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 rounded-full bg-gray-800 border border-gray-700 px-4 py-2.5 text-sm text-gray-300 shadow-lg hover:bg-gray-700 hover:text-gray-100 transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
      Top
    </button>
  )
}

export default BackToTop
