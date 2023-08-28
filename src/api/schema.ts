export interface User {
  email: string
  password: string
}

export type Token = string // for example `Bearer ${string}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SerializedJson<T> = string

export namespace Network {
  export interface IdleState {
    status: 'idle'
  }

  export interface LoadingState {
    status: 'loading'
  }

  export interface SuccessState {
    status: 'success'
  }

  export interface ErrorState {
    status: 'error'
    message: string
  }

  export type RequestState = IdleState | LoadingState
  export type ResponseState = SuccessState | ErrorState
  export type State<R extends ResponseState = ResponseState> = RequestState | R
}

export namespace Api {
  export type Route = SignUp.Route | SignIn.Route | SignOut.Route | Ping.Route

  export type ResponseBody =
    | SignUp.Response.Body
    | SignIn.Response.Body
    | SignOut.Response.Body
    | Ping.Response.Body

  export namespace SignUp {
    export type Route = '/sign-up'
    export type State = Network.State<Response.Body>

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
      export interface Success extends Network.SuccessState {
        token: string
      }
      export interface Error extends Network.ErrorState {}
      export type Body = Success | Error
    }
  }

  export namespace SignIn {
    export type Route = '/sign-in'
    export type State = Network.State<Response.Body>

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
      export interface Success extends Network.SuccessState {
        token: string
      }
      export interface Error extends Network.ErrorState {}
      export type Body = Success | Error
    }
  }

  export namespace SignOut {
    export type Route = '/sign-out'
    export type State = Network.State<Response.Body>

    export namespace Request {
      export interface Options {
        method: 'POST'
        headers: {
          Authorization: Token
        }
      }
    }

    export namespace Response {
      export interface Success extends Network.SuccessState {}
      export interface Error extends Network.ErrorState {}
      export type Body = Success | Error
    }
  }

  export namespace Ping {
    export type Route = '/ping'
    export type State = Network.State<Response.Body>

    export namespace Request {
      export interface Options {
        method: 'GET'
        headers: {
          Authorization: Token
        }
      }
    }

    export namespace Response {
      export interface Success extends Network.SuccessState {
        pong: string
      }
      export interface Error extends Network.ErrorState {}
      export type Body = Success | Error
    }
  }
}
