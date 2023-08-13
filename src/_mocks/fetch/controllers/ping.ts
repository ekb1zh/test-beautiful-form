import { db } from 'src/_mocks/fetch/instances'
import { stringGenerator } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const ping = (body: BodyInit): Response => {
  let response: Schema.Api.Ping.Response

  try {
    const data = db.read()!
    const { token }: Schema.Api.Ping.Body = JSON.parse(body as string)

    const index = data.tokenToUserIndex[token]
    const user = data.users[index]

    if (!user) {
      throw new Error(`Token is absent`)
    }

    const pong = `Random pong message: '${stringGenerator.next()}'`

    response = {
      pong,
    }
  } catch (error: any) {
    response = {
      error: error?.message || `Internal error`,
    }
  }

  return new Response(JSON.stringify(response))
}
