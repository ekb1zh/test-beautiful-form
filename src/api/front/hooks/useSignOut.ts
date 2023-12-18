import { useMutation } from '@tanstack/react-query'
import { signOut } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const useSignOut = () =>
  useMutation<
    Schema.Api.SignOut.Response.Success.Body,
    FetchError<Schema.Api.SignOut.Response.Error.Body>,
    Schema.Token
  >({
    mutationKey: ['signOut'],
    mutationFn: (token) => signOut(token),
  })
