import { useMutation } from '@tanstack/react-query'
import { signIn } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const useSignIn = () =>
  useMutation<
    Schema.Api.SignIn.Response.Success.Body,
    FetchError<Schema.Api.SignIn.Response.Error.Body>,
    Schema.User
  >({
    mutationKey: ['signIn'],
    mutationFn: (user) => signIn(user),
  })
