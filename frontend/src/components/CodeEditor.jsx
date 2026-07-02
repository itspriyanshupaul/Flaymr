import { useState, useEffect } from 'react'
import { detectLanguage } from '../utils/detectLang'

function CodeEditor({ onRoast, loading }) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('Python')

  useEffect(() => {
    if (code.trim()) {
      const detected = detectLanguage(code)
      setLanguage(detected)
    }
  }, [code])

  const handleRoast = () => {
    if (!code.trim()) return
    onRoast(code, language)
  }

  return (
    <div className="bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
        <span className="text-[11px] font-medium text-gray-400 dark:text-[#444] uppercase tracking-widest" style={{fontFamily:'JetBrains Mono,monospace'}}>
          AI Code Reviewer
        </span>
      </div>

      <h1 className="text-[24px] font-bold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight" style={{fontFamily:'Space Grotesk,sans-serif'}}>
        Paste your code.<br />
        We'll <span className="text-orange-500">destroy</span> it. Then fix it.
      </h1>
      <p className="text-[13px] text-gray-500 dark:text-[#888] leading-relaxed mb-5">
        Flaymr gives you brutally honest feedback — bugs, security holes, performance issues — then hands you the fix.
      </p>

      {/* Code input */}
      <div className="bg-[#111] rounded-xl overflow-hidden border border-[#1e1e1e] mb-4">
        <div className="bg-[#141414] px-4 py-2.5 flex items-center gap-2 border-b border-[#1e1e1e]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
          </div>
          <span className="ml-auto text-[11px] text-[#444]" style={{fontFamily:'JetBrains Mono,monospace'}}>
            {language.toLowerCase() === 'javascript' ? 'script.js' :
             language.toLowerCase() === 'typescript' ? 'script.ts' :
             language.toLowerCase() === 'python' ? 'main.py' :
             language.toLowerCase() === 'java' ? 'Main.java' :
             language.toLowerCase() === 'c++' ? 'main.cpp' :
             language.toLowerCase() === 'go' ? 'main.go' :
             language.toLowerCase() === 'rust' ? 'main.rs' : 'code.txt'}
          </span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`# Paste your ${language} code here...`}
          className="w-full min-h-[180px] bg-[#111] text-[#a8b5c8] border-none outline-none resize-y p-4 text-[13px] leading-relaxed placeholder-[#333]"
          style={{fontFamily:'JetBrains Mono,monospace'}}
          spellCheck={false}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#1e1e1e] bg-gray-50 dark:bg-[#161616] text-gray-600 dark:text-[#888] text-[13px] outline-none cursor-pointer"
        >
          <option>Python</option>
          <option>JavaScript</option>
          <option>TypeScript</option>
          <option>Java</option>
          <option>C++</option>
          <option>Go</option>
          <option>Rust</option>
        </select>

        {code.trim() && (
          <span className="text-[11px] text-gray-400 dark:text-[#444]">
            Auto-detected: <span className="text-orange-500 font-medium">{language}</span>
          </span>
        )}

        <button
          onClick={handleRoast}
          disabled={loading || !code.trim()}
          className="ml-auto px-5 py-2 rounded-xl bg-orange-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all flex items-center gap-2"
          style={{fontFamily:'Space Grotesk,sans-serif'}}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Roasting...
            </>
          ) : (
            <>🔥 Roast my code</>
          )}
        </button>
      </div>
    </div>
  )
}

export default CodeEditor