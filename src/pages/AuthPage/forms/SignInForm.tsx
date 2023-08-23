import React, { useState } from 'react'
import cloneDeep from 'lodash.clonedeep'
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

  const [isLoading, setIsLoading] = useState(false)
  const [responseError, setResponseError] = useState<string | null>(null)

  const {
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
      setIsLoading(true)

      const user: Schema.User = formValues
      const { token, error } = await signIn(user)

      setResponseError(error ? error : null)

      if (error || typeof token !== 'string') {
        throw new Error(error || token)
      }

      setContext((prev) => {
        const next = cloneDeep(prev)
        next.token = token
        next.user = user

        return next
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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
            loading={isLoading}
            disabled={isSubmitted && !isValid}
          >
            Sing In
          </Button>

          {responseError && (
            <p className={styles.ErrorMessage}>{responseError}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignInForm
