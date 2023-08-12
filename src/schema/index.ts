export interface User {
  email: string
  password: string
}

export namespace Api {
  export type Route = SignIn.Route | SignUp.Route

  export interface GeneralResponseError {
    error: string
  }

  export namespace SignIn {
    export type Route = '/sign-in'

    export interface Body {
      user: User
    }

    export interface Options {
      method: 'POST'
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
      body: string
    }

    export interface Response {
      token?: string
      error?: string
    }
  }

  export namespace SignUp {
    export type Route = '/sign-up'

    export interface Body {
      user: User
    }

    export interface Options {
      method: 'POST'
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
      body: string
    }

    export interface Response {
      token?: string
      error?: string
    }
  }
}
