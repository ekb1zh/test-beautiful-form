import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const signIn = async (
  user: Schema.User,
): Promise<Schema.Api.SignIn.Response.Success.Body> => {
  const url: Schema.Api.SignIn.Url = '/sign-in'
  const requestBody: Schema.Api.SignIn.Request.Body = { user }
  const requestInit: Schema.Api.SignIn.Request.Init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }

  const response = await fetch(url, requestInit)
  const responseBody: Schema.Api.SignIn.Response.Success.Body =
    await response.json()

  if (response.ok) {
    return responseBody
  } else {
    throw new FetchError(responseBody)
  }
}
