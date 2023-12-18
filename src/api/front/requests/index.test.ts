import { mockFetch } from 'src/api/back'
import { signUp, signIn, signOut, ping } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

const createRandomUser = (): Schema.User => ({
  email: String(Math.random()),
  password: String(Math.random()),
})

beforeAll(() => {
  window.fetch = mockFetch
  window.setTimeout = ((fn: Function) => fn()) as any // jest.useFakeTimers() // here not working
})

describe('signUp', () => {
  const user = createRandomUser()

  test('new user => should sign up', async () => {
    const body = await signUp(user)

    expect(body).toStrictEqual<Schema.Api.SignUp.Response.Success.Body>({
      token: expect.any(String),
    })
  })

  test('exist user => should not sign up', async () => {
    let fetchError:
      | FetchError<Schema.Api.SignUp.Response.Error.Body>
      | undefined

    try {
      await signUp(user)
    } catch (error: any) {
      fetchError = error
    }

    expect(
      fetchError?.responseBody,
    ).toStrictEqual<Schema.Api.SignUp.Response.Error.Body>({
      error: expect.any(String),
    })
  })
})

describe('signIn', () => {
  const user = createRandomUser()

  beforeAll(async () => {
    await signUp(user)
  })

  test('exist user => should sign in', async () => {
    const body = await signIn(user)

    expect(body).toStrictEqual<Schema.Api.SignIn.Response.Success.Body>({
      token: expect.any(String),
    })
  })

  test('absent user => should not sign in', async () => {
    const user = createRandomUser()
    let fetchError:
      | FetchError<Schema.Api.SignIn.Response.Error.Body>
      | undefined

    try {
      await signIn(user)
    } catch (error: any) {
      fetchError = error
    }

    expect(
      fetchError?.responseBody,
    ).toStrictEqual<Schema.Api.SignIn.Response.Error.Body>({
      error: expect.any(String),
    })
  })
})

describe('signOut', () => {
  test('exist user => should sign out', async () => {
    const user = createRandomUser()
    const { token } = await signUp(user)
    const body = await signOut(token)

    expect(body).toBeUndefined()
  })

  test('absent user => should not sign out', async () => {
    const token = String(Math.random())
    let fetchError:
      | FetchError<Schema.Api.SignOut.Response.Error.Body>
      | undefined

    try {
      await signOut(token)
    } catch (error: any) {
      fetchError = error
    }

    expect(
      fetchError?.responseBody,
    ).toStrictEqual<Schema.Api.SignOut.Response.Error.Body>({
      error: expect.any(String),
    })
  })
})

describe('ping', () => {
  test('exist user => should ping', async () => {
    const user = createRandomUser()
    const { token } = await signUp(user)
    const body = await ping(token)

    expect(body).toStrictEqual<Schema.Api.Ping.Response.Success.Body>({
      pong: expect.any(String),
    })
  })

  test('absent user => should not ping', async () => {
    const token = String(Math.random())
    let fetchError: FetchError<Schema.Api.Ping.Response.Error.Body> | undefined

    try {
      await ping(token)
    } catch (error: any) {
      fetchError = error
    }

    expect(
      fetchError?.responseBody,
    ).toStrictEqual<Schema.Api.Ping.Response.Error.Body>({
      error: expect.any(String),
    })
  })
})
