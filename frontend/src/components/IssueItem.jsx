function IssueItem({ issue }) {
  const colors = {
    critical: {
      badge: 'bg-orange-50 dark:bg-[#1a0800] text-orange-600 dark:text-orange-400',
      border: 'border-orange-500',
    },
    warning: {
      badge: 'bg-yellow-50 dark:bg-[#1a1200] text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-500',
    },
    info: {
      badge: 'bg-blue-50 dark:bg-[#001018] text-blue-600 dark:text-blue-400',
      border: 'border-blue-500',
    },
  }

  const style = colors[issue.severity] || colors.info

  return (
    <div className={`bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1e1e1e] border-l-2 ${style.border} rounded-xl p-4 mb-3 last:mb-0 hover:border-orange-400 dark:hover:border-orange-500 transition-all cursor-pointer`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${style.badge}`} style={{fontFamily:'JetBrains Mono,monospace'}}>
          {issue.severity}
        </span>
        <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
          {issue.title}
        </span>
        {issue.line && (
          <span className="ml-auto text-[11px] text-gray-400 dark:text-[#444]" style={{fontFamily:'JetBrains Mono,monospace'}}>
            {issue.line}
          </span>
        )}
      </div>
      <div className="text-[12px] text-gray-500 dark:text-[#888] leading-relaxed">
        {issue.description}
      </div>
    </div>
  )
}

export default IssueItem