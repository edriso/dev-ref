import { useRef, useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from './CopyButton'

function CodeBlock({ code, language = 'javascript', fileName }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-lg border border-[#3e4451] overflow-hidden my-4">
      {fileName && (
        <div className="flex items-center justify-between bg-[#21252b] px-4 py-2 border-b border-[#3e4451]">
          <span className="text-xs text-[#abb2bf] font-mono">{fileName}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!fileName && (
        <div className="flex justify-end bg-[#21252b] px-4 py-1.5 border-b border-[#3e4451]">
          <CopyButton text={code} />
        </div>
      )}
      {visible ? (
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#282c34',
            fontSize: '0.8125rem',
          }}
          lineNumberStyle={{ color: '#636d83', minWidth: '2.5em' }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            background: '#282c34',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
          <code className="text-[#abb2bf] font-mono">{code}</code>
        </pre>
      )}
    </div>
  )
}

export default CodeBlock
