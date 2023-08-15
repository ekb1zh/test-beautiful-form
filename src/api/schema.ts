export interface User {
  email: string
  password: string
}

export type Token = string // for example `Bearer ${string}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SerializedJson<T> = string

export namespace Api {
  export type Route = SignUp.Route | SignIn.Route | SignOut.Route | Ping.Route

  export type Response =
    | GeneralResponseError
    | SignUp.Response
    | SignIn.Response
    | SignOut.Response
    | Ping.Response

  export interface GeneralResponseError {
    error: string
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
      body: SerializedJson<Body>
    }

    export interface Response {
      token?: Token
      error?: string
    }
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
      body: SerializedJson<Body>
    }

    export interface Response {
      token?: Token
      error?: string
    }
  }

  export namespace SignOut {
    export type Route = '/sign-out'

    export interface Options {
      method: 'POST'
      headers: {
        Authorization: Token
      }
    }

    export interface Response {
      error?: string
    }
  }

  export namespace Ping {
    export type Route = '/ping'

    export interface Options {
      method: 'GET'
      headers: {
        Authorization: Token
      }
    }

    export interface Response {
      pong?: string
      error?: string
    }
  }
}
