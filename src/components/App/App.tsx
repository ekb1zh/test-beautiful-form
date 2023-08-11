import React, { useState } from 'react'

import Main from 'src/components/Main'
import Input from 'src/components/Input'
import Form from 'src/components/Form'
import Button from 'src/components/Button'

const App: React.FC = () => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  return (
    <Main>
      <Form>
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
      </Form>
    </Main>
  )
}

export default App
