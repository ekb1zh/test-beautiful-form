import { Schema } from 'src/api'

export interface UsersDb {
  users: Schema.User[]
  emailToUserIndex: {
    [email: string]: number
  }
  tokenToUserIndex: {
    [token: string]: number
  }
}
