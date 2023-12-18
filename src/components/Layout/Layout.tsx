import React, { forwardRef } from 'react'

import styles from 'src/components/Layout/Layout.module.scss'

const Layout = forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={styles.Root}>
        <main className={styles.Main}>{children}</main>
      </div>
    )
  },
)

export default Layout
