export interface User {
  email: string
  password: string
}

export type Token = string // for example `Bearer ${string}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SerializedJson<T> = string

export namespace Api {
  export namespace SignUp {
    export type Url = '/sign-up'

    export namespace Request {
      export interface Body {
        user: User
      }

      export interface Init extends RequestInit {
        method: 'POST'
        headers: {
          'Content-Type': 'application/json'
        }
        body: SerializedJson<Body>
      }
    }

    export namespace Response {
      export namespace Success {
        export interface Body {
          token: Token
        }

        export interface Init extends ResponseInit {
          status: 200
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export namespace Error {
        export interface Body {
          error: string
        }

        export interface Init extends ResponseInit {
          status: 500
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export type Body = Success.Body | Error.Body
    }
  }

  export namespace SignIn {
    export type Url = '/sign-in'

    export namespace Request {
      export interface Body {
        user: User
      }

      export interface Init extends RequestInit {
        method: 'POST'
        headers: { 'Content-Type': 'application/json' }
        body: SerializedJson<Body>
      }
    }

    export namespace Response {
      export namespace Success {
        export interface Body {
          token: Token
        }

        export interface Init extends ResponseInit {
          status: 200
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export namespace Error {
        export interface Body {
          error: string
        }

        export interface Init extends ResponseInit {
          status: 500
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export type Body = Success.Body | Error.Body
    }
  }

  export namespace SignOut {
    export type Url = '/sign-out'

    export namespace Request {
      export type Body = null

      export interface Init extends RequestInit {
        method: 'POST'
        headers: {
          Authorization: Token
        }
        body: Body
      }
    }

    export namespace Response {
      export namespace Success {
        export type Body = undefined

        export interface Init extends ResponseInit {
          status: 204
        }
      }

      export namespace Error {
        export interface Body {
          error: string
        }

        export interface Init extends ResponseInit {
          status: 500
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export type Body = Success.Body | Error.Body
    }
  }

  export namespace Ping {
    export type Url = '/ping'

    export namespace Request {
      export type Body = null

      export interface Init extends RequestInit {
        method: 'GET'
        headers: {
          Authorization: Token
        }
        body: Body
      }
    }

    export namespace Response {
      export namespace Success {
        export interface Body {
          pong: string
        }

        export interface Init extends ResponseInit {
          status: 200
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export namespace Error {
        export interface Body {
          error: string
        }

        export interface Init extends ResponseInit {
          status: 500
          headers: { 'Content-Type': 'application/json' }
        }
      }

      export type Body = Success.Body | Error.Body
    }
  }
}
