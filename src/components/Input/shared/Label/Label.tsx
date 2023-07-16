import React from 'react'

import classes from 'src/components/Input/shared/Label/Label.module.scss'

const Label: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <label className={classes.root}>{children}</label>
}

export default Label
