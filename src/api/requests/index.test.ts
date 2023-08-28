import { fetch } from 'src/_mocks'
import { Schema, signUp, signIn, signOut, ping } from 'src/api'

window.fetch = fetch
window.setTimeout = ((fn: Function) => fn()) as any // jest.useFakeTimers() // here not working

const createRandomeUser = (): Schema.User => ({
  email: String(Math.random()),
  password: String(Math.random()),
})

describe('signUp', () => {
  const user = createRandomeUser()

  test('new user => should sign up', async () => {
    const response = (await signUp(user)) as Schema.Api.SignUp.Response.Success

    expect(response.status).toBe('success')
    expect(typeof response.token).toBe('string')
  })

  test('exist user => should not sign up', async () => {
    const response = (await signUp(user)) as Schema.Api.SignUp.Response.Error

    expect(response.status).toBe('error')
    expect(typeof response.message).toBe('string')
  })
})

describe('signIn', () => {
  test('exist user => should sign in', async () => {
    const user = createRandomeUser()

    await signUp(user)
    const response = (await signIn(user)) as Schema.Api.SignIn.Response.Success

    expect(response.status).toBe('success')
    expect(typeof response.token).toBe('string')
  })

  test('absent user => should not sign in', async () => {
    const user = createRandomeUser()
    const response = (await signIn(user)) as Schema.Api.SignIn.Response.Error

    expect(response.status).toBe('error')
    expect(typeof response.message).toBe('string')
  })
})

describe('signOut', () => {
  test('exist user => should sign out', async () => {
    const user = createRandomeUser()

    const { token } = (await signUp(user)) as Schema.Api.SignUp.Response.Success
    const response = (await signOut(
      token!,
    )) as Schema.Api.SignOut.Response.Success

    expect(response.status).toBe('success')
  })

  test('absent user => should not sign out', async () => {
    const token = String(Math.random())
    const response = (await signOut(token)) as Schema.Api.SignOut.Response.Error

    expect(response.status).toBe('error')
    expect(typeof response.message).toBe('string')
  })
})

describe('ping', () => {
  test('exist user => should ping', async () => {
    const user = createRandomeUser()

    const { token } = (await signUp(user)) as Schema.Api.SignUp.Response.Success
    const response = (await ping(token!)) as Schema.Api.Ping.Response.Success

    expect(response.status).toBe('success')
    expect(typeof response.pong).toBe('string')
  })

  test('absent user => should not ping', async () => {
    const token = String(Math.random())
    const response = (await ping(token)) as Schema.Api.Ping.Response.Error

    expect(response.status).toBe('error')
    expect(typeof response.message).toBe('string')
  })
})
