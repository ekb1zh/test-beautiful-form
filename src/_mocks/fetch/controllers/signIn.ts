import { storage } from 'src/_mocks/fetch/utils'
import { generateBearerToken } from 'src/_mocks/fetch/utils'
import { Schema } from 'src/api'

export const signIn = (body: BodyInit): Schema.Api.SignIn.Response.Body => {
  try {
    const {
      user: { email, password },
    }: Schema.Api.SignIn.Request.Body = JSON.parse(body as string)
    const data = storage.read()!

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

    return {
      status: 'success',
      token,
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : `Internal server error`,
    }
  }
}
