import { Schema } from 'src/api'

export const ping = async (
  token: Schema.Token,
): Promise<Schema.Api.Ping.Response.Body> => {
  const route: Schema.Api.Ping.Route = '/ping'

  const requestOptions: Schema.Api.Ping.Request.Options = {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }

  const responseBody: Schema.Api.Ping.Response.Body = await (
    await fetch(route, requestOptions)
  ).json()

  return responseBody
}
