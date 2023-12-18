import { Schema } from 'src/api/schema'

export interface UsersStorage {
  users: Schema.User[]
  emailToUserIndex: {
    [email: string]: number
  }
  tokenToUserIndex: {
    [token: string]: number
  }
}

export interface RoutesMap {
  signUp: Schema.Api.SignUp.Url
  signIn: Schema.Api.SignIn.Url
  signOut: Schema.Api.SignOut.Url
  ping: Schema.Api.Ping.Url
}

export type Controller = (url: string, options?: RequestInit) => Response
