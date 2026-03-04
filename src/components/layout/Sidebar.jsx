import useActiveSection from '../../hooks/useActiveSection'

function Sidebar({ sections }) {
  const sectionIds = sections.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-3">
          Contents
        </h2>
        <nav className="space-y-1">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                activeId === section.id
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-sub hover:text-text hover:bg-bg-hover/50'
              }`}
            >
              <span className="text-text-muted mr-2 text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
