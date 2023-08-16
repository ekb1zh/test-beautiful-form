import { Schema } from 'src/api'

export const signIn = async (
  user: Schema.User,
): Promise<Schema.Api.SignIn.Response.Body> => {
  const route: Schema.Api.SignIn.Route = '/sign-in'

  const requestBody: Schema.Api.SignIn.Request.Body = { user }
  const requestOptions: Schema.Api.SignIn.Request.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(requestBody),
  }

  const responseBody: Schema.Api.SignIn.Response.Body = await (
    await fetch(route, requestOptions)
  ).json()

  return responseBody
}
