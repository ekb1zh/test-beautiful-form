import { Route } from 'src/_mocks/fetch/constants'
import { signUp, signIn, signOut, ping } from 'src/_mocks/fetch/controllers'
import { Schema } from 'src/api'

export const router = (
  url: RequestInfo | URL,
  options?: RequestInit | undefined,
): Schema.Api.ResponseBody => {
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
