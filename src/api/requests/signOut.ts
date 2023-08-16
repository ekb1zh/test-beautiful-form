import { Schema } from 'src/api'

export const signOut = async (
  token: Schema.Token,
): Promise<Schema.Api.SignOut.Response.Body> => {
  const route: Schema.Api.SignOut.Route = '/sign-out'

  const requestOptions: Schema.Api.SignOut.Request.Options = {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }

  const responseBody: Schema.Api.SignOut.Response.Body = await (
    await fetch(route, requestOptions)
  ).json()

  return responseBody
}
