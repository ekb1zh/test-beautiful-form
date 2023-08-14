import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { LocalStorageItem } from 'src/utils'
import type * as T from 'src/context/types'

export const createDefaultValue = (): T.GlobalContextValue => ({
  page: 'auth',
})

/*
  Local storage
*/
const STORAGE_NAME = 'FRONTEND_STORAGE'

const storage = (() => {
  const item = new LocalStorageItem<T.GlobalContextValue>(STORAGE_NAME)
  if (!item.read()) {
    item.write(createDefaultValue())
  }

  return item
})()

/*
  Global context
*/
const GlobalContext = createContext<T.GlobalContext>([
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
  const [state, setState] = useState(initialValue)

  const setStateWrapper: T.GlobalContextSetter = useCallback((value) => {
    setState((prev) => {
      const next = typeof value === 'function' ? value(prev) : value
      storage.write(next)

      return next
    })
  }, [])

  const value = useMemo(
    () => [state, setStateWrapper] as const,
    [setStateWrapper, state],
  )

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
