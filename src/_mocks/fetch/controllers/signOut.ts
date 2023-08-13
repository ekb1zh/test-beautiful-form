import { db } from 'src/_mocks/fetch/instances'
import * as Schema from 'src/schema'

export const signOut = (body: BodyInit) => {
  let response: Schema.Api.SignUp.Response

  try {
    const data = db.read()!
    const { token }: Schema.Api.SignOut.Body = JSON.parse(body as string)

    delete data.tokenToUserIndex[token]
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
