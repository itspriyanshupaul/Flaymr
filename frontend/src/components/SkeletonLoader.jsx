function SkeletonLoader() {
  return (
    <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm animate-pulse">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-[#171717]">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-[#1a1a1a] shrink-0" />
        <div className="flex-1">
          <div className="h-4 bg-gray-100 dark:bg-[#1a1a1a] rounded w-1/3 mb-2" />
          <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-2/3" />
        </div>
      </div>

      {/* Score bars */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-[#171717]">
        <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-24 mb-4" />
        {[1,2,3,4].map(i => (
          <div key={i} className="flex items-center gap-3 mb-3">
            <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-20" />
            <div className="flex-1 h-[5px] bg-gray-100 dark:bg-[#1a1a1a] rounded-full" />
            <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-8" />
          </div>
        ))}
      </div>

      {/* Issues */}
      <div className="px-5 py-4">
        <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-16 mb-4" />
        {[1,2,3].map(i => (
          <div key={i} className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1e1e1e] rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-100 dark:bg-[#1a1a1a] rounded w-16" />
              <div className="h-4 bg-gray-100 dark:bg-[#1a1a1a] rounded w-32" />
            </div>
            <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-full mb-1" />
            <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded w-3/4" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default SkeletonLoader