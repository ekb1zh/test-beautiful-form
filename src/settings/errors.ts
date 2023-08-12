/*
  Global handling errors
*/
window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault()
  console.error(event)
})

window.addEventListener('rejectionhandled', (event) => {
  event.preventDefault()
  console.error(event)
})

export {}
