export const applyGlobalErrorCatching = () => {
  const eventNames = ['unhandledrejection', 'rejectionhandled'] as const

  const handler = (event: PromiseRejectionEvent) => {
    event.preventDefault()
    console.error(event)
  }

  eventNames.forEach((eventName) => {
    window.addEventListener(eventName, handler)
  })
}
