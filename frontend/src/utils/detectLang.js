export function detectLanguage(code) {
  if (!code || code.trim() === '') return 'Python'

  // Python
  if (code.match(/def |import |print\(|elif |isinstance\(|:\n/)) return 'Python'

  // JavaScript
  if (code.match(/const |let |var |=>|console\.log|document\.|window\./)) return 'JavaScript'

  // TypeScript
  if (code.match(/interface |type |: string|: number|: boolean|<T>|tsx/)) return 'TypeScript'

  // Java
  if (code.match(/public class|System\.out|void main|@Override|import java/)) return 'Java'

  // C++
  if (code.match(/#include|std::|cout|cin|namespace|->|nullptr/)) return 'C++'

  // Go
  if (code.match(/func |package |fmt\.|:=|goroutine/)) return 'Go'

  // Rust
  if (code.match(/fn |let mut|println!|impl |use std|match /)) return 'Rust'

  return 'Python' // default
}