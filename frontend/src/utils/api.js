const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function roastCode(code, language) {
  const prompt = `You are Flaymr — a brutally honest but helpful AI code reviewer.

Analyze this ${language} code and respond ONLY with a valid JSON object, no markdown, no extra text.

Code:
\`\`\`${language}
${code}
\`\`\`

Respond with exactly this JSON structure:
{
  "overall_score": 6.5,
  "summary": "One line brutal but funny summary of the code quality",
  "scores": {
    "security": 7,
    "performance": 6,
    "readability": 8,
    "best_practices": 5
  },
  "issues": [
    {
      "severity": "critical",
      "title": "Issue title",
      "line": "line 3",
      "description": "Clear explanation of the issue and how to fix it"
    }
  ],
  "fixed_code": "The complete fixed version of the code"
}`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  })

  const data = await response.json()
  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}