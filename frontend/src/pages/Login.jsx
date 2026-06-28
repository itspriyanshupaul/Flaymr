import { useState } from 'react'
import { auth, googleProvider } from '../firebase'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogle = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailAuth = async () => {
    if (!email || !password) return
    setLoading(true)
    setError(null)
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)/, ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-[28px] font-bold text-gray-900 dark:text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            Fla<span className="text-orange-500">ymr</span>
          </div>
          <div className="text-[14px] text-gray-500 dark:text-[#888]">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-6 shadow-sm">

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e1e1e] bg-white dark:bg-[#161616] text-gray-700 dark:text-white text-[14px] font-medium hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all mb-4 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100 dark:bg-[#1e1e1e]"></div>
            <span className="text-[12px] text-gray-400 dark:text-[#444]">or</span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-[#1e1e1e]"></div>
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e1e1e] bg-gray-50 dark:bg-[#161616] text-gray-900 dark:text-white text-[14px] outline-none focus:border-orange-400 dark:focus:border-orange-500 transition-colors placeholder-gray-400 dark:placeholder-[#444]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e1e1e] bg-gray-50 dark:bg-[#161616] text-gray-900 dark:text-white text-[14px] outline-none focus:border-orange-400 dark:focus:border-orange-500 transition-colors placeholder-gray-400 dark:placeholder-[#444]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-[12px] text-orange-500 mb-3 bg-orange-50 dark:bg-[#1a0800] px-3 py-2 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleEmailAuth}
            disabled={loading || !email || !password}
            className="w-full py-2.5 rounded-xl bg-orange-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all"
            style={{fontFamily:'Space Grotesk,sans-serif'}}
          >
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
          </button>

          {/* Toggle signup/login */}
          <div className="text-center mt-4 text-[13px] text-gray-500 dark:text-[#888]">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => { setIsSignup(!isSignup); setError(null) }}
              className="text-orange-500 font-medium ml-1 hover:underline"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login