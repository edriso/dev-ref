import { Link } from 'react-router-dom'
import { Code } from 'lucide-react'
import topics from '../data/topics'

const dataModules = import.meta.glob('../data/*.js', { eager: true })

function getSectionCount(id) {
  const key = `../data/${id}.js`
  return dataModules[key]?.default?.sections?.length || 0
}

const colorMap = {
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
    hoverText: 'group-hover:text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  cyan: {
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
    hoverText: 'group-hover:text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400',
  },
  violet: {
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-400',
    hoverBorder: 'hover:border-violet-500/50',
    hoverText: 'group-hover:text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400',
  },
  yellow: {
    iconBg: 'bg-yellow-500/10',
    iconText: 'text-yellow-400',
    hoverBorder: 'hover:border-yellow-500/50',
    hoverText: 'group-hover:text-yellow-400',
    badge: 'bg-yellow-500/10 text-yellow-400',
  },
  pink: {
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-400',
    hoverBorder: 'hover:border-pink-500/50',
    hoverText: 'group-hover:text-pink-400',
    badge: 'bg-pink-500/10 text-pink-400',
  },
  orange: {
    iconBg: 'bg-orange-500/10',
    iconText: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/50',
    hoverText: 'group-hover:text-orange-400',
    badge: 'bg-orange-500/10 text-orange-400',
  },
  teal: {
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-400',
    hoverBorder: 'hover:border-teal-500/50',
    hoverText: 'group-hover:text-teal-400',
    badge: 'bg-teal-500/10 text-teal-400',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/50',
    hoverText: 'group-hover:text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400',
  },
  lime: {
    iconBg: 'bg-lime-500/10',
    iconText: 'text-lime-400',
    hoverBorder: 'hover:border-lime-500/50',
    hoverText: 'group-hover:text-lime-400',
    badge: 'bg-lime-500/10 text-lime-400',
  },
  rose: {
    iconBg: 'bg-rose-500/10',
    iconText: 'text-rose-400',
    hoverBorder: 'hover:border-rose-500/50',
    hoverText: 'group-hover:text-rose-400',
    badge: 'bg-rose-500/10 text-rose-400',
  },
  red: {
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-400',
    hoverBorder: 'hover:border-red-500/50',
    hoverText: 'group-hover:text-red-400',
    badge: 'bg-red-500/10 text-red-400',
  },
  slate: {
    iconBg: 'bg-slate-500/10',
    iconText: 'text-slate-400',
    hoverBorder: 'hover:border-slate-500/50',
    hoverText: 'group-hover:text-slate-400',
    badge: 'bg-slate-500/10 text-slate-400',
  },
}

function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden text-center mb-16 animate-fade-up">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.07 }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex rounded-full bg-accent/10 p-4 mb-6">
            <Code size={32} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Best Practice Code</h1>
          <p className="text-lg text-text-sub max-w-2xl mx-auto">
            A personal reference for best practices, folder structures, conventions,
            packages, and code patterns for web development.
          </p>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-6">
        Topics
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 card-stagger">
        {topics.map((fw) => {
          const Icon = fw.icon
          const colors = colorMap[fw.color] || colorMap.emerald
          const sectionCount = getSectionCount(fw.id)

          return (
            <Link
              key={fw.id}
              to={`/${fw.id}`}
              className={`group block rounded-xl border border-border bg-bg-alt p-6 transition ${colors.hoverBorder} hover:bg-bg-alt/80`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex rounded-lg ${colors.iconBg} p-3 ${colors.iconText}`}>
                  <Icon size={24} />
                </div>
                {sectionCount > 0 && (
                  <span className={`rounded-full ${colors.badge} px-2.5 py-0.5 text-xs font-medium`}>
                    {sectionCount} sections
                  </span>
                )}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${colors.hoverText} transition-colors`}>
                {fw.name}
              </h3>
              <p className="text-sm text-text-sub">{fw.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default HomePage
