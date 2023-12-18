import { useMutation } from '@tanstack/react-query'
import { signUp } from 'src/api/front/requests'
import { Schema } from 'src/api/schema'

export const useSignUp = () =>
  useMutation<
    Schema.Api.SignUp.Response.Success.Body,
    Schema.Api.SignUp.Response.Error.Body,
    Schema.User
  >({
    mutationKey: ['signUp'],
    mutationFn: (user) => signUp(user),
  })
