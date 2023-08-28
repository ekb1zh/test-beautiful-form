import React, { forwardRef } from 'react'

import styles from 'src/components/Button/Button.module.scss'
import type * as T from 'src/components/Button/types'

const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<T.ButtonProps>
>(({ children, type = 'button', disabled, loading, onClick }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={styles.Root}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
      {loading && <div className={styles.Loader} />}
    </button>
  )
})

export default Button
