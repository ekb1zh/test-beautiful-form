import { storage } from 'src/_mocks/fetch/instances'
import { stringGenerator } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const ping = (body: BodyInit): Response => {
  let response: Schema.Api.Ping.Response

  try {
    const data = storage.read()!
    const { token }: Schema.Api.Ping.Body = JSON.parse(body as string)

    const index = data.tokenToUserIndex[token]
    const user = data.users[index]

    if (!user) {
      throw new Error(`Token is absent`)
    }

    const pong = stringGenerator.next(6)

    response = {
      pong,
    }
  } catch (error: any) {
    response = {
      error: error?.message || `Internal server error`,
    }
  }

  return new Response(JSON.stringify(response))
}
