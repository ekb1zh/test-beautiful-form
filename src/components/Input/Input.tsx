import React, { useMemo } from 'react'

import { StringGenerator } from 'src/utils'
import styles from 'src/components/Input/Input.module.scss'

const stringGenerator = new StringGenerator({
  allowedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  defaultSize: 4,
})

const Input: React.FC = () => {
  const inputId = useMemo(() => stringGenerator.next(), [])

  return (
    <div className={styles.RootContainer}>
      <div className={styles.InnerContainer}>
        <input className={styles.Input} id={inputId} />
        <label className={styles.Label} htmlFor={inputId}>
          label
        </label>
        <button type='button' className={styles.EyeButton}>
          show pass
        </button>
      </div>
      <span className={styles.ErrorMessage}>Error text</span>
    </div>
  )
}

export default Input
