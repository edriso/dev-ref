import { useState } from 'react'
import { ChevronRight, Link as LinkIcon, Check } from 'lucide-react'
import ContentBlock from './ContentBlock'

function CopyLinkButton({ sectionId }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 shrink-0 rounded p-1 text-text-muted hover:text-accent hover:bg-bg-hover/50 transition-all cursor-pointer"
      title="Copy link to section"
      aria-label="Copy link to section"
    >
      {copied ? <Check size={16} className="text-accent" /> : <LinkIcon size={16} />}
    </button>
  )
}

function SectionRenderer({ section, index, isExpanded = true, onToggle }) {
  const isCollapsible = typeof onToggle === 'function'

  return (
    <section id={section.id} className="mb-16 scroll-mt-32 lg:scroll-mt-24">
      <div
        className={`flex items-center gap-3 mb-6 group${
          isCollapsible
            ? ' cursor-pointer select-none'
            : ''
        }`}
        onClick={isCollapsible ? () => onToggle(section.id) : undefined}
      >
        {isCollapsible && (
          <ChevronRight
            size={18}
            className={`shrink-0 text-text-muted transition-transform duration-200 group-hover:text-text-body ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        )}
        <span className="text-sm font-mono text-text-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2
          className={`text-2xl font-bold text-text${
            isCollapsible ? ' group-hover:text-accent transition-colors' : ''
          }`}
        >
          {section.title}
        </h2>
        <CopyLinkButton sectionId={section.id} />
      </div>
      {isExpanded && (
        <div className="space-y-1 section-content">
          {section.blocks.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SectionRenderer
