import React from 'react'

import styles from 'src/components/Main/Main.module.scss'

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.Root}>
      <main className={styles.Main}>{children}</main>
    </div>
  )
}

export default Main
