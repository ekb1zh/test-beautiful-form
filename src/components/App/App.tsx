import React, { useState } from 'react'

import Input from 'src/components/Input'
import Button from 'src/components/Button'
import styles from 'src/components/App/App.module.scss'

const App: React.FC = () => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

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

          <Button>Sing In</Button>
        </form>
      </div>
    </main>
  )
}

export default App
