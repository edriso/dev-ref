import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react'
import topics from '../../data/topics'

const dataModules = import.meta.glob('../../data/*.js', { eager: true })

// Build search index once
const searchIndex = topics.flatMap((topic) => {
  const key = `../../data/${topic.id}.js`
  const data = dataModules[key]?.default
  if (!data?.sections) return []

  return data.sections.map((section) => ({
    topicId: topic.id,
    topicName: topic.name,
    topicIcon: topic.icon,
    sectionId: section.id,
    sectionTitle: section.title,
    // Create searchable text from section content
    text: section.blocks
      .filter((b) => b.type === 'text' || b.type === 'heading')
      .map((b) => b.content)
      .join(' ')
      .toLowerCase(),
  }))
})

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const terms = query.toLowerCase().split(/\s+/)
    return searchIndex
      .filter((item) => {
        const haystack = `${item.topicName} ${item.sectionTitle} ${item.text}`.toLowerCase()
        return terms.every((term) => haystack.includes(term))
      })
      .slice(0, 20)
  }, [query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      // Focus input on next frame
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const selected = listRef.current.children[selectedIndex]
    selected?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const goToResult = useCallback(
    (result) => {
      onClose()
      navigate(`/${result.topicId}#${result.sectionId}`)
    },
    [navigate, onClose]
  )

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      goToResult(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-bg shadow-2xl animate-fade-up"
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search size={18} className="shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics and sections..."
            className="flex-1 bg-transparent py-4 text-sm text-text placeholder-text-muted outline-none"
            aria-label="Search"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-border-sub px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {query.trim() && (
          <div ref={listRef} className="max-h-80 overflow-y-auto p-2" role="listbox">
            {results.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-text-muted">
                No results for "{query}"
              </div>
            ) : (
              results.map((result, i) => {
                const Icon = result.topicIcon
                return (
                  <button
                    key={`${result.topicId}-${result.sectionId}`}
                    onClick={() => goToResult(result)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      i === selectedIndex
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-sub hover:bg-bg-hover/50 hover:text-text'
                    }`}
                    role="option"
                    aria-selected={i === selectedIndex}
                  >
                    <Icon size={16} className="shrink-0 text-text-muted" />
                    <div className="flex-1 min-w-0">
                      <span className="text-text-muted text-xs">{result.topicName}</span>
                      <ArrowRight size={10} className="inline mx-1 text-text-muted" />
                      <span className={i === selectedIndex ? 'text-accent' : 'text-text'}>
                        {result.sectionTitle}
                      </span>
                    </div>
                    {i === selectedIndex && (
                      <CornerDownLeft size={14} className="shrink-0 text-text-muted" />
                    )}
                  </button>
                )
              })
            )}
          </div>
        )}

        {/* Footer hint */}
        {!query.trim() && (
          <div className="px-4 py-6 text-center text-sm text-text-muted">
            Search across all {topics.length} topics and {searchIndex.length} sections
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchModal
