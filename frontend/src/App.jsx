import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import History from './pages/History'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#080808] flex items-center justify-center">
        <div className="text-[28px] font-bold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          Fla<span className="text-orange-500">ymr</span>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App