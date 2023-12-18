import { useMutation } from '@tanstack/react-query'
import { signOut } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'

export const useSignOut = () =>
  useMutation<
    Schema.Api.SignOut.Response.Success.Body,
    Schema.Api.SignOut.Response.Error.Body,
    Schema.Token
  >({
    mutationKey: ['signOut'],
    mutationFn: (token) => signOut(token),
  })
