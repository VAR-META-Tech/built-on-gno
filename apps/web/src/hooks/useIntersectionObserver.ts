import { useEffect } from 'react'

interface IIntersectionObserver {
  enabled?: boolean
  onIntersect?: any
  root?: any
  rootMargin?: string
  target?: any
  threshold?: number
}

export function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = '0px',
  target,
  threshold = 0.1,
}: IIntersectionObserver) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [target.current, enabled])
}
