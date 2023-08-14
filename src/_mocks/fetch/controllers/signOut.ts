import { storage } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const signOut = (body: BodyInit) => {
  let response: Schema.Api.SignUp.Response

  try {
    const data = storage.read()!
    const { token }: Schema.Api.SignOut.Body = JSON.parse(body as string)

    delete data.tokenToUserIndex[token]
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
