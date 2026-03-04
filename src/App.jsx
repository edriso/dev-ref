import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/ui/ScrollToTop'
import BackToTop from './components/ui/BackToTop'
import HomePage from './pages/HomePage'
import FrameworkPage from './pages/FrameworkPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <ScrollToTop />
      <BackToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:frameworkId" element={<FrameworkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
