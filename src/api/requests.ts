import * as Schema from 'src/schema'

export const signIn = async (
  user: Schema.User,
): Promise<Schema.Api.SignIn.Response> => {
  const route: Schema.Api.SignIn.Route = '/sign-in'
  const request: Schema.Api.SignIn.Request = {
    user,
  }

  const response: Schema.Api.SignIn.Response = await (
    await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    })
  ).json()

  return response
}

export const signUp = async (
  user: Schema.User,
): Promise<Schema.Api.SignUp.Response> => {
  const route: Schema.Api.SignUp.Route = '/sign-up'
  const request: Schema.Api.SignUp.Request = {
    user,
  }

  const response: Schema.Api.SignUp.Response = await (
    await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    })
  ).json()

  return response
}
