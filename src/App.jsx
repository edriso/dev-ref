import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/ui/ScrollToTop'
import BackToTop from './components/ui/BackToTop'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <BackToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:topicId" element={<TopicPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
