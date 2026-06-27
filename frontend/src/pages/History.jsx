import { useState, useEffect } from 'react'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('flaymr_history') || '[]')
    setHistory(data)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('flaymr_history')
    setHistory([])
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

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
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

      {/* Empty state */}
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

      {/* History list */}
      {history.length > 0 && (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:border-orange-400 dark:hover:border-orange-500 transition-all cursor-pointer"
            >
              {/* Score dot */}
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getScoreColor(item.score)}`} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5 truncate" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                  {item.language} file
                </div>
                <div className="text-[12px] text-gray-500 dark:text-[#888] truncate">
                  {item.summary}
                </div>
              </div>

              {/* Score */}
              <div className="text-[13px] font-semibold text-orange-500 shrink-0" style={{fontFamily:'JetBrains Mono,monospace'}}>
                {item.score}/10
              </div>

              {/* Time */}
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