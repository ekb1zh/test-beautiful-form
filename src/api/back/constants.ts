import { RoutesMap } from 'src/api/back/types'

export const DELAY_BEFORE_RESPONSE = 500
export const BACKEND_STORAGE_NAME = 'BACKEND_STORAGE'
export const AUTHORIZATION_HEADER_NAME = 'Authorization'

export const ROUTES: RoutesMap = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  signOut: '/sign-out',
  ping: '/ping',
}
