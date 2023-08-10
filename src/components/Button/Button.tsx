import React from 'react'

import * as Types from 'src/components/Button/types'
import styles from 'src/components/Button/Button.module.scss'

const Button: React.FC<React.PropsWithChildren<Types.ButtonProps>> = ({
  children,
  type = 'button',
}) => {
  return (
    <button type={type} className={styles.Root}>
      {children}
    </button>
  )
}

export default Button
