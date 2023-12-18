import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'src/components/Input'
import Button from 'src/components/Button'

import { useGlobalContext } from 'src/contexts/global'
import { useSignUp } from 'src/api/front'
import { Schema } from 'src/api/schema'
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
  const { mutateAsync, isPending, isError, error } = useSignUp()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    resolver: yupResolver<FormValues>(schema),
    defaultValues,
  })

  const onSubmit = async ({ repeatPassword: _, ...formValues }: FormValues) => {
    if (!isValid) {
      return
    }

    try {
      const user: Schema.User = formValues
      const { token } = await mutateAsync(user)

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
            loading={isPending}
            disabled={isSubmitted && !isValid}
          >
            Sing Up
          </Button>

          {isError && (
            <p className={styles.ErrorMessage}>{error.responseBody.error}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignUpForm
