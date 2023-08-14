import { DELAY_BEFORE_RESPONSE, Route } from 'src/_mocks/fetch/constants'
import { signUp, signIn, signOut, ping } from 'src/_mocks/fetch/controllers'
import { Schema } from 'src/api'

window.fetch = async (route, options) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_BEFORE_RESPONSE))

  if (!options) {
    const response: Schema.Api.GeneralResponseError = {
      error: `Request has no options`,
    }

    return new Response(JSON.stringify(response))
  }

  const { method, body } = options

  if (method !== 'POST') {
    const response: Schema.Api.GeneralResponseError = {
      error: `Request has incorrect method ${method}`,
    }

    return new Response(JSON.stringify(response))
  }

  if (!body) {
    const response: Schema.Api.GeneralResponseError = {
      error: `Request has no body`,
    }

    return new Response(JSON.stringify(response))
  }

  switch (route as Schema.Api.Route) {
    case Route.SignIn:
      return signIn(body)

    case Route.SignUp:
      return signUp(body)

    case Route.SignOut:
      return signOut(body)

    case Route.Ping:
      return ping(body)

    default: {
      const response: Schema.Api.GeneralResponseError = {
        error: `Unknown route ${route}`,
      }

      return new Response(JSON.stringify(response))
    }
  }
}

export {}
