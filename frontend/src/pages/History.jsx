import { useState, useEffect } from 'react'
import ResultCard from '../components/ResultCard'
import { getRoasts, deleteAllRoasts } from '../utils/firestore'

function History({ user }) {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      if (user) {
        const data = await getRoasts(user.uid)
        setHistory(data)
      }
      setLoading(false)
    }
    loadHistory()
  }, [user])

  const clearHistory = async () => {
    if (user) {
      await deleteAllRoasts(user.uid)
      setHistory([])
      setSelected(null)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 7) return 'bg-green-500'
    if (score >= 4) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (loading) {
    return (
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-4 animate-pulse">
              <div className="h-4 bg-gray-100 dark:bg-[#1a1a1a] rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (selected) {
    return (
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          Back to history
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className={`w-2.5 h-2.5 rounded-full ${getScoreColor(selected.score)}`} />
          <div className="text-[18px] font-bold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            {selected.language} file
          </div>
          <div className="ml-auto text-[12px] text-gray-400 dark:text-[#444]" style={{fontFamily:'JetBrains Mono,monospace'}}>
            {timeAgo(selected.time)}
          </div>
        </div>

        {selected.result ? (
          <ResultCard result={selected.result} />
        ) : (
          <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-8 text-center shadow-sm">
            <div className="text-3xl mb-3">📋</div>
            <div className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>
              {selected.score}/10
            </div>
            <div className="text-[13px] text-gray-500 dark:text-[#888]">
              Full details not saved. Roast your code again to see the breakdown.
            </div>
          </div>
        )}

        {selected.code && (
          <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm mt-5">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#171717]">
              <div className="text-[14px] font-semibold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                Original code
              </div>
            </div>
            <pre className="bg-[#111] p-5 overflow-x-auto text-[12.5px] leading-relaxed text-[#a8b5c8]" style={{fontFamily:'JetBrains Mono,monospace'}}>
              {selected.code}
            </pre>
          </div>
        )}

        {selected.result?.fixed_code && (
          <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm mt-5">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#171717]">
              <div className="text-[14px] font-semibold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                Fixed code
              </div>
            </div>
            <pre className="bg-[#111] p-5 overflow-x-auto text-[12.5px] leading-relaxed text-[#a8b5c8]" style={{fontFamily:'JetBrains Mono,monospace'}}>
              {selected.result.fixed_code}
            </pre>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 dark:text-white tracking-tight" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            Roast history
          </h1>
          <p className="text-[13px] text-gray-500 dark:text-[#888] mt-1">
            All your past code roasts
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e1e1e] text-[12px] text-gray-500 dark:text-[#888] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-red-500 transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 && (
        <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl px-6 py-16 text-center shadow-sm">
          <div className="text-4xl mb-4">🔥</div>
          <div className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            No roasts yet
          </div>
          <div className="text-[13px] text-gray-500 dark:text-[#888]">
            Paste some code and let Flaymr destroy it.
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:border-orange-400 dark:hover:border-orange-500 transition-all cursor-pointer"
            >
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getScoreColor(item.score)}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5 truncate" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                  {item.language} file
                </div>
                <div className="text-[12px] text-gray-500 dark:text-[#888] truncate">
                  {item.summary}
                </div>
              </div>
              <div className="text-[13px] font-semibold text-orange-500 shrink-0" style={{fontFamily:'JetBrains Mono,monospace'}}>
                {item.score}/10
              </div>
              <div className="text-[11px] text-gray-400 dark:text-[#444] shrink-0" style={{fontFamily:'JetBrains Mono,monospace'}}>
                {timeAgo(item.time)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History