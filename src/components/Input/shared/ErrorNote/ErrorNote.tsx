import React from 'react'

import classes from 'src/components/Input/shared/ErrorNote/ErrorNote.module.scss'

const ErrorNote: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span className={classes.root}>{children}</span>
}

export default ErrorNote
