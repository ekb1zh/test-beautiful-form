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
    const { token, error } = await signUp(user)

    expect(typeof token).toBe('string')
    expect(typeof error).toBe('undefined')
  })

  test('exist user => should not sign up', async () => {
    const { token, error } = await signUp(user)

    expect(typeof token).toBe('undefined')
    expect(typeof error).toBe('string')
  })
})

describe('signIn', () => {
  test('exist user => should sign in', async () => {
    const user = createRandomeUser()

    await signUp(user)
    const { token, error } = await signIn(user)

    expect(typeof token).toBe('string')
    expect(typeof error).toBe('undefined')
  })

  test('absent user => should not sign in', async () => {
    const user = createRandomeUser()
    const { token, error } = await signIn(user)

    expect(typeof token).toBe('undefined')
    expect(typeof error).toBe('string')
  })
})

describe('signOut', () => {
  test('exist user => should sign out', async () => {
    const user = createRandomeUser()

    const { token } = await signUp(user)
    const { error } = await signOut(token!)

    expect(typeof error).toBe('undefined')
  })

  test('absent user => should not sign out', async () => {
    const token = String(Math.random())
    const { error } = await signOut(token)

    expect(typeof error).toBe('string')
  })
})

describe('ping', () => {
  test('exist user => should ping', async () => {
    const user = createRandomeUser()

    const { token } = await signUp(user)
    const { error } = await ping(token!)

    expect(typeof error).toBe('undefined')
  })

  test('absent user => should not ping', async () => {
    const token = String(Math.random())
    const { error } = await ping(token)

    expect(typeof error).toBe('string')
  })
})
