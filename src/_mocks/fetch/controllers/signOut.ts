import { storage } from 'src/_mocks/fetch/utils'
import { Schema } from 'src/api'

export const signOut = (
  headers: HeadersInit,
): Schema.Api.SignOut.Response.Body => {
  try {
    const token = (headers as Record<string, string>)['Authorization']
    const data = storage.read()!

    if (!Object.hasOwn(data.tokenToUserIndex, token)) {
      throw new Error(`Incorrect token`)
    }

    delete data.tokenToUserIndex[token]
    storage.write(data)

    return {
      status: 'success',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : String(error),
    }
  }
}
