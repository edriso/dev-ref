import { useEffect } from 'react'

const shortcuts = [
  {
    group: 'Global',
    items: [
      { keys: ['?'], description: 'Open keyboard shortcuts' },
      { keys: ['/', '⌘K'], description: 'Open search' },
    ],
  },
  {
    group: 'Topic Page',
    items: [
      { keys: ['J'], description: 'Next section' },
      { keys: ['K'], description: 'Previous section' },
    ],
  },
  {
    group: 'Search',
    items: [
      { keys: ['↑', '↓'], description: 'Navigate results' },
      { keys: ['Enter'], description: 'Go to result' },
      { keys: ['Esc'], description: 'Close' },
    ],
  },
]

function KeyboardShortcuts({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-md mx-4 rounded-xl border border-border bg-bg shadow-2xl animate-fade-up"
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Keyboard Shortcuts</h2>
          <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-border-sub px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
            ESC
          </kbd>
        </div>

        <div className="p-5 space-y-5">
          {shortcuts.map((group) => (
            <div key={group.group}>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5">
                {group.group}
              </h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item.description}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-text-sub">{item.description}</span>
                    <div className="flex items-center gap-1.5">
                      {item.keys.map((key) => (
                        <kbd
                          key={key}
                          className="min-w-[24px] text-center rounded border border-border-sub bg-bg-alt px-1.5 py-0.5 text-xs font-mono text-text-sub"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { KeyboardShortcuts }
