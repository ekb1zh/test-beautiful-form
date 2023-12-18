import { errorToString, storage } from 'src/api/back/utils'
import { AUTHORIZATION_HEADER_NAME } from 'src/api/back/constants'
import { Schema } from 'src/api/schema'
import { Controller } from 'src/api/back/types'

export const signOut: Controller = (url, options) => {
  try {
    const headers = options?.headers

    if (!(headers && typeof headers === 'object' && !Array.isArray(headers))) {
      throw TypeError(`Incorrect headers: '${headers}'`)
    }

    if (!Object.hasOwn(headers, AUTHORIZATION_HEADER_NAME)) {
      throw new Error(`Absent header '${AUTHORIZATION_HEADER_NAME}'`)
    }

    const token = (headers as Record<string, string>)[AUTHORIZATION_HEADER_NAME]
    const data = storage.read()

    if (!data) {
      throw new Error(`Absent storage`)
    }

    if (!Object.hasOwn(data.tokenToUserIndex, token)) {
      throw new Error(`Absent token`)
    }

    delete data.tokenToUserIndex[token]
    storage.write(data)

    const body: Schema.Api.SignOut.Response.Success.Body = undefined
    const init: Schema.Api.SignOut.Response.Success.Init = { status: 204 }

    return new Response(body, init)
  } catch (err) {
    const error = errorToString(err)
    const body: Schema.Api.Ping.Response.Error.Body = { error }
    const init: Schema.Api.SignOut.Response.Error.Init = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }

    return new Response(JSON.stringify(body), init)
  }
}
