import { errorToString, generateBearerToken, storage } from 'src/api/back/utils'
import { Schema } from 'src/api/schema'
import { Controller } from 'src/api/back/types'

export const signIn: Controller = (url, options) => {
  try {
    if (typeof options?.body !== 'string') {
      throw new Error(`Unexpected body: '${options?.body}'`)
    }

    const {
      user: { email, password },
    } = JSON.parse(options?.body)

    const data = storage.read()

    if (!data) {
      throw new Error(`Absent storage`)
    }

    if (!Object.hasOwn(data.emailToUserIndex, email)) {
      throw new Error(`This user is unregistered. Please Sign Up.`)
    }

    const index = data.emailToUserIndex[email]
    const user = data.users[index]

    if (user.password !== password) {
      throw new Error(`Incorrect password`)
    }

    const token = generateBearerToken()

    data.tokenToUserIndex[token] = index
    storage.write(data)

    const body: Schema.Api.SignIn.Response.Success.Body = { token }
    const init: Schema.Api.SignIn.Response.Success.Init = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }

    return new Response(JSON.stringify(body), init)
  } catch (err) {
    const error = errorToString(err)
    const body: Schema.Api.Ping.Response.Error.Body = { error }
    const init: Schema.Api.SignIn.Response.Error.Init = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }

    return new Response(JSON.stringify(body), init)
  }
}
