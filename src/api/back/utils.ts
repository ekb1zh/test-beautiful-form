import { generateString, LocalStorageItem } from 'src/utils'
import {
  ROUTES,
  BACKEND_STORAGE_NAME,
  DELAY_BEFORE_RESPONSE,
} from 'src/api/back/constants'
import { ping, signIn, signOut, signUp } from 'src/api/back/controllers'
import * as T from 'src/api/back/types'

export const storage = (() => {
  const storage = new LocalStorageItem<T.UsersStorage>(BACKEND_STORAGE_NAME)
  const data = storage.read()

  if (!data) {
    const initialData: T.UsersStorage = {
      users: [],
      emailToUserIndex: {},
      tokenToUserIndex: {},
    }

    storage.write(initialData)
  }

  return storage
})()

export const generateBearerToken = () => {
  const token = `Bearer ${generateString(20)}`

  return token
}

export const errorToString = (error: unknown): string => {
  const string = error instanceof Error ? error.message : String(error)

  return string
}

export const mockFetch: Window['fetch'] = async (input, init) => {
  await new Promise((resolve) =>
    window.setTimeout(resolve, DELAY_BEFORE_RESPONSE),
  )

  if (typeof input !== 'string') {
    throw new TypeError(`Incorrect input: '${input}'`)
  }

  switch (input) {
    case ROUTES.signUp:
      return signUp(input, init)

    case ROUTES.signIn:
      return signIn(input, init)

    case ROUTES.signOut:
      return signOut(input, init)

    case ROUTES.ping:
      return ping(input, init)

    default:
      throw new Error(`Incorrect route: '${input}'`)
  }
}
