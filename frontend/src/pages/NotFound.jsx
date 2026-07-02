import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080808] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[80px] font-bold text-gray-100 dark:text-[#111] leading-none mb-4" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          404
        </div>
        <div className="text-[24px] font-bold text-gray-900 dark:text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>
          Page not found
        </div>
        <div className="text-[14px] text-gray-500 dark:text-[#888] mb-8">
          Looks like this page got roasted and didn't survive. 🔥
        </div>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-orange-500 text-white rounded-xl text-[14px] font-semibold hover:opacity-90 transition-all"
          style={{fontFamily:'Space Grotesk,sans-serif'}}
        >
          Back to Flaymr
        </Link>
      </div>
    </div>
  )
}

export default NotFound