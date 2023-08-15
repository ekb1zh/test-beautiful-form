import React from 'react'

import styles from 'src/components/LinkButton/LinkButton.module.scss'
import type * as T from 'src/components/LinkButton/types'

const LinkButton: React.FC<React.PropsWithChildren<T.LinkButtonProps>> = ({
  children,
  ...other
}) => {
  return (
    <button type='button' className={styles.Root} {...other}>
      {children}
    </button>
  )
}

export default LinkButton
