import React, { useState } from 'react'

import Input from 'src/components/Input'
import Button from 'src/components/Button'

import * as api from 'src/api'
import styles from 'src/pages/AuthPage/AuthPage.module.scss'

const AuthPage: React.FC = () => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const onClick = async () => {
    try {
      const { token, error } = await api.signUp({
        email: 'awdawd@awdawd.awdaw',
        password: 'awdwadawd',
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
    <main className={styles.Main}>
      <div className={styles.Container}>
        <h1 className={styles.Header}>Sign In</h1>

        <form className={styles.Form}>
          <Input
            label='Login'
            type='text'
            value={loginValue}
            onChange={setLoginValue}
          />

          <Input
            label='Password'
            type='password'
            value={passwordValue}
            onChange={setPasswordValue}
          />

          <Button onClick={onClick}>Sing In</Button>
        </form>
      </div>
    </main>
  )
}

export default AuthPage
