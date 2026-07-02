function SeverityMeter({ score }) {
  const getLevel = (score) => {
    if (score >= 9) return { label: 'Legendary', emoji: '👑', color: 'text-yellow-500', bars: 5 }
    if (score >= 7) return { label: 'Clean', emoji: '✅', color: 'text-green-500', bars: 4 }
    if (score >= 5) return { label: 'Meh', emoji: '😐', color: 'text-blue-500', bars: 3 }
    if (score >= 3) return { label: 'Messy', emoji: '😬', color: 'text-orange-500', bars: 2 }
    return { label: 'Disaster', emoji: '💀', color: 'text-red-500', bars: 1 }
  }

  const level = getLevel(score)

  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#161616] border border-gray-100 dark:border-[#1e1e1e] rounded-xl px-4 py-3">
      <span className="text-2xl">{level.emoji}</span>
      <div className="flex-1">
        <div className={`text-[13px] font-semibold ${level.color} mb-1`} style={{fontFamily:'Space Grotesk,sans-serif'}}>
          {level.label}
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= level.bars
                  ? level.bars >= 4 ? 'bg-green-500' : level.bars === 3 ? 'bg-blue-500' : level.bars === 2 ? 'bg-orange-500' : 'bg-red-500'
                  : 'bg-gray-200 dark:bg-[#2a2a2a]'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-[20px] font-bold text-gray-900 dark:text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>
        {score}<span className="text-[12px] text-gray-400 dark:text-[#444]">/10</span>
      </div>
    </div>
  )
}

export default SeverityMeter