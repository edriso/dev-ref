import { useParams } from 'react-router-dom'

function FrameworkPage() {
  const { frameworkId } = useParams()

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4 capitalize">{frameworkId}</h1>
      <p className="text-gray-400">Content coming soon...</p>
    </main>
  )
}

export default FrameworkPage
