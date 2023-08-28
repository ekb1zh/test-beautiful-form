import { Schema } from 'src/api'

export interface AuthContextValue {
  page: 'auth'
}

export interface UserContextValue {
  page: 'user'
  user: Schema.User
  token: string
}

export type GlobalContextValue = AuthContextValue | UserContextValue
