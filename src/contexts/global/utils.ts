import { LocalStorageItem } from 'src/utils'
import { FRONTEND_STORAGE_NAME } from 'src/contexts/global/constants'
import * as T from 'src/contexts/global/types'

export const createDefaultContextValue = (): T.GlobalContextValue => ({
  page: 'auth',
})

export const storage = (() => {
  const storage = new LocalStorageItem<T.GlobalContextValue>(
    FRONTEND_STORAGE_NAME,
  )
  const data = storage.read()

  if (!data) {
    storage.write(createDefaultContextValue())
  }

  return storage
})()

export const initialContextValue = (): T.GlobalContextValue => {
  const value = storage.read()

  if (!value) {
    storage.write(createDefaultContextValue())
  }

  return value!
}
