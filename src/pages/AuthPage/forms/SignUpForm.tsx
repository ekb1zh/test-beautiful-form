import React, { useMemo, useState } from 'react'

import Input, { InputProps } from 'src/components/Input'
import Button from 'src/components/Button'

import { GlobalContextValue, useGlobalContext } from 'src/context'
import { validateEmail, validatePassword } from 'src/utils'
import { signUp } from 'src/api'
import * as Schema from 'src/schema'
import styles from 'src/pages/AuthPage/forms/Form.module.scss'

const SignUpForm: React.FC = () => {
  const [, setContext] = useGlobalContext()

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isPasswordsEquals = passwordValue === repeatPasswordValue
  const validation = useMemo(
    () => ({
      email: validateEmail(emailValue),
      password: validatePassword(passwordValue),
      repeatPassword: validatePassword(repeatPasswordValue),
    }),
    [emailValue, passwordValue, repeatPasswordValue],
  )

  const emailProps = useMemo<InputProps>(
    () => ({
      label: 'Email',
      type: 'text',
      value: emailValue,
      onChange: ({ target: { value } }) => {
        setEmailValue(value)
        setErrorMessage(null)
      },
      errorText: wasSubmitted ? validation.email : undefined,
      disabled: isLoading,
    }),
    [emailValue, isLoading, validation.email, wasSubmitted],
  )

  const passwordProps = useMemo<InputProps>(
    () => ({
      label: 'Password',
      type: 'password',
      value: passwordValue,
      onChange: ({ target: { value } }) => {
        setPasswordValue(value)
        setErrorMessage(null)
      },
      errorText: wasSubmitted ? validation.password : undefined,
      disabled: isLoading,
    }),
    [isLoading, passwordValue, validation.password, wasSubmitted],
  )

  const repeatPasswordProps = useMemo<InputProps>(
    () => ({
      label: 'Repeat password',
      type: 'password',
      value: repeatPasswordValue,
      onChange: ({ target: { value } }) => {
        setRepeatPasswordValue(value)
        setErrorMessage(null)
      },
      errorText: wasSubmitted
        ? isPasswordsEquals
          ? validation.repeatPassword
          : 'Repeat password is unequals'
        : undefined,
      disabled: isLoading,
    }),
    [
      isLoading,
      isPasswordsEquals,
      repeatPasswordValue,
      validation.repeatPassword,
      wasSubmitted,
    ],
  )

  const isFormValid = useMemo(
    () =>
      isPasswordsEquals &&
      [
        errorMessage,
        validation.email,
        validation.password,
        validation.repeatPassword,
      ].every((v) => typeof v !== 'string'),
    [
      errorMessage,
      isPasswordsEquals,
      validation.email,
      validation.password,
      validation.repeatPassword,
    ],
  )

  const onSubmit: React.FormHTMLAttributes<HTMLFormElement>['onSubmit'] =
    async (event) => {
      event.preventDefault()

      if (!wasSubmitted) {
        setWasSubmitted(true)
      }

      if (!isFormValid) {
        return
      }

      setIsLoading(true)

      try {
        const user: Schema.User = {
          email: emailValue,
          password: passwordValue,
        }

        const { token, error } = await signUp(user)

        setErrorMessage(error ? error : null)

        if (error || typeof token !== 'string') {
          throw new Error(error || token)
        }

        setContext((prev) => {
          const next: GlobalContextValue = JSON.parse(JSON.stringify(prev)) // better do it with lodash.cloneDeep
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
    <form className={styles.Root} onSubmit={onSubmit}>
      <h1 className={styles.Header}>Sign Up</h1>

      <fieldset className={styles.Controls}>
        <Input {...emailProps} />
        <Input {...passwordProps} />
        <Input {...repeatPasswordProps} />

        <div className={styles.SubmitContainer}>
          <Button
            type='submit'
            loading={isLoading}
            disabled={wasSubmitted ? !isFormValid : undefined}
          >
            Sing Up
          </Button>

          {typeof errorMessage === 'string' && (
            <p className={styles.ErrorMessage}>{errorMessage}</p>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default SignUpForm
