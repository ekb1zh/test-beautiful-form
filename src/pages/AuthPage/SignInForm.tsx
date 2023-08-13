import React, { useMemo, useState } from 'react'

import Input, { InputProps } from 'src/components/Input'
import Button from 'src/components/Button'

import { validateEmail, validatePassword } from 'src/utils'
import { signIn } from 'src/api'
import styles from 'src/pages/AuthPage/Form.module.scss'

const SignInForm: React.FC = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const onClick = async () => {
    if (!wasSubmitted) {
      setWasSubmitted(true)
    }

    setIsLoading(true)

    try {
      const { token, error } = await signIn({
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
      <Button onClick={onClick} loading={isLoading}>
        Sing In
      </Button>
    </form>
  )
}

export default SignInForm
