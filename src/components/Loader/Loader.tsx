import React, { useMemo } from 'react'

import styles from 'src/components/Loader/Loader.module.scss'
import * as T from 'src/components/Loader/types'

const Loader: React.FC<T.LoaderProps> = () => {
  const divs = useMemo(() => new Array(5).fill(null).map(() => <div />), [])
  return <div className={styles.Root}>{divs}</div>
}

export default Loader
