import { errorToString, generateBearerToken, storage } from 'src/api/back/utils'
import { Schema } from 'src/api/schema'
import { Controller } from 'src/api/back/types'

export const signUp: Controller = (url, options) => {
  try {
    if (typeof options?.body !== 'string') {
      throw new Error(`Unexpected body: '${options?.body}'`)
    }

    const { user }: Schema.Api.SignUp.Request.Body = JSON.parse(options.body)
    const data = storage.read()

    if (!data) {
      throw new Error(`Absent storage`)
    }

    if (Object.hasOwn(data.emailToUserIndex, user.email)) {
      throw new Error(`This user is already registered. Please Sign In.`)
    }

    const index = data.users.push(user) - 1
    const token = generateBearerToken()

    data.emailToUserIndex[user.email] = index
    data.tokenToUserIndex[token] = index
    storage.write(data)

    const body: Schema.Api.SignUp.Response.Success.Body = { token }
    const init: Schema.Api.SignUp.Response.Success.Init = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }

    return new Response(JSON.stringify(body), init)
  } catch (err) {
    const error = errorToString(err)
    const body: Schema.Api.Ping.Response.Error.Body = { error }
    const init: Schema.Api.SignUp.Response.Error.Init = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }

    return new Response(JSON.stringify(body), init)
  }
}
