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

  const [isLoading, setIsLoading] = useState(false)
  const [responseError, setResponseError] = useState<string | null>(null)

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
      setIsLoading(true)

      const user: Schema.User = { email, password }
      const { token, error } = await signUp(user)

      if (error) {
        throw new Error(error)
      }

      setContext((draft) => {
        draft.token = token
        draft.user = user
      })
    } catch (error) {
      console.error(error)
      setResponseError(error instanceof Error ? error?.message : String(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const subscription = watch(() => setResponseError(null))
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
            loading={isLoading}
            disabled={isSubmitted && !isValid}
          >
            Sing Up
          </Button>

          {responseError && (
            <p className={styles.ErrorMessage}>{responseError}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignUpForm
