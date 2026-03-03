import { useState } from 'react'
import { X, Menu } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection'

function Sidebar({ sections }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = sections.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  const navContent = (
    <nav className="space-y-1">
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={() => setMobileOpen(false)}
          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
            activeId === section.id
              ? 'bg-emerald-500/10 text-emerald-400 font-medium'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          <span className="text-gray-600 mr-2 text-xs">{String(index + 1).padStart(2, '0')}</span>
          {section.title}
        </a>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-emerald-600 p-3 shadow-lg lg:hidden hover:bg-emerald-500 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gray-950 border-r border-gray-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Contents
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-gray-200"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
            Contents
          </h2>
          {navContent}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
