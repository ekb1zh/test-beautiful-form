import React from 'react'

import Main from 'src/components/Main'
import Input2 from 'src/components/Input2'
import Form from 'src/components/Form'
import Button from 'src/components/Button'

const App: React.FC = () => {
  return (
    <Main>
      <Form>
        <Input2 />
        <Button>Sing In</Button>
      </Form>
    </Main>
  )
}

export default App
