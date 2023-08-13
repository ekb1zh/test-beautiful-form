import * as Schema from 'src/schema'

export interface UsersDb {
  users: Schema.User[]
  emailToUserIndex: {
    [email: string]: number
  }
  tokenToUserIndex: {
    [token: string]: number
  }
}
