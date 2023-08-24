import { fetch } from 'src/_mocks'

export const applyMocks = () => {
  window.fetch = fetch
}
