import { useEffect, useRef } from 'react'

export function useModal() {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const oldOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = oldOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])
  return ref
}
