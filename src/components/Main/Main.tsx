import React from 'react'

import styles from 'src/components/Main/Main.module.scss'

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.Root}>{children}</main>
}

export default Main
