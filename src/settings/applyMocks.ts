import { mockFetch } from 'src/api/back'

let isInitialized = false

export const applyMocks = () => {
  if (isInitialized) {
    return
  }

  window.fetch = mockFetch

  isInitialized = true
}
