import { DELAY_BEFORE_RESPONSE } from 'src/_mocks/fetch/constants'
import { router } from 'src/_mocks/fetch/router'

export const fetch: Window['fetch'] = async (url, options) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_BEFORE_RESPONSE))

  const responseBody = router(url, options)

  return new window.Response(JSON.stringify(responseBody))
}
