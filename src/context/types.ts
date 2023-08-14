import { Schema } from 'src/api'

export interface GlobalContextValue {
  page: 'auth' | 'user'
  user?: Schema.User
  token?: string
}

export type GlobalContextSetter<V = GlobalContextValue> = (
  value: V | ((value: V) => V),
) => void

export type GlobalContext<V = GlobalContextValue> = readonly [
  V,
  GlobalContextSetter<V>,
]
