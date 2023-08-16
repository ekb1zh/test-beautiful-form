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
