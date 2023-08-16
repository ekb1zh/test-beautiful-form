export interface User {
  email: string
  password: string
}

export type Token = string // for example `Bearer ${string}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SerializedJson<T> = string

export namespace Api {
  export type Route = SignUp.Route | SignIn.Route | SignOut.Route | Ping.Route

  export type ResponseBody =
    | SignUp.Response.Body
    | SignIn.Response.Body
    | SignOut.Response.Body
    | Ping.Response.Body

  export namespace SignUp {
    export type Route = '/sign-up'

    export namespace Request {
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
    }

    export namespace Response {
      export interface Body {
        token?: Token
        error?: string
      }
    }
  }

  export namespace SignIn {
    export type Route = '/sign-in'

    export namespace Request {
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
    }

    export namespace Response {
      export interface Body {
        token?: Token
        error?: string
      }
    }
  }

  export namespace SignOut {
    export type Route = '/sign-out'

    export namespace Request {
      export interface Options {
        method: 'POST'
        headers: {
          Authorization: Token
        }
      }
    }

    export namespace Response {
      export interface Body {
        error?: string
      }
    }
  }

  export namespace Ping {
    export type Route = '/ping'

    export namespace Request {
      export interface Options {
        method: 'GET'
        headers: {
          Authorization: Token
        }
      }
    }

    export namespace Response {
      export interface Body {
        pong?: string
        error?: string
      }
    }
  }
}
