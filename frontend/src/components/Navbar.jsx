import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [dark, setDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#0f0f0f] border-b border-gray-100 dark:border-[#1e1e1e] h-14 flex items-center px-6 gap-4 transition-colors duration-300">
      
      {/* Logo */}
      <Link to="/" className="font-bold text-[19px] text-gray-900 dark:text-white tracking-tight shrink-0" style={{fontFamily:'Space Grotesk,sans-serif'}}>
        Fla<span className="text-orange-500">ymr</span>
      </Link>

      {/* Nav links */}
      <div className="flex gap-1 ml-2">
        <Link
          to="/"
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Roast Code
        </Link>
        <Link
          to="/history"
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
            location.pathname === '/history'
              ? 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          History
        </Link>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e1e1e] text-[13px] font-medium text-gray-500 dark:text-[#888] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-white transition-all"
        >
          <div className={`w-8 h-4 rounded-full relative transition-colors ${dark ? 'bg-orange-500' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${dark ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
          </div>
          <span>{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>

        <button className="px-3 py-1.5 rounded-lg bg-orange-500 hover:opacity-90 text-white text-[13px] font-semibold transition-opacity" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          Sign in
        </button>
      </div>
    </nav>
  )
}

export default Navbar