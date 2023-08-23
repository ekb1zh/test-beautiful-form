import { generateString, LocalStorageItem } from 'src/utils'
import { BACKEND_STORAGE_NAME } from 'src/_mocks/fetch/constants'
import type * as T from 'src/_mocks/fetch/types'

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
