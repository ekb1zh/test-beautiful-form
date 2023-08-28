import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'src/components/Input'
import Button from 'src/components/Button'

import { useGlobalContext } from 'src/context'
import { signUp, Schema } from 'src/api'
import styles from 'src/pages/AuthPage/forms/Form.module.scss'

interface FormValues {
  email: string
  password: string
  repeatPassword: string
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  repeatPassword: yup
    .string()
    .min(8, 'repeat password must be at least 8 characters')
    .oneOf([yup.ref('password')], 'repeat password is not equal')
    .required(),
})

const defaultValues: FormValues = {
  email: '',
  password: '',
  repeatPassword: '',
}

const SignUpForm: React.FC = () => {
  const [, setContext] = useGlobalContext()
  const [signUpState, setSignUpState] = useState<Schema.Api.SignUp.State>({
    status: 'idle',
  })

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    resolver: yupResolver<FormValues>(schema),
    defaultValues,
  })

  const onSubmit = async ({ email, password }: FormValues) => {
    if (!isValid) {
      return
    }

    try {
      setSignUpState({ status: 'loading' })

      const user: Schema.User = { email, password }
      const response = await signUp(user)
      setSignUpState(response)

      if (response.status === 'success') {
        setContext({
          page: 'user',
          user,
          token: response.token,
        })
      }
    } catch (error) {
      setSignUpState({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      })

      console.error(error)
    }
  }

  useEffect(() => {
    const subscription = watch(() => setSignUpState({ status: 'idle' }))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <form
      className={styles.Root}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
    >
      <h1 className={styles.Header}>Sign Up</h1>

      <fieldset className={styles.Controls}>
        <Input
          label='Email'
          type='text'
          errorText={errors.email?.message}
          {...register('email')}
        />

        <Input
          label='Password'
          type='password'
          errorText={errors.password?.message}
          {...register('password')}
        />

        <Input
          label='Repeat password'
          type='password'
          errorText={errors.repeatPassword?.message}
          {...register('repeatPassword')}
        />

        <div className={styles.SubmitContainer}>
          <Button
            type='submit'
            loading={signUpState.status === 'loading'}
            disabled={isSubmitted && !isValid}
          >
            Sing Up
          </Button>

          {signUpState.status === 'error' && (
            <p className={styles.ErrorMessage}>{signUpState.message}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignUpForm
