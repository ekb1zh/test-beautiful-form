import * as Schema from 'src/schema'

export const signIn = async (
  user: Schema.User,
): Promise<Schema.Api.SignIn.Response> => {
  const route: Schema.Api.SignIn.Route = '/sign-in'
  const body: Schema.Api.SignIn.Body = {
    user,
  }
  const options: Schema.Api.SignIn.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  const response: Schema.Api.SignIn.Response = await (
    await fetch(route, options)
  ).json()

  return response
}

export const signUp = async (
  user: Schema.User,
): Promise<Schema.Api.SignUp.Response> => {
  const route: Schema.Api.SignUp.Route = '/sign-up'
  const body: Schema.Api.SignUp.Body = {
    user,
  }
  const options: Schema.Api.SignUp.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  const response: Schema.Api.SignUp.Response = await (
    await fetch(route, options)
  ).json()

  return response
}
