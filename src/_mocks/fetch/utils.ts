import { StringGenerator, LocalStorageItem } from 'src/utils'
import type * as T from 'src/_mocks/fetch/types'

export const stringGenerator = new StringGenerator({
  allowedChars:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  defaultSize: 20,
})

export const storage = (() => {
  const name = 'BACKEND_STORAGE'
  const db = new LocalStorageItem<T.UsersDb>(name)
  const data = db.read()

  if (!data) {
    const initialData: T.UsersDb = {
      users: [],
      emailToUserIndex: {},
      tokenToUserIndex: {},
    }

    db.write(initialData)
  }

  return db
})()

export const generateBearerToken = () => {
  const token = `Bearer ${stringGenerator.next()}`

  return token
}
