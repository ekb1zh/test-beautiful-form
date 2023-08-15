import { DELAY_BEFORE_RESPONSE, Route } from 'src/_mocks/fetch/constants'
import { signUp, signIn, signOut, ping } from 'src/_mocks/fetch/controllers'
import { Schema } from 'src/api'

const router = (
  url: RequestInfo | URL,
  options?: RequestInit | undefined,
): Schema.Api.Response => {
  const { body, headers } = options!

  switch (url as Schema.Api.Route) {
    case Route.SignIn:
      return signIn(body!)

    case Route.SignUp:
      return signUp(body!)

    case Route.SignOut:
      return signOut(headers!)

    case Route.Ping:
      return ping(headers!)

    default:
      return {
        error: `Unknown url ${url}`,
      }
  }
}

window.fetch = async (url, options) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_BEFORE_RESPONSE))

  const response = router(url, options)

  return new Response(JSON.stringify(response))
}

export {}
