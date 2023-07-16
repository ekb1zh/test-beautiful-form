import React from 'react'

import classes from 'src/components/Main/Main.module.scss'

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={classes.root}>{children}</main>
}

export default Main
