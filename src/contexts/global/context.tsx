import React, { createContext, useContext, useEffect } from 'react'
import { ImmerHook, useImmer } from 'use-immer'

import {
  createDefaultContextValue,
  initialContextValue,
  storage,
} from 'src/contexts/global/utils'
import * as T from 'src/contexts/global/types'

const GlobalContext = createContext<ImmerHook<T.GlobalContextValue>>([
  createDefaultContextValue(),
  () => {},
])

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value = useImmer(initialContextValue)
  const [state] = value

  useEffect(() => {
    storage.write(state)
  }, [state])

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
