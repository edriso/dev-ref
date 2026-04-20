import { useParams, Link } from 'react-router-dom'
import { useState, useMemo, useEffect, useCallback, useTransition } from 'react'
import { flushSync } from 'react-dom'
import { ListCollapse, List, Loader2 } from 'lucide-react'
import topics from '../data/topics'
import DocLayout from '../components/layout/DocLayout'
import { ReadingProgress } from '../components/ui/ReadingProgress'
import SectionRenderer from '../components/ui/SectionRenderer'
import NotFoundPage from './NotFoundPage'

const STORAGE_KEY = 'viewMode'

const dataModules = import.meta.glob('../data/*.js', { eager: true })

const topicTintColors = {
  emerald: '16, 185, 129',
  cyan: '6, 182, 212',
  violet: '139, 92, 246',
  yellow: '234, 179, 8',
  pink: '236, 72, 153',
  orange: '249, 115, 22',
  teal: '20, 184, 166',
  blue: '59, 130, 246',
  lime: '132, 204, 22',
  rose: '244, 63, 94',
  red: '239, 68, 68',
  slate: '148, 163, 184',
  indigo: '99, 102, 241',
  fuchsia: '217, 70, 239',
}

function getTopicData(id) {
  const key = `../data/${id}.js`
  return dataModules[key]?.default
}

function TopicPage() {
  const { topicId } = useParams()
  const topic = topics.find((t) => t.id === topicId)
  const data = useMemo(() => getTopicData(topicId), [topicId])

  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'collapsed'
    } catch {
      return 'collapsed'
    }
  })

  const [expandedSection, setExpandedSection] = useState(
    () => data?.sections[0]?.id || null
  )

  // Reset expanded section when switching topics
  useEffect(() => {
    if (data) {
      setExpandedSection(data.sections[0]?.id || null)
    }
  }, [data])

  // Persist viewMode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, viewMode)
    } catch {
      // ignore
    }
  }, [viewMode])

  // Listen for hash changes to auto-expand target section
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.slice(1)
      if (hash && viewMode === 'collapsed') {
        // flushSync forces React to render synchronously so the DOM
        // layout is correct before we scroll (collapsing the previous
        // section shifts everything above the target)
        flushSync(() => setExpandedSection(hash))
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    // Also handle initial hash on mount
    const initialHash = window.location.hash.slice(1)
    if (initialHash && viewMode === 'collapsed') {
      flushSync(() => setExpandedSection(initialHash))
      document.getElementById(initialHash)?.scrollIntoView({ behavior: 'smooth' })
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [viewMode])

  const handleToggleSection = useCallback((sectionId) => {
    setExpandedSection((prev) => {
      if (prev === sectionId) return null
      // Scroll to the section after it expands
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      })
      return sectionId
    })
  }, [])

  const [isPending, startTransition] = useTransition()

  const toggleViewMode = useCallback(() => {
    startTransition(() => {
      setViewMode((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed'))
    })
  }, [])

  // j/k keyboard navigation between sections
  useEffect(() => {
    if (!data) return

    const handleKeyDown = (e) => {
      // Don't capture when typing in inputs or when search is open
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return

      if (e.key === 'j' || e.key === 'k') {
        e.preventDefault()
        const ids = data.sections.map((s) => s.id)

        // Find which section is currently in view
        let currentIdx = 0
        for (let i = 0; i < ids.length; i++) {
          const el = document.getElementById(ids[i])
          if (el && el.getBoundingClientRect().top <= 150) {
            currentIdx = i
          }
        }

        const nextIdx = e.key === 'j'
          ? Math.min(currentIdx + 1, ids.length - 1)
          : Math.max(currentIdx - 1, 0)

        const target = document.getElementById(ids[nextIdx])
        if (target) {
          // In collapsed mode, expand the target section
          if (viewMode === 'collapsed') {
            setExpandedSection(ids[nextIdx])
          }
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [data, viewMode])

  if (!topic || !data) {
    return <NotFoundPage />
  }

  const Icon = topic.icon
  const isCollapsed = viewMode === 'collapsed'
  const tintRgb = topicTintColors[topic.color] || topicTintColors.emerald

  return (
    <>
    <ReadingProgress color={tintRgb} />
    <DocLayout sections={data.sections}>
      <div className="relative overflow-hidden mb-10">
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[200px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(${tintRgb}, 0.04) 0%, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Icon size={28} className="text-text-sub" />
            <h1 className="text-3xl font-bold">{data.name}</h1>
          </div>
          <button
            onClick={toggleViewMode}
            disabled={isPending}
            title={isCollapsed ? 'Expand all sections' : 'Collapse all sections'}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-text-sub hover:text-text bg-bg-hover/50 hover:bg-bg-hover border border-border-sub/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span className="hidden sm:inline">Loading…</span>
              </>
            ) : isCollapsed ? (
              <>
                <List size={16} />
                <span className="hidden sm:inline">Expand All</span>
              </>
            ) : (
              <>
                <ListCollapse size={16} />
                <span className="hidden sm:inline">Collapse All</span>
              </>
            )}
          </button>
        </div>
        <p className="relative text-text-sub">{data.description}</p>
        <p className="relative text-sm text-text-muted mt-1">{data.sections.length} sections</p>
      </div>
      {data.sections.map((section, index) => (
        <SectionRenderer
          key={section.id}
          section={section}
          index={index}
          isExpanded={isCollapsed ? expandedSection === section.id : true}
          onToggle={isCollapsed ? handleToggleSection : undefined}
        />
      ))}
      {topic.related?.length > 0 && (
        <div className="mt-20 pt-10 border-t border-border">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
            Related Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {topic.related.map((relatedId) => {
              const related = topics.find((t) => t.id === relatedId)
              if (!related) return null
              const RelIcon = related.icon
              return (
                <Link
                  key={relatedId}
                  to={`/${relatedId}`}
                  className="flex items-center gap-2 rounded-lg border border-border bg-bg-alt/50 px-4 py-2.5 text-sm text-text-sub hover:text-text hover:border-border-sub hover:bg-bg-alt transition-colors"
                >
                  <RelIcon size={16} />
                  {related.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </DocLayout>
    </>
  )
}

export default TopicPage
