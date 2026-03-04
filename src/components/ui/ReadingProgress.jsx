import { useReadingProgress } from '../../hooks/useReadingProgress'

function ReadingProgress({ color }) {
  const progress = useReadingProgress()

  if (progress <= 0) return null

  return (
    <div
      className="fixed top-16 left-0 right-0 h-0.5 z-[45]"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-accent"
        style={{
          width: `${progress * 100}%`,
          ...(color ? { backgroundColor: `rgb(${color})` } : {}),
        }}
      />
    </div>
  )
}

export { ReadingProgress }
