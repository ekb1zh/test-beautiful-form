import React from 'react'

import classes from 'src/components/Input/InputText/InputText.module.scss'

import Container from 'src/components/Input/shared/Container'
import ErrorNote from 'src/components/Input/shared/ErrorNote'
import Input from 'src/components/Input/shared/Input'
import Label from 'src/components/Input/shared/Label'

const InputText: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.root}>
      <Container>
        <Label>Label</Label>

        <Input />

        <ErrorNote>ErrorNote</ErrorNote>
      </Container>
    </div>
  )
}

export default InputText
