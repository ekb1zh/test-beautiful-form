import React, { forwardRef } from 'react'

import styles from 'src/components/LinkButton/LinkButton.module.scss'
import * as T from 'src/components/LinkButton/types'

const LinkButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<T.LinkButtonProps>
>(({ children, ...other }, ref) => {
  return (
    <button ref={ref} type='button' className={styles.Root} {...other}>
      {children}
    </button>
  )
})

export default LinkButton
