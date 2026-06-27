function ScoreBar({ label, score }) {
  const percentage = (score / 10) * 100

  return (
    <div className="flex items-center gap-3 mb-3 last:mb-0">
      <div className="text-[12px] text-gray-500 dark:text-[#888] w-24 shrink-0">
        {label}
      </div>
      <div className="flex-1 h-[5px] bg-gray-100 dark:bg-[#161616] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-[12px] font-semibold text-orange-500 w-8 text-right" style={{fontFamily:'JetBrains Mono,monospace'}}>
        {score}
      </div>
    </div>
  )
}

export default ScoreBar