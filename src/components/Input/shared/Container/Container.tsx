import React from 'react'

import classes from 'src/components/Input/shared/Container/Container.module.scss'

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.root}>{children}</div>
}

export default Container
