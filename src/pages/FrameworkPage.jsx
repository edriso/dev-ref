import { useParams } from 'react-router-dom'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { ListCollapse, List } from 'lucide-react'
import frameworks from '../data/frameworks'
import DocLayout from '../components/layout/DocLayout'
import SectionRenderer from '../components/ui/SectionRenderer'
import NotFoundPage from './NotFoundPage'

const STORAGE_KEY = 'viewMode'

const dataModules = import.meta.glob('../data/*.js', { eager: true })

function getFrameworkData(id) {
  const key = `../data/${id}.js`
  return dataModules[key]?.default
}

function FrameworkPage() {
  const { frameworkId } = useParams()
  const framework = frameworks.find((fw) => fw.id === frameworkId)
  const data = useMemo(() => getFrameworkData(frameworkId), [frameworkId])

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

  // Reset expanded section when switching frameworks
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
        setExpandedSection(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    // Also handle initial hash on mount
    const initialHash = window.location.hash.slice(1)
    if (initialHash && viewMode === 'collapsed') {
      setExpandedSection(initialHash)
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

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed'))
  }, [])

  if (!framework || !data) {
    return <NotFoundPage />
  }

  const Icon = framework.icon
  const isCollapsed = viewMode === 'collapsed'

  return (
    <DocLayout sections={data.sections}>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Icon size={28} className="text-gray-400" />
            <h1 className="text-3xl font-bold">{data.name}</h1>
          </div>
          <button
            onClick={toggleViewMode}
            title={isCollapsed ? 'Expand all sections' : 'Collapse all sections'}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-colors cursor-pointer"
          >
            {isCollapsed ? (
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
        <p className="text-gray-400">{data.description}</p>
        <p className="text-sm text-gray-600 mt-1">{data.sections.length} sections</p>
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
    </DocLayout>
  )
}

export default FrameworkPage
