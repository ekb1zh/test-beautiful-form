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

  const isPasswordsEquals = passwordValue === repeatPasswordValue

  const emailProps = useMemo<InputProps>(
    () => ({
      label: 'Email',
      type: 'text',
      value: emailValue,
      onChange: ({ target: { value } }) => setEmailValue(value),
      errorText: wasSubmitted ? validateEmail(emailValue) : undefined,
    }),
    [emailValue, wasSubmitted],
  )

  const passwordProps = useMemo<InputProps>(
    () => ({
      label: 'Password',
      type: 'password',
      value: passwordValue,
      onChange: ({ target: { value } }) => setPasswordValue(value),
      errorText: wasSubmitted ? validatePassword(passwordValue) : undefined,
    }),
    [passwordValue, wasSubmitted],
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
    }),
    [isPasswordsEquals, repeatPasswordValue, wasSubmitted],
  )

  const onClick = async () => {
    if (!wasSubmitted) {
      setWasSubmitted(true)
    }

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
    }
  }

  return (
    <form className={styles.Form}>
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <Input {...repeatPasswordProps} />
      <Button onClick={onClick}>Sing Up</Button>
    </form>
  )
}

export default SignUpForm
