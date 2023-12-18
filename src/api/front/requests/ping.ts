import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const ping = async (
  token: Schema.Token,
): Promise<Schema.Api.Ping.Response.Success.Body> => {
  const url: Schema.Api.Ping.Url = '/ping'
  const requestBody: Schema.Api.Ping.Request.Body = null
  const requestInit: Schema.Api.Ping.Request.Init = {
    method: 'GET',
    headers: {
      Authorization: token,
    },
    body: requestBody,
  }

  const response = await fetch(url, requestInit)
  const responseBody: Schema.Api.Ping.Response.Success.Body =
    await response.json()

  if (response.ok) {
    return responseBody
  } else {
    throw new FetchError(responseBody)
  }
}
