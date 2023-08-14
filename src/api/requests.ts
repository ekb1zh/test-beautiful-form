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

export const signOut = async (
  token: string,
): Promise<Schema.Api.SignOut.Response> => {
  const route: Schema.Api.SignOut.Route = '/sign-out'
  const body: Schema.Api.SignOut.Body = {
    token,
  }
  const options: Schema.Api.SignOut.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  const response: Schema.Api.SignOut.Response = await (
    await fetch(route, options)
  ).json()

  return response
}

export const ping = async (
  token: string,
): Promise<Schema.Api.Ping.Response> => {
  const route: Schema.Api.Ping.Route = '/ping'
  const body: Schema.Api.Ping.Body = {
    token,
  }
  const options: Schema.Api.Ping.Options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  const response: Schema.Api.Ping.Response = await (
    await fetch(route, options)
  ).json()

  return response
}
