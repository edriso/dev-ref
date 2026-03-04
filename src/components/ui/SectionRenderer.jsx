import { ChevronRight } from 'lucide-react'
import ContentBlock from './ContentBlock'

function SectionRenderer({ section, index, isExpanded = true, onToggle }) {
  const isCollapsible = typeof onToggle === 'function'

  return (
    <section id={section.id} className="mb-16 scroll-mt-32 lg:scroll-mt-24">
      <div
        className={`flex items-baseline gap-3 mb-6${
          isCollapsible
            ? ' cursor-pointer select-none group'
            : ''
        }`}
        onClick={isCollapsible ? () => onToggle(section.id) : undefined}
      >
        {isCollapsible && (
          <ChevronRight
            size={18}
            className={`shrink-0 text-gray-500 transition-transform duration-200 translate-y-0.5 group-hover:text-gray-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        )}
        <span className="text-sm font-mono text-gray-600">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2
          className={`text-2xl font-bold text-gray-100${
            isCollapsible ? ' group-hover:text-emerald-400 transition-colors' : ''
          }`}
        >
          {section.title}
        </h2>
      </div>
      {isExpanded && (
        <div className="space-y-1">
          {section.blocks.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SectionRenderer
