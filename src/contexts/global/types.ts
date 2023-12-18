export interface AuthContextValue {
  page: 'auth'
}

export interface UserContextValue {
  page: 'user'
  token: string
}

export type GlobalContextValue = AuthContextValue | UserContextValue
