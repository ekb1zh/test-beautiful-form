import { storage } from 'src/_mocks/fetch/instances'
import { stringGenerator } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const signUp = (body: BodyInit): Response => {
  let response: Schema.Api.SignUp.Response

  try {
    const data = storage.read()!
    const { user }: Schema.Api.SignUp.Body = JSON.parse(body as string)

    if (data.emailToUserIndex[user.email] >= 0) {
      throw new Error(`User '${user.email}' is already exist`)
    }

    const index = data.users.push(user) - 1
    const token = stringGenerator.next()

    data.emailToUserIndex[user.email] = index
    data.tokenToUserIndex[token] = index

    storage.write(data)

    response = {
      token,
    }
  } catch (error: any) {
    response = {
      error: error?.message || `Internal error`,
    }
  }

  return new Response(JSON.stringify(response))
}
