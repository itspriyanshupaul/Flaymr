import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

function Navbar({ user }) {
  const [dark, setDark] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/login')
  }

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
          <span className="hidden sm:block">{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>

        {/* User section */}
        {!user ? (
          <a
            href="/login"
            className="px-4 py-1.5 rounded-lg bg-orange-500 text-white text-[13px] font-semibold hover:opacity-90 transition-all"
          >
            Sign in
          </a>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[11px] font-bold">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
              )}
              <span className="text-[13px] text-gray-700 dark:text-[#888] hidden sm:block max-w-[120px] truncate">
                {user?.displayName || user?.email}
              </span>
              <span className="text-gray-400 text-[10px]">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-[#1e1e1e]">
                  <div className="text-[12px] font-semibold text-gray-900 dark:text-white truncate">
                    {user?.displayName || 'User'}
                  </div>
                  <div className="text-[11px] text-gray-400 dark:text-[#444] truncate">
                    {user?.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-red-500 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar