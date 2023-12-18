import { useMutation } from '@tanstack/react-query'
import { signUp } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'
import { FetchError } from 'src/utils/FetchError'

export const useSignUp = () =>
  useMutation<
    Schema.Api.SignUp.Response.Success.Body,
    FetchError<Schema.Api.SignUp.Response.Error.Body>,
    Schema.User
  >({
    mutationKey: ['signUp'],
    mutationFn: (user) => signUp(user),
  })
