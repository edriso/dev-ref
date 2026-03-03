import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found</p>
      <Link
        to="/"
        className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium hover:bg-emerald-500 transition-colors"
      >
        Go Home
      </Link>
    </main>
  )
}

export default NotFoundPage
