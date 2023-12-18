import { useMutation } from '@tanstack/react-query'
import { signIn } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'

export const useSignIn = () =>
  useMutation<
    Schema.Api.SignIn.Response.Success.Body,
    Schema.Api.SignIn.Response.Error.Body,
    Schema.User
  >({
    mutationKey: ['signIn'],
    mutationFn: (user) => signIn(user),
  })
