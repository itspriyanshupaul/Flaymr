import ScoreBar from './ScoreBar'
import IssueItem from './IssueItem'
import SeverityMeter from './SeverityMeter'

function ResultCard({ result }) {
  const scoreColor = result.overall_score >= 7
    ? 'border-green-500'
    : result.overall_score >= 4
    ? 'border-yellow-500'
    : 'border-orange-500'

  const handleShare = () => {
    const text = `🔥 My code got roasted by Flaymr!\n\nScore: ${result.overall_score}/10\n"${result.summary}"\n\nRoast your code at flaymr.vercel.app`
    if (navigator.share) {
      navigator.share({ title: 'Flaymr Roast', text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-[#171717]">
        <div className={`w-14 h-14 rounded-full border-2 ${scoreColor} flex flex-col items-center justify-center shrink-0`}>
          <div className="text-[18px] font-bold text-orange-500 leading-none" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            {result.overall_score}
          </div>
          <div className="text-[9px] text-gray-400 dark:text-[#444]" style={{fontFamily:'JetBrains Mono,monospace'}}>/10</div>
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1" style={{fontFamily:'Space Grotesk,sans-serif'}}>
            {result.overall_score >= 7 ? 'Not bad!' : result.overall_score >= 4 ? 'Needs work.' : 'Your code has problems.'}
          </div>
          <div className="text-[13px] text-gray-500 dark:text-[#888] leading-snug">
            {result.summary}
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e1e1e] text-[12px] text-gray-500 dark:text-[#888] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-orange-500 transition-all"
          >
            Share 🔥
          </button>
          <div className="hidden sm:flex gap-2">
            {result.issues.filter(i => i.severity === 'critical').length > 0 && (
              <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-orange-50 dark:bg-[#1a0800] text-orange-500" style={{fontFamily:'JetBrains Mono,monospace'}}>
                {result.issues.filter(i => i.severity === 'critical').length} critical
              </span>
            )}
            {result.issues.filter(i => i.severity === 'warning').length > 0 && (
              <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-yellow-50 dark:bg-[#1a1200] text-yellow-600" style={{fontFamily:'JetBrains Mono,monospace'}}>
                {result.issues.filter(i => i.severity === 'warning').length} warning
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Severity meter */}
      <div className="px-5 pt-4">
        <SeverityMeter score={result.overall_score} />
      </div>

      {/* Score bars */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-[#171717]">
        <div className="text-[11px] font-medium text-gray-400 dark:text-[#444] uppercase tracking-widest mb-4" style={{fontFamily:'JetBrains Mono,monospace'}}>
          Breakdown
        </div>
        <ScoreBar label="Security" score={result.scores.security} />
        <ScoreBar label="Performance" score={result.scores.performance} />
        <ScoreBar label="Readability" score={result.scores.readability} />
        <ScoreBar label="Best Practices" score={result.scores.best_practices} />
      </div>

      {/* Issues */}
      <div className="px-5 py-4">
        <div className="text-[11px] font-medium text-gray-400 dark:text-[#444] uppercase tracking-widest mb-4" style={{fontFamily:'JetBrains Mono,monospace'}}>
          Issues
        </div>
        {result.issues.map((issue, i) => (
          <IssueItem key={i} issue={issue} />
        ))}
      </div>

    </div>
  )
}

export default ResultCard