import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const signOut = async (
  token: Schema.Token,
): Promise<Schema.Api.SignOut.Response.Success.Body> => {
  const url: Schema.Api.SignOut.Url = '/sign-out'
  const requestBody: Schema.Api.SignOut.Request.Body = null
  const requestInit: Schema.Api.SignOut.Request.Init = {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: requestBody,
  }

  const response = await fetch(url, requestInit)

  if (response.ok) {
    const responseBody: Schema.Api.SignOut.Response.Success.Body = undefined
    return responseBody
  } else {
    const responseBody: Schema.Api.SignOut.Response.Error.Body =
      await response.json()

    throw new FetchError(responseBody)
  }
}
