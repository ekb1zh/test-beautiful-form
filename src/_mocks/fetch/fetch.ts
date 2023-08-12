import { StringGenerator } from 'src/utils/StringGenerator'
import {
  FAKE_BACKEND_PREFIX,
  DELAY_BEFORE_RESPONSE,
  Route,
} from 'src/_mocks/fetch/constants'
import * as Schema from 'src/schema'

const stringGenerator = new StringGenerator({
  allowedChars:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  defaultSize: 20,
})

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
      error: `Request has incorrect method: '${method}'`,
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
    case Route.SignIn: {
      let response: Schema.Api.SignIn.Response

      try {
        const { user }: Schema.Api.SignIn.Body = JSON.parse(body as string)
        const key = `${FAKE_BACKEND_PREFIX}_${user.email}`

        if (typeof localStorage.getItem(key) === 'string') {
          const token = stringGenerator.next()
          response = {
            token,
          }
        } else {
          response = {
            error: `User '${user.email}' unregistrated`,
          }
        }
      } catch (error) {
        response = {
          error: `Can't parse request body`,
        }
      }

      return new Response(JSON.stringify(response))
    }

    case Route.SignUp: {
      let response: Schema.Api.SignUp.Response

      try {
        const { user }: Schema.Api.SignUp.Body = JSON.parse(body as string)
        const key = `${FAKE_BACKEND_PREFIX}_${user.email}`

        if (typeof localStorage.getItem(key) === 'string') {
          response = {
            error: `User '${user.email}' exist`,
          }
        } else {
          localStorage.setItem(key, JSON.stringify(user))

          const token = stringGenerator.next()
          response = {
            token,
          }
        }
      } catch (error) {
        response = {
          error: `Can't parse request body`,
        }
      }

      return new Response(JSON.stringify(response))
    }

    default: {
      const response: Schema.Api.GeneralResponseError = {
        error: `Unknown route: '${route}'`,
      }

      return new Response(JSON.stringify(response))
    }
  }
}

export {}
