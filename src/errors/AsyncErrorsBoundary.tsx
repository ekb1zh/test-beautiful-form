import React, { useEffect } from 'react'

export const AsyncErrorsBoundary: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    const eventNames = ['unhandledrejection', 'rejectionhandled'] as const

    const handler = (event: PromiseRejectionEvent) => {
      event.preventDefault()
      console.error(event)
    }

    eventNames.forEach((eventName) => {
      window.addEventListener(eventName, handler)
    })

    return () => {
      eventNames.forEach((eventName) => {
        window.removeEventListener(eventName, handler)
      })
    }
  }, [])

  return <>{children}</>
}
