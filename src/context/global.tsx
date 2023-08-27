import React, { createContext, useContext, useEffect } from 'react'
import { ImmerHook, useImmer } from 'use-immer'

import { LocalStorageItem } from 'src/utils'
import type * as T from 'src/context/types'

export const createDefaultValue = (): T.GlobalContextValue => ({
  page: 'auth',
})

/*
  Local storage
*/
const FRONTEND_STORAGE_NAME = 'FRONTEND_STORAGE'

const storage = (() => {
  const storage = new LocalStorageItem<T.GlobalContextValue>(
    FRONTEND_STORAGE_NAME,
  )
  const data = storage.read()

  if (!data) {
    storage.write(createDefaultValue())
  }

  return storage
})()

/*
  Global context
*/
const GlobalContext = createContext<ImmerHook<T.GlobalContextValue>>([
  createDefaultValue(),
  () => {},
])

const initialValue = (): T.GlobalContextValue => {
  const value = storage.read()
  if (!value) {
    storage.write(createDefaultValue())
  }

  return value!
}

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value = useImmer(initialValue)
  const [state] = value

  useEffect(() => {
    storage.write(state)
  }, [state])

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
