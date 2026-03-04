import { Link } from 'react-router-dom'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex rounded-full bg-bg-hover p-5 mb-8">
          <FileQuestion size={48} className="text-text-muted" />
        </div>

        <h1 className="text-7xl font-bold text-text-muted mb-2">404</h1>
        <h2 className="text-xl font-semibold text-text-body mb-3">Page not found</h2>
        <p className="text-text-muted mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-border-sub bg-bg-hover/50 px-5 py-2.5 text-sm font-medium text-text-body hover:bg-bg-hover hover:text-text transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-dark px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors text-white"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
