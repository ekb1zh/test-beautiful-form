import React from 'react'

import classes from 'src/components/Form/Form.module.scss'

const Form: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <form className={classes.root}>{children}</form>
}

export default Form
