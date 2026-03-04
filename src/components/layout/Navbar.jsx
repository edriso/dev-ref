import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { BookOpen, Menu, X } from 'lucide-react'
import frameworks from '../../data/frameworks'

function Navbar() {
  const { frameworkId } = useParams()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold hover:text-emerald-400 transition-colors"
        >
          <BookOpen size={20} />
          <span className="hidden sm:inline">Best Practice Code</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {frameworks.map((fw) => (
            <Link
              key={fw.id}
              to={`/${fw.id}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                frameworkId === fw.id
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {fw.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-400 hover:text-gray-200 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-950/95 backdrop-blur">
          <div className="px-4 py-3 grid grid-cols-2 gap-1">
            {frameworks.map((fw) => {
              const Icon = fw.icon
              return (
                <Link
                  key={fw.id}
                  to={`/${fw.id}`}
                  className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    frameworkId === fw.id
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={16} />
                  {fw.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
