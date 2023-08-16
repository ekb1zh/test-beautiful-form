import { storage } from 'src/_mocks/fetch/utils'
import { stringGenerator } from 'src/_mocks/fetch/utils'
import { Schema } from 'src/api'

export const ping = (headers: HeadersInit): Schema.Api.Ping.Response.Body => {
  try {
    const token = (headers as Record<string, string>)['Authorization']
    const data = storage.read()!

    if (!Object.hasOwn(data.tokenToUserIndex, token)) {
      throw new Error(`Incorrect token`)
    }

    const pong = stringGenerator.next(6)

    return {
      pong,
    }
  } catch (error: any) {
    return {
      error: error?.message || `Internal server error`,
    }
  }
}