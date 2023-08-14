import React, { useMemo, useState } from 'react'

import Input, { InputProps } from 'src/components/Input'
import Button from 'src/components/Button'

import { GlobalContextValue, useGlobalContext } from 'src/context'
import { validateEmail, validatePassword } from 'src/utils'
import { signUp } from 'src/api'
import styles from 'src/pages/AuthPage/Form.module.scss'

const SignUpForm: React.FC = () => {
  const [, setContext] = useGlobalContext()

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isPasswordsEquals = passwordValue === repeatPasswordValue

  const emailProps = useMemo<InputProps>(
    () => ({
      label: 'Email',
      type: 'text',
      value: emailValue,
      onChange: ({ target: { value } }) => setEmailValue(value),
      errorText: wasSubmitted ? validateEmail(emailValue) : undefined,
      disabled: isLoading,
    }),
    [emailValue, isLoading, wasSubmitted],
  )

  const passwordProps = useMemo<InputProps>(
    () => ({
      label: 'Password',
      type: 'password',
      value: passwordValue,
      onChange: ({ target: { value } }) => setPasswordValue(value),
      errorText: wasSubmitted ? validatePassword(passwordValue) : undefined,
      disabled: isLoading,
    }),
    [isLoading, passwordValue, wasSubmitted],
  )

  const repeatPasswordProps = useMemo<InputProps>(
    () => ({
      label: 'Repeat password',
      type: 'password',
      value: repeatPasswordValue,
      onChange: ({ target: { value } }) => setRepeatPasswordValue(value),
      errorText: wasSubmitted
        ? !isPasswordsEquals
          ? 'The second password is different'
          : validatePassword(repeatPasswordValue)
        : undefined,
      disabled: isLoading,
    }),
    [isLoading, isPasswordsEquals, repeatPasswordValue, wasSubmitted],
  )

  const onSubmit: React.FormHTMLAttributes<HTMLFormElement>['onSubmit'] =
    async (event) => {
      event.preventDefault()

      if (!wasSubmitted) {
        setWasSubmitted(true)
      }

      setIsLoading(true)

      try {
        const { token, error } = await signUp({
          email: emailValue,
          password: passwordValue,
        })

        setErrorMessage(error ? error : null)

        if (error || typeof token !== 'string') {
          throw new Error(error || token)
        }

        setContext((prev) => {
          const next: GlobalContextValue = JSON.parse(JSON.stringify(prev)) // better do it with lodash.cloneDeep
          next.token = token
          next.user = {
            email: emailValue,
            password: passwordValue,
          }

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
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <Input {...repeatPasswordProps} />

      <div className={styles.Container}>
        <Button type='submit' loading={isLoading}>
          Sing Up
        </Button>
        {<p className={styles.ErrorMessage}>{errorMessage}</p>}
      </div>
    </form>
  )
}

export default SignUpForm
