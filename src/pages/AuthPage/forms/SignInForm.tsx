import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'src/components/Input'
import Button from 'src/components/Button'

import { useGlobalContext } from 'src/contexts/global'
import { useSignIn } from 'src/api/front'
import { Schema } from 'src/api/schema'
import styles from 'src/pages/AuthPage/forms/Form.module.scss'

interface FormValues {
  email: string
  password: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const SignInForm: React.FC = () => {
  const [, setContext] = useGlobalContext()
  const { mutateAsync: signIn, isPending, isError, error } = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (formValues: FormValues) => {
    if (!isValid) {
      return
    }

    try {
      const user: Schema.User = formValues
      const { token } = await signIn(user)

      setContext({
        page: 'user',
        token,
      })
    } catch (error) {
      console.error(error)
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
          disabled={isPending}
          errorText={errors.email?.message}
          {...register('email')}
        />

        <Input
          label='Password'
          type='password'
          disabled={isPending}
          errorText={errors.password?.message}
          {...register('password')}
        />

        <div className={styles.SubmitContainer}>
          <Button
            type='submit'
            loading={isPending}
            disabled={isSubmitted && !isValid}
          >
            Sing In
          </Button>

          {isError && (
            <p className={styles.ErrorMessage}>{error.responseBody.error}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignInForm
