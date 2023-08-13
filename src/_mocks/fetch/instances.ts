import { StringGenerator, LocalStorageItem } from 'src/utils'
import * as T from 'src/_mocks/fetch/types'

export const stringGenerator = new StringGenerator({
  allowedChars:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  defaultSize: 20,
})

export const db = (() => {
  const name = 'FAKE_BACKEND_USERS_DB'
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
