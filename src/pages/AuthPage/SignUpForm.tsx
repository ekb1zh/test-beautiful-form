import React, { useMemo, useState } from 'react'

import Input, { InputProps } from 'src/components/Input'
import Button from 'src/components/Button'

import { validateEmail, validatePassword } from 'src/utils'
import { signUp } from 'src/api'
import styles from 'src/pages/AuthPage/Form.module.scss'

const SignUpForm: React.FC = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const onClick = async () => {
    if (!wasSubmitted) {
      setWasSubmitted(true)
    }

    setIsLoading(true)

    try {
      const { token, error } = await signUp({
        email: emailValue,
        password: passwordValue,
      })

      if (error || typeof token !== 'string') {
        throw new Error(error)
      }

      alert(JSON.stringify(token))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.Form}>
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <Input {...repeatPasswordProps} />
      <Button onClick={onClick} loading={isLoading}>
        Sing Up
      </Button>
    </form>
  )
}

export default SignUpForm
