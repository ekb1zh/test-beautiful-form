import React from 'react'

import { InputProps } from 'src/components/Input/shared/Input/types'
import classes from 'src/components/Input/shared/Input/Input.module.scss'

const Input: React.FC<InputProps> = ({
  value,
  defaultValue,
  disabled,
  onChange,
  onInput,
}) => {
  return <input className={classes.root} />
}

export default Input
