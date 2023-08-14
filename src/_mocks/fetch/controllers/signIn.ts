import { storage } from 'src/_mocks/fetch/instances'
import { stringGenerator } from 'src/_mocks/fetch/instances'
import { Schema } from 'src/api'

export const signIn = (body: BodyInit): Response => {
  let response: Schema.Api.SignIn.Response

  try {
    const data = storage.read()!
    const {
      user: { email, password },
    }: Schema.Api.SignIn.Body = JSON.parse(body as string)

    const index = data.emailToUserIndex[email]
    const user = data.users[index]

    if (!user) {
      throw new Error(`This user is unregistered. Please Sign Up.`)
    }

    if (user.password !== password) {
      throw new Error(`Incorrect password`)
    }

    const token = stringGenerator.next()
    data.tokenToUserIndex[token] = index

    storage.write(data)

    response = {
      token,
    }
  } catch (error: any) {
    response = {
      error: error?.message || `Internal server error`,
    }
  }

  return new Response(JSON.stringify(response))
}
