import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const signUp = async (
  user: Schema.User,
): Promise<Schema.Api.SignUp.Response.Success.Body> => {
  const url: Schema.Api.SignUp.Url = '/sign-up'
  const requestBody: Schema.Api.SignUp.Request.Body = { user }
  const requestInit: Schema.Api.SignUp.Request.Init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }

  const response = await fetch(url, requestInit)
  const responseBody: Schema.Api.SignUp.Response.Success.Body =
    await response.json()

  if (response.ok) {
    return responseBody
  } else {
    throw new FetchError(responseBody)
  }
}
