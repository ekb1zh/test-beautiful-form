import { Schema } from 'src/api'

export interface GlobalContextValue {
  page: 'auth' | 'user'
  user?: Schema.User
  token?: string
}
