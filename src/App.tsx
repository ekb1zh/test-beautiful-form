import React from 'react'

import Main from 'src/components/Main'
import Form from 'src/components/Form'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

const App: React.FC = () => {
  return (
    <Main>
      <Form>
        <Input.Text />
        <Button>Sing In</Button>
      </Form>
    </Main>
  )
}

export default App
