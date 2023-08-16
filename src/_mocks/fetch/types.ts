import { Schema } from 'src/api'

export interface UsersStorage {
  users: Schema.User[]
  emailToUserIndex: {
    [email: string]: number
  }
  tokenToUserIndex: {
    [token: string]: number
  }
}
