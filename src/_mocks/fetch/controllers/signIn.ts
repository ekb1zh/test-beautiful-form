import { db } from 'src/_mocks/fetch/instances'
import { stringGenerator } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const signIn = (body: BodyInit): Response => {
  let response: Schema.Api.SignIn.Response

  try {
    const data = db.read()!
    const {
      user: { email, password },
    }: Schema.Api.SignIn.Body = JSON.parse(body as string)

    const index = data.emailToUserIndex[email]
    const user = data.users[index]

    if (!user) {
      throw new Error(`User '${email}' is absent`)
    }

    if (user.password !== password) {
      throw new Error(`Incorrect password`)
    }

    const token = stringGenerator.next()
    data.tokenToUserIndex[token] = index

    db.write(data)

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
