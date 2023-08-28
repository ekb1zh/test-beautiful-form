import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'src/components/Input'
import Button from 'src/components/Button'

import { useGlobalContext } from 'src/context'
import { signIn, Schema } from 'src/api'
import styles from 'src/pages/AuthPage/forms/Form.module.scss'

interface FormValues {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const defaultValues: FormValues = {
  email: '',
  password: '',
}

const SignInForm: React.FC = () => {
  const [, setContext] = useGlobalContext()
  const [signInState, setSignInState] = useState<Schema.Api.SignIn.State>({
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

  const onSubmit = async (formValues: FormValues) => {
    if (!isValid) {
      return
    }

    try {
      setSignInState({ status: 'loading' })

      const user: Schema.User = formValues
      const response = await signIn(user)
      setSignInState(response)

      if (response.status === 'success') {
        setContext({
          page: 'user',
          user,
          token: response.token,
        })
      }
    } catch (error) {
      setSignInState({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      })

      console.error(error)
    }
  }

  useEffect(() => {
    const subscription = watch(() => setSignInState({ status: 'idle' }))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <form
      className={styles.Root}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
    >
      <h1 className={styles.Header}>Sign In</h1>

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

        <div className={styles.SubmitContainer}>
          <Button
            type='submit'
            loading={signInState.status === 'loading'}
            disabled={isSubmitted && !isValid}
          >
            Sing In
          </Button>

          {signInState.status === 'error' && (
            <p className={styles.ErrorMessage}>{signInState.message}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignInForm
