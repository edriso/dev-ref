import { Link, useParams } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import frameworks from '../../data/frameworks'

function Navbar() {
  const { frameworkId } = useParams()

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold hover:text-emerald-400 transition-colors">
          <BookOpen size={20} />
          <span className="hidden sm:inline">Best Practice Code</span>
        </Link>

        <div className="flex items-center gap-1">
          {frameworks.map((fw) => (
            <Link
              key={fw.id}
              to={`/${fw.id}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                frameworkId === fw.id
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {fw.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
