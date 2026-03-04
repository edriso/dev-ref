import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection'

function MobileNav({ sections }) {
  const [open, setOpen] = useState(false)
  const sectionIds = sections.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  // Close drawer on route change / resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleSelect = (id) => {
    setOpen(false)
    // Update hash to trigger TopicPage's hashchange listener,
    // which expands the section and scrolls to it
    requestAnimationFrame(() => {
      window.location.hash = id
    })
  }

  const activeSection = sections.find((s) => s.id === activeId)
  const activeIndex = sections.findIndex((s) => s.id === activeId)

  // Portal the drawer/backdrop to document.body so they escape the
  // sticky container's backdrop-blur stacking context
  const drawer = createPortal(
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-bg border-r border-border transform transition-transform duration-250 ease-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-label="Section navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Contents
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-text-sub hover:text-text hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="overflow-y-auto h-[calc(100%-3.5rem)] p-3 space-y-1">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => handleSelect(section.id)}
              className={`w-full text-left rounded-md px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                activeId === section.id
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-sub hover:text-text hover:bg-bg-hover/50'
              }`}
            >
              <span className="text-text-muted mr-2 text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </>,
    document.body
  )

  return (
    <div className="sticky top-16 z-40 lg:hidden border-b border-border bg-bg/90 backdrop-blur">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-sub hover:text-text transition-colors cursor-pointer"
        aria-label="Open section menu"
      >
        <Menu size={16} className="shrink-0" />
        <span className="truncate">
          {activeSection
            ? `${String(activeIndex + 1).padStart(2, '0')} — ${activeSection.title}`
            : 'Sections'}
        </span>
      </button>

      {drawer}
    </div>
  )
}

export default MobileNav
