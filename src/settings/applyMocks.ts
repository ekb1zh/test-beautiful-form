import { fetch } from 'src/_mocks'

export const applyMocks = () => {
  if (process.env.NODE_ENV !== 'test') {
    window.fetch = fetch
  }
}
