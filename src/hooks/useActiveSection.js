import { useState, useEffect, useRef } from 'react'

export default function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('')
  const intersecting = useRef(new Set())

  useEffect(() => {
    if (!sectionIds.length) return
    intersecting.current.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.current.add(entry.target.id)
          } else {
            intersecting.current.delete(entry.target.id)
          }
        })

        // Pick the first intersecting section in DOM order
        for (const id of sectionIds) {
          if (intersecting.current.has(id)) {
            setActiveId(id)
            return
          }
        }
      },
      { rootMargin: '-112px 0px -65% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
