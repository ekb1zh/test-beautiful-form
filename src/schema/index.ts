export interface User {
  email: string
  password: string
}

export namespace Api {
  export interface GeneralResponseError {
    error: string
  }

  export namespace SignIn {
    export type Route = '/sign-in'

    export interface Request {
      user: User
    }

    export interface ResponseSuccess {
      token: string
    }

    export interface ResponseError {
      error: string
    }

    export type Response = ResponseSuccess | ResponseError
  }

  export namespace SignUp {
    export type Route = '/sign-up'

    export interface Request {
      user: User
    }

    export interface ResponseSuccess {
      token: string
    }

    export interface ResponseError {
      error: string
    }

    export type Response = ResponseSuccess | ResponseError
  }
}
