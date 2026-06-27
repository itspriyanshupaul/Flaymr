import { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import ResultCard from '../components/ResultCard'
import { roastCode } from '../utils/api'

function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fixedCode, setFixedCode] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleRoast = async (code, language) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setFixedCode(null)
    try {
      const data = await roastCode(code, language)
      setResult(data)
      setFixedCode(data.fixed_code)
      // Save to history
      const history = JSON.parse(localStorage.getItem('flaymr_history') || '[]')
      history.unshift({
        id: Date.now(),
        language,
        score: data.overall_score,
        summary: data.summary,
        time: new Date().toISOString()
      })
      localStorage.setItem('flaymr_history', JSON.stringify(history.slice(0, 20)))
    } catch (err) {
      setError('Something went wrong. Check your API key or try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fixedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
      
      {/* Left column */}
      <div className="flex flex-col gap-5">
        <CodeEditor onRoast={handleRoast} loading={loading} />

        {/* Loading bar */}
        {loading && (
          <div className="h-[3px] rounded-full overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
            <div className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 animate-pulse rounded-full" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-[#1a0800] border border-red-200 dark:border-[#2a0800] text-red-600 dark:text-orange-400 rounded-xl px-5 py-4 text-[13px]">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && <ResultCard result={result} />}

        {/* Fixed code */}
        {fixedCode && (
          <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#171717]">
              <div className="text-[14px] font-semibold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                Fixed code
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e1e1e] text-[12px] text-gray-500 dark:text-[#888] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-white transition-all"
              >
                {copied ? '✅ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#111] p-5 overflow-x-auto text-[12.5px] leading-relaxed text-[#a8b5c8]" style={{fontFamily:'JetBrains Mono,monospace'}}>
              {fixedCode}
            </pre>
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-5">
        
        {/* Stats */}
        <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-5 shadow-sm">
          <div className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            Your stats
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '0', label: 'Files roasted' },
              { val: '0', label: 'Issues fixed' },
              { val: '—', label: 'Avg score' },
              { val: '🔥 0', label: 'Day streak' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 dark:bg-[#161616] border border-gray-100 dark:border-[#1e1e1e] rounded-xl p-3">
                <div className="text-[22px] font-bold text-orange-500 leading-none mb-1" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                  {s.val}
                </div>
                <div className="text-[11px] text-gray-400 dark:text-[#444]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-5 shadow-sm">
          <div className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            Quick tips
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '🛡️', title: 'Never trust user input.', desc: 'Sanitize and validate everything before it touches your database.' },
              { icon: '⚡', title: 'Query what you need.', desc: 'SELECT * fetches columns you\'ll never use. Name them explicitly.' },
              { icon: '📝', title: 'Type hints save time.', desc: 'Future-you will thank present-you for adding type annotations.' },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-[#161616] border border-gray-100 dark:border-[#1e1e1e] flex items-center justify-center text-[14px] shrink-0 mt-0.5">
                  {tip.icon}
                </div>
                <div className="text-[12px] text-gray-500 dark:text-[#888] leading-relaxed">
                  <strong className="text-gray-900 dark:text-white font-semibold">{tip.title}</strong> {tip.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home