import React from 'react'

import * as Types from 'src/components/Button/types'
import classes from 'src/components/Button/Button.module.scss'

const Button: React.FC<React.PropsWithChildren<Types.ButtonProps>> = ({
  children,
  type = 'button',
}) => {
  return (
    <button type={type} className={classes.root}>
      {children}
    </button>
  )
}

export default Button
