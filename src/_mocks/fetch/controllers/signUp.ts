import { storage } from 'src/_mocks/fetch/utils'
import { generateBearerToken } from 'src/_mocks/fetch/utils'
import { Schema } from 'src/api'

export const signUp = (body: BodyInit): Schema.Api.SignUp.Response => {
  try {
    const { user }: Schema.Api.SignUp.Body = JSON.parse(body as string)
    const data = storage.read()!

    if (Object.hasOwn(data.emailToUserIndex, user.email)) {
      throw new Error(`This user is already registered. Please Sign In.`)
    }

    const index = data.users.push(user) - 1
    const token = generateBearerToken()

    data.emailToUserIndex[user.email] = index
    data.tokenToUserIndex[token] = index

    storage.write(data)

    return {
      token,
    }
  } catch (error: any) {
    return {
      error: error?.message || `Internal server error`,
    }
  }
}
