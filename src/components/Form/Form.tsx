import React from 'react'

import styles from 'src/components/Form/Form.module.scss'

const Form: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <form className={styles.Root}>{children}</form>
}

export default Form
