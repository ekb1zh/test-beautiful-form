import { Schema } from 'src/api'

export const signUp = async (
  user: Schema.User,
): Promise<Schema.Api.SignUp.Response.Body> => {
  const route: Schema.Api.SignUp.Route = '/sign-up'

  const requestBody: Schema.Api.SignUp.Request.Body = { user }
  const requestOptions: Schema.Api.SignUp.Request.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(requestBody),
  }

  const responseBody: Schema.Api.SignUp.Response.Body = await (
    await fetch(route, requestOptions)
  ).json()

  return responseBody
}
